<template>
  <h1 class="text-2xl">Kelola Pengguna</h1>
  <div class="text-sm mb-8">Kelola pengguna aplikasi</div>

  <form @submit.prevent class="flex gap-4 mb-6">
    <u-input
      type="search"
      v-model="filter.search"
      placeholder="Cari pengguna..."
      class="w-full"
      icon="i-lucide-search"
    />

    <u-select
      v-model="filter.role"
      :items="['SEMUA', 'ADMIN', 'EDITOR', 'USER']"
      class="min-w-48"
      placeholder="Filter Role"
      icon="i-lucide-filter"
    />

    <u-button
      type="button"
      icon="i-lucide-plus"
      color="warning"
      variant="solid"
      @click="createUser"
      class="min-w-48"
    >
      Tambah Pengguna
    </u-button>
  </form>

  <UTable
    :data="data?.data ?? []"
    :columns="columns"
    class="flex-1 border-y border-y-gray-200"
  >
    <template #action-cell="{ row }">
      <UDropdownMenu :items="getDropdownActions(row.original)">
        <UButton
          icon="i-lucide-ellipsis"
          color="neutral"
          variant="ghost"
          aria-label="Actions"
          size="xs"
        />
      </UDropdownMenu>
    </template>
  </UTable>

  <div class="flex flex-wrap gap-4 mt-6 items-center justify-between">
    <div class="flex flex-wrap gap-2">
      <u-select
        v-model="pageSize"
        size="sm"
        :items="[10, 25, 50, 100]"
        class="min-w-16"
      />

      <UPagination
        size="sm"
        active-color="warning"
        :page="data?.current_page ?? 1"
        :items-per-page="data?.per_page ?? 10"
        :total="data?.total ?? 0"
        @update:page="(page) => handlePageUpdate(page)"
      />
    </div>

    <div>
      Halaman
      <u-input
        v-model="page"
        type="number"
        size="sm"
        min="1"
        class="mx-2 min-w-16"
        :max="data?.last_page ?? 1"
      />
      dari {{ data?.last_page ?? 1 }}
    </div>

    <div>
      Menampilkan {{ data?.from ?? 0 }} - {{ data?.to ?? 0 }} dari
      {{ data?.total ?? 0 }} data
    </div>
  </div>

  <lazy-confirm-dialog
    :show="showDeleteDialog"
    title="Hapus Pengguna"
    :message="`Apakah anda yakin ingin menghapus pengguna '${selectedUser?.name}'?`"
    @ok="handleDelete(selectedUser?.id)"
    @cancel="() => (showDeleteDialog = false)"
  />
</template>

<script setup lang="ts">
import { UInput } from "#components";
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import type { PaginatedData } from "~/types";

const toast = useToast();
const { $api } = useNuxtApp();

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

definePageMeta({
  middleware: ["sanctum:auth"],
  layout: "admin",
});

const columns: TableColumn<User>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { id: "action" },
];

const page = ref(1);
const pageSize = ref(10);
const filter = reactive({
  role: undefined,
  search: "",
});

const showDeleteDialog = ref(false);
const selectedUser = ref<User | null>(null);

const { data, refresh } = useApi<PaginatedData<User>>("/api/user", {
  query: computed(() => ({
    page: page.value,
    pageSize: pageSize.value,
    ...filter,
  })),
});

function handlePageUpdate(p: number) {
  page.value = p;
}

function createUser() {}

function openDeleteDialog(user: User) {
  selectedUser.value = user;
  showDeleteDialog.value = true;
}

async function handleDelete(id?: number) {
  if (!id) return;
  showDeleteDialog.value = false;
  try {
    await $api(`/api/user/${id}`, { method: "DELETE" });
    toast.add({
      title: "Sukses",
      description: "Berhasil menghapus pengguna",
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
  }

  refresh();
}

function getDropdownActions(user: User): DropdownMenuItem[][] {
  return [
    [
      {
        label: "Edit",
        icon: "i-lucide-edit",
        onSelect: () => {
          console.log(user);
        },
      },
      {
        label: "Hapus",
        icon: "i-lucide-trash",
        color: "error",
        onSelect: () => {
          openDeleteDialog(user);
        },
      },
    ],
  ];
}
</script>
