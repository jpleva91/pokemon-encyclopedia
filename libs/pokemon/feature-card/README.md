# feature-card

This library contains the Pokemon card component that displays detailed Pokemon information.

## Usage

```typescript
import { PokemonCardComponent } from '@pokemon-encyclopedia/feature-card';

// In your component
<lib-pokemon-card [pokemonId]="'pikachu'" />
```

## Features

- Automatic loading states with rxResource
- Retro Game Boy Color styling
- Displays stats, types, height, and weight
- Responsive design with container queries

## Running unit tests

Run `nx test feature-card` to execute the unit tests.