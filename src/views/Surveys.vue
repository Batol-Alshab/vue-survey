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

    <div v-if="surveys.loading" class="flex justify-center">loading...</div>
    <div v-else>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-3 sm:grid-cols-2">
        <SurveyListItem
          v-for="(survey, ind) in surveys.data"
          :key="survey.id"
          :survey="survey"
          @delete="deleteSurvey(survey)"
          class="opacity-0 animate-fade-in-down"
          :style="{ animationDelay: `${ind * 0.1}s` }"
        >
        </SurveyListItem>
      </div>

      <div class="flex justify-center mt-5"> 
        <nav class="relative inline-flex justify-center rounded-md shadow-sm" 
        arisa-label="Pagination">
          <a v-for="(link,i) of surveys.links" :key="i"
          :disables="!link.url"
          v-html="link.label"
          href="#"
          @click="getForPage($event,link)"
          aria-current="page"
          class="relative inline-flex justify-center border px-4 py-2 text-sm
          "
          :class="[
            link.active?'bg-indigo-700 border-indigo-500 text-indigo-100':
            'hover:bg-indigo-300 hover:text-black',
            i === 0? 'rounded-sm':'',
            i === surveys.links.length-1 ?'rounded-sm':'',
          ]"> 

          </a>
        </nav>
      </div>
    </div>
    
  </PageComponent>
</template>
<script setup>
import PageComponent from "@/components/PageComponent.vue";
import store from "@/store";
import { computed } from "vue";
import SurveyListItem from "@/components/SurveyListItem.vue";
const surveys = computed(() => store.state.surveys);

function deleteSurvey(survey) {
  if (confirm("are you sure you want delete Survey")) {
    store.dispatch("deleteSurvey", survey.id).then(() => {
      store.dispatch("getSurveys");
    });
  }
}
store.dispatch("getSurveys");
function getForPage(ev,link){
  ev.preventDefault();
  if(!link.url || link.active){
    return ;
  }
  store.dispatch("getSurveys",{url:link.url});
}
</script>
