<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "Dashboard",
      icon: "i-lucide-home",
      to: "/admin",
      class: "p-3",
    },
    {
      label: "Informasi",
      icon: "i-lucide-file-text",
      to: "/admin/posts",
      class: "p-3",
    },
    {
      label: "Pengumuman",
      icon: "i-lucide-megaphone",
      to: "/admin/announcements",
      class: "p-3",
    },
    {
      label: "Layanan",
      icon: "i-lucide-list-checks",
      to: "/admin/services",
      class: "p-3",
    },
    {
      label: "Peraturan",
      icon: "i-lucide-scale",
      to: "/admin/regulations",
      class: "p-3",
    },
    {
      label: "Supply Chains",
      icon: "i-lucide-link-2",
      to: "/admin/supply-chains",
      class: "p-3",
    },
    {
      label: "Komentar",
      icon: "i-lucide-message-square-more",
      to: "/admin/comments",
      class: "p-3",
    },
  ],
  [
    {
      label: "Instansi",
      icon: "i-lucide-building-2",
      to: "/admin/departments",
      class: "p-3",
    },
    {
      label: "Aplikasi",
      icon: "i-lucide-app-window",
      to: "/admin/apps",
      class: "p-3",
    },
    // {
    //   label: "Tags",
    //   icon: "i-lucide-tags",
    //   to: "/admin/tags",
    //   class: "p-3",
    // },
    {
      label: "Pengguna",
      icon: "i-lucide-shield-user",
      to: "/admin/users",
      class: "p-3",
    },
  ],
]);
</script>

<template>
  <UNavigationMenu orientation="vertical" :items="items" color="warning" />
</template>
