## About Svelte Ken Burns

This is a CSS-only slideshow for Svelte and SvelteCMS, with configurable per-image pan and zoom
settings to create the motion effects popularly associated with American film maker Ken Burns.

* works with Javascript disabled
* respects `prefers-reduced-motion` settings
* click to play / pause
* works for any number of images
* supports server-side rendering

## Usage as Svelte Component

```svelte
<script>
import Slideshow from 'svelte-ken-burns'
</script>

<Slideshow {slides} {options} />
```

The types for slides and options should be avalable when coding, but here they are:

```ts
export type PanZoom = {
  x?: number, // the horizontal direction for the focal point, in percentage of width, as a number
  y?: number, // the vertical direction for the focal point, in percentage of height, as a number
  zoom?: number, // the scale applied to the image, as a number, e.g. 1.25 (numbers below 1 will result in borked display)
  tx?: number, // set automatically in the component
  ty?: number, // set automatically in the component
}

export type Slide = KenBurnsImageParams & {
  image: string|{
    src: string
    alt?: string
    [key:string]: Value // Value from SvelteCMS
  }
  start?: PanZoom,
  end?: PanZoom,
}

export type SlideshowOptions = {
  slideDuration:number // how long each slide is visible
  fadeDuration:number // how long the fade-in is when slides transition
  fadeOutDuration:number // set automatically by the component as fadeDuration * 2
  iterations:number|"infinite" // how many times the slideshow cycles
  endOpacity:number // the opacity for the last slide after the slideshow is done cycling
}
```

## Usage with SvelteCMS

```ts
///file src/lib/cms.ts
import CMS from 'sveltecms'
import conf from './sveltecms.config.json'
import {kenBurnsPlugin} from 'svelte-ken-burns'
import defaultContent from 'sveltecms/plugins/defaultContent'

const cms = new CMS(conf, [
  defaultContent, // optional but recommended
  kenBurnsPlugin,
  // etc.
])
```

The SvelteCMS plugin provides the following entities and configurations:

* FieldTypes
  * panZoom
* WidgetTypes
  * panZoom
* Fields
  * slides (type: fieldgroup)
* Fieldgroups
  * skb_slideshow
* Components
  * skb:slideshow
  * skb:slideshow-fieldset

To use the plugin, add a Field of type "slides" to any content type,
or add a "skb_slideshow" fieldgroup block to any "blocks" field.