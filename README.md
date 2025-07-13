# Pokémon Encyclopedia

A modern, interactive Pokémon encyclopedia built with Angular 20, featuring Bill's AI-powered PC system for exploring and comparing Pokémon data.

![Pokemon Encyclopedia Screenshot](https://img.shields.io/badge/Angular-v20-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Nx](https://img.shields.io/badge/Nx-Monorepo-143055)

## Features

- **Interactive AI Chat**: Talk with Bill (the famous Pokémon PC creator) to explore Pokémon data
- **Pokémon Cards**: Beautiful, retro-styled cards displaying Pokémon stats and information
- **Comparison Tool**: Compare multiple Pokémon side-by-side with stat highlighting
- **Type & Generation Filtering**: Browse Pokémon by type or generation
- **Responsive Design**: Works great on desktop and mobile devices
- **Real-time Data**: Fetches live data from the PokéAPI

## Tech Stack

- **Frontend Framework**: Angular 20 with standalone components
- **Build System**: Nx monorepo with Vite
- **Styling**: Custom CSS with Game Boy-inspired design
- **AI Integration**: HashBrown AI framework for chat functionality
- **API**: Express server proxying to PokéAPI
- **State Management**: Angular Signals and Resource API

## Project Structure

```
pokemon-encyclopedia/
├── apps/
│   └── pokemon-app/          # Main Angular application
├── libs/
│   ├── ai/
│   │   └── feature-chat/     # AI chat interface with Bill
│   ├── pokemon/
│   │   ├── domain/           # Pokémon data models
│   │   ├── feature-card/     # Pokémon card display component
│   │   ├── feature-compare/  # Pokémon comparison component
│   │   └── feature-list/     # Pokémon list component
│   └── api/
│       └── server/           # Express API server
└── tools/                    # Build and development tools
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pokemon-encyclopedia.git
cd pokemon-encyclopedia
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Add your OpenAI API key to the `.env` file:
```
OPENAI_API_KEY=your_api_key_here
```

### Development

Run the development server:
```bash
npm start
```

The app will be available at `http://localhost:4200`

### Building

Build the application for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run lint` - Lint the codebase
- `npm run e2e` - Run end-to-end tests

## Key Features Explained

### AI Chat with Bill
The chat interface allows users to interact with Bill, who can:
- Show individual Pokémon details
- Compare multiple Pokémon
- List Pokémon by type or generation
- Answer questions about Pokémon stats and abilities

### Resource API Implementation
All data fetching uses Angular's new Resource API for:
- Automatic request cancellation
- Built-in loading states
- Memory leak prevention
- Optimized re-fetching with equality checks

### Performance Optimizations
- Lazy loading of components
- Efficient data fetching with request deduplication
- Optimized change detection with OnPush strategy
- Smart equality checks to prevent unnecessary API calls

## Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy to Vercel:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key

### Environment Variables

Required environment variables:
- `OPENAI_API_KEY` - OpenAI API key for the AI chat functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [PokéAPI](https://pokeapi.co/) for providing the Pokémon data
- [Angular](https://angular.dev/) team for the amazing framework
- [Nx](https://nx.dev/) for the powerful monorepo tools
- [HashBrown AI](https://hashbrown.ai/) for the AI chat framework

## Support

If you have any questions or run into issues, please open an issue on GitHub.