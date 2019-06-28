<template>
  <v-toolbar dark>
    <v-toolbar-side-icon to="/home">
      <v-btn icon>
        <v-icon>home</v-icon>
      </v-btn>
    </v-toolbar-side-icon>
    <v-toolbar-title class="white--text">Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon v-for="(item, index) in navItems" :key="index" :to="item.to">
      <v-icon>{{item.icon}}</v-icon>
    </v-btn>
    <v-menu offset-y transition="slide-y-transition">
      <template v-slot:activator="{on}">
        <v-btn icon v-on="on">
          <v-icon>more_vert</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-tile v-for="(item, index) in menuItems" :key="index" :to="item.to">
          <v-list-tile-title class="pointer">{{ item.title }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-if="isAuth">
          <v-list-tile-title class="pointer">
            <Logout/>
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
import Logout from "./Logout";
import { mapGetters } from "vuex";

export default {
  components: { Logout },
  props: {},
  data() {
    return {
      menuItems: [{ title: "Profile", to: "/profile" }],
      navItems: [
        { title: "Schedules", to: "/schedules", icon: "schedule" },
        { title: "Today", to: "/today", icon: "today" },
        { title: "Services", to: "/services", icon: "room_service" },
        { title: "Users", to: "/users", icon: "group" },
        { title: "Bills", to: "/bills", icon: "attach_money" }
      ]
    };
  },
  methods: {},
  computed: {
    ...mapGetters(["isAuth"])
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
