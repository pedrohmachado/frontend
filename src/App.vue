<template>
  <v-app>
    <Navigation :isAuth="isAuth" />
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Navigation from "./components/Navigation";

export default {
  name: "App",
  components: {
    Navigation
  },
  computed: {
    ...mapGetters(["isAuth"])
  }
};
</script>
