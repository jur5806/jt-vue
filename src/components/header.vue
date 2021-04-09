<template>
  <div class="nav-header flex-box">
    <h3 class="title">
      <i class="line"></i><template v-if="getTitle!='合同变更录入'">{{getTitle}}</template><template else><slot name="title"></slot></template>
    </h3>

    <slot name="rightBtn"></slot>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {
    },
    mounted() {

    },
    props: [],
    computed: {
      getTitle() {
        // v-for="item in $route.matched" :key="item.path"
        let arr = this.$route.matched;
        let str = arr[arr.length-1].name;
        str = str.replace(/ · /g, '');
        return str;
      },
    },
    methods: {
      close() {
        this.$emit('closeDialog')
      },
      submit() {

      },
      onFileChange(obj) {
      }
    },
    components: {},
    watch: {
    }
  }
</script>
<style scoped lang="scss">
  @import '../assets/css/mixin';

  .nav-header {
    justify-content: space-between;
    padding: 10px 20px;
    background: $fc;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    .line {
      display: inline-block;
      height: 18px;
      width: 4px;
      background: $main;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
</style>
