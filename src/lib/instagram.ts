const IG_BASE = "https://graph.instagram.com/v21.0";

export function getInstagramAuthUrl() {
  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_APP_ID!,
    redirect_uri: process.env.FACEBOOK_REDIRECT_URI!,
    scope: "instagram_business_basic,instagram_manage_comments,instagram_business_manage_messages",
    response_type: "code",
  });
  return `https://www.instagram.com/oauth/authorize?${params}`;
}

export async function exchangeCodeForToken(code: string) {
  const res = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.FACEBOOK_APP_ID!,
      client_secret: process.env.FACEBOOK_APP_SECRET!,
      grant_type: "authorization_code",
      redirect_uri: process.env.FACEBOOK_REDIRECT_URI!,
      code,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Token exchange failed: ${JSON.stringify(data)}`);
  return data as { access_token: string; user_id: number };
}

export async function getLongLivedToken(shortToken: string) {
  const params = new URLSearchParams({
    grant_type: "ig_exchange_token",
    client_secret: process.env.FACEBOOK_APP_SECRET!,
    access_token: shortToken,
  });
  const res = await fetch(`https://graph.instagram.com/access_token?${params}`);
  const data = await res.json();
  if (!res.ok) throw new Error(`Long-lived token exchange failed: ${JSON.stringify(data)}`);
  return data as { access_token: string; token_type: string; expires_in: number };
}

export async function refreshLongLivedToken(accessToken: string) {
  const params = new URLSearchParams({
    grant_type: "ig_refresh_token",
    access_token: accessToken,
  });
  const res = await fetch(`https://graph.instagram.com/refresh_access_token?${params}`);
  const data = await res.json();
  if (!res.ok) throw new Error(`Token refresh failed: ${JSON.stringify(data)}`);
  return data as { access_token: string; token_type: string; expires_in: number };
}

export async function getInstagramProfile(accessToken: string) {
  const params = new URLSearchParams({
    fields: "id,username,name,followers_count,media_count,profile_picture_url,biography,website",
    access_token: accessToken,
  });
  const res = await fetch(`${IG_BASE}/me?${params}`);
  const data = await res.json();
  if (!res.ok) throw new Error(`Profile fetch failed: ${JSON.stringify(data)}`);
  return data as {
    id: string;
    username: string;
    name: string;
    followers_count: number;
    media_count: number;
    profile_picture_url?: string;
    biography?: string;
    website?: string;
  };
}

export async function getInstagramMedia(accessToken: string) {
  const params = new URLSearchParams({
    fields: "id,caption,media_type,media_url,thumbnail_url,permalink,like_count,comments_count,timestamp",
    limit: "12",
    access_token: accessToken,
  });
  const res = await fetch(`${IG_BASE}/me/media?${params}`);
  const data = await res.json();
  if (!res.ok) throw new Error(`Media fetch failed: ${JSON.stringify(data)}`);
  return (data.data ?? []) as Array<{
    id: string;
    caption?: string;
    media_type: string;
    media_url?: string;
    thumbnail_url?: string;
    permalink: string;
    like_count?: number;
    comments_count?: number;
    timestamp: string;
  }>;
}
