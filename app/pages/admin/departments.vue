<template>
  <h1>Kelola Instansi</h1>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["sanctum:auth"],
  layout: "admin",
});
</script>
