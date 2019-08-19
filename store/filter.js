const state = ({
  name: 'zsp',
  list: [1, 2, 3, 4, 5]
})

const getters = {
  include: (state) => (val) => {
    return state.list.indexOf(val) > -1
  }
}

const mutations = {
  SET_VALUE(state, value) {
    state.value = value
  }
}

const actions = {
  async getInfo ({ commit},val) {
    commit('SET_VALUE', val)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
