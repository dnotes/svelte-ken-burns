<script lang="ts">
  import type { PanZoom } from ".";
  import type { WidgetField } from "sveltecms";

  export let field:WidgetField
  export let id:string

  export let value:PanZoom = Object.assign({ x:50,y:50,zoom:1 }, field.default)

  function setCoords(e:MouseEvent|PointerEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    value.x = Math.round(e.clientX - rect.x)
    value.y = Math.round(e.clientY - rect.y)
  }

</script>

<div class="field">
  <label>
    <span>{field.label}</span>
    <!-- svelte-ignore a11y-click-events-have-key-events -- this has an alternate entry mode -->
    <div>
      <div class="touchmap" on:click={setCoords}>
        <svg width="100" height="100">
          <rect width="100" height="100" />
          <line x1="50" y1="0" x2="50" y2="100" />
          <line x1="0" y1="50" x2="100" y2="50" />
          <ellipse cx="{value?.x}" cy="{value?.y}" rx="2" ry="2" />
        </svg>
      </div>
      <div>
        <label>
          <span>x</span>
          <input
            name="{id}[x]"
            type="number"
            min="0"
            max="100"
            bind:value={value.x}
            disabled={field.disabled}
            required={field.required}
          />
        </label>
        <label>
          <span>y</span>
          <input
            name="{id}[y]"
            type="number"
            min="0"
            max="100"
            bind:value={value.y}
            disabled={field.disabled}
            required={field.required}
          />
        </label>
        <label>
          <span>zoom</span>
          <input
            name="{id}[zoom]"
            type="number"
            min=".5"
            max="10"
            step="0.05"
            bind:value={value.zoom}
            disabled={field.disabled}
            required={field.required}
          />
        </label>
      </div>
    </div>
  </label>
</div>

<style>
  ellipse {
    stroke: var(--cms-main);
    stroke-width:4;
    fill: var(--cms-main);
  }
  line {
    stroke:currentColor;
    stroke-width:2;
    stroke-linecap:square;
    stroke-linejoin:miter;
    fill:none;
    opacity:0.4;
  }
  rect {
    fill: none;
    stroke: currentColor;
    stroke-width:2;
    stroke-linejoin:miter;
    opacity:0.7
  }
  div.field>label>div { display:flex; gap: 1em; }
  label label { display:flex; gap:.5em; }
  label label>span { width:3em; }
  input { width:5em; }
</style>
