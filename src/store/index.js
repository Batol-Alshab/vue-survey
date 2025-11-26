import { createStore } from "vuex";
import axiosClient from "@/axios";
import Dashboard from "@/views/Dashboard.vue";

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
    dashboard: {
      loading: false,
      data: {},
    },
    surveys: {
      loading: false,
      links: [],
      data: {},
    },
    surveyAnswer: {
      loading: false,
      data: {},
    },
    surveyAnswerId: {
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
    getDashboardData: ({ commit }) => {
      commit("dashboardLoading", true);
      return axiosClient
        .get("/dashboard")
        .then((res) => {
          commit("dashboardLoading", false);
          commit("setDashboardData", res.data);
          return res;
        })
        .catch((err) => {
          commit("dashboardLoading", false);
          return err;
        });
    },
    getSurvey: ({ commit }, id) => {
      commit("setCurrentSurveyLoading", true);
      return axiosClient
        .get(`/survey/${id}`)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },

    saveSurvey({ commit }, survey) {
      delete survey.image_url;
      if (survey.id) {
        return axiosClient.put(`survey/${survey.id}`, survey).then((res) => {
          commit("setCurrentSurvey", res.data);
          return res;
        });
      } else {
        return axiosClient.post("/survey", survey).then((res) => {
          commit("setCurrentSurvey", res.data);
          return res;
        });
      }
    },

    deleteSurvey({ commit }, id) {
      return axiosClient.delete(`/survey/${id}`);
    },

    getSurveys({ commit }, { url = null } = {}) {
      url = url || "/survey";
      commit("setSurveysLoading", true);
      return axiosClient.get(url).then((res) => {
        commit("setSurveysLoading", false);
        commit("setSurveys", res.data);
        return res;
      });
    },

    getSurveyAnswer: ({ commit }, id) => {
      commit("setSurveyAnswerLoading", true);
      return axiosClient
        .get(`answer/${id}`)
        .then((res) => {
          commit("setSurveyAnswer", res.data);
          commit("setSurveyAnswerLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setSurveyAnswerLoading", false);
          throw err;
        });
    },
    getSurveyAnswerId: ({ commit }, id) => {
      commit("setSurveyAnswerIdLoading", true);
      return axiosClient
        .get(`answers/${id}`)
        .then((res) => {
          commit("setSurveyAnswerId", res.data);
          commit("setSurveyAnswerIdLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setSurveyAnswerIdLoading", false);
          throw err;
        });
    },
    getFirstSurveyAnswer: ({ commit }, id) => {
      commit("setSurveyAnswerLoading", true);
      return axiosClient
        .get(`First-answers/${id}`)
        .then((res) => {
          commit("setSurveyAnswer", res.data);
          commit("setSurveyAnswerLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setSurveyAnswerLoading", false);
          throw err;
        });
    },

    getSurveyBySlug({ commit }, slug) {
      commit("setCurrentSurveyLoading", true);
      return axiosClient
        .get(`/survey-by-slug/${slug}`)
        .then((res) => {
          commit("setCurrentSurvey", res.data);
          commit("setCurrentSurveyLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentSurveyLoading", false);
          throw err;
        });
    },

    saveSurveyAnswer({ commit }, { surveyId, answers }) {
      // return axiosClient.post(`/survey/${surveyId}/answer`, { answers });
      const { user_name, ...restAnswers } = answers;

      return axiosClient.post(`/survey/${surveyId}/answer`, {
        user_name, // ← الآن موجود مباشرة
        answers: restAnswers, // ← باقي الإجابات بدون user_name
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
    dashboardLoading: (state, loading) => {
      state.dashboard.loading = loading;
    },
    setDashboardData: (state, data) => {
      state.dashboard.data = data;
    },
    setCurrentSurveyLoading: (state, loading) => {
      state.currentSurvey.loading = loading;
    },
    setCurrentSurvey: (state, survey) => {
      state.currentSurvey.data = survey.data;
    },

    setSurveysLoading: (state, loading) => {
      state.surveys.loading = loading;
    },
    setSurveys: (state, surveys) => {
      state.surveys.data = surveys.data;
      state.surveys.links = surveys.meta.links;
    },
    setSurveyAnswerLoading: (state, loading) => {
      state.surveyAnswer.loading = loading;
    },
    setSurveyAnswer: (state, surveyAnswer) => {
      state.surveyAnswer.data = surveyAnswer;
    },

    setSurveyAnswerIdLoading: (state, loading) => {
      state.surveyAnswerId.loading = loading;
    },
    setSurveyAnswerId: (state, data) => {
      state.surveyAnswerId.data = data;
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
      state.notificaion.show = true;
      state.notificaion.type = type;
      state.notificaion.message = message;
      setTimeout(() => {
        state.notificaion.show = false;
      }, 3000);
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
