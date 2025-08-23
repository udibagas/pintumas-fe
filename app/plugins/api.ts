export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: "http://localhost:8000",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
