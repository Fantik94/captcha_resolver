import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Active les fonctions globales (describe, it, etc.)
    environment: 'jsdom', // Simule le DOM pour tester les composants React
  },
});
