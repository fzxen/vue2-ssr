<template>
  <div class="home-wrap">
    Home: {{ count }}
    <button @click="onDecrese">-1</button>
    <button @click="onIncrese">+1</button>
    <p></p>
    <button @click="onState">state</button>
    <p>
      <button @click="$router.push('/list')">go to list</button>
    </p>
  </div>
</template>

<script>
import homeStoreModule from "../store/modules/home";

export default {
  name: "Home",

  asyncData({ store }) {
    return new Promise(r => {
      setTimeout(r, 3000)
    });
  },

  metaInfo: {
    title: "Home页面",
    meta: [{ charset: "utf-8" }, { name: "description", content: "foo" }],
  },

  props: {},

  data() {
    return { count: 30 };
  },

  computed: {},

  created() {},

  mounted() {
    console.log("mounted");
    this.$store.registerModule("home", homeStoreModule);
  },

  destroyed() {
    this.$store.unregisterModule("foo");
  },

  methods: {
    onIncrese() {
      console.log("click");
      this.count++;
    },
    onDecrese() {
      console.log("click");
      this.count--;
    },
    onState() {
      this.$store.commit("setUser", {
        id: "001",
        name: "zxffan",
        age: 22,
        gender: "male",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.home-wrap {
  color: green;
  &:hover {
    color: red;
  }
}
</style>
