import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  org: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    console.log(state)
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ORG: (state, org) => {
    console.log(state)
    state.org = org
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, passwd } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), passwd: passwd }).then(response => {
        const { data } = response
        console.log('设置token')
        commit('SET_TOKEN', data)
        console.log(state.token)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        commit('SET_ORG', data)
        // const { name, avatar } = data
        //
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      console.log(state.token)
      commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

