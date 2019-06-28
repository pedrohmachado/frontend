import axios from 'axios';
import store from '../index';

const state = {
    users: [],
    isLoading: false,
    error: null,
}

const getters = {

}

const mutations = {
    startGetUsers: state => state.isLoading = true,
    getUsersSuccessful: (state, users) => {
        state.users = users,
            state.isLoading = false,
            state.error = null
    },
    getUsersError: (state, error) => {
        state.isLoading = false,
            state.error = error
    },
    updateUsers: (state, users) => {
        state.users = users
    }
}

const actions = {
    async getUsers({ commit, dispatch }) {
        commit('startGetUsers')
        dispatch('fetchAuth')
        await axios.get('http://127.0.0.1:8000/api/users/', {
            headers: {
                "Content-type": "application/json",
                "Authorization": "JWT " + store.state.auth.token
            }
        })
            .then(response => {
                const users = response.data
                commit('getUsersSuccessful', users)
            }).catch(e => {
                commit('getUsersError', e.message)
            })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
