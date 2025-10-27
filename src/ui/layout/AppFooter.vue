<template>
  <footer class="footer">
    <div class="container footer-container">
      <p class="footer-text">
        © {{ currentYear }} IFT - I Forgot the Table. Proyecto personal.
      </p>
      <div class="footer-links">
        <a href="https://github.com" target="_blank" rel="noopener" class="footer-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2">
            <path
              d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  margin-top: auto;
  background-color: var(--bg-secondary);
  border-top: var(--border-normal) solid var(--border-color);
  padding: var(--space-8) 0;
}

.footer-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.footer-text {
  margin: 0;
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.footer-links {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.footer-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
  text-decoration: none;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.footer-link:hover {
  color: var(--color-primary);
  background-color: rgba(29, 78, 216, 0.1);
}

@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    text-align: center;
  }
}
</style>
