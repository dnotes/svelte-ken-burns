<script lang="ts">
  import Slideshow from "./Slideshow.svelte";
  import type { Slide, SlideshowOptions } from '.'

  type Slideshow = {
    slides: Slide[]
    slideshowOptions: Partial<SlideshowOptions>
  }

  export let item:Slideshow

</script>

<Slideshow
  slides={item.slides}
  options={item.slideshowOptions}
/>
