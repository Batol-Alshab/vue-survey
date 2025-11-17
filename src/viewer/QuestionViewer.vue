<template>
  <fieldset class="mb-4">
    <div>
      <legend class="text-base font-medium text-black">
        <span class="text-blue-600 font-bold text-xl"> {{ index + 1 }}. </span>
        {{ question.question }}
      </legend>
      <p class="text-gray-600 text-sm">
        {{ question.description }}
      </p>
    </div>
    <div class="mt-3">
      <div v-if="question.type === 'select'">
        <select
          :value="modelValue"
          @change="emits('update:modelValue', $event.target.value)"
          class="bg-gray-50 border
           border-gray-200
            w-full rounded-md
             px-3 py-1 sm:py-2
              text-base outline-1 
              -outline-offset-1 outline-white/10
               placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 focus:bg-white sm:text-sm/6 text-black"
        >
          <option value="">Please Select</option>
          <option
            v-for="option in parsedData.options"
            :key="option.uuid"
            :value="option.text"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div v-else-if="question.type === 'radio'">
        <div
          v-for="(option, ind) of parsedData.options"
          :key="option.uuid"
          class="flex items-center"
        >
          <input
            :id="option.uuid"
            :name="'question' + question.id"
            :value="option.text"
            @change="emits('update:modelValue', $event.target.value)"
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
          v-for="(option, ind) of parsedData.options"
          :key="option.uuid"
          class="flex items-center"
        >
          <input
            :id="option.uuid"
            v-model="model[option.text]"
            @change="onCheckboxChange"
            type="checkbox"
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
          :value="modelValue"
          @input="emits('update:modelValue', $event.target.value)"
          class="bg-gray-700 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div v-else-if="question.type === 'textarea'">
        <textarea
          :value="modelValue"
          @input="emits('update:modelValue', $event.target.value)"
          class="bg-gray-700 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        ></textarea>
      </div>
    </div>
  </fieldset>
  <hr class="mb-4 text-blue-800" />
</template>

<script setup>
import { ref, computed } from "vue";

const { question, index, modelValue } = defineProps({
  question: Object,
  index: Number,
  modelValue: [String, Array],
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

// function shouldHaveOptions() {
//   return ["select", "radio", "checkbox"].includes(question.type);
// }

function onCheckboxChange($event) {
  const selectedOptions = [];
  for (let text in model.value) {
    if (model.value[text]) {
      selectedOptions.push(text);
    }
  }
  emits("update:modelValue", selectedOptions);
}
</script>

<style></style>
