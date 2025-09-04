# Spotify Stats

A clean and modern web application that displays your Spotify listening statistics, including your top artists and tracks.

![Spotify Stats Preview](preview.png)

## Features

- 🎵 View your top 8 most listened to artists
- 🎸 See your top 8 tracks
- 🎨 Beautiful minimal design with hover effects
- 🔐 Secure Spotify authentication

## Tech Stack

- Next.js
- TailwindCSS
- Spotify Web API

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/spotify-stats.git
cd spotify-stats
```

2. Install the dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up your Spotify API credentials:

- Create a new Spotify application at the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).
- Add your redirect URI (e.g., `http://localhost:3000/api/auth/callback/spotify`) to the application's settings.
- Copy your Client ID and Client Secret.

4. Create a `.env.local` file in the root of the project and add your Spotify credentials:
```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/callback/spotify
```

5. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
