"use client";
import { useEffect, useState } from "react";

// First, add this font import to your layout.js or head
// import { Inter } from 'next/font/google'

export default function Home() {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    if (accessToken) {
      setLoading(true);
      Promise.all([
        // Fetch top artists
        fetch("https://api.spotify.com/v1/me/top/artists", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((res) => res.json()),
        // Fetch top tracks
        fetch("https://api.spotify.com/v1/me/top/tracks", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }).then((res) => res.json()),
      ]).then(([artistsData, tracksData]) => {
        setArtists(artistsData.items || []);
        setTracks(tracksData.items || []);
        setLoading(false);
      });
    }
  }, []);

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;
  const scopes = ["user-read-private", "user-read-email", "user-top-read"];
  const authEndpoint = "https://accounts.spotify.com/authorize";
  const spotifyLoginUrl = `${authEndpoint}?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes.join(" "))}`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <span className="opacity-70">fetching your taste...</span>
      </div>
    );
  }

  if (artists.length > 0) {
    return (
      <main className="min-h-screen bg-black text-white p-8 font-light">
        <h1 className="text-4xl mb-16 mt-8 text-center font-light tracking-tight">
          Your Spotify Stats
        </h1>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Top Artists */}
          <section>
            <h2 className="text-xl mb-8 font-light tracking-wide opacity-70">
              Top Artists
            </h2>
            <div className="space-y-6">
              {artists.slice(0, 8).map((artist, index) => (
                <div
                  key={artist.id}
                  className="flex items-center group cursor-pointer"
                >
                  <span className="w-6 text-sm opacity-40 font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    width={40}
                    height={40}
                    className="rounded-full mx-4 grayscale group-hover:grayscale-0 transition-all duration-300 w-10 h-10 object-cover"
                  />
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                    {artist.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Top Tracks */}
          <section>
            <h2 className="text-xl mb-8 font-light tracking-wide opacity-70">
              Top Tracks
            </h2>
            <div className="space-y-6">
              {tracks.slice(0, 8).map((track, index) => (
                <div
                  key={track.id}
                  className="flex items-center group cursor-pointer"
                >
                  <span className="w-6 text-sm opacity-40 font-mono">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <img
                    src={track.album.images[0]?.url}
                    alt={track.name}
                    width={40}
                    height={40}
                    className="mx-4 grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="flex flex-col">
                    <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                      {track.name}
                    </span>
                    <span className="text-sm opacity-40">
                      {track.artists[0].name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <a
        href={spotifyLoginUrl}
        className="px-8 py-3 text-white opacity-70 hover:opacity-100 transition-opacity border border-white/20 rounded-full text-sm tracking-widest uppercase"
      >
        Connect Spotify
      </a>
    </div>
  );
}
