<template>
  <div id="auth">
    <div class="container">
      <v-form @submit.prevent="onSubmit">
        <v-text-field v-model="username" label="Username"></v-text-field>
        <v-text-field v-model="password" label="Password" type="password"></v-text-field>
        <v-btn type="submit">Submit</v-btn>
        <v-btn to="/sign-up">Sign Up</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["doLogin"]),
    onSubmit() {
      const credentials = {
        username: this.username,
        password: this.password
      };
      this.doLogin(credentials);
    }
  }
};
</script>

<style>
</style>
