<script>
  import { createEventDispatcher } from 'svelte';
  import Checkbox from './Checkbox.svelte';
  import svg from "../../svg/magnify.svg";

  const dispatch = createEventDispatcher();

  export let image = {};
  export let selectMode;

  let isSelected = false;
  let isHovering = false;

  function onClick() {
    if(selectMode) {
      isSelected = !isSelected;
    } else {
      dispatch('view', image);
    }
  }

  function onMouseEnter() {
    isHovering = true;
  }

  function onMouseLeave() {
    isHovering = false;
  }

  function onMagnifyClick() {

  }
</script>

<div
  class="image-overlay {isSelected ? 'is-selected' : ''} {selectMode ? 'select-mode' : ''}"
  on:click={onClick}
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
>
    <Checkbox
      class="image-checkbox"
    />

  <!-- <Checkbox
    v-model="isSelected"
    class="image-checkbox"
    :highlight="selectMode"
    :hover="isHovering"
    :label="image.title"
  /> -->
  <!-- <div class="image-text">{{image.title}}</div> -->
  <button type="button" on:click|stopPropagation={onMagnifyClick} class="image-magnify">
    {@html svg}
  </button>
</div>

<style lang="less">
  @import 'docs/src/style/image-overlay.less';
  .image-overlay {
    @image-overlay();
  }

  .image-text {
    @image-text();
  }

  .image-checkbox {
    @image-checkbox();
  }

  .image-magnify {
    @image-magnify();
  }

  .select-mode {
    @select-mode();
  }
</style>
