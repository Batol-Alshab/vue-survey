<template>
  
  <fieldset class="mb-4">
    <div>
      <legend class="text-base font-medium text-black">
        <span class="text-yellow-500 font-bold text-xl">
          {{ index + 1 }}.
        </span>
        {{ question.question }}
      </legend>
      <p class="text-gray-600 text-sm">
        {{ question.description }}
      </p>
    </div>
    <div class="mt-3">
      <div v-if="question.type === 'select'">
        <select
          :value=answer
          disabled
          class="bg-gray-100 border border-gray-200 w-full rounded-md px-3 py-1 sm:py-2 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-200 focus:bg-white sm:text-sm/6 text-black"
        >
          <option
            v-for="option in parsedData.options"
            :key="option.uuid"
            :value="option.text"
            class="bg-amber-200/20"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div v-else-if="question.type === 'radio'">
        <div
          v-for="option of parsedData.options"
          :key="option.uuid"
          class="flex items-center"
        >
          <input
            :id="option.uuid"
            :name="'question' + question.id"
            :value="option.text"
            :checked="answer === option.text"
            disabled
            type="radio"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label
            :for="option.uuid"
            class="ml-3 block text-sm font-medium text-gray-800"
          >
            {{ option.text }}
          </label>
        </div>
      </div>
      <div v-else-if="question.type === 'checkbox'">
        <div
          v-for="option of parsedData.options"
          :key="option.uuid"
          class="flex items-center"
        >
          <input
            :id="option.uuid"
            v-model="model[option.text]"
            @change="onCheckboxChange"
            type="checkbox"
            :checked="answer === option.text"
            disabled
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
          <label
            :for="option.uuid"
            class="ml-3 block text-sm font-medium text-gray-800"
          >
            {{ option.text }}
          </label>
        </div>
      </div>
      <div v-else-if="question.type === 'text'">
        <input
          type="text"
          :value="answer"
          disabled
          class="block bg-gray-100 border border-gray-200 w-full rounded-md px-3 py-1 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-200 focus:bg-white sm:text-sm/6 text-black"
        />
      </div>
      <div v-else-if="question.type === 'textarea'">
        <textarea
          :value="answer"
          disabled
          class="block bg-gray-100 border border-gray-200 w-full rounded-md px-3 py-1 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-200 focus:bg-white sm:text-sm/6 text-black"
        ></textarea>
      </div>
    </div>
  </fieldset>
</template>
<script setup>
import { ref, computed } from "vue";

const { question, index, answer } = defineProps({
  question: Object,
  index: Number,
  answer: [String, Array],
});

let model;
if (question.type === "checkbox") {
  model = ref({});
}
// 👇 هذا سيحوّل "[\"o4\",\"o3\"]" إلى ["o4", "o3"]
// const parsedAnswer = computed(() => {
//   if (!answer) return '';

//   try {
//     return typeof answer === "string" ? JSON.parse(answer) : answer;
//   } catch {
//     return '';
//   }
// });

// ✅ حلّ المشكلة: نحول data من JSON string إلى object
const parsedData = computed(() => {
  if (typeof question.data === "string" && question.data !== "") {
    try {
      return JSON.parse(question.data);
    } catch (e) {
      console.error("Error parsing question.data:", e);
      return {};
    }
  }
  return question.data || {};
});

// function shouldHaveOptions() {
//   return ["select", "radio", "checkbox"].includes(question.type);
// }
</script>

<style></style>
