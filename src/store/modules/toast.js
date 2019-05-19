import * as types from '../mutation-types';

const state = {
  toast: {
    message: '',
    title: '',
    show: false
  }
}

const getters = {
  toast: state => state.toast
}

const actions = {
  showToast({ commit }, toast) {
    commit('TOAST_MESSAGE', toast);

    setTimeout(() => {
      commit('TOAST_DISMISS');
    }, 4000);
  },
  dismissToast({ commit }) {
    commit('TOAST_DISMISS');
  }
}

const mutations = {
  [types.TOAST_MESSAGE](state, toast) {
    state.toast = { ...toast, show: true };
  },
  [types.TOAST_DISMISS](state) {
    state.toast = {
      message: '',
      title: '',
      show: false
    };
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
