<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-100">
          {{ route.params.id ? model.title : "Create a Survey" }}
        </h1>
        <button v-if="route.params.id" type="button" 
        class=" border border-transparent rounded-md text-white bg-red-700 hover:bg-red-900 shadow-2xl flex justify-center items-center px-2 py-1 m-r-2"
        @click="deleteSurvey()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-7 w-7 mr-1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          Delete Survey
        </button>
      </div>
    </template>

    <div v-if="surveyLoading" class="flex justify-center">loading...</div>
    <form v-else @submit.prevent="saveSurvey" class="w-full  animate-fade-in-down">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-black space-y-6 sm:p-6">
          <!-- image -->
          <div>
            <label class="block font-medium text-sm text-gray-100 pb-2"
              >Image</label
            >
            <div class="mt-1 flex items-center">
              <img
                v-if="model.image_url"
                :src="model.image_url"
                :alt="model.title"
                class="w-64 h-48 object-cover"
              />
              <span
                v-else
                class="flex h-12 w-12 items-center justify-center rounded-full overflow-hidden bg-gray-800 p-1"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="h-[80%] w-[80%] text-gray-300"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </span>
              <button
                type="button"
                class="relative overflow-hidden bg-gray-500 m-4 py-2 px-3 border border-gray-400 shadow-sm rounded-sm font-medium text-sm text-gray-200 leading-4 hover:bg-gray-700"
              >
                <input
                  type="file"
                  @change="onImageChoose"
                  class="py-1.5 px-3 text-white absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer"
                />

                change
              </button>
            </div>
          </div>
          <!-- image -->

          <!-- title -->
          <div>
            <label
              for="title"
              class="block font-medium text-sm pt-6 pb-2 text-gray-100"
              >Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              v-model="model.title"
              autocomplete="survey_title"
              class="py-1.5 px-3 mt-1 text-white border border-gray-400 w-full block shadow-sm rounded-sm sm:text-sm focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <!-- title -->

          <!-- description -->
          <div>
            <label
              for="about"
              class="block font-medium text-sm pt-6 pb-2 text-gray-100"
            >
              Descriotion
            </label>
            <div class="mt-1">
              <textarea
                name="description"
                id="description"
                rows="3"
                v-model="model.description"
                autocomplete="survey_description"
                placeholder="Description your survey"
                class="py-1.5 px-3 text-white mt-1 border border-gray-400 w-full block shadow-sm rounded-sm sm:text-sm focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              </textarea>
            </div>
          </div>
          <!-- description -->

          <!-- expire_date -->
          <div>
            <label
              for="expire_date"
              class="block font-medium text-sm pt-6 pb-2 text-gray-100"
              >Expire date</label
            >
            <input
              type="date"
              name="expire_date"
              id="expire_date"
              v-model="model.expire_date"
              class="py-1.5 px-3 mt-1 border border-gray-400 text-white w-full block shadow-sm rounded-sm sm:text-sm focus:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <!-- expire_date -->

          <!-- status -->
          <div class="flex items-start pt-6 pb-2">
            <div class="flex items-center h-5 pr-2">
              <input
                type="checkbox"
                name="status"
                id="status"
                class="py-1.5 h-4 w-4 rounded border border-gray-400 text-white"
                v-model="model.status"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="status" class="font-medium pt-6 pb-2 text-white"
                >Active</label
              >
            </div>
          </div>
          <!-- status -->
        </div>

        <div class="px-4 py-5 bg-black space-y-6 sm:p-6 text-white">
          <h3 class="flex items-center text-2xl font-semibold justify-between">
            Questions
            <!-- Add new Question -->
            <button
              type="button"
              @click="addQuestion()"
              class="flex items-center px-4 py-1 bg-gray-500 hover:bg-gray-700 rounded-sm text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-4 w-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>

              Add Question
            </button>
          </h3>
          <div v-if="!model.questions.length" class="text-center text-gray-300">
            You don't have any questions created
          </div>
          <div v-for="(question, index) in model.questions" :key="question.id">
            <QuestionEditor
              :question="question"
              :index="index"
              @change="questionChange"
              @addQuestion="addQuestion"
              @deleteQuestion="deleteQuestion"
            >
            </QuestionEditor>
          </div>
        </div>
        <!-- save -->
        <div class="px-4 py-3 text-right sm:px-6 bg-gray-800">
          <button
            type="submit"
            class="inline-flex justify-center px-4 py-2 cursor-pointer border border-transparent font-medium text-white bg-indigo-800 rounded-md shadow-2xl"
          >
            Save
          </button>
        </div>
        <!-- save -->
      </div>
    </form>
  </PageComponent>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import store from "@/store";
import { useRoute } from "vue-router";
import PageComponent from "@/components/PageComponent.vue";
import QuestionEditor from "@/components/editor/QuestionEditor.vue";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";
import Surveys from "./Surveys.vue";

const router = useRouter();
const route = useRoute();

const surveyLoading = computed(() => store.state.currentSurvey.loading);
// create empty survey
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
  () => store.state.currentSurvey.data, // هذا المصدر الذي نراقبه
  (newVal, oldVal) => {
    // هذا الكولباك
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: newVal.status !== "draft",
    };
  }
);

if (route.params.id) {
  store.dispatch("getSurvey", route.params.id);
}

function onImageChoose(ev) {
  const file = ev.target.files[0];

  const reader = new FileReader();
  reader.onload = () => {
    //the field to send on backend
    model.value.image = reader.result;

    //the field  to display here
    model.value.image_url = reader.result;
  };
  reader.readAsDataURL(file);
}

function addQuestion(index) {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    description: "",
    data: {},
  };
  model.value.questions.splice(index, 0, newQuestion);
}
function deleteQuestion(question) {
  model.value.questions = model.value.questions.filter((q) => q !== question);
}

function questionChange(question) {
  model.value.questions = model.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  });
}

// create or update survey
function saveSurvey() {
  store.dispatch("saveSurvey", model.value).then(({ data }) => {
    router.push({
      name: "SurveyView",
      params: { id: data.data.id },
    })
    .catch(error => {
    console.error(error.response?.data || error.message);
  });
  });
}

function deleteSurvey(){
  if(confirm("are you sure you want delete Survey")){
    store.dispatch('deleteSurvey',model.value.id).then(()=>{
      router.push({
        name:'Surveys',
      })
    })
  }
}
</script>
