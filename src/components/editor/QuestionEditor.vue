<template>
  <!-- Question index -->
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold text-black">
      <span class="text-yellow-500 font-bold text-2xl"> {{ index + 1 }}. </span>
      {{ model.question }}
    </h3>

    <div class="flex items-center px-1">
      <!-- add new question -->
      <button
        type="button"
        @click="addQuestion"
        class="flex items-center text-xs py-1 px-2 rounded-sm
         bg-amber-200/80 hover:bg-amber-200  shadow-md shadow-black/30
          hover:shadow-none text-black"
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

        Add
      </button>
      <!-- /add new question -->

      <!-- delete question -->
      <button
        type="button"
        @click="deleteQuestion"
        class="flex items-center m-3 text-xs py-1 px-2 rounded-sm   bg-red-700/70 text-white shadow-md shadow-red-900/70 hover:shadow-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="f-4 w-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>

        Delete
      </button>
      <!-- /delete question -->
    </div>
  </div>
  <!-- /Question index -->

  <div class="grid grid-cols-12 gap-3">
    <!-- question -->
    <div class="mt-3 col-span-9">
      <label
        :for="'question_text_' + model.data"
        class="block text-sm font-medium text-gray-700 pb-2"
      >
        Question Text
      </label>
      <input
        type="text"
        :id="'question_text_' + model.data"
        :name="'question_text_' + model.data"
        v-model="model.question"
        @change="dataChange"
        class="bg-gray-50 border border-gray-200 w-full rounded-md px-3 py-1 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-200 focus:bg-white sm:text-sm/6 text-black"
      />
    </div>
    <!-- /question -->

    <!-- question type -->
    <div class="mt-3 col-span-3">
      <label for="question_type" class="block text-sm font-medium text-gray-700 pb-2">
        Question Type
      </label>
      <select
        id="question_type"
        name="question_type"
        v-model="model.type"
        @change="typeChange"
        class=" bg-gray-50 border border-gray-200 w-full rounded-md px-3 py-1 sm:py-2 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-200 focus:bg-white sm:text-sm/6 text-black"
       >
        <option v-for="type in questionTypes" :key="type" :value="type" 
        class="bg-amber-200/20  text-gray-800">
          {{ upperCaseFirst(type) }}
        </option>
      </select>
    </div>
    <!-- /question type -->
  </div>
  <!-- question description -->
  <div class="mt-3 col-span-9">
    <label
      :for="'question_description_' + model.id"
      class="block text-sm font-medium text-gray-700 pb-2 pt-4"
    >
      Descriotion
    </label>
    <textarea
      :name="'question_description_' + model.id"
      v-model="model.description"
      @change="dataChange"
      rows="4"
      :id="'question_description_' + model.id"
      class="block bg-gray-50 border border-gray-200 w-full rounded-md px-3 py-1 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-200 focus:bg-white sm:text-sm/6 text-black"
    ></textarea>
  </div>
  <!-- /question description -->

  <!-- Data -->
  <div>
    <div v-if="shouldHaveOptions()" class="mt-2">
      <h4 class="flex items-center justify-between text-sm font-semibold mb-3">
        Options
        <!-- Add New Oprion -->
        <button
          type="button"
          @click="addOption()"
          class="flex items-center text-sm px-2 py-1  rounded-sm 
           bg-amber-200
           shadow-md shadow-black/30 hover:shadow-none
            text-black"
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

          Add Option
        </button>
        <!-- /Add New Option -->
      </h4>
      <div
        v-if="!model.data || !model.data.options || !model.data.options.length"
        class="text-sm text-center text-gray-400 py-3"
      >
        You don't have any option defined 
      </div>
      <!-- option List -->
      <div
        v-for="(option, index) in model.data.options"
        :key="option.uuid"
        class="flex items-center mb-1"
      >
        <span class="w-6 text-sm text-yellow-500"> {{ index + 1 }}. </span>
        <input
          type="text "
          v-model="option.text"
          @change="dataChange"
           class="bg-gray-50 border border-gray-200 w-full rounded-md px-3 py-1 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-200 focus:bg-white sm:text-sm/6 text-black"
      />

        <!-- delete option -->
        <button
          type="button"
          @click="removeOption(option)"
          class="flex items-center justify-center mb-1 h-6 w-6 border border-transparent rounded-full text-red-400 hover:bg-red-700 hover:text-white"
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
        <!-- /delete option -->
      </div>
      <!-- /option List -->
    </div>
  </div>
  <!-- /Data -->
  <hr class="my-4 text-gray-700" />
</template>
<script setup>
import { ref } from "vue";
import { computed } from "vue";
import store from "@/store";
import { v4 as uuidv4 } from "uuid";

const props = defineProps({
  question: Object,
  index: Number,
});
const emit = defineEmits(["change", "addQuestion", "deleteQuestion"]);

const model = ref(JSON.parse(JSON.stringify(props.question)));
// model.value.data[options] = JSON.parse(JSON.stringify(props.question.data))
// get question  types from vuex
const questionTypes = computed(() => store.state.questionTypes);

function upperCaseFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// check if the question should have options
function shouldHaveOptions() {
  return ["select", "radio", "checkbox"].includes(model.value.type);
}

function getOptions() {
  return model.value.data.options;
}

function setOptions(options) {
  model.value.data.options = options;
}

// add option
function addOption() {
  setOptions([...getOptions(), { uuid: uuidv4(), text: "" }]);
  dataChange();
}

// remove Option
function removeOption(op) {
  setOptions(getOptions().filter((opt) => opt !== op));
  dataChange();
}

function typeChange() {
  if (shouldHaveOptions()) {
    setOptions(getOptions() || []);
  }
  dataChange();
}

// Emit the data change
function dataChange() {
  const data = JSON.parse(JSON.stringify(model.value));
  if (!shouldHaveOptions()) {
    delete data.data.options;
  }
  emit("change", data);
}

function addQuestion() {
  emit("addQuestion", props.index + 1);
}
function deleteQuestion() {
  emit("deleteQuestion", props.question);
}
</script>
