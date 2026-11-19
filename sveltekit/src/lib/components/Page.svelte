<script lang="ts">
  import { StoryblokComponent, storyblokEditable, type SbBlokData } from '@storyblok/svelte';

  let { blok }: { blok: SbBlokData & { body?: SbBlokData[] } } = $props();
</script>

<!-- use:storyblokEditable = click-to-edit in the Visual Editor. Needed on every block component. -->
<main use:storyblokEditable={blok}>
  {#each blok.body ?? [] as child (child._uid)}
    <StoryblokComponent blok={child} />
  {/each}
</main>
