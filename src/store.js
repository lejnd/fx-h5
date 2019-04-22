import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const vm = Vue.prototype;

const state = {
    openid: '',
    companyId: '',
}

const getters = {
    openid: (state) => state.openid,
    companyId: (state) => state.companyId
}

const actions = {
    getOpenid: ({ commit }, code) => {
        return vm.$fly.post('/api/company/getOpenid',{ code })
        .then((res) => {
            let { errmsg, errcode, data } = res;
            if (errcode == 0) {
                commit('getOpenid', data.openid)
                return Promise.resolve(data.openid);
            } else {
                return Promise.reject(errmsg)
            }
        })
        
    },
    setCompanyId: ({ commit }, companyId) => {
        commit('setCompanyId', companyId)
    }
}

const mutations = {
    getOpenid(state, openid) {
        state.openid = openid
    },
    setCompanyId(state, companyId) {
        state.companyId = companyId
    },
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
