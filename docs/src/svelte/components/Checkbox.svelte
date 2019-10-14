<script>
  import svg from "../../svg/check.svg";

  export let label = '';
  export let highlight = false;
  export let hover = false;

  let isChecked = false;

  function onClick () {

  }

</script>

<span
  class="checkbox {isChecked ? 'is-checked' : ''} {highlight ? 'is-highlighted' : ''} {hover ? 'is-hovering' : ''}"
  role="checkbox"
  aria-checked={isChecked + ''}
  aria-label={label}
  tabindex="0"
  on:click|stopPropagation={onClick}
>
  {@html svg}
</span>

<style lang="less">
  @import '../../style/checkbox.less';

  .checkbox {
    @checkbox();
  }
</style>
