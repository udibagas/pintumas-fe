<template>
  <header class="bg-[#011729] h-[60px] flex items-center text-white px-4">
    <div class="flex-1">PINTUMAS Admin Panel</div>
    <div class="flex items-center gap-4">
      <UDropdownMenu :items="items" :ui="{ content: 'w-48' }">
        <UAvatar size="lg" alt="Admin" />
      </UDropdownMenu>
      <div>
        <div>Administrator (Admin)</div>
        <div class="text-sm">admin@mail.com</div>
      </div>
    </div>
  </header>

  <section class="flex">
    <aside class="bg-gray-50 w-[260px] h-[calc(100vh-60px)] p-8">
      <AdminMenu />
    </aside>
    <main class="flex-1 bg-blue-50 p-8">
      <slot />
    </main>
  </section>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

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
      // kbds: ["shift", "meta", "q"],
    },
  ],
]);
</script>
