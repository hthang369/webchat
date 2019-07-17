<template>
  <div>
    <footer id="footer">
      <div class="footer">
        © {{ year }} Lampart Co. Ltd
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
