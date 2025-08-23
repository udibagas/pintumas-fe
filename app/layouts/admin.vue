<template>
  <header class="bg-[#011729] h-[60px] flex items-center text-white px-4">
    <div class="flex-1">PINTUMAS Admin Panel</div>
    <div class="flex items-center gap-4">
      <UDropdownMenu :items="items" :ui="{ content: 'w-48' }">
        <UAvatar size="lg" alt="Admin" />
      </UDropdownMenu>
      <div>
        <div>{{ user?.name }} ({{ user?.role }})</div>
        <div class="text-sm">{{ user?.email }}</div>
      </div>
    </div>
  </header>

  <section class="flex">
    <aside class="w-[260px] h-[calc(100vh-60px)] p-8">
      <AdminMenu />
    </aside>
    <main class="flex-1 p-8">
      <slot />
    </main>
  </section>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
const { logout } = useSanctumAuth();
const user = useSanctumUser<{ name: string; email: string; role: string }>();

const items = ref<DropdownMenuItem[][]>([
  [
    {
      label: "Admin",
      avatar: { alt: "Admin" },
      type: "label",
    },
  ],
  [
    {
      label: "Profil",
      icon: "i-lucide-user",
      to: "/admin/profile",
    },
  ],
  [
    {
      label: "Logout",
      icon: "i-lucide-log-out",
      kbds: ["shift", "meta", "q"],
      onSelect: async (e) => {
        await logout();
      },
    },
  ],
]);
</script>
