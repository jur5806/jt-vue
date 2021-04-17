<template>
    <div>
        职位列表
    </div>
</template>

<script>
import * as getData from '../../service/getData.js'
export default {
  components: {},
  props: {},
  data () {
    return {}
  },
  created () {},
  mounted () {
    getData.recruitList().then(res => {
      if (res.data.code === 200) {
        console.log(res.data.data)
      }
    })
  },
  methods: {},
  computed: {},
  watch: {}
}
</script>
<style scoped lang='sass'>
</style>
