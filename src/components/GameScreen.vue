<template>
  <div class="game-screen">
    <!-- Start Screen -->
    <div v-if="!gameStarted" class="start-screen">
      <div class="start-content">
        <p class="start-description">
          Test your mushroom knowledge!<br />
          Match the mushroom name with the correct image.
        </p>
        <div class="game-rules">
          <h3>How to Play:</h3>
          <ul>
            <li>You'll see 4 mushroom images and 1 name</li>
            <li>Click the correct image that matches the name</li>
            <li>You have 11 seconds per question</li>
            <li>You have 3 lives - wrong answers cost a life</li>
            <li>Try to get the highest score!</li>
          </ul>
        </div>
        <button @click="handleStartGame" class="start-button">Start Game</button>
      </div>
    </div>

    <!-- Main Game Screen -->
    <div v-if="gameStarted && !showResult" class="game-content">
      <!-- Game Header -->
      <div class="game-header">
        <div class="game-info">
          <div class="info-item">
            <span class="label">Level:</span>
            <span class="value">{{ currentLevel }}</span>
          </div>
          <div class="info-item">
            <span class="label">Lives:</span>
            <span class="value lives">{{ playerLives }}</span>
          </div>
          <div class="info-item">
            <span class="label">Score:</span>
            <span class="value">{{ score }}</span>
          </div>
        </div>

        <!-- Timer -->
        <div class="timer-container">
          <div class="timer" :class="{ 'timer-warning': timeLeft <= 3 }">
            {{ timeLeft }}
          </div>
          <div class="timer-label">seconds left</div>
        </div>
      </div>

      <!-- Question -->
      <div class="question-section">
        <h2 class="question-title">Which mushroom is "{{ currentQuestion?.name }}"?</h2>
      </div>

      <!-- Answer Options - 2x2 Grid -->
      <div class="options-grid">
        <MushroomOption
          v-for="mushroom in currentOptions"
          :key="mushroom.id"
          :mushroom="mushroom"
          :disabled="showResult"
          @select="selectAnswer"
        />
      </div>
    </div>

    <!-- Result Modal -->
    <ResultModal />

    <!-- Game Over Modal -->
    <div v-if="isGameOver && !showResult" class="game-over-modal">
      <div class="game-over-content">
        <h1 class="game-over-title">Game Over!</h1>
        <div class="final-stats">
          <div class="stat">
            <span class="stat-label">Final Score:</span>
            <span class="stat-value">{{ score }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Level Reached:</span>
            <span class="stat-value">{{ currentLevel }}</span>
          </div>
        </div>
        <button @click="goToStartScreen" class="ok-button">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game'
import MushroomOption from './MushroomOption.vue'
import ResultModal from './ResultModal.vue'

const gameStore = useGameStore()

// Use storeToRefs to maintain reactivity for reactive values
const {
  gameStarted,
  currentLevel,
  playerLives,
  score,
  timeLeft,
  currentQuestion,
  currentOptions,
  showResult,
  isGameOver,
} = storeToRefs(gameStore)

// Destructure functions directly (they don't need storeToRefs)
const { startGame, selectAnswer, goToStartScreen } = gameStore

const handleStartGame = () => {
  console.log('Start Game button clicked!')
  startGame()
}

onMounted(() => {
  // Component mounted, game will start when user clicks "Start Game"
  console.log('GameScreen mounted, gameStarted:', gameStarted)
  console.log('Waiting for user to click Start Game button')
})

// Watch for changes in gameStarted for debugging
watch(
  gameStarted,
  (newGameStarted) => {
    console.log('gameStarted changed:', newGameStarted)
  },
  { immediate: true },
)

onUnmounted(() => {
  // Clean up timer when component unmounts
  if (gameStore.timer) {
    clearInterval(gameStore.timer)
  }
})
</script>

<style scoped>
.game-screen {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #4caf50 0%, #2e7d32 50%, #1b5e20 100%);
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.game-content {
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 50%, #a5d6a7 100%);
  border-radius: 15px;
  padding: 1rem;
  max-width: 90vw;
  max-height: 85vh;
  width: 100%;
  height: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 500px;
}

.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #e0e0e0;
  flex-shrink: 0;
}

.game-info {
  display: flex;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.label {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
}

.value {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.value.lives {
  color: #f44336;
}

.timer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.timer {
  background: #4caf50;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: bold;
  min-width: 50px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.timer-warning {
  background: #f44336;
  animation: pulse 1s infinite;
  transform: scale(1.1);
}

.timer-label {
  font-size: 0.6rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@keyframes pulse {
  0% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1.1);
  }
}

.question-section {
  text-align: center;
  margin-bottom: 0.75rem;
  flex-shrink: 0;
}

.question-title {
  font-size: 1rem;
  color: #2e7d32;
  font-weight: 600;
}

.question-image {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.mushroom-question-image {
  width: 150px;
  height: 150px;
  object-fit: contain;
  border: 3px solid #ddd;
  border-radius: 12px;
  background: #f9f9f9;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1.2rem;
  max-width: 800px;
  margin: 0 auto;
  flex: 1;
  min-height: 500px;
}

/* Start Screen */
.start-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.start-content {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.start-description {
  font-size: 1.2rem;
  color: #666;
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

.game-rules {
  text-align: left;
  margin: 0 0 2rem 0;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
}

.game-rules h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
}

.game-rules ul {
  margin: 0;
  padding-left: 1.5rem;
  color: #666;
  line-height: 1.6;
}

.game-rules li {
  margin-bottom: 0.5rem;
}

.start-button {
  background: #4caf50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
}

.start-button:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(76, 175, 80, 0.4);
}

/* Game Over Modal */
.game-over-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
}

.game-over-content {
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
}

.game-over-title {
  font-size: 2.5rem;
  color: #f44336;
  margin: 0 0 2rem 0;
  font-weight: bold;
}

.final-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.stat-label {
  font-size: 1rem;
  color: #666;
  font-weight: 500;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.ok-button {
  background: #4caf50;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  width: 100%;
}

.ok-button:hover {
  background: #45a049;
}

/* Responsive Design */
@media (max-width: 768px) {
  .game-screen {
    padding: 0.25rem;
  }

  .game-content {
    padding: 0.75rem;
    border-radius: 10px;
  }

  .game-header {
    flex-direction: column;
    gap: 0.25rem;
    text-align: center;
    margin-bottom: 0.25rem;
  }

  .game-info {
    justify-content: center;
    gap: 0.75rem;
  }

  .options-grid {
    gap: 0.75rem;
    max-width: 600px;
    min-height: 400px;
  }

  .question-title {
    margin-bottom: 0.5rem;
  }

  .start-content {
    padding: 2rem;
    margin: 0.5rem;
  }

  .start-description {
    font-size: 1rem;
  }

  .game-rules {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .game-screen {
    padding: 0.125rem;
  }

  .game-content {
    padding: 0.5rem;
    border-radius: 8px;
  }

  .game-info {
    gap: 0.75rem;
  }

  .question-title {
    font-size: 0.8rem;
  }

  .options-grid {
    gap: 0.5rem;
    max-width: 400px;
    min-height: 350px;
  }

  .mushroom-option {
    padding: 0.5rem;
    height: 200px;
  }

  .mushroom-image {
    width: 140px;
    height: 140px;
  }

  .image-placeholder {
    width: 140px;
    height: 140px;
    font-size: 4rem;
  }

  .timer {
    font-size: 1rem;
    padding: 0.2rem 0.6rem;
  }

  .start-content {
    padding: 1.5rem;
    margin: 0.25rem;
  }

  .start-description {
    font-size: 0.9rem;
  }

  .start-button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
