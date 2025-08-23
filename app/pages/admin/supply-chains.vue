<template>
  <h1>Kelola Supply Chains</h1>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["sanctum:auth"],
  layout: "admin",
});
</script>
