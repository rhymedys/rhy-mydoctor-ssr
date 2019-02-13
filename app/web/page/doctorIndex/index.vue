


<template>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
</template>


<script type="text/babel">
import store from "./store";
import router from "./router";

export default {
  name:'doctor-index',
  router,
  store,
  computed: {},
  mounted() {}
};
</script>