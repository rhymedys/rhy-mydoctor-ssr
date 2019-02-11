


<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>


<script type="text/babel">
import Vue from "vue";
import store from "./store";
import router from "./router";

export default {
  router,
  store,
  computed: {},

  mounted() {}
};
</script>