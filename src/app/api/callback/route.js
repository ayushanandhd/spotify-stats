export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response("No code provided", { status: 400 });
  }

  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI;

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    return new Response(tokenData.error_description || "Token exchange failed", { status: 400 });
  }

  // Redirect to home page with access token
  return Response.redirect(
    `${process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI.split('/api')[0]}/?access_token=${tokenData.access_token}`
  );
}