<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-white">Surveys</h1>
        <router-link
          :to="{ name: 'SurveyCreate' }"
          class="text-xl items-center justify-center py-2 px-3 text-black bg-emerald-500 rounded-md hover:bg-emerald-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-4 w-4 inline-block"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          add new Survey
        </router-link>
      </div>
    </template>
    <div class="grid grid-cols-1 gap-3 md:grid-cols-3 sm:grid-cols-2">
      <SurveyListItem
        v-for="survey in surveys"
        :key="survey.id"
        :survey="survey"
        @delete="deleteSurvey(survey)"
      >
      </SurveyListItem>
    </div>
  </PageComponent>
</template>
<script setup>
import PageComponent from "@/components/PageComponent.vue";
import store from "@/store";
import { computed } from "vue";
import SurveyListItem from "@/components/SurveyListItem.vue";
const surveys = computed(() => store.state.surveys.data);

function deleteSurvey(survey) {
  if (confirm("are you sure you want delete Survey")) {
    store.dispatch("deleteSurvey", survey.id).then(()=>{
      store.dispatch('getSurveys')
    });
  }
}

store.dispatch("getSurveys");
</script>
