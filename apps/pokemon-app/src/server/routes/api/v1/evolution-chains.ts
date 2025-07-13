import { defineEventHandler, getQuery, createError } from 'h3';
import Pokedex from 'pokedex-promise-v2';

const pokedex = new Pokedex({
  protocol: 'https',
  timeout: 5 * 1000,
});

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { id } = query;

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID is required',
    });
  }

  try {
    return await pokedex.getEvolutionChainById(parseInt(id as string));
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.message || 'Failed to fetch evolution chain',
    });
  }
});
