<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'

</script>

<template>
  <div class="min-h-screen">
    <!-- class="min-h-screen bg-ink-dots">-->
    <header>
      <div>
        <nav>
          <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->
        </nav>
      </div>
    </header>

    <RouterView />
    <Toaster />
  </div>

</template>
