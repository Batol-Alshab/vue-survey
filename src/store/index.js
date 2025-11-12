import { createStore } from "vuex";
import axiosClient from "@/axios";

const store = createStore({
  state: {
    user: {
      data: {},
      token: sessionStorage.getItem("TOKEN"),
    },
    currentSurvey: {
      loading: false,
      data: {},
    },
    surveys: {
      loading: false,
      data: {},
    },
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
    notificaion: {
      show: false,
      type: null,
      message: null,
    },
  },
  getters: {},

  actions: {
    getSurvey: ({ commit }, id) => {
      commit("setcurrentSurveyLoading", true);
      return axiosClient
        .get(`/survey/${id}`)
        .then((res) => {
          commit("setcurrentSurvey", res.data);
          commit("setcurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setcurrentSurveyLoading", false);
          throw err;
        });
    },

    saveSurvey({ commit }, survey) {
      delete survey.image_url;
      if (survey.id) {
        return axiosClient.put(`survey/${survey.id}`, survey).then((res) => {
          commit("setcurrentSurvey", res.data);
          return res;
        });
      } else {
        return axiosClient.post("/survey", survey).then((res) => {
          commit("setcurrentSurvey", res.data);
          return res;
        });
      }
    },

    deleteSurvey({ commit }, id) {
      return axiosClient.delete(`/survey/${id}`);
    },

    getSurveys({ commit }) {
      commit("setSurveysLoading", true);
      return axiosClient.get("/survey").then((res) => {
        commit("setSurveysLoading", false);
        commit("setSurveys", res.data);
        return res;
      });
    },
    register({ commit }, user) {
      return axiosClient.post("/register", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },

    login({ commit }, user) {
      return axiosClient.post("/login", user).then(({ data }) => {
        commit("setUser", data);
        return data;
      });
    },

    logout({ commit }) {
      return axiosClient.post("/logout").then((response) => {
        commit("logout");
        return response;
      });
    },
  },
  mutations: {
    setcurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },
    setcurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data;
    },

    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    setSurveys: (state, surveys) => {
      state.surveys.data = surveys.data;
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    },
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
    },

    notify: (state, { type, message }) => {
      state.notificaion.show= true;
      state.notificaion.type = type;
      state.notificaion.message = message;
      setTimeout(()=>{
        state.notificaion.show=false
      },3000)
    },
  },
  modules: {},
});
export default store;
// عند استخدام
// fetch
//  بدلا من
//  axios
//  register({ commit }, user) {
//       return fetch("http://127.0.0.1:8000/api/register", {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         method: "POST",
//         body: JSON.stringify(user),
//       })
//         .then((res) => res.json())
//         .then((res) => {
//           commit("setUser", res);
//           return res;
//         });
//     },
