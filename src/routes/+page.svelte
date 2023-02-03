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
        zoom: 2.4,
        x: 46,
        y: 50,
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
        zoom:1.4,
        y: 70,
      }
    },
    {
      image: {
        src: '/beach-rocks.jpg',
        alt: 'a rocky beach with crashing waves',
      },
      start: {
        y: 35,
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
        zoom: 1.2,
        y: 25,
      },
      end: {
        zoom: 1,
        y: 38,
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
      <span>{options.slideDuration}</span>
    </label>
  </div>

  <div>
    <label>
      <span>Fade Duration:</span>
      <input type="range" bind:value={options.fadeDuration} min=.1 max=4 step=.1>
      <span>{options.fadeDuration}</span>
    </label>
  </div>

  <div>
    <label>
      <span>Iterations:</span>
      <input type="range" bind:value={options.iterations} min=0 max=12>
      <span>{options.iterations}</span>
      <span><em>(0 = infinite)</em></span>
    </label>
  </div>

  <div>
    <label>
      <span>End opacity:</span>
      <input type="range" bind:value={options.endOpacity} min=0 max=1 step=.1>
      <span>{options.endOpacity}</span>
    </label>
  </div>


  <style>
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
  label > span:first-child {
    width: 120px;
  }
</style>