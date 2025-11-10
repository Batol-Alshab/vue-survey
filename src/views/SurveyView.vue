<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-100">
          {{ route.params.id  ? model.title : "Create a Survey" }}
        </h1>
      </div>
    </template>
    <form @submit.prevent="saveSurvey" class="w-full">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-black space-y-6 sm:p-6">
          <!-- image -->
          <div>
            <label class="block font-medium text-sm text-gray-100 pb-2"
              >Image</label
            >
            <div class="mt-1 flex items-center">
              <img
                v-if="model.image"
                :src="model.image"
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
              class="py-1.5 px-3 mt-1 text-white border border-gray-400 w-full block shadow-sm rounded-sm sm:text-sm focus:bg-gray-900 
           focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                class="py-1.5 px-3 text-white mt-1 border border-gray-400 w-full block shadow-sm rounded-sm sm:text-sm  focus:bg-gray-900 
           focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              class="py-1.5 px-3 mt-1  border border-gray-400 text-white w-full block shadow-sm rounded-sm sm:text-sm focus:bg-gray-900 
           focus:outline-none focus:ring-2 focus:ring-blue-500"
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
import { ref } from "vue";
import store from "@/store";
import { useRoute } from "vue-router";
import PageComponent from "@/components/PageComponent.vue";
import QuestionEditor from "@/components/editor/QuestionEditor.vue";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
// create empty survey
let model = ref({
  title: "",
  status: false,
  description: null,
  image: null,
  expire_date: null,
  questions: [],
});
if (route.params.id) {
  model.value = store.state.surveys.find(
    (s) => s.id === parseInt(route.params.id)
  );
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
function saveSurvey(){
  store.dispatch('saveSurvey',model.value).then(({data})=>{
    router.push({
      name:'SurveyView',
      params:{id: data.data.id}
    })
  })  
}
</script>
