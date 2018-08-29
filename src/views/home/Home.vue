<template>
  <div class="home">
    <Preview :id="templateId"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Preview from '@/components/Preview.vue'

export default {
  name: 'home',
  components: {
    Preview
  },
  data: function () {
        return {
            templateId: '1'
        }
    },
}
</script>
