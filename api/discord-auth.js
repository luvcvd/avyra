export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Missing code' });
  }

  const CLIENT_ID = '1362490111983353917';
  const CLIENT_SECRET = 'FLOJHVxYXe1i9Iqn9C9Y5Vmk-wz9sxwW';
  const REDIRECT_URI = 'https://avyra-seven.vercel.app';

  try {
    // Exchange code for access token
    const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        scope: 'identify',
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return res.status(400).json({ error: 'Token exchange failed', details: tokenData });
    }

    // Get user info
    const userRes = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userInfo = await userRes.json();

    return res.status(200).json({ user: userInfo });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
}
