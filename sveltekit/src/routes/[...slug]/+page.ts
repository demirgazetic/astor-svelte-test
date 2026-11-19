import { error } from '@sveltejs/kit';
import type { ISbStoryData } from '@storyblok/svelte';
import type { PageLoad } from './$types';
import { isPreview } from '$lib/storyblok';

export const load: PageLoad = async ({ params, parent }) => {
  const { storyblokApi } = await parent();
  try {
    const { data } = await storyblokApi.get(`cdn/stories/${params.slug || 'home'}`, {
      version: isPreview ? 'draft' : 'published'
    });
    return { story: data.story as ISbStoryData };
  } catch (e) {
    error((e as { status?: number }).status ?? 500, 'Story not found');
  }
};
