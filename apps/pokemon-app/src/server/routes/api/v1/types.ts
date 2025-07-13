import { defineEventHandler, getQuery, createError } from 'h3';
import Pokedex from 'pokedex-promise-v2';

const pokedex = new Pokedex({
  protocol: 'https',
  timeout: 5 * 1000,
});

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { name } = query;

  if (typeof name !== 'string' && typeof name !== 'number') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name must be a string or number',
    });
  }

  try {
    return await pokedex.getTypeByName(name as string | number);
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.message || 'Failed to fetch type',
    });
  }
});
