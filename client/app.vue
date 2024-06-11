<script setup lang="ts">
import { vMaska } from "maska/vue";
import { useForm } from "vee-validate";
import { object, string } from "yup";

let abortController: AbortController | null = new AbortController();

const validationSchema = object().shape({
  email: string().required().email(),
  number: string(),
});

const { handleSubmit, defineField, errors } = useForm({
  validationSchema,
});

const [email, emailAttrs] = defineField("email", {
  validateOnModelUpdate: false,
});
const [number, numberAttrs] = defineField("number", {
  validateOnModelUpdate: false,
});

const loading = ref(false);
const response = ref();
const onSubmit = handleSubmit(async (values) => {
  abortController = new AbortController();

  loading.value = true;

  try {
    response.value = await $fetch(
      `${useRuntimeConfig().public.BACKEND_HOST}/search`,
      {
        method: "POST",
        body: values,
        signal: abortController.signal,
      },
    );
  } catch (err) {
    response.value = err?.response?._data;
  } finally {
    loading.value = false;
  }
});

const cancelRequest = () => {
  if (!abortController) return;

  abortController.abort("User canceled");
  abortController = null;
};
</script>

<template>
  <div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">Hello there</h1>
        <p class="py-6">Hope u will like it and interview me...</p>
        <a href="#main">
          <button class="btn btn-primary">Anyways</button>
        </a>
      </div>
    </div>
  </div>

  <section
    id="main"
    class="py-12 px-6 min-h-screen flex lg:flex-row flex-col items-center gap-4"
  >
    <div
      class="card lg:w-96 w-full border-gray-700 border bg-base-100 shadow-xl mx-auto"
    >
      <form @submit.prevent="onSubmit" class="card-body space-y-4">
        <h2 class="card-title">Search weird J-Mail-Guys...</h2>

        <div class="space-y-2">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Email</span>
            </div>
            <input
              type="email"
              class="input input-bordered w-full max-w-xs"
              placeholder="Enter e-mail..."
              v-model="email"
              v-bind="emailAttrs"
              :class="{
                'input-error': errors.email,
              }"
            />

            <div class="label">
              <span class="label-text-alt"></span>
              <span v-if="errors.email" class="label-text-alt text-error">{{
                errors.email
              }}</span>
            </div>
          </label>

          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Number</span>
            </div>

            <div class="input input-bordered flex items-center gap-2">
              <input
                type="text"
                class="grow"
                placeholder="Enter number..."
                v-model="number"
                v-bind="numberAttrs"
                v-maska
                data-maska="##-##-##"
              />
              <span class="badge badge-info sm:block hidden">Optional</span>
            </div>
          </label>
        </div>

        <div class="card-actions justify-end">
          <button
            type="submit"
            class="btn btn-primary"
            :class="{ 'pointer-events-none opacity-70': loading }"
          >
            <span v-if="loading" class="flex items-center gap-2">
              <span class="text-xl">
                <span class="loading loading-spinner loading-xs"></span>
              </span>
              Searching...
            </span>

            <span v-else class="flex items-center gap-2">
              <span class="text-xl"> <IconSearch /> </span> Search
            </span>
          </button>

          <button v-if="loading" class="btn" @click="cancelRequest">
            <span>Cancel</span>
          </button>
        </div>
      </form>
    </div>

    <div
      class="card lg:w-[650px] w-full border-gray-700 border bg-base-100 shadow-xl mx-auto"
    >
      <div class="card-body space-y-4">
        <h2 class="card-title">Results</h2>

        <span
          v-if="loading"
          class="loading loading-spinner loading-lg mx-auto"
        ></span>

        <div v-else-if="response" class="space-y-4">
          <p>{{ response.message }}</p>

          <div v-if="response.data?.length" class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th></th>
                  <th>E-mail</th>
                  <th>Number</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(item, index) in response.data" :key="item.number">
                  <th>{{ index + 1 }}</th>
                  <td>{{ item.email }}</td>
                  <td>{{ item.number }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else>No response</div>
      </div>
    </div>
  </section>

  <footer class="footer footer-center p-4 bg-base-300 text-base-content">
    <aside>
      <p>
        <a href="https://github.com/selimdev00" target="_blank">selimdev</a>
      </p>
    </aside>
  </footer>
</template>
