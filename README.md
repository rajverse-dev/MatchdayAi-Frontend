# StadiumAI Frontend

This is a React frontend powered by Vite, deployed on Vercel.

## Vercel Deployment Instructions

Since the API endpoint needs to point to the live Render backend rather than a hardcoded local URL, you must add an environment variable to Vercel before/after deployment.

1. Go to your Vercel Dashboard and select this project.
2. Navigate to **Settings** > **Environment Variables**.
3. Create a new environment variable with:
   - **Key:** `VITE_API_URL`
   - **Value:** *Your backend's Render live URL* (e.g., `https://matchday-backend-xyz.onrender.com`)
4. Click **Save**.
5. Go to the **Deployments** tab and redeploy the latest commit so that Vite can inject the environment variable during the build step.
