import type { Value } from "sveltecms/core/ContentStore";
import type { CMSPlugin } from "sveltecms/core/Plugin";

import Slideshow from "./Slideshow.svelte";
import FieldgroupSlideshow from "./FieldgroupSlideshow.svelte";
import PanZoomWidget from "./PanZoomWidget.svelte";

export type Slide = KenBurnsImageParams & {
  image: string|{
    src: string
    alt?: string
    [key:string]: Value
  }
}

export type PanZoom = {
  x?: number,
  y?: number,
  zoom?: number,
  tx?: number,
  ty?: number,
}

export type KenBurnsImageParams = {
  start?: PanZoom,
  end?: PanZoom,
}

export type SlideshowOptions = {
  slideDuration:number
  fadeDuration:number
  fadeOutDuration:number
  iterations:number|"infinite"
  endOpacity:number
}

export const kenBurnsPlugin:CMSPlugin = {
  id: 'svelte-ken-burns',
  components: [
    {
      id: 'skb:slideshow-fieldgroup',
      component: FieldgroupSlideshow,
    },
    {
      id: 'skb:slideshow',
      component: Slideshow,
    }
  ],
  fieldTypes: [
    {
      id: 'panZoom',
      default: { x:50, y:50, zoom:1 },
      widget: 'panZoom',
    }
  ],
  widgetTypes: [
    {
      id: 'panZoom',
      description: "A widget for entering pan and zoom coordinates on an image.",
      widget: PanZoomWidget,
      fieldTypes: ['panZoom'],
      formDataHandler: async (value) => {
        return { x: parseFloat(value['x'][0]), y: parseFloat(value['y'][0]), zoom: parseFloat(value['zoom'][0])}
      }
    }
  ],
  conf: {
    fieldgroups: {
      skb_slideshow: {
        id: "skb_slideshow",
        tags: [
          "fullwidth",
          "block"
        ],
        displays: 'skb:slideshow-fieldgroup',
        fields: {
          slides: {
            type: "slides",
            multiple: true
          },
          slideshowOptions: {
            type: 'fieldgroup',
            fields: {
              slideDuration: {
                type: "float",
                helptext: "The duration each slide should be shown, in seconds.",
                default: 6,
                displays: "none",
                widget: {
                  type: "range",
                  min: 1,
                  max: 20,
                  step: .1,
                  showScale: false,
                }
              },
              fadeDuration: {
                type: "float",
                helptext: "The duration of the fade effect when switching slides, in seconds.",
                default: .8,
                displays: "none",
                widget: {
                  type: "range",
                  min: .1,
                  max: 4,
                  step: .1,
                  showScale: false,
                }
              },
              iterations: {
                type: "number",
                label: "Limit Repetations",
                helptext: "The number of times the show will cycle. 0 for no limit (infinite).",
                default: 0,
                displays: "none",
                widget: {
                  type: "range",
                  min:0,
                  max:12,
                  showScale: false,
                }
              },
              endOpacity: {
                type: "float",
                helptext: "The opacity to maintain for the last slide. 1 = fully visble.",
                default: 1,
                displays: "none",
                hidden: "$not($values.iterations)",
                widget: {
                  type: "range",
                  min: 0,
                  max: 1,
                  step: .1,
                  showScale: false,
                }
              },
            }
          }
        },
      }
    },
    fields: {
      slides: {
        type: "fieldgroup",
        multiple: true,
        displays: {
          default: {
            type: 'skb:slideshow',
            multiple: true,
          }
        },
        fields: {
          image: {
            type: "image",
            required: true,
            index: false
          },
          start: 'panZoom',
          end: 'panZoom',
        }
      }
    }
  }
}

export {
  Slideshow,
  FieldgroupSlideshow,
}

export default Slideshow