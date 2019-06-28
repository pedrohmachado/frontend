import axios from 'axios';
import store from '../index';

const state = {
    services: [],
    isLoading: false,
    error: null,
}

const getters = {
    allServices: state => {
        return state.services
    }
}

const mutations = {
    startGetServices: state => state.isLoading = true,
    getServicesSuccessful: (state, services) => {
        state.services = services,
            state.isLoading = false,
            state.error = null
    },
    getServicesError: (state, error) => {
        state.isLoading = false,
            state.error = error
    },
    updateServices: (state, service) => {
        const index = state.services.findIndex(s => s.id == service.id)
        state.services.splice(index, 1, service)  
    },
    addService: (state, service) => {
        state.services.push(service)
    },
    deleteService: (state, service) => {
        state.services.splice(service)
    },
}

const actions = {
    async getServices({ commit, dispatch }) {
        commit('startGetServices')
        dispatch('fetchAuth')
        await axios.get('http://127.0.0.1:8000/api/services/', {
            headers: {
                "Content-type": "application/json",
                "Authorization": "JWT " + store.state.auth.token
            }
        })
            .then(response => {
                const services = response.data
                commit('getServicesSuccessful', services)
            }).catch(e => {
                commit('getServicesError', e.message)
            })
    },
    async addService({ commit, dispatch }, service) {
        dispatch('fetchAuth')
        await axios.post('http://127.0.0.1:8000/api/services/', service, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "JWT " + store.state.auth.token
            }
        })
            .then(response => {
                const service = response.data
                commit('addService', service)

            }).catch(e => {
                console.log(e.message)
            })
    },
    async updateService({ commit, dispatch }, service) {
        dispatch('fetchAuth')
        await axios.put(`http://127.0.0.1:8000/api/services/${service.id}/`, service, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "JWT " + store.state.auth.token,   
            }
        }).then(response => {
            service = response.data
            commit('updateServices', service)
            console.log(service)
        }).catch(e => {
            console.log(e)
        })
    },
    async deleteService({ commit, dispatch }, service) {
        dispatch('fetchAuth')
        console.log(service.id)
        await axios.delete(`http://127.0.0.1:8000/api/services/${service.id}/`, {
            headers: {
                "Content-type": "application/json",
                "Authorization": "JWT " + store.state.auth.token
            }
        }).then(response => {
            console.log(response)
        }).catch(e => {
            console.log(e)
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}
