import axios from 'axios';
import router from '../../router'

const state = {
    user: {},
    token: null,
    isLoading: false,
    error: null
}
const getters = {
    isAuth: state => {
        return state.token ? true : false
    }
}
const mutations = {
    startLogin: state => state.isLoading = true,
    loginSuccessful: (state, { token, user }) => {
        state.user = user,
            state.token = token,
            state.isLoading = false,
            state.error = null
    },
    loginError: (state, error) => {
        state.user = {},
            state.token = null,
            state.isLoading = false,
            state.error = error
    },
    updateAuth: (state, { user, token }) => {
        state.user = user
        state.token = token
    },
    logout: state => {
        state.user = {},
            state.token = null
    },
    startSignUp: state => state.isLoading = true,
    signUpSuccessful: state => {
        state.isLoading = false,
            state.error = null
    },
    signUpError: (state, error) => {
        state.isLoading = false,
            state.error = error
    }
}
const actions = {
    async doLogin({ commit }, credentials) {
        commit('startLogin');
        axios.post('http://127.0.0.1:8000/api/auth/obtain-token/', credentials)
            .then(response => {
                const token = response.data.token
                const user = {
                    id: response.data.user_id,
                    username: response.data.username
                }
                commit('loginSuccessful', { user, token });
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('token', token)
                router.push({ path: '/home' })
            }).catch(e => {
                commit('loginError', e.message);
            })
    },
    async doLogout({ commit }) {
        commit('logout')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        router.push({ path: '/auth' })
    },
    async fetchAuth({ commit }) {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))
        commit('updateAuth', { user, token })
    },
    async doSignUp({ commit, dispatch }, user) {
        commit('startSignUp')
        axios.post('http://127.0.0.1:8000/api/users/', user)
            .then(() => {
                commit('signUpSuccessfull')
                const credentials = {
                    username: user.username,
                    password: user.password
                }
                dispatch('doLogin', credentials)
            }).catch(e => {
                commit('signUpError', e.message)
            })
    }
}

export default {
    //namespaced: true,
    state,
    getters,
    mutations,
    actions
}