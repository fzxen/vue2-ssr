<template>
  <div class="loading-wrap">
    <transition name="fade">
      <div v-show="isShow" class="loading">
        <div>Loading...</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "",

  props: {
    isShow: {
      type: Boolean,
    },
  },

  data() {
    return {};
  },

  created() {},

  mounted() {},

  methods: {},
};
</script>

<style lang="scss">
.loading {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 1);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
