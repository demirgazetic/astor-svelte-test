<script lang="ts">
  import { onMount } from 'svelte';
  import { StoryblokComponent, useStoryblokBridge } from '@storyblok/svelte';
  import { isPreview } from '$lib/storyblok';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  // Writable $derived (Svelte >= 5.25): the bridge overrides it while typing,
  // client-side navigation resets it to the freshly loaded story.
  let story = $derived(data.story);

  onMount(() => {
    if (isPreview) useStoryblokBridge(story.id, (s) => (story = s));
  });
</script>

<StoryblokComponent blok={story.content} />
