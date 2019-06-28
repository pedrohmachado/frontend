import VueRouter from "vue-router";
import Vue from 'vue';

import Auth from './components/Auth'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import Schedules from './components/Schedules'
import Services from './components/Services'
import Users from './components/Users'
import Bills from './components/Bills'

import store from './store/index'

Vue.use(VueRouter)

const routes = [
    { path: '/auth', component: Auth, name: 'auth', },
    { path: '/home', component: Home, name: 'home', },
    { path: '/sign-up', component: SignUp, name: 'signUp' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/schedules', component: Schedules, name: 'schedules' },
    { path: '/services', component: Services, name: 'services' },
    { path: '/users', component: Users, name: 'users' },
    { path: '/bills', component: Bills, name: 'bills' },
    { path: '*', redirect: '/auth', }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    // atualiza state de autenticação
    store.dispatch('fetchAuth')

    // caso path acessado seja de sign up
    if (to.fullPath === '/sign-up') {
        // e caso usuário não tenha sido autenticado
        if (!store.getters.isAuth) {
            next()
            return
        }
    }

    // caso path acessado seja de autenticação
    if (to.fullPath === '/auth') {
        // e caso usuário já tenha sido autenticado
        if (store.getters.isAuth) {
            // redireciona para a tela home
            next({ path: '/home' })
            return
        }
    }

    // caso path acessado não seja de autenticação
    if (to.fullPath !== '/auth') {
        // e caso usuário não tenha sido autenticado
        if (!store.getters.isAuth) {
            // redireciona para a tela de autenticação
            next({ path: '/auth' })
            return
        }
    }
    next()
})

export default router;