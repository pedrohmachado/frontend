<template>
  <div id="logout">
    <span @click="doLogout">Logout</span>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["doLogout"])
  },
};
</script>

<style>
</style>
