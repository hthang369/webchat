<template>
  <div class="page-loader">
    <div class="loader">
      <hollow-dots-spinner
        :animation-duration="800"
        :size="264"
        :color="color"
      />
    </div>
  </div>
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners'
import CONSTANT from '@/constant'

export default {
  components: {
    HollowDotsSpinner
  },
  props: {
    theme: {
      default: 'default-theme'
    }
  },
  computed: {
    color () {
      return CONSTANT.THEME[this.theme]
    }
  }
}
</script>

<style scoped>
  .page-loader{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #28353a ;
    z-index: 9999;
    top: 0;
    left: 0;
    opacity: 0.5;
  }
  .loader{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
