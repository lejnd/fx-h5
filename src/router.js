import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import(/* webpackChunkName: "Home" */ './views/home.vue'),
        },
        {
            path: '/h5',
            name: 'h5',
            component: () => import(/* webpackChunkName: "h5" */ './views/h5/Index.vue'),
            children: [{
                path: '/h5/staff_manage',
                name: 'StaffManage',
                component: () => import(/* webpackChunkName: "StaffManage" */ './views/h5/StaffManage.vue')
            }, {
                path: '/h5/staff_register',
                name: 'StaffRegister',
                component: () => import(/* webpackChunkName: "StaffRegister" */ './views/h5/StaffRegister.vue')
            }, {
                path: '/h5/dobind/:id',
                name: 'DoBind',
                component: () => import(/* webpackChunkName: "DoBind" */ './views/h5/DoBind.vue')
            }]
        },
        {
            path: '/pc',
            name: 'pc',
            component: () => import(/* webpackChunkName: "pc" */ './views/pc/Index.vue'),
            children: [{
                path: '/pc/nav_home',
                name: 'NavHome',
                component: () => import(/* webpackChunkName: "NavHome" */ './views/pc/NavHome.vue')
            }, {
                path: '/pc/company_register',
                name: 'CompanyRegister',
                component: () => import(/* webpackChunkName: "CompanyRegister" */ './views/pc/CompanyRegister.vue')
            }, {
                path: '/pc/simple_register',
                name: 'SimpleRegister',
                component: () => import(/* webpackChunkName: "SimpleRegister" */ './views/pc/SimpleRegister.vue')
            }]
        },
    ]
})
