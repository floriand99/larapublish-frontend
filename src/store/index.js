import Vue from "vue";
import Vuex from "vuex";
import { ArticleService } from "@/services/api.service";
import VuexPersistence from 'vuex-persist'

var alertTimeout;
Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    isAuthenticated: state.isAuthenticated,
    user: state.user,
  })
})

const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    user: {},
    navigation: {
      isOpen: false,
    },
    articles: {
      data: [],
      nextPage: "/articles?page=1",
      path: "",
      filter: "",
      loading: false,
    },
    alert: {
      message: "",
      color: "",
      link: {
        url: '',
        text: ''
      }
    },
  },
  getters: {
    loadingStatus(state) {
      return state.articles.loading;
    },
  },
  mutations: {
    login(state) {
      state.isAuthenticated = true;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    toggleNavbar(state) {
      state.navigation.isOpen = !state.navigation.isOpen;
    },
    setArticles(state, { articles, nextPage, path }) {
      state.articles.data = [...state.articles.data, ...articles];
      state.articles.nextPage = nextPage;
      state.articles.loading = false;
      state.articles.path = path;
    },
    setLoading(state, payload) {
      state.articles["loading"] = payload;
    },
    setAlert(state, payload) {
      state.alert['message'] = payload.message
      state.alert['color'] = payload.color
    },
    closeAlert(state){
      state.alert.message = ''
      state.alert.color = ''
      clearTimeout(alertTimeout)
    },
    setArticleFilter(state, payload) {
      (state.articles.nextPage = state.articles.path + "?page=1"),
        (state.articles.filter = payload);
    },
    clearArticleData(state) {
      state.articles = {
        ...state.articles,
        data: [],
        path: "",
        nextPage: "",
      };
    },
    logout(state){
      state.isAuthenticated = false
      state.user = {}
    }
  },
  actions: {
    login({ commit }) {
      commit("login");
    },
    logout({commit}){
      commit('logout')
    },
    setUser({ commit }, payload) {
      commit("setUser", payload);
    },
    toggleNavbar({ commit }) {
      commit("toggleNavbar");
    },
    /*
      reusuable action to fetch paginated articles
      or to load more articles based on the returned pagination data
    */
    async getArticles({ commit, state }, resource) {
      commit("setLoading", true);
      resource = resource || state.articles.nextPage;
      let page = resource[resource.length - 1];
      if (page == 1) {
        commit("clearArticleData");
      }
      let res = await ArticleService.getAll(
        resource + "&orderBy=" + state.articles.filter
      );
      commit("setArticles", {
        articles: res.data.data,
        nextPage: res.data.next_page_url,
        path: res.data.path,
      });
      commit("setLoading", false);
    },
    displayAlert({ commit, state }, payload) {
      commit("setAlert", payload);
      alertTimeout = setTimeout(() => {
        if (state.alert.message !== "") {
          commit("setAlert", {
            message: "",
            color: "",
          });
          console.log("alert");
        }
      }, 5000);
    },
    changeArticleFilter({ commit, dispatch }, payload) {
      commit("setArticleFilter", payload);
      dispatch("getArticles");
    },
  },
  plugins: [vuexLocal.plugin]
});

export default store;
