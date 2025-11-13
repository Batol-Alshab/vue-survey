<template>
  <PageComponent title="dashboard"> content here </PageComponent>
  <div v-if="loading" class="flex items-center">loading...</div>
  <div
    v-else
    class="m-3 bg-gray-900 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in-down"
  >
    <div
      class="bg-gray-300 flex flex-col order-1 lg:order-2 p-3 shadow-md text-center animate-fade-in-down"
      style="animation-delay: 0.1s"
    >
      <h3 class="text-black text-2xl font-semibold">total Surveys</h3>
      <div
        class="text-black text-8xl font-semibold flex-1 flex items-center justify-center"
      >
        {{ data.totalSurveys }}
      </div>
    </div>
    <div
      class="bg-gray-300 flex flex-col order-2 lg:order-4 p-3 shadow-md text-center animate-fade-in-down"
      style="animation-delay: 0.2s"
    >
      <h3 class="text-black text-2xl font-semibold">total Answers</h3>
      <div
        class="text-black text-8xl font-semibold flex-1 flex items-center justify-center"
      >
        {{ data.totalAnswers }}
      </div>
    </div>
    <div
      class="bg-gray-300 text-black flex flex-col order-3 lg:order-1 row-span-2 p-3 shadow-md text-center animate-fade-in-down"
    >
      <h3 class="text-black text-2xl font-semibold">Latest Survey</h3>

      <img
        :src="data.latestSurvey.image_url"
        alt="image"
        class="w-[240 px] mx-auto"
      />
      <h3 class="font-bold text-xl mb-3">{{ data.latestSurvey.title }}</h3>
      <div class="flex justify-between text-sm mb-1">
        <div>update Date:</div>
        <div>{{ data.latestSurvey.created_at }}</div>
      </div>
      <div class="flex justify-between text-sm mb-4">
        <div>Answers:</div>
        <div>{{ data.totalAnswers }}</div>
      </div>
      <div class="flex justify-between">
        <router-link
          :to="{ name: 'SurveyView', params: { id: data.latestSurvey.id } }"
          class="text-indigo-500 p-1 flex justify-center items-center border border-transparent rounded-sm hover:bg-indigo-700 hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>

          Edit Survey
        </router-link>

        <!-- view button for answers -->
        <button
          class="text-indigo-500 p-1 flex justify-center items-center border border-transparent rounded-sm hover:bg-indigo-700 hover:text-white focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>

          View Answers
        </button>
      </div>
    </div>
    <div
      class="bg-gray-300 text-black  flex flex-col order-4 lg:order-3 row-span-2 p-3 shadow-md text-center animate-fade-in-down"
      style="animation-delay: 0.3s"
    >
      <div class="flex justify-between text-sm mb-3">
        <h3 class="text-black text-2xl font-semibold">Latest Answers</h3>
        <a
          href="javacript:void(0)"
          class="text-sm text-blue-800 hover:decoration-blue-500"
          >View all</a
        >
      </div>
      <a
        href="#"
        v-for="answer in data.latestAnswers"
        :key="answer.id"
        class="block hover:bg-gray-400 text-left"
      >
        <div class="font-semibold">{{ answer.survey.title }}</div>
        <small>
          Answer Made at:
          <i class="font-semibold"> {{ answer.end_date }}</i>
        </small>
      </a>
    </div>
  </div>
</template>
<script setup>
import PageComponent from "../components/PageComponent.vue";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const loading = computed(() => store.state.dashboard.loading);
const data = computed(() => store.state.dashboard.data);

store.dispatch("getDashboardData");
</script>
