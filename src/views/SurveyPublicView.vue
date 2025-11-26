<template>
  <div class="py-5 px-8">
    <div v-if="loading" class="h-96 flex items-center justify-center">
      <svg
        class="mr-3 h-16 w-16 text-amber-200 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
    </div>

    <form @submit.prevent="submitSurvey" v-else class="container mx-auto">
      <div class="grid grid-cols-6 items-center">
        <div v-show="survey.image_url" class="mr-4">
          <img :src="survey.image_url" alt="" />
        </div>
        <div class="col-span-5">
          <h1 class="text-3xl text-yellow-500 mb-1">{{ survey.title }}</h1>
          <p class="text-sm text-gray-700" v-html="survey.description"></p>
        </div>

        <div
          class="mt-3 col-span-9 border border-amber-200 p-1 
          grid grid-cols-2 gap-6"
        >
          <div>
            <label class="block  text-sm font-medium text-yellow-600 pb-1">
              Your Name:
            </label>
            <input
              required
              type="text"
              placeholder="Name"
              name="user_name"
              v-model="answers.user_name"
              :disabled="score"
              class="bg-white border border-gray-200 w-full rounded-md px-3 py-1 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-200 focus:bg-white sm:text-sm/6 text-black"
            />
          </div>
          <!-- score -->
          <div v-if="score">
            <label class="block text-sm font-medium text-yellow-600 pb-1">
              Your score:
            </label>
            <input
              required
              type="number"
              v-model="score"
              disabled
              class="bg-white border border-gray-200 w-full rounded-md px-3 py-1 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-200 focus:bg-white sm:text-sm/6 text-black"
            />
          </div>
          <!-- /score -->
        </div>
      </div>

      <!-- show result  -->
      <div v-if="responseAnswer">
        <hr class="my-3 text-black/60" />
        <div v-for="(question, ind) of survey.questions" :key="question.id">
          <ResponseViewer
            v-model="answers[question.id]"
            :question="question"
            :index="ind"
            :results="results"
          />
        </div>
        <div
          v-if="errorMsg"
          class="my-4 p-2 bg-red-200 text-red-900 border border-red-400 rounded"
        >
          {{ errorMsg }}
        </div>
      </div>
      <div
        v-if="surveyFinished && !responseAnswer"
        class="mt-4 py-5 px-3 w-fit rounded-sm justify-center text-white mx-auto"
      >
        <button
          @click="showResponse"
          type="button"
          class="flex w-fit justify-center items-center rounded-sm bg-amber-200 px-3 py-1.5 text-sm font-semibold text-black hover:bg-amber-200 shadow-md shadow-black/30 hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
        >
          show your response
        </button>
      </div>

      <!-- /show result  -->
      <div
        v-if="surveyFinished"
        class="mt-4 py-5 px-3 w-fit rounded-sm grid grid-rows-2 justify-center bg-black/70 text-white mx-auto"
      >
        <div class="text-xl mb-3 font-semibold">
          Thank you for participating in this survey.
        </div>
        <button
          @click="submitAnotherResponse"
          type="button"
          class="flex w-fit justify-center items-center rounded-sm bg-amber-200 px-3 py-1.5 text-sm font-semibold text-black shadow-md shadow-amber-200/40 hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
        >
          Submit another response
        </button>
      </div>
      <div v-else>
        <hr class="my-3 text-black/60" />
        <div v-for="(question, ind) of survey.questions" :key="question.id">
          <QuestionViewer
            v-model="answers[question.id]"
            :question="question"
            :index="ind"
          />
        </div>
        <div
          v-if="errorMsg"
          class="my-4 p-2 bg-red-200 text-red-900 border border-red-400 rounded"
        >
          {{ errorMsg }}
        </div>
      </div>
      <button
        v-if="!surveyFinished && !response"
        type="submit"
        class="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-amber-200/70 text-black shadow-md shadow-black/30 hover:shadow-none hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-200"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup>
import QuestionViewer from "@/viewer/QuestionViewer.vue";
import ResponseViewer from "@/viewer/ResponseViewer.vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();

const loading = computed(() => store.state.currentSurvey.loading);
const survey = computed(() => store.state.currentSurvey.data);
const surveyFinished = ref(false);
const answers = ref({});
let errorMsg = ref("");
const score = ref(null);
const responseAnswer = ref(false);
const results = ref({});

store.dispatch("getSurveyBySlug", route.params.slug);
function submitSurvey() {
  console.log(JSON.stringify(answers.value, undefined, 2));
  store
    .dispatch("saveSurveyAnswer", {
      surveyId: survey.value.id,
      user_name: answers.value.user_name,
      answers: answers.value,
    })
    .then((response) => {
      if (response.status === 201) {
        surveyFinished.value = true;
        score.value = response.data.score;
        results.value = response.data.res;
      }
    })
    .catch((error) => {
      console.error("Server error:", error.response?.data || error);

      if (error.response?.data?.message) {
        errorMsg.value = error.response.data.message; // ← النص الصحيح
      } else {
        errorMsg.value = "Something went wrong!";
      }

      store.commit("notify", {
        type: "error",
        message: errorMsg.value, // ← لازم .value
      });
    });
}

function showResponse() {
  responseAnswer.value = true;
}

function submitAnotherResponse() {
  responseAnswer.value = false;
  answers.value = {};
  surveyFinished.value = false;
  score.value = null;
}
</script>

<style></style>
