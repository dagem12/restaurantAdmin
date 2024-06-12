export default {
    namespaced: true,
    state: {
      error: [], // Array state to hold your items
    
    },
    mutations: {
      // Mutation to add an item to the array
      addError(state, error) {
        state.error.push(error)
      },
      removeError(state) {
         state.error.shift()
      },
    },
    actions: {
      // Action to trigger the mutation and add an item
      addError({ commit }, error) {
        commit('addError', error);
      },
      removeError({ commit }) {
        commit('removeError');
      },
    },
  }
  