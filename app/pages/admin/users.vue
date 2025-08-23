<template>
  <u-card>
    <h1 class="text-2xl">Kelola Pengguna</h1>
    <div class="text-sm mb-8">Kelola pengguna aplikasi</div>

    <UTable :data="data?.data ?? []" :columns="columns" class="flex-1">
      <template #action-cell="{ row }">
        <UDropdownMenu :items="getDropdownActions(row.original)">
          <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
            aria-label="Actions"
            size="xs"
          />
        </UDropdownMenu>
      </template>
    </UTable>

    <div class="flex items-center justify-center my-4">
      <UPagination
        active-color="warning"
        :page="data?.current_page ?? 1"
        :items-per-page="data?.per_page ?? 10"
        :total="data?.total ?? 0"
        @update:page="(page) => handlePageUpdate(page)"
      />
    </div>
  </u-card>
</template>

<script setup lang="ts">
import type { DropdownMenuItem, TableColumn } from "@nuxt/ui";
import type { PaginatedData } from "~/types";

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

const { data } = await useApi<PaginatedData<User>>(`/api/user`, {
  query: computed(() => ({ page: page.value })),
});

function handlePageUpdate(p: number) {
  page.value = p;
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
        label: "Delete",
        icon: "i-lucide-trash",
        color: "error",
        onSelect: () => {
          console.log(user);
        },
      },
    ],
  ];
}
</script>
