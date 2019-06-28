<template>
  <div id="signUp">
    <div class="container">
      <v-form @submit="onSubmit">
        <v-text-field v-model="username" label="Username"></v-text-field>
        <v-text-field v-model="email" label="E-mail"></v-text-field>
        <v-text-field v-model="firstName" label="First name"></v-text-field>
        <v-text-field v-model="lastName" label="Last name"></v-text-field>
        <v-text-field v-model="phoneNumber" label="Phone number"></v-text-field>
        <v-text-field v-model="password1" type="password" label="Password"></v-text-field>
        <v-text-field v-model="password2" type="password" label="Password"></v-text-field>
        <v-btn type="submit">Submit</v-btn>
        <v-btn @click="goBack">Cancel</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import router from "../router";
import { mapActions } from "vuex";

export default {
  data: () => {
    return {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password1: "",
      password2: "",
      phoneNumber: "",
      show: false,
    };
  },
  methods: {
    ...mapActions(["doSignUp"]),
    onSubmit(e) {
      e.preventDefault();
      if (this.password1 === this.password2) {
        const user = {
          username: this.username,
          email: this.email,
          password: this.password1,
          first_name: this.firstName,
          last_name: this.lastName,
          profile: {
            phone_number: this.phoneNumber
          },
        };
        this.doSignUp(user);
      } else {
        this.show = true;
      }
    },
    goBack() {
      router.go(-1);
    }
  }
};
</script>

<style>
</style>
