const CLIENT_ID = '1362801876701020421';
const REDIRECT_URI = 'https://avyra-seven.vercel.app'; // Update this
const API_ENDPOINT = 'https://discord.com/api/oauth2/authorize';
const TOKEN_ENDPOINT = 'https://discord.com/api/oauth2/token';

function loginWithDiscord() {
  const scope = 'identify';
  const responseType = 'code';
  const discordAuthURL = `${API_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=${responseType}&scope=${scope}`;
  window.location.href = discordAuthURL;
}

window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    // Exchange code for token
    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: 'YOUR_CLIENT_SECRET_HERE', // Only if you use a backend (see below)
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
      scope: 'identify'
    });

    // This request must be done on a secure backend, not in frontend JS.
    alert("OAuth code received, but token exchange requires a backend.");
    console.log("Authorization code:", code);
  }
};
