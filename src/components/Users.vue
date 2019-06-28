<template>
    <div id="users">
        <v-btn @click.prevent="getUsers">Get Users</v-btn>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions(['getUsers']),
    }
}
</script>

<style>

</style>
