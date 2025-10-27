<template>
  <header class="header">
    <div class="container header-container">
      <router-link to="/" class="logo">
        <svg class="logo-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        <span class="logo-text">IFT</span>
      </router-link>

      <nav class="nav">
        <div class="nav-left" v-if="authStore.isAuthenticated">
          <router-link to="/" class="nav-link">Dashboard</router-link>
        </div>
        <div class="nav-left" v-else></div>
        <div class="nav-right">
          <router-link to="/login" class="nav-link" v-if="!authStore.isAuthenticated">Login</router-link>
          <BaseButton variant="ghost" size="sm" @click="authStore.logout" v-else>Logout</BaseButton>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import BaseButton from '../components/BaseButton.vue';
const authStore = useAuthStore()
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background-color: var(--bg-secondary);
  border-bottom: var(--border-normal) solid var(--border-color);
  box-shadow: var(--shadow-md);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-4);
  padding-bottom: var(--space-4);
  gap: var(--space-6);
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.logo:hover {
  transform: translateY(-2px);
}

.logo-icon {
  color: var(--color-primary);
}

.logo-text {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  text-shadow: 2px 2px 0 var(--shadow-color);
}

.nav {
  display: flex;
  align-items: center;
  /* gap: var(--space-6); */
  flex: 1;
  justify-content: space-between;
}

.nav-link {
  position: relative;
  font-size: var(--text-base);
  font-weight: var(--font-weight-semibold);
  color: var(--text-secondary);
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.nav-left {
  margin: 0 auto; /* centra */
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: width var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-primary);
  background-color: rgba(29, 78, 216, 0.1);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.router-link-active {
  color: var(--color-primary);
  background-color: rgba(29, 78, 216, 0.15);
}

.nav-link.router-link-active::after {
  width: 100%;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }

  .header-container {
    gap: var(--space-3);
  }
}
</style>
