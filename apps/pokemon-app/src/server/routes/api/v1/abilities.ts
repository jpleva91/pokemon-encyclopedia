import { defineEventHandler, getQuery, createError } from 'h3';
import Pokedex from 'pokedex-promise-v2';

const pokedex = new Pokedex({
  protocol: 'https' as const,
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
    const abilityKey =
      typeof name === 'string' && name !== ''
        ? name
        : typeof id === 'string' && id !== ''
        ? id
        : typeof id === 'number'
        ? id
        : undefined;

    // abilityKey is guaranteed to be string or number due to earlier validation
    return await pokedex.getAbilityByName(abilityKey as string | number);
  } catch (error: any) {
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.message || 'Failed to fetch ability',
    });
  }
});
