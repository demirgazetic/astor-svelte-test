import type { LayoutLoad } from './$types';
import { initStoryblok } from '$lib/storyblok';

export const load: LayoutLoad = async () => ({ storyblokApi: await initStoryblok() });
