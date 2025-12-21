<script setup lang="ts">
import { useAuthStore } from '../stores/auth.store'
const { user } = useAuthStore()
</script>

<template>
  <main>
    <h1>Home view</h1>
    <h2>Name: {{ user?.name }}</h2>
    <h2>Name: {{ user?.email }}</h2>
    <h2>Name: {{ user?.id }}</h2>
  </main>
</template>
