export default defineNuxtPlugin(async (nuxtApp) => {
  const api = useSanctumClient();

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
