import Vuex from 'vuex'
// import filter from './filter'


const createStore = () => {
  return new Vuex.Store({
    strict: false,
    state: () => ({
      user: {}
    }),
    mutations: {
      getInfo(state,res){
        state.user = res
        console.log(state.user)
      }
    },
    actions: {
      async getInfo(context) {
        let response = await this.$axios.get('/User_info')
        context.commit('getInfo',response.data)
      }
    }
    // modules: {
    //   filter
    // }
  })
}

export default createStore
