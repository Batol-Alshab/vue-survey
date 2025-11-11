import { createStore } from "vuex";
import axiosClient from "@/axios";

const tmpSurveys = [
  {
    id: 30,
    title: "My First Survey",
    slug: "my-first-survey",
    status: "draft",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNOUXBO27g82sqvcZu57eEDH_R7vxqh1XDUimEBM99toVAfBbyuStm_7Tr5VIZjPFKmOZyscQFHEdXb2S69eZIG3xIRvHVACZBNWEmE6Xi&s=10",
    description: "This is a test survey",
    expire_date: "2025-12-31T23:59:59",
    created_at: "2025-11-06T12:00:00",
    updated_at: "2025-11-06T12:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 2,
        type: "checbox",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 3,
        type: "checbox",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 4,
        type: "radio",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 5,
        type: "checbox",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 6,
        type: "text",
        questions: "from which country are you?",
        description: null,
        data: {},
      },

      {
        id: 7,
        type: "textarea",
        questions: "from which country are you?",
        description: null,
        data: {},
      },
    ],
  },

  {
    id: 40,
    title: "My First Survey",
    slug: "my-first-survey",
    status: "draft",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNOUXBO27g82sqvcZu57eEDH_R7vxqh1XDUimEBM99toVAfBbyuStm_7Tr5VIZjPFKmOZyscQFHEdXb2S69eZIG3xIRvHVACZBNWEmE6Xi&s=10",
    description: "This is a test survey",
    expire_date: "2025-12-31T23:59:59",
    created_at: "2025-11-06T12:00:00",
    updated_at: "2025-11-06T12:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 2,
        type: "checbox",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 3,
        type: "checbox",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 4,
        type: "radio",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 5,
        type: "checbox",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 6,
        type: "text",
        questions: "from which country are you?",
        description: null,
        data: {},
      },

      {
        id: 7,
        type: "textarea",
        questions: "from which country are you?",
        description: null,
        data: {},
      },
    ],
  },
  {
    id: 31,
    title: "My First Survey",
    slug: "my-first-survey",
    status: "draft",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNOUXBO27g82sqvcZu57eEDH_R7vxqh1XDUimEBM99toVAfBbyuStm_7Tr5VIZjPFKmOZyscQFHEdXb2S69eZIG3xIRvHVACZBNWEmE6Xi&s=10",
    description: "This is a test survey",
    expire_date: "2025-12-31T23:59:59",
    created_at: "2025-11-06T12:00:00",
    updated_at: "2025-11-06T12:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 2,
        type: "checbox",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 3,
        type: "checbox",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 4,
        type: "radio",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 5,
        type: "checbox",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 6,
        type: "text",
        questions: "from which country are you?",
        description: null,
        data: {},
      },

      {
        id: 7,
        type: "textarea",
        questions: "from which country are you?",
        description: null,
        data: {},
      },
    ],
  },

  {
    id: 41,
    title: "My First Survey",
    slug: "my-first-survey",
    status: "draft",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNOUXBO27g82sqvcZu57eEDH_R7vxqh1XDUimEBM99toVAfBbyuStm_7Tr5VIZjPFKmOZyscQFHEdXb2S69eZIG3xIRvHVACZBNWEmE6Xi&s=10",
    description: "",
    expire_date: "2025-12-31T23:59:59",
    created_at: "2025-11-06T12:00:00",
    updated_at: "2025-11-06T12:00:00",
    questions: [
      {
        id: 1,
        type: "select",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 2,
        type: "checbox",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 3,
        type: "checbox",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 4,
        type: "radio",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 5,
        type: "checbox",
        questions: "from which country are you?",
        description: null,
        data: {
          options: [
            { uuid: "550e8400-e29b-41d4-a716-446655440000", text: "USA" },
            { uuid: "550e8400-e29b-41d4-a716-446655440001", text: "Canada" },
            { uuid: "550e8400-e29b-41d4-a716-446655440002", text: "UK" },
            { uuid: "550e8400-e29b-41d4-a716-446655440003", text: "Australia" },
          ],
        },
      },

      {
        id: 6,
        type: "text",
        questions: "from which country are you?",
        description: null,
        data: {},
      },

      {
        id: 7,
        type: "textarea",
        questions: "from which country are you?",
        description: null,
        data: {},
      },
    ],
  },
];
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
    surveys: [...tmpSurveys],
    questionTypes: ["text", "select", "radio", "checkbox", "textarea"],
  },
  getters: {},
 
  actions: {
    getSurvey: ({ commit }, id) => {
      commit("setcurrentSurveyLoading", true);
      return (
        axiosClient.
        get(`/survey/${id}`)
          .then((res) => {
            commit("setcurrentSurvey", res.data);
            commit("setcurrentSurveyLoading", false);
            return res;
          })
          .catch((err) => {
            commit("setcurrentSurveyLoading", false);
            throw err;
          })
      );
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

    deleteSurvey({commit},id){
      return axiosClient.delete(`/survey/${id}`)

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
