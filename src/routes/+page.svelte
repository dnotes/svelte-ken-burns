<script lang="ts">
  import type { Slide, SlideshowOptions } from "$lib/index";
  import Slideshow from "$lib/Slideshow.svelte";
  import type { PageData } from "./$types";

  export let data:PageData

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

  {@html data.html}

  <div class="tryit">
    <p>If you're feeling adventurous, you can...</p>
    <a class="button" href="https://sveltecms.pages.dev/docs/getting-started">Try out SvelteCMS!</a>
    <p>...and don't forget to install Svelte Ken Burns! <code>npm i -D svelte-ken-burns</code></p>
  </div>

</div>

<style>
  label {
    display: flex;
    gap: .8em;
  }
  label > span:first-child {
    width: 120px;
  }
  div.tryit {
    width: 360px;
    margin: 2em auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  a.button {
    display: block;
    text-align: center;
    font-size: 150%;
    font-weight: bold;
    font-variant: small-caps;
    padding: .5em 2em;
    border-radius: 40px;
    border: 2px solid cornflowerblue;
  }
  div.tryit p {
    text-align: center;
  }

</style>