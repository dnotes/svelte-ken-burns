<script lang="ts">
  import type { Slide, SlideshowOptions } from "$lib/index";
  import Slideshow from "$lib/Slideshow.svelte";

  let slides:Slide[] = [
    {
      image: {
        src: '/beach-log.jpg',
        alt: 'looking under a huge log on the beach',
      },
      start: {
        zoom: 2,
        x: 46,
        y: 50,
      },
      end: {
        zoom: 3.1,
        x: 46,
        y: 54,
      }
    },
    {
      image: {
        src: '/waterfall.jpg',
        alt: 'a waterfall roars into a deep pool',
      },
      start: {
        zoom: 1.2,
        y: 100,
      },
      end: {
        zoom:1.5,
        y: 30,
      }
    },
    {
      image: {
        src: '/beach-rocks.jpg',
        alt: 'a rocky beach with crashing waves',
      },
      start: {
        y: 55,
      },
      end: {
        y: 25,
      },
    },
    {
      image: {
        src: '/town.jpg',
        alt: 'a mountain town shining in the sunlight',
      },
      start: {
        zoom: 1.3,
        y: 25,
      },
      end: {
        zoom: 1,
        y: 50,
      },
    }
  ]

  let options:SlideshowOptions = {
    slideDuration: 6,
    fadeDuration: .8,
    fadeOutDuration: 1.6,
    iterations: 2,
    endOpacity: 1,
  }

</script>

<Slideshow {slides} {options} />

<div class="content">
  <h2>Options:</h2>

  <noscript>
    <p>These options will not affect the slideshow with javascript disabled.</p>
  </noscript>

  <div>
    <label>
      <span>Slide Duration:</span>
      <input type="range" bind:value={options.slideDuration} min=1 max=12 step=.1>
    </label>
  </div>

  <div>
    <label>
      <span>Fade Duration:</span>
      <input type="range" bind:value={options.fadeDuration} min=.1 max=4 step=.1>
    </label>
  </div>

  <div>
    <label>
      <span>Fade Out Duration:</span>
      <input type="range" bind:value={options.fadeOutDuration} min=.1 max=8 step=.1>
    </label>
  </div>

  <div>
    <label>
      <span>Iterations (0 = infinite):</span>
      <input type="range" bind:value={options.iterations} min=0 max=12>
    </label>
  </div>

  <div>
    <label>
      <span>End opacity:</span>
      <input type="range" bind:value={options.endOpacity} min=0 max=1 step=.1>
    </label>
  </div>


  <style>
    div { padding: .2em; }
    div.slot { height:100%; width:100%; max-width:480px; margin:auto; display:flex; flex-direction:column; align-items:center; justify-content:center; }
  </style>
</div>

<style>
  div.content {
    max-width: 640px;
    width: 100%;
    margin: 0 auto;
  }
  label {
    display: flex;
    gap: .8em;
  }
</style>