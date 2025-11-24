<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1
          class="font-bold tracking-tight text-gray-800 sm:text-xl md:text-2xl lg:text-3xl"
        >
          Surveys
        </h1>
        <router-link
          :to="{ name: 'SurveyCreate' }"
          class="text-xl items-center justify-center py-2 px-3 border border-white text-white bg-black  hover:shadow-none rounded-md"
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
    <div v-if="surveys.loading" class="h-96 flex items-center justify-center">
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
    <div v-else>
      <div
        class="grid grid-cols-1 gap-3 md:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4"
      >
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
        <nav
          class="relative inline-flex justify-center rounded-md shadow-sm"
          arisa-label="Pagination"
        >
          <a
            v-for="(link, i) of surveys.links"
            :key="i"
            :disables="!link.url"
            v-html="link.label"
            href="#"
            @click="getForPage($event, link)"
            aria-current="page"
            class="text-gray-800 relative inline-flex justify-center border px-4 py-2 text-sm"
            :class="[
              link.active
                ? 'bg-amber-200 border-yellow-500 text-black'
                : 'hover:bg-black/70 hover:text-white',
              i === 0 ? 'rounded-sm' : '',
              i === surveys.links.length - 1 ? 'rounded-sm' : '',
            ]"
          >
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
function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  store.dispatch("getSurveys", { url: link.url });
}
</script>
