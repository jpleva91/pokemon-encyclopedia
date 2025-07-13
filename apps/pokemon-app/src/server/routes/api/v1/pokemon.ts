import { defineEventHandler, getQuery, createError } from 'h3';
import Pokedex from 'pokedex-promise-v2';

// Initialize Pokedex with caching
const pokedex = new Pokedex({
  protocol: 'https',
  timeout: 5 * 1000,
});

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { action, id, name, generation, type, limit, offset } = query;

  try {
    switch (action) {
      case 'get': {
        if (!id && !name) {
          throw createError({
            statusCode: 400,
            statusMessage: 'ID or name is required',
          });
        }
        const nameOrId = id ?? name;
        return await pokedex.getPokemonByName(nameOrId as string | number);
      }

      case 'list': {
        return await pokedex.getPokemonsList({
          limit: limit ? parseInt(limit as string) : 20,
          offset: offset ? parseInt(offset as string) : 0,
        });
      }

      case 'generation': {
        if (!generation) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Generation is required',
          });
        }
        const generationRanges: Record<number, [number, number]> = {
          1: [1, 151],
          2: [152, 251],
          3: [252, 386],
          4: [387, 493],
          5: [494, 649],
          6: [650, 721],
          7: [722, 809],
          8: [810, 905],
          9: [906, 1025],
        };
        const range = generationRanges[parseInt(generation as string)];
        if (!range) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Invalid generation',
          });
        }
        const [start, end] = range;
        return await pokedex.getPokemonsList({
          offset: start - 1,
          limit: end - start + 1,
        });
      }

      case 'type': {
        if (!type) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Type is required',
          });
        }
        const typeData = await pokedex.getTypeByName(type as string);
        return {
          type: typeData.name,
          pokemon: typeData.pokemon.map((p: any) => p.pokemon),
        };
      }

      default: {
        throw createError({
          statusCode: 400,
          statusMessage: 'Invalid action. Use: get, list, generation, or type',
        });
      }
    }
  } catch (error: any) {
    if (error.statusCode) {
      throw error; // Re-throw H3 errors
    }
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.message || 'Internal server error',
    });
  }
});
