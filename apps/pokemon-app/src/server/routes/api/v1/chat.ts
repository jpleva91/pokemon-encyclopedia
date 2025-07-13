import { HashbrownOpenAI } from "@hashbrownai/openai";
import { defineEventHandler, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  const requestId = Date.now().toString();
  console.log(`[${requestId}] Chat API request started`);
  
  try {
    const body = await readBody(event);
    
    // In Nitro/AnalogJS, we access runtime config through useNitroApp
    const apiKey = process.env['OPENAI_API_KEY'] || '';
    
    if (!apiKey) {
      console.error(`[${requestId}] OpenAI API key not configured`);
      throw createError({
        statusCode: 500,
        statusMessage: 'OpenAI API key not configured'
      });
    }

    console.log(`[${requestId}] Chat API called with model: ${body.model || 'unknown'}`);
    console.log(`[${requestId}] Message count: ${body.messages?.length || 0}`);
    
    // Ensure messages have content
    if (body.messages && Array.isArray(body.messages)) {
      body.messages = body.messages.map((msg: any) => ({
        ...msg,
        content: msg.content || ''
      }));
    }

    console.log(`[${requestId}] Starting OpenAI stream...`);
    const startTime = Date.now();
    
    const stream = HashbrownOpenAI.stream.text({
      apiKey: apiKey,
      request: body,
    });

    event.node.res.setHeader("Content-Type", "application/octet-stream");
    
    let chunkCount = 0;
    let totalBytes = 0;

    for await (const chunk of stream) {
      chunkCount++;
      totalBytes += chunk.length;
      
      // Log progress every 10 chunks
      if (chunkCount % 10 === 0) {
        console.log(`[${requestId}] Streaming progress: ${chunkCount} chunks, ${totalBytes} bytes`);
      }
      
      event.node.res.write(chunk);
    }

    const duration = Date.now() - startTime;
    console.log(`[${requestId}] Stream completed: ${chunkCount} chunks, ${totalBytes} bytes, ${duration}ms`);

    event.node.res.end();
  } catch (error: any) {
    const duration = Date.now() - parseInt(requestId);
    console.error(`[${requestId}] Chat API error after ${duration}ms:`, error);
    
    // Check for specific OpenAI errors
    if (error.status === 429 || error.statusCode === 429) {
      console.error(`[${requestId}] OpenAI Rate Limit Error - Headers:`, error.headers);
      console.error(`[${requestId}] Rate limit details:`, {
        retryAfter: error.headers?.['retry-after'],
        rateLimitRemaining: error.headers?.['x-ratelimit-remaining'],
        rateLimitReset: error.headers?.['x-ratelimit-reset'],
      });
      
      throw createError({
        statusCode: 429,
        statusMessage: 'OpenAI API rate limit exceeded. Please try again in a few moments.',
        data: {
          retryAfter: error.headers?.['retry-after'] || 60,
          error: 'rate_limit_exceeded'
        }
      });
    }
    
    if (error.status === 503 || error.statusCode === 503) {
      console.error(`[${requestId}] OpenAI Service Unavailable`);
      throw createError({
        statusCode: 503,
        statusMessage: 'OpenAI service is temporarily unavailable. Please try again.',
        data: {
          error: 'service_unavailable'
        }
      });
    }
    
    if (error.status === 401 || error.statusCode === 401) {
      console.error(`[${requestId}] OpenAI Authentication Error`);
      throw createError({
        statusCode: 401,
        statusMessage: 'OpenAI API authentication failed. Please check your API key.',
        data: {
          error: 'authentication_failed'
        }
      });
    }
    
    // Log full error details
    console.error(`[${requestId}] Full error object:`, {
      name: error.name,
      message: error.message,
      status: error.status || error.statusCode,
      stack: error.stack,
      response: error.response,
      data: error.data
    });
    
    throw createError({
      statusCode: error.status || error.statusCode || 500,
      statusMessage: error.message || 'Internal server error while processing chat request',
      data: {
        error: error.name || 'unknown_error',
        details: error.message
      }
    });
  }
});