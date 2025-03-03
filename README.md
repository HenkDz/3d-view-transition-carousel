# 3D View Transition Carousel

This project demonstrates advanced UI transitions between different view modes using React and CSS animations.

## Features

- **3D Carousel View**: Interactive 3D carousel with rotation controls
- **Grid View**: Traditional grid layout for project cards
- **List View**: Compact list view for project cards
- **Cascading Transition**: Sequential animation where cards transform one after another
- **Smooth Transitions**: Fluid animations between all view modes
- **Responsive Design**: Works on different screen sizes

## Demo Components

1. **AdvancedCardTransition**: A component that transitions between grid, list, and 3D carousel views with smooth animations.

2. **GridListTransition**: A simpler component that toggles between grid and list views with clean transitions.

3. **CascadingGridListTransition**: A component that demonstrates a sequential animation where each card:
   - First shrinks vertically to its target height
   - Then expands horizontally to full width
   - Cards animate one after another in sequence

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/3d-view-transition-carousel.git
cd 3d-view-transition-carousel
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `src/components/AdvancedCardTransition.tsx` - The 3D carousel component with grid/list transitions
- `src/components/GridListTransition.tsx` - A simpler grid/list transition component
- `src/components/CascadingGridListTransition.tsx` - Sequential card animation component
- `src/App.tsx` - Main application component that allows switching between the demos

## Technologies Used

- React
- TypeScript
- TailwindCSS
- Vite

## License

MIT 