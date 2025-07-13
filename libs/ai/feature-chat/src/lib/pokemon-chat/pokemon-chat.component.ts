import { Component, ViewChild, ElementRef, effect } from '@angular/core';
import {
  uiChatResource,
  exposeComponent,
  createToolWithArgs,
  RenderMessageComponent,
} from '@hashbrownai/angular';
import { s } from '@hashbrownai/core';
import { ComposerComponent } from '../composer/composer.component';
import { PokemonCardComponent } from '@pokemon-encyclopedia/feature-card';
import { PokemonListComponent } from '@pokemon-encyclopedia/feature-list';
import { PokemonComparisonComponent } from '@pokemon-encyclopedia/feature-compare';
import { ChatMarkdownComponent } from '../markdown/markdown.component';

@Component({
  selector: 'lib-pokemon-chat',
  imports: [ComposerComponent, RenderMessageComponent],
  template: `
    <div class="chat-container">
      <div class="chat-header">
        <h2>BILL'S PC</h2>
        <p>Hey there! It's me, Bill!</p>
      </div>

      <div class="messages-container" #messagesContainer>
        @for (message of chat.value(); track $index) {
        <div
          class="message"
          [class.user]="message.role === 'user'"
          [class.assistant]="message.role === 'assistant'"
        >
          <div class="message-role">
            {{ message.role === 'user' ? 'TRAINER' : 'BILL' }}
          </div>
          <div class="message-content">
            @if (message.role === 'user') {
            {{ message.content }}
            } @else if (message.role === 'assistant') {
            <hb-render-message [message]="message" />
            }
          </div>
        </div>
        }
      </div>

      <lib-composer (sendMessage)="sendMessage($event)" />
    </div>
  `,
  styles: [
    `
      .chat-container {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: transparent;
        overflow: hidden;
      }

      .chat-header {
        flex-shrink: 0;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
        text-align: center;
        border-bottom: 4px solid var(--gb-dark);

        h2 {
          margin: 0 0 4px 0;
          font-size: 14px;
          color: var(--gb-darkest);
          letter-spacing: 2px;
        }

        p {
          margin: 0;
          font-size: 9px;
          color: var(--gb-dark);
        }
      }

      .messages-container {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 8px;
        min-height: 0;

        /* Custom scrollbar for Game Boy aesthetic */
        &::-webkit-scrollbar {
          width: 8px;
        }

        &::-webkit-scrollbar-track {
          background: var(--gb-medium);
          border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb {
          background: var(--gb-dark);
          border-radius: 4px;
        }
      }

      .message {
        margin: 8px 4px;
        padding: 8px;
        border: 3px solid var(--gb-darkest);
        background-color: var(--gb-lightest);
        position: relative;
        font-size: 9px;

        &.user {
          margin-left: 15%;
          background-color: var(--gb-light);

          &::before {
            content: '>';
            position: absolute;
            left: -16px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 12px;
            color: var(--gb-darkest);
          }
        }

        &.assistant {
          margin-right: 15%;
          background-color: var(--gb-lightest);
        }
      }

      .message-role {
        font-weight: bold;
        font-size: 8px;
        color: var(--gb-dark);
        letter-spacing: 1px;
        margin-bottom: 2px;
      }

      .message-content {
        font-size: 9px;
        line-height: 1.4;
        color: var(--gb-darkest);

        /* Make Pokemon cards more compact */
        :deep(lib-pokemon-card) {
          transform: scale(0.9);
          transform-origin: top left;
        }
      }

      lib-composer {
        flex-shrink: 0;
        border-top: 4px solid var(--gb-dark);
      }
    `,
  ],
})
export class PokemonChatComponent {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

  chat = uiChatResource({
    model: 'gpt-4.1',
    apiUrl: '/api/v1/chat',
    system: `You are Bill, the famous PokeManiac and creator of the PC Storage System!
You LOVE Pokemon and get excited talking about them. Your job is to help trainers with accurate, enthusiastic, and friendly advice.

Personality:
- Always enthusiastic, especially about rare or unusual Pokemon!
- Use phrases like "Hey there!", "Fantastic!", "Oh wow!", and reference your work on the PC Storage System.
- Occasionally mention your teleporter accident for humor.
- Stay in character as Bill: friendly, nerdy, and supportive.

Response Guidelines:
- Use ChatMarkdownComponent for all text responses (markdown formatting).
- Format important words with **bold** and Pokemon names with _italics_.
- When showing Pokemon data, use the correct UI component:
  1. For a single Pokemon: Use PokemonCardComponent with the name or ID.
  2. For comparing Pokemon: Use PokemonComparisonComponent with an array of names/IDs.
  3. For lists by type or generation: Use getPokemonByType/getPokemonByGeneration tools first, then PokemonListComponent.
  4. Always add enthusiastic commentary before or after the data using ChatMarkdownComponent.

IMPORTANT Query Handling:
- For "top attack/defense/speed Pokemon" queries: You must provide specific Pokemon names/IDs to show.
  Example: For "top 5 attack Pokemon", use PokemonComparisonComponent with ["kartana", "deoxys-attack", "rampardos", "slaking", "regigigas"]
- For type-based lists: Use getPokemonByType tool, then PokemonListComponent with that type.
- For generation lists: Use getPokemonByGeneration tool, then PokemonListComponent with that generation.
- NEVER show empty lists - always provide specific Pokemon or use the appropriate filters.
- When users ask to "compare them" after showing Pokemon, use the Pokemon names/IDs from your previous response.
- For stat comparisons, ALWAYS use PokemonComparisonComponent to show the actual stats side-by-side.

Common Top Pokemon by Stats (use these for quick reference):
- Highest Attack: kartana (181), deoxys-attack (180), rampardos (165), slaking (160), regigigas (160)
- Highest Defense: shuckle (230), mega-steelix (230), mega-aggron (230), avalugg (184), toxapex (152)
- Highest Speed: deoxys-speed (180), ninjask (160), pheromosa (151), alakazam-mega (150), electrode (150)
- Highest HP: blissey (255), chansey (250), guzzlord (223), alomomola (165), hariyama (144)
- Highest Special Attack: deoxys-attack (180), mewtwo-mega-y (194), rayquaza-mega (180), alakazam-mega (175), xurkitree (173)
- Highest Special Defense: shuckle (230), regice (200), probopass (150), florges (154), goodra (150)

Technical Instructions:
- Only pass IDs or names to components; do not pass full objects.
- For comparisons, use arrays like ["pikachu", "charizard"].
- Components fetch their own data—just provide the correct input.

Common Requests and How to Handle Them:
1. "Show me fire types" → Use getPokemonByType("fire"), then PokemonListComponent with type="fire"
2. "Compare Pikachu and Charizard" → Use PokemonComparisonComponent with ["pikachu", "charizard"]
3. "Show me Gen 1 starters" → Use PokemonComparisonComponent with ["bulbasaur", "charmander", "squirtle"]
4. "What's the strongest Pokemon?" → Explain it depends on the stat, then show top Attack Pokemon using comparison
5. "Show me a random Pokemon" → Pick an interesting Pokemon and use PokemonCardComponent

  Handling Vague Queries:
  - "Show me cool Pokemon" → Pick 3-5 interesting/unusual Pokemon and show them with PokemonComparisonComponent
  - "What's your favorite Pokemon?" → As Bill, mention Eevee or Porygon (tech-related) and show it with PokemonCardComponent
  - "Show me legendaries" → Use PokemonComparisonComponent with ["mewtwo", "articuno", "zapdos", "moltres", "mew"]

  2. Better error handling guidance:
  Error Handling:
  - If a Pokemon name isn't found, suggest similar names or ask for clarification
  - For misspellings, try to guess the correct Pokemon (e.g., "pickachu" → "pikachu")
  - If showing multiple Pokemon and one fails, still show the others that succeed

  3. More personality quirks:
  Bill's Personality Quirks:
  - Get EXTRA excited about: Eevee evolutions, Porygon line, rare Pokemon, shinies
  - Mention the PC Storage System when showing multiple Pokemon
  - Sometimes joke about the teleporter accident with Clefairy
  - Use technical terms occasionally (base stats, EVs, IVs) but explain them simply

  4. Better list handling:
  Showing Pokemon Lists:
  - For type lists: Show max 20 Pokemon, mention if there are more
  - Always follow up lists with "Want to see detailed stats for any of these?"
  - Group Pokemon by evolution families when it makes sense

  5. Interactive suggestions:
  Always End Responses With Suggestions:
  - After showing a Pokemon: "Want to see its evolution chain?" or "Curious about its moves?"
  - After comparisons: "Should we check out their type matchups?"
  - After lists: "Any specific Pokemon you'd like to examine closer?"

Remember: ALWAYS show visual Pokemon data when possible. Empty lists are boring - Bill would never show an empty PC box!

Your goal: Make every answer fun, helpful, and visually clear for trainers using the app!`,
    components: [
      exposeComponent(ChatMarkdownComponent, {
        description: 'Show markdown to the user',
        input: {
          data: s.streaming.string('The markdown content'),
        },
      }),
      exposeComponent(PokemonCardComponent, {
        description:
          'Display detailed Pokemon information in a retro card format. Pass ONLY the Pokemon ID or name (like "pikachu" or "25"), NOT the full Pokemon object.',
        input: {
          pokemonId: s.string(
            'Pokemon ID or name (e.g., "pikachu" or "25")'
          ) as any,
        },
      }),
      exposeComponent(PokemonListComponent, {
        description: 'Show a list of Pokemon with filtering options',
        input: {
          type: s.string(
            'Pokemon type to filter by (e.g., "fire", "water", or "all" for no filter)'
          ),
          generation: s.number(
            'Generation number to filter by (use 0 for all generations)'
          ),
          limit: s.number('Maximum number of Pokemon to show'),
        },
      }),
      exposeComponent(PokemonComparisonComponent, {
        description:
          'Compare multiple Pokemon side by side. Pass an array of Pokemon IDs or names (e.g., ["pikachu", "charizard"] or ["25", "6"])',
        input: {
          pokemonIds: s.array(
            'Array of Pokemon IDs or names to compare (e.g., ["pikachu", "charizard"])',
            s.string('Pokemon ID or name')
          ),
        },
      }),
    ],
    tools: [
      // Pokemon endpoints
      createToolWithArgs({
        name: 'getPokemon',
        description: 'Get detailed data about a specific Pokemon',
        schema: s.object('Get Pokemon input', {
          nameOrId: s.string('Pokemon name or ID'),
        }),
        handler: async (input: { nameOrId: string }) => {
          try {
            const response = await fetch(
              `/api/v1/pokemon?action=get&id=${input.nameOrId}`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
          } catch (error) {
            return {
              error:
                error instanceof Error
                  ? error.message
                  : `Failed to fetch ${input.nameOrId}`,
            };
          }
        },
      }),
      createToolWithArgs({
        name: 'getPokemonByGeneration',
        description: 'Get a list of all Pokemon in a specific generation',
        schema: s.object('Get Pokemon by generation input', {
          generation: s.number('Generation number (1-9)'),
        }),
        handler: async (input: { generation: number }) => {
          try {
            const response = await fetch(
              `/api/v1/pokemon?action=generation&generation=${input.generation}`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return {
              success: true,
              message: `Loaded generation ${input.generation} Pokemon list`,
              count: data.results?.length || 0,
              results: data.results,
            };
          } catch (error) {
            return {
              error:
                error instanceof Error
                  ? error.message
                  : `Failed to fetch generation ${input.generation}`,
            };
          }
        },
      }),
      createToolWithArgs({
        name: 'getPokemonByType',
        description: 'Get a list of all Pokemon of a specific type',
        schema: s.object('Get Pokemon by type input', {
          type: s.string('Pokemon type (e.g., "fire", "water", "grass")'),
        }),
        handler: async (input: { type: string }) => {
          try {
            const response = await fetch(
              `/api/v1/pokemon?action=type&type=${input.type}`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return {
              success: true,
              message: `Loaded ${input.type} type Pokemon list`,
              count: data.pokemon?.length || 0,
              pokemon: data.pokemon,
            };
          } catch (error) {
            return {
              error:
                error instanceof Error
                  ? error.message
                  : `Failed to fetch ${input.type} type`,
            };
          }
        },
      }),
      // Move endpoints
      createToolWithArgs({
        name: 'getMoveByName',
        description: 'Get data about a specific Pokemon move',
        schema: s.object('Get move input', {
          name: s.string('Move name'),
        }),
        handler: async (input: { name: string }) => {
          try {
            const response = await fetch(`/api/v1/moves?name=${input.name}`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
          } catch (error) {
            return {
              error:
                error instanceof Error
                  ? error.message
                  : `Failed to fetch move ${input.name}`,
            };
          }
        },
      }),
      // Ability endpoints
      createToolWithArgs({
        name: 'getAbilityByName',
        description: 'Get data about a specific Pokemon ability',
        schema: s.object('Get ability input', {
          name: s.string('Ability name'),
        }),
        handler: async (input: { name: string }) => {
          try {
            const response = await fetch(
              `/api/v1/abilities?name=${input.name}`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
          } catch (error) {
            return {
              error:
                error instanceof Error
                  ? error.message
                  : `Failed to fetch ability ${input.name}`,
            };
          }
        },
      }),
      // Type endpoints
      createToolWithArgs({
        name: 'getTypeByName',
        description: 'Get data about a specific Pokemon type',
        schema: s.object('Get type input', {
          name: s.string('Type name'),
        }),
        handler: async (input: { name: string }) => {
          try {
            const response = await fetch(`/api/v1/types?name=${input.name}`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
          } catch (error) {
            return {
              error:
                error instanceof Error
                  ? error.message
                  : `Failed to fetch type ${input.name}`,
            };
          }
        },
      }),
      // Evolution endpoints
      createToolWithArgs({
        name: 'getEvolutionChain',
        description: 'Get evolution chain data by ID',
        schema: s.object('Get evolution chain input', {
          id: s.number('Evolution chain ID'),
        }),
        handler: async (input: { id: number }) => {
          try {
            const response = await fetch(
              `/api/v1/evolution-chains?id=${input.id}`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
          } catch (error) {
            return {
              error:
                error instanceof Error
                  ? error.message
                  : `Failed to fetch evolution chain ${input.id}`,
            };
          }
        },
      }),
    ],
  });

  constructor() {
    // Auto-scroll to bottom when new messages arrive
    effect(() => {
      const messages = this.chat.value();
      if (messages.length > 0 && this.messagesContainer) {
        setTimeout(() => {
          const container = this.messagesContainer.nativeElement;
          container.scrollTop = container.scrollHeight;
        }, 200);
      }
    });
  }

  sendMessage(message: string) {
    this.chat.sendMessage({ role: 'user', content: message });
  }
}
