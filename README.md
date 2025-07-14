# Pokémon Encyclopedia
A modern, interactive Pokémon encyclopedia built with Angular 20, featuring Bill's AI-powered PC system for exploring and comparing Pokémon data.

## AI Chat with Bill

The chat interface allows users to interact with Bill, the famous Pokémon PC creator. Bill can:

- Show individual Pokémon details
- Compare multiple Pokémon
- List Pokémon by type or generation
- Answer questions about Pokémon stats and abilities

### Agentic Architecture

This chat system goes beyond simple text replies. It uses a **generative AI agent** that:

- Understands the user’s natural-language queries
- Dynamically decides which tools or API calls to invoke, such as fetching Pokémon data, running comparisons, or generating lists
- Determines which UI components to render on the fly (e.g. Pokémon cards, comparison tables, filtered lists)

This enables a highly interactive experience where the AI orchestrates both backend logic and the frontend user interface in real-time, making the app feel conversational and intelligent rather than static.

# Live Demo
🎮 **[Live Demo](https://pokemon-encyclopedia-nine.vercel.app/)**

![Pokemon Encyclopedia Screenshot](https://img.shields.io/badge/Angular-v20-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Nx](https://img.shields.io/badge/Nx-Monorepo-143055)

## Screenshots

<img width="804" height="1094" alt="Screenshot 2025-07-12 235327" src="https://github.com/user-attachments/assets/dba1070f-52b1-4fef-90b8-13efbecdb3f3" />
<img width="801" height="1091" alt="Screenshot 2025-07-12 235139" src="https://github.com/user-attachments/assets/1bdd9f6b-f9e7-4406-834a-f84a57e0ec14" />
<img width="804" height="1092" alt="Screenshot 2025-07-12 235145" src="https://github.com/user-attachments/assets/606929a4-1462-4893-97e3-e1234ee3c309" />
<img width="801" height="935" alt="image" src="https://github.com/user-attachments/assets/0437b70e-b5cb-424b-835b-8133071dd919" />


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
