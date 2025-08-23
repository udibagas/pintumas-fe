<template>
  <h1>Kelola komentar</h1>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["sanctum:auth"],
  layout: "admin",
});
</script>
