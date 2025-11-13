<template>
  <div>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="flex min-h-full flex-1 flex-col justify-center items-center">
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
      </div>
      <h2
        class="pb-12 mt-10 text-center text-2xl/9 font-bold tracking-tight text-white"
      >
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="login" method="POST">

        <Alert  v-if="errorMsg">
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
        <div class="pb-6">
          <label
            for="email"
            class="block text-sm/6 font-medium text-gray-100 pb-3"
            >Email address</label
          >
          <div class="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              v-model="user.email"
              autocomplete="email"
              required
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>

        <!-- password -->
        <div class="pb-6">
          <div class="flex items-center justify-between pb-3">
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-100"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              type="password"
              name="password"
              id="password"
              v-model="user.password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>

        <!-- remember -->
        <div class="flex items-center justify-between pb-3">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="remember"
              v-model="user.remember"
              name="remember"
              class="h-4 w-4"
            />
            <label
              for="remember"
              class="block pl-2 text-sm/6 font-medium text-gray-100"
            >
              Remember me</label
            >
          </div>
        </div>

        <div class="pb-8">
          <button
            :disabled="loading"
            :class="{
              'cursor-not-allowed': loading,
              'hover:bg-indigo-500': loading,
            }"
            type="submit"
            class="flex w-full justify-center items-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            <svg
              v-if="loading"
              class="mr-3 h-5 w-5 text-white animate-spin"
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
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-400">
        Not a member?
        {{ " " }}
        <router-link
          :to="{ name: 'Register' }"
          class="font-semibold text-indigo-400 hover:text-indigo-300"
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
      console.log("error ");
      loading.value = false;
      errorMsg.value = err.response.data.error;
    });
}
</script>
