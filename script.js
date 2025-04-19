const CLIENT_ID = '1362490111983353917'; // Replace with your Discord Application Client ID
const REDIRECT_URI = 'https://avyra-ivory.vercel.app'; // Replace with your deployed Vercel URL
const DASHBOARD_URL = '/dashboard.html'; // URL for your dashboard page

// Function to redirect users to Discord for OAuth login
function loginWithDiscord() {
  const scope = 'identify'; // Scopes for the requested permissions (identify for basic user info)
  const responseType = 'code'; // The response type to get an authorization code
  const discordAuthURL = `https://discord.com/oauth2/authorize?client_id=1362490111983353917&response_type=code&redirect_uri=https%3A%2F%2Favyra-ivory.vercel.app&scope=identify+email`;
  window.location.href = discordAuthURL; // Redirect to Discord login page
}

// On page load, check for the authorization code in the URL and process it
window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code'); // Extract the authorization code from the URL

  if (code) {
    // If there's a code, send it to the backend to exchange it for an access token
    try {
      const res = await fetch('/api/discord-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (data.user) {
        // Successfully authenticated, store user data
        console.log("Logged in as:", data.user.username);
        alert(`Welcome, ${data.user.username}!`);

        // Store user data in localStorage (or you can use cookies, sessionStorage, etc.)
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect to the dashboard
        window.location.href = DASHBOARD_URL;
      } else {
        // Handle login failure
        console.error("Login failed:", data);
        alert("Login failed. Check the console.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  }
};
