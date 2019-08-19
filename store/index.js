import Vuex from 'vuex'
// import filter from './filter'


const createStore = () => {
  return new Vuex.Store({
    strict: false,
    state: () => ({
      mydata: 0,
      name: 'zsp'
    }),
    mutations: {
      add(state) {
        return state.mydata++
      }
    },
    actions: {
      actionAdd(context) {
        return context.commit('add')
      }
    }
    // modules: {
    //   filter
    // }
  })
}

export default createStore
