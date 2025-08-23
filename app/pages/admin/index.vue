<template>
  <h1>Ini halaman index admin</h1>
</template>

<script setup>
definePageMeta({
  middleware: ["sanctum:auth"],
  layout: "admin",
});
</script>
