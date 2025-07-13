import { defineEventHandler, getQuery, createError } from 'h3';
import Pokedex from 'pokedex-promise-v2';

const pokedex = new Pokedex({
  protocol: 'https',
  timeout: 5 * 1000,
});

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { name, id } = query;

  if (!name && !id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name or ID is required',
    });
  }

  try {
    return await pokedex.getMoveByName(
      typeof name === 'string' || typeof name === 'number'
        ? name
        : (id as string | number)
    );
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.message || 'Failed to fetch move',
    });
  }
});
