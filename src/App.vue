<script setup>
import GameScreen from './components/GameScreen.vue'
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1 class="app-title">🍄 MycoQuest</h1>
      <p class="app-subtitle">Test your mushroom knowledge!</p>
    </header>

    <main class="app-main">
      <GameScreen />
    </main>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  height: 100vh;
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 50%, #1b5e20 100%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-header {
  text-align: center;
  padding: 0.5rem;
  color: white;
  flex-shrink: 0;
}

.app-title {
  font-size: 1.3rem;
  margin: 0 0 0.5rem 0;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.app-subtitle {
  font-size: 1rem;
  margin: 0;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.app-main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: hidden;
}

@media (max-width: 768px) {
  .app-title {
    font-size: 1.2rem;
  }

  .app-subtitle {
    font-size: 0.9rem;
  }

  .app-header {
    padding: 0.75rem 0.5rem 0.25rem;
  }
}

@media (max-width: 480px) {
  .app-title {
    font-size: 1.1rem;
  }

  .app-subtitle {
    font-size: 0.8rem;
  }

  .app-header {
    padding: 0.5rem 0.25rem 0.125rem;
  }
}
</style>
