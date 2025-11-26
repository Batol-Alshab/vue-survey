<template>
  <div class="shadow-2xl p-4">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="flex min-h-full flex-1 flex-col justify-center items-center">
        <img
          class="mx-auto h-10 w-auto mt-2"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
      </div>
      <h2
        class="pb-8 mt-6 text-center text-2xl/9 font-bold tracking-tight text-yellow-500"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="login" method="POST">
        <Alert v-if="errorMsg">
          {{ errorMsg }}
          <span
            @click="errorMsg = ''"
            class="p-1 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </span>
        </Alert>

        <!-- eamil -->
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-800"
            >Email address:</label
          >
          <div class="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              v-model="user.email"
              autocomplete="email"
              required
              class="block text-black bg-gray-50 border border-gray-200 w-full rounded-md px-3 py-1 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-200 focus:bg-white sm:text-sm/6"
            />
          </div>
        </div>

        <!-- password -->
        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-800"
              >Password:</label
            >
          </div>
          <div class="mt-1">
            <input
              type="password"
              name="password"
              id="password"
              v-model="user.password"
              autocomplete="current-password"
              required
              class="text-black  block bg-gray-50 border border-gray-200 w-full rounded-md px-3 py-1 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-200 focus:bg-white sm:text-sm/6"
            />
          </div>
        </div>

        <!-- remember -->
        <div class="flex items-center justify-between pb-1">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="remember"
              v-model="user.remember"
              name="remember"
              class="bg-gray-50 text-black rounded-sm focus:outline-2 focus:-outline-offset-2 focus:outline-amber-200 focus:bg-white"
            />
            <label
              for="remember"
              class="block pl-2 text-sm/6 font-medium text-gray-800"
            >
              Remember me</label
            >
          </div>
        </div>

        <div class="pb-4">
          <button
            :disabled="loading"
            :class="{
              'cursor-not-allowed': loading,
              'hover:bg-amber-200': loading,
            }"
            type="submit"
            class="flex w-full justify-center items-center rounded-md bg-amber-200/80
             px-3 py-1.5 text-sm font-semibold text-black hover:bg-amber-200/90 shadow-md
              shadow-black/30 hover:shadow-none  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            <svg
              v-if="loading"
              class="mr-3 h-5 w-5 text-gray-100 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-50"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-100"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Sign in
          </button>
        </div>
      </form>

      <p class="text-center text-sm/8 text-gray-500">
        Not a member?
        {{ " " }}
        <router-link
          :to="{ name: 'Register' }"
          class="font-semibold text-yellow-500 hover:text-yellow-800"
          >Register now free
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import store from "@/store";
import { useRouter } from "vue-router";
import { ref } from "vue";
import Alert from "@/components/Alert.vue";

const router = useRouter();
const user = {
  name: "",
  email: "",
  remember: false,
};
let errorMsg = ref("");
const loading = ref(false);
function login(ev) {
  ev.preventDefault();
  loading.value = true;
  store
    .dispatch("login", user)
    .then(() => {
      console.log("login ");
      loading.value = false;
      router.push({
        name: "Dashboard",
      });
    })
    .catch((err) => {
      loading.value = false;
      errorMsg.value = err.response.data.error;
    });
}
</script>
