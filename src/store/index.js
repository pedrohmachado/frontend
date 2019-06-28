import Vuex from 'vuex';
import Vue from 'vue';
import auth from './modules/auth';
import users from './modules/users';
import services from './modules/services';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        users,
        services,
    }
})
