import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';
import { PUBLIC_STORYBLOK_PREVIEW, PUBLIC_STORYBLOK_TOKEN } from '$env/static/public';
import Page from './components/Page.svelte';

// Preview deployment: PUBLIC_STORYBLOK_PREVIEW=true + preview token (draft access).
// Production deployment: false + public token.
export const isPreview = PUBLIC_STORYBLOK_PREVIEW === 'true';

export async function initStoryblok() {
  storyblokInit({
    accessToken: PUBLIC_STORYBLOK_TOKEN,
    use: [apiPlugin],
    bridge: isPreview,
    apiOptions: { region: 'eu' },
    components: { page: Page }
  });
  return useStoryblokApi();
}
