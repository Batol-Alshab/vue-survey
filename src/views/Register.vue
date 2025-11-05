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
        Register
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="register" method="POST">
        <div class="pb-6">
          <label
            for="fullname"
            class="block text-sm/6 font-medium text-gray-100 pb-3"
            >Full name</label
          >
          <div class="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              v-model="user.name"
              autocomplete="name"
              required
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>
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

        <div class="pb-6">
          <div class="flex items-center justify-between pb-3">
            <label
              for="password_confirmation"
              class="block text-sm/6 font-medium text-gray-100"
              >password_confirmation</label
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
              class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            />
          </div>
        </div>

        <div class="pb-8">
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Sign up
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-400">
        have an account?
        {{ " " }}
        <router-link
          :to="{ name: 'Login' }"
          class="font-semibold text-indigo-400 hover:text-indigo-300"
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
  // loading.value = true;
  store
    .dispatch("register", user)
    .then(() => {
      // loading.value = false;
      router.push({
        name: "Dashboard",
      });
    })
    // .catch((error) => {
    //   loading.value = false;
    //   if (error.response.status == 422) {
    //     errors.value = error.response.data.errors;
    //   }
    // });
}
</script>
