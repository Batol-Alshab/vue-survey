<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-800">
          {{ route.params.id ? model.title : "Create a Survey" }}
        </h1>
      </div>
    </template>

    <div
      v-if="surveyAnswerLoading"
      class="h-96 flex items-center justify-center"
    >
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
    <div v-else class="px-4 py-5 space-y-6 sm:p-6 text-gray-800">
      <h3
        class="flex items-center text-2xl bg-amber-200/70 px-2 py-3 font-semibold justify-between"
      >
        Answer
      </h3>

      <div v-for="(question, ind) of model.questions" :key="question.id">
        <AnswerViewer
          :answer="
            answer.find((a) => a.survey_question_id === question.id)?.answer ||
            null
          "
          :question="question"
          :index="ind"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-3">
      <button
        type="button"
        v-for="answerid in answerids"
        :key="answerid.id"
        @click="getSurveyAnswer(answerid.id)"
        class="hover:bg-amber-100 text-gray-800 cursor-pointer relative inline-flex items-center justify-between border border-gray-300 rounded-md px-4 py-2 text-sm shadow-sm hover:shadow-md transition duration-200"
        :class="
          answer[0].survey_answer_id === answerid.id
            ? 'bg-amber-200 hover:bg-amber-200 '
            : 'bg-white'
        "
      >
        <span class="font-medium text-yellow-600"> Name: </span>
        {{ answerid.user_name }}
        -<span class="ml-2 font-semibold text-yellow-600"> Score: </span>
        {{ answerid.score }}
      </button>
    </div>
  </PageComponent>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import store from "@/store";
import { useRoute } from "vue-router";
import PageComponent from "@/components/PageComponent.vue";
import { useRouter } from "vue-router";
import AnswerViewer from "@/viewer/AnswerViewer.vue";

const route = useRoute();

let model = ref({
  title: "",
  status: false,
  description: null,
  image_url: null,
  expire_date: null,
  questions: [],
});

// watch to current survey data change
watch(
  () => store.state.currentSurvey.data,
  (newVal) => {
    if (newVal) {
      model.value = {
        ...JSON.parse(JSON.stringify(newVal)), // مباشرة newVal وليس newVal.data
        status: newVal.status !== "draft",
      };
    }
  },
  { immediate: true }
);

if (route.params.id) {
  store.dispatch("getSurvey", route.params.id);
}

const surveyAnswerLoading = computed(() => store.state.surveyAnswer.loading);
const answer = computed(() => store.state.surveyAnswer.data);
const answerids = computed(() => store.state.surveyAnswerId.data);
// const surveyAnswer = computed(() => store.state.surveyAnswer.data);
// surveyAnswerId
function getSurveyAnswer(id) {
  store.dispatch("getSurveyAnswer", id);
}
// function getSurveyanswerid() {
//   store.dispatch("getSurveyAnswerId", model.value.id);
// }
</script>
