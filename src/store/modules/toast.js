import { TOAST_MESSAGE, TOAST_DISMISS } from '../mutation-types';

const state = {
  toasts: []
};

const getters = {
  toasts: state => state.toasts
};

const actions = {
  showToast({ commit }, toast) {
    const timestamp = new Date().getTime();
    commit(TOAST_MESSAGE, { ...toast, timestamp });

    setTimeout(() => {
      commit(TOAST_DISMISS, timestamp);
    }, 4000);
  },
  dismissToast({ commit }, timestamp) {
    commit(TOAST_DISMISS, timestamp);
  }
};

const mutations = {
  [TOAST_MESSAGE](state, toast) {
    state.toasts.push({ ...toast, show: true });
  },
  [TOAST_DISMISS](state, timestamp) {
    state.toasts.map(toast => {
      if (toast.timestamp === timestamp) {
        toast.show = false;
      }

      return toast;
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
