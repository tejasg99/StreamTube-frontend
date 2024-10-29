# StreamTube Frontend
StreamTube Frontend is the client-side application for a video-sharing platform, providing users with a responsive interface to interact with features like video streaming, playlists, subscriptions, likes, and channel analytics. This React-based frontend connects to the StreamTube backend to enable a seamless user experience for video consumption and community interaction.

## Technology Stack
- Vite - for project initalization.
- React - Core framework for building the frontend.
- Redux toolkit - State management to handle global app state.
- React Hook Form - For managing form inputs and validation.
- TanStack React Query - For efficient data fetching and synchronization with backend APIs.
- Vidstack Player - Embedded video player with customizable controls for video playback.
- React Hot Toast - Toast notifications for user feedback on actions (e.g., successful login, video upload).
- Tailwind CSS - Utility-first CSS framework for responsive styling.
- React intersection observer - For enabling infinite scroll on some components.
- React dropzone - for drag n drop functionality.
- React icons - for various icons.
- zod validation - for validating forms.

## Features
- User Authentication - 
Login and signup interfaces with authentication handling via JWT.
User profile management, allowing users to view and edit account details, playlists, and subscriptions.
- Video Streaming - 
Video player with playback controls, supporting both hosted and cloud-stored video content.
Automatic recommendations and up-next videos based on user history and preferences.
- Playlists and Subscriptions - 
Users can create and manage playlists, adding or removing videos, and reorder them as desired.
Subscription functionality to follow favorite channels and receive updates on new videos.
- Interactive Engagement - 
Like button for video feedback. Comment section and  replies. View count updates to reflect video popularity and user engagement.
- Channel Analytics - 
Interface displaying channel stats, including total views, likes, subscribers, and watch time.
Personalized analytics for users, showing watch history, liked videos, and subscriptions.
- Search and Filtering - 
Search bar to find videos based on title, tags, and other metadata.
Filters for sorting by relevance, upload date, and popularity.
- Responsive Design - 
Mobile-friendly layout optimized for viewing and interaction across different devices.
Consistent, modern UI design for a seamless user experience.

## Project setup - 
1. Clone the repository
````
git clone https://github.com/tejasg99/StreamTube-frontend.git
cd StreamTube-frontend
````  
2. Install dependencies 
````
npm install
````
3. Environment variables configuration - 
Create a .env file in the root directory and add your environment-specific variables, such as:
````
VITE_API_API_URL=your_backend_api_url
````
4. Run the application
````
npm start
````