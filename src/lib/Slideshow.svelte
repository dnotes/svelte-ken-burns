<script lang="ts">
  import type { Slide, SlideshowOptions } from ".";
  const frames = ['start','end'] as const

  export let item:Slide|Slide[] = [] // For use as a SvelteCMS Component

  export let slides:Slide[] = Array.isArray(item) ? item : [item]
  $: if (!Array.isArray(slides)) slides = Array.isArray(item) ? item : [item]

  function mapSlides(s:Slide) {
    let slide = {
      ...s,
      image: typeof s.image === 'string' ? { src:s.image } : s.image,
    }
    frames.forEach(frame => {
      const zoom = s?.[frame]?.zoom as number
      if (zoom > 1) {
        const x = s?.[frame]?.x ?? 50
        const y = s?.[frame]?.y ?? 50
        const range = (zoom - 1)
        // @ts-ignore IT'S DEFINED.
        slide[frame].tx = (-(x) + 50) * range
        // @ts-ignore SHEESH.
        slide[frame].ty = (-(y) + 50) * range
      }
    })
    return slide
  }

  let items = (slides || []).map(mapSlides)
  $: items = (slides || []).map(mapSlides)

  export let options:Partial<SlideshowOptions> = {}

  let defaults:SlideshowOptions = {
    slideDuration: 6,
    fadeDuration: .8,
    fadeOutDuration: 1.6, // this is overridden automatically in opts below
    endOpacity: 1,
    iterations: 0,
  }

  export let paused:boolean = false

  let opts = Object.assign({}, defaults, options, { fadeOutDuration: options.fadeOutDuration || ((options.fadeDuration || .8) * 2) })
  $: if (options) opts = Object.assign({}, defaults, options, { fadeOutDuration: options.fadeOutDuration || ((options.fadeDuration || .8) * 2) })

  let iterations = opts.iterations || 'infinite'
  $: iterations = opts.iterations || 'infinite'

  // export let textDuration = 1300
  // export let titleDelay = 1300
  // export let subtitleDelay = 800
  // export let detailsDelay = 1300
  // export let lastSlideOpacity = 0.8
  // export let animate = true

  let itemCount = items.length
  $: itemCount = items.length

  let fullDuration = opts.slideDuration * (itemCount || 1)
  $: fullDuration = opts.slideDuration * (itemCount || 1)

  let fadeInPct = (opts.fadeDuration * 100) / fullDuration
  $: fadeInPct = (opts.fadeDuration * 100) / fullDuration

  let fadeOutPct = (opts.slideDuration * 100) / fullDuration
  $: fadeOutPct = (opts.slideDuration * 100) / fullDuration

  let slideOutPct = ((opts.slideDuration + opts.fadeOutDuration) * 100) / fullDuration
  $: slideOutPct = ((opts.slideDuration + opts.fadeOutDuration) * 100) / fullDuration

  let style:string = ''
  $: style = !itemCount ? '' : `<${''}style>
    @keyframes skb-panzoom-${itemCount} {
      0% {
        transform: scale(var(--start-zoom));
        object-position: var(--start-x) var(--start-y);
        translate: var(--start-tx) var(--start-ty);
        z-index:10;
      }
      ${slideOutPct}% {
        transform: scale(var(--end-zoom));
        object-position: var(--end-x) var(--end-y);
        translate: var(--end-tx) var(--end-ty);
        z-index:0;
      }
      100% {
        transform: scale(var(--end-zoom));
        object-position: var(--end-x) var(--end-y);
        translate: var(--end-tx) var(--end-ty);
        z-index:0;
      }
    }

    @keyframes skb-fade-${itemCount} {
      0% {
        opacity: 0;
      }
      ${fadeInPct}% {
        opacity: 1;
      }
      ${fadeOutPct}% {
        opacity: 1;
      }
      ${slideOutPct}% {
        opacity: var(--end-opacity);
      }
      100% {
        opacity: var(--end-opacity);
      }
    }
  </${''}style>`

</script>

<svelte:head>
  {#if style}
    {@html style}
  {/if}
</svelte:head>

<div class="skb-slideshow override">

  <input type="checkbox" id="skb-pause" name="skb-pause" class="skb-pause" bind:checked={paused}>
  <label for="skb-pause" style="position:absolute; z-index:500;" />

  {#each (items || []) as slide, i}

    <div class="skb-slide"
      style="
        {slide?.start?.hasOwnProperty('zoom') ? `--start-zoom:${slide.start.zoom};` : ''}
        {slide?.start?.hasOwnProperty('x') ? `--start-x:${slide.start.x}%;` : ''}
        {slide?.start?.hasOwnProperty('y') ? `--start-y:${slide.start.y}%;` : ''}
        {slide?.start?.hasOwnProperty('tx') ? `--start-tx:${slide.start.tx}%;` : ''}
        {slide?.start?.hasOwnProperty('ty') ? `--start-ty:${slide.start.ty}%;` : ''}
        {slide?.end?.hasOwnProperty('zoom') ? `--end-zoom:${slide.end.zoom};` : ''}
        {slide?.end?.hasOwnProperty('x') ? `--end-x:${slide.end.x}%;` : ''}
        {slide?.end?.hasOwnProperty('y') ? `--end-y:${slide.end.y}%;` : ''}
        {slide?.end?.hasOwnProperty('tx') ? `--end-tx:${slide.end.tx}%;` : ''}
        {slide?.end?.hasOwnProperty('ty') ? `--end-ty:${slide.end.ty}%;` : ''}
        {i === itemCount - 1 ? `--end-opacity:${opts.endOpacity};` : '--end-opacity:0'}
      ">
      <img
        src="{typeof slide?.image === 'string' ? slide?.image : slide?.image?.src}"
        alt="{slide?.image?.alt ?? ''}"
        style="
          animation-name: skb-panzoom-{itemCount}, skb-fade-{itemCount};
          animation-duration: {fullDuration}s;
          animation-timing-function: linear;
          animation-delay: {i * opts.slideDuration}s;
          animation-iteration-count: {iterations};
          animation-fill-mode: both;
          animation-play-state: var(--skb-paused, running);
        "
      />
    </div>

  {/each}

  <slot></slot>

</div>

<style>

  div, img { position:absolute; margin:0; padding:0; height:100%; width:100%; }
  .skb-slideshow {
    overflow:hidden;
    position:relative;
    height:auto;
    aspect-ratio:2.2/1;
    --start-zoom:1;
    --start-x:50%;
    --start-y:50%;
    --start-tx:0;
    --start-ty:0;
    --end-zoom:1;
    --end-x:50%;
    --end-y:50%;
    --end-tx:0;
    --end-ty:0;
  }
  img { object-fit:cover; }
  input { z-index:50; position:absolute; }

  .skb-slideshow>label { position:absolute; z-index:100; width:100%; height:100%; top:0; left:0; padding:.5em; }
  input.skb-pause { display:none; }
  input.skb-pause:checked ~ div.skb-slide > img { --skb-paused:paused; }

  label:before {
    position:absolute;
    top:10px;
    left:10px;
    content:"";
    background-image:url("./pause.png");
    width:24px;
    height:24px;
    background-size:contain;
    background-repeat:no-repeat;
    opacity:.2;
  }
  input:checked + label:before {
    background-image:url("./play.png");
  }

  @media(prefers-reduced-motion) {
    img {
      translate: var(--end-tx) var(--end-ty) !important;
      object-position: var(--end-x) var(--end-y) !important;
      transform: scale(var(--end-zoom)) !important;
    }
    label {
      display: flex;
      gap: .8em;
    }
  }

</style>
