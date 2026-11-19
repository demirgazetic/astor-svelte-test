import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import { storyblok } from '@storyblok/astro';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const isPreview = env.STORYBLOK_PREVIEW === 'true';

// Same repo, two deployments:
//   production -> static build, published content, rebuilt via Storyblok publish webhook
//   preview    -> SSR (node adapter), draft content, bridge + live preview
export default defineConfig({
  output: isPreview ? 'server' : 'static',
  adapter: isPreview ? node({ mode: 'standalone' }) : undefined,
  integrations: [
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      bridge: isPreview,
      livePreview: isPreview, // re-renders on the server on every editor input event
      apiOptions: { region: 'eu' },
      components: { page: 'storyblok/Page' } // path relative to src/
    })
  ],
  vite: { plugins: [basicSsl()] } // Visual Editor needs https, also locally
});
