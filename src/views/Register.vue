<template>
  <div class="shadow-2xl p-4">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="flex min-h-full flex-1 flex-col justify-center items-center">
        <img
          class="mx-auto h-10 w-auto my-1"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
      </div>
      <h2
        class="pb-8 mt-6 text-center text-2xl/9 font-bold tracking-tight text-blue-600"
      >
        Register
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="register" method="POST">
        <Alert
          v-if="Object.keys(errors).length"
          class="flex-col items-stretch text-sm"
        >
          <div
            v-for="(field, i) of Object.keys(errors)"
            :key="i"
            class="flex justify-between items-center"
          >
            <div v-for="(error, ind) of errors[field] || []" :key="ind">
              *. {{ error }}
            </div>
            <span
              @click="errors = ''"
              class="p-1 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="flex size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
        </Alert>

        <div>
          <label
            for="fullname"
            class="block text-sm/6 font-medium text-gray-800"
            >Full name:</label
          >
          <div class="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              v-model="user.name"
              autocomplete="name"
              required
              class="block bg-gray-50 border border-gray-200 w-full rounded-md px-3 py-1 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 focus:bg-white sm:text-sm/6"
            />
          </div>
        </div>
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
              class="block bg-gray-50 border border-gray-200 w-full rounded-md px-3 py-1 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 focus:bg-white sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-800"
              >Password</label
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
              class="block bg-gray-50 border border-gray-200 w-full rounded-md px-3 py-1 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 focus:bg-white sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password_confirmation"
              class="block text-sm/6 font-medium text-gray-800"
              >password Confirmation:</label
            >
          </div>
          <div class="mt-2">
            <input
              type="password"
              name="password_confirmation"
              id="password"
              v-model="user.password_confirmation"
              autocomplete="current-password"
              required
              class="block bg-gray-50 border border-gray-200 w-full rounded-md px-3 py-1 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 focus:bg-white sm:text-sm/6"
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
              class="bg-gray-50 rounded-sm focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 focus:bg-white"
            />
            <label
              for="remember"
              class="block pl-2 text-sm/6 font-medium text-gray-800"
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
            class="flex w-full justify-center items-center rounded-md bg-blue-600 shadow-md shadow-blue-900 hover:shadow-none px-3 py-1.5 text-sm font-semibold text-gray-100 hover:bg-blue-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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
            Sign up
          </button>
        </div>
      </form>

      <p class="text-center text-sm/6 text-gray-500">
        have an account?
        {{ " " }}
        <router-link
          :to="{ name: 'Login' }"
          class="font-semibold text-blue-600 hover:text-blue-700"
          >login to your account</router-link
        >
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
  password: "",
  password_confirmation: "",
};

const loading = ref(false);
const errors = ref({});

function register(ev) {
  ev.preventDefault();
  loading.value = true;
  store
    .dispatch("register", user)
    .then(() => {
      loading.value = false;
      router.push({
        name: "Dashboard",
      });
    })
    .catch((error) => {
      loading.value = false;
      if (error.response.status == 422) {
        errors.value = error.response.data.errors;
      }
    });
}
</script>
