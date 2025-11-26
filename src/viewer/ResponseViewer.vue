<template>
  <fieldset class="mb-4">
    <div>
      <legend class="text-base font-medium text-black">
        <span class="text-yellow-500 font-bold text-xl">
          <div class="flex justify-between items-center text-yellow-500">
            <p class="flex items-center justify-center">
              {{ index + 1 }}.
              <span class="text-black">
                {{ question.question }}
              </span>
              <svg
                v-if="isCorrect"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="ml-1 mt-1 h-6 w-6 text-green-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="ml-1 mt-1 h-6 w-6 text-red-600"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </p>
            <p class="text-sm text-yellow-600">
              <span v-if="isCorrect" class="text-green-600"
                >Points: {{ question.points }}</span
              >
              <span v-else class="text-red-600">Points: 0</span>
            </p>
          </div>
        </span>
      </legend>
      <p class="text-gray-600 text-sm">
        {{ question.description }}
      </p>
    </div>
    <div class="mt-3">
      <div v-if="question.type === 'select'">
        <select
          :value="modelValue"
          class="bg-gray-50 border border-gray-200 w-full rounded-md px-3 py-1 sm:py-2 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-200 focus:bg-white sm:text-sm/6 text-black"
          disabled
          :class="
            isCorrect
              ? 'text-green-600 border-green-600'
              : 'text-red-600 border-red-600'
          "
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
            :checked="modelValue === option.text"
            type="radio"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            disabled
          />
          <label
            :for="option.uuid"
            class="ml-3 block text-sm font-medium text-gray-800"
            :class="
              modelValue === option.text
                ? isCorrect
                  ? 'text-green-600' /* صح */
                  : 'text-red-600' /* خطأ */
                : 'text-gray-800' /* غير محدد */
            "
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
            :checked="modelValue === option.text"
            type="checkbox"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            disabled
            
          />
          <label
            :for="option.uuid"
            class="ml-3 block text-sm font-medium text-gray-800"
           :class="
              modelValue === option.text
                ? isCorrect
                  ? 'text-green-600' /* صح */
                  : 'text-red-600' /* خطأ */
                : 'text-gray-800' /* غير محدد */
            " >
            {{ option.text }}
          </label>
        </div>
      </div>
      <div v-else-if="question.type === 'text'">
        <input
          type="text"
          :value="modelValue"
          @input="emits('update:modelValue', $event.target.value)"
          class="block bg-gray-50 border border-gray-200 w-full rounded-md px-3 py-1 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-200 focus:bg-white sm:text-sm/6 text-black"
          disabled
          :class="
            isCorrect
              ? 'text-green-600 border-green-600'
              : 'text-red-600 border-red-600'
          "
        />
      </div>
      <div v-else-if="question.type === 'textarea'">
        <textarea
          :value="modelValue"
          class="block bg-gray-50 border border-gray-200 w-full rounded-md px-3 py-1 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-200 focus:bg-white sm:text-sm/6 text-black"
          disabled
          :class="
            isCorrect
              ? 'text-green-600 border-green-600'
              : 'text-red-600 border-red-600'
          "
        ></textarea>
      </div>
      <p v-if="!isCorrect && question.correct_answer" class="text-black mt-3">
        Correct Answer:
        <span class="text-green-600">
          {{ question.correct_answer }}
        </span>
      </p>
    </div>
  </fieldset>
  <hr class="mb-4 text-amber-200" />
</template>

<script setup>
import { ref, computed } from "vue";

const { question, index, modelValue, results } = defineProps({
  question: Object,
  index: Number,
  modelValue: [String, Array],
  results: Object,
});

const isCorrect = computed(() => {
  return results && results[question.id] === 1;
});

const emits = defineEmits(["update:modelValue"]);

let model;
if (question.type === "checkbox") {
  model = ref({});
}

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
</script>

<style></style>
