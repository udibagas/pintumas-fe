import type { PaginatedData } from "~/types";

export default function useCrud<T>(url: string) {
  const toast = useToast();
  const { $api } = useNuxtApp();
  const page = ref(1);
  const pageSize = ref(10);
  const filter = ref<Record<string, any>>({});
  const formState = ref<T>({} as T);
  const showForm = ref(false);
  const errors = ref<Record<string, string[]>>({});
  const showDeleteDialog = ref(false);

  const { data, refresh } = useApi<PaginatedData<T>>(url, {
    query: computed(() => ({
      page: page.value,
      pageSize: pageSize.value,
      ...filter.value,
    })),
  });

  async function create(data: Record<string, any>) {
    try {
      await $api(url, { method: "POST", body: data });
      closeForm();
      refresh();
      toast.add({
        title: "Sukses",
        description: "Data berhasil disimpan",
        color: "success",
        icon: "i-lucide-check-circle",
      });
    } catch (error: any) {
      if (error.response?.status === 422) {
        errors.value = error.response?._data?.errors || {};
      }
      toast.add({
        title: "Error",
        description: error.response?._data?.message,
        color: "error",
        icon: "i-lucide-x-circle",
      });
      throw error;
    }
  }

  async function read(id: number | string) {
    try {
      return await $api(`${url}/${id}`);
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.response?._data?.message,
        color: "error",
        icon: "i-lucide-x-circle",
      });
      throw error;
    }
  }

  async function update(id: number | string, data: Record<string, any>) {
    try {
      await $api(`${url}/${id}`, { method: "PUT", body: data });
      closeForm();
      refresh();
      toast.add({
        title: "Sukses",
        description: "Data berhasil disimpan",
        color: "success",
        icon: "i-lucide-check-circle",
      });
    } catch (error: any) {
      if (error.response?.status === 422) {
        errors.value = error.response?._data?.errors || {};
      }
      toast.add({
        title: "Error",
        description: error.response?._data?.message,
        color: "error",
        icon: "i-lucide-x-circle",
      });
      throw error;
    }
  }

  async function remove(id: number | string) {
    try {
      await $api(`${url}/${id}`, { method: "DELETE" });
      showDeleteDialog.value = false;
      refresh();
      toast.add({
        title: "Sukses",
        description: "Data berhasil dihapus",
        color: "success",
        icon: "i-lucide-check-circle",
      });
    } catch (error: any) {
      toast.add({
        title: "Error",
        description: error.response?._data?.message,
        color: "error",
        icon: "i-lucide-x-circle",
      });
      throw error;
    }
  }

  function openForm(data: T) {
    errors.value = {};
    formState.value = data;
    showForm.value = true;
  }

  function closeForm() {
    formState.value = {} as T;
    errors.value = {};
    showForm.value = false;
  }

  function handlePageUpdate(p: number) {
    page.value = p;
  }

  async function handleFormSubmit(data: Record<string, any>) {
    if (data.id) {
      await update(data.id, data);
    } else {
      await create(data);
    }
  }

  function openDeleteDialog(data: T) {
    formState.value = data;
    showDeleteDialog.value = true;
  }

  return {
    // table related
    data,
    page,
    pageSize,
    filter,
    showDeleteDialog,
    refresh,
    handlePageUpdate,
    openDeleteDialog,

    // form related
    formState,
    errors,
    showForm,
    create,
    read,
    update,
    remove,
    openForm,
    closeForm,
    handleFormSubmit,
  };
}
