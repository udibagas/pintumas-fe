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
      @click="openForm({} as User)"
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

  <Pagination
    :page="page"
    :page-size="pageSize"
    :last-page="data?.last_page ?? 0"
    :from="data?.from ?? 0"
    :to="data?.to ?? 0"
    :total="data?.total ?? 0"
    @update:page="handlePageUpdate"
    @update:pageSize="(size) => (pageSize = size)"
  />

  <lazy-confirm-dialog
    :show="showDeleteDialog"
    title="Hapus Pengguna"
    :message="`Apakah anda yakin ingin menghapus pengguna '${formState?.name}'?`"
    @ok="remove(formState?.id!)"
    @cancel="() => (showDeleteDialog = false)"
  />

  <lazy-user-form
    :show="showForm"
    :form-state="formState"
    @close="showForm = false"
    @submit="handleFormSubmit"
    :description="formState ? 'Edit Pengguna' : 'Tambah Pengguna'"
    :errors="errors"
  />
</template>

<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";

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

const {
  // table related
  data,
  page,
  pageSize,
  filter,
  handlePageUpdate,
  showDeleteDialog,
  openDeleteDialog,

  // form related
  formState,
  errors,
  showForm,
  remove,
  openForm,
  handleFormSubmit,
} = useCrud<User>("/api/user");

function getDropdownActions(user: User): DropdownMenuItem[][] {
  return [
    [
      {
        label: "Edit",
        icon: "i-lucide-edit",
        onSelect: () => {
          openForm(user);
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
