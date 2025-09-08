<template>
  <div v-if="showResult" class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2 :class="['result-title', isCorrect ? 'correct' : 'incorrect']">
          {{ isCorrect ? 'Correct!' : isGameOver ? 'Game Over!' : 'Wrong!' }}
        </h2>
        <div class="mushroom-info">
          <img :src="mushroom.image" :alt="mushroom.name" class="result-image" />
          <h3 class="mushroom-name">{{ mushroom.englishName }}</h3>
          <p class="mushroom-latin">{{ mushroom.latinName }}</p>
        </div>
        <p v-if="!isCorrect && playerLives > 0" class="wrong-message">
          That's not the right mushroom. Try again!
        </p>
        <p v-if="playerLives === 0" class="game-over-message">
          You've run out of lives! Better luck next time.
        </p>
      </div>

      <div class="modal-body">
        <p class="description">{{ mushroom.description }}</p>

        <div class="game-stats">
          <div class="stat">
            <span class="stat-label">Score:</span>
            <span class="stat-value">{{ score }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Lives:</span>
            <span class="stat-value">{{ playerLives }}</span>
          </div>
          <div class="stat">
            <span class="stat-label">Level:</span>
            <span class="stat-value">{{ currentLevel }}</span>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button v-if="isCorrect" @click="nextQuestion" class="next-button">Next Question</button>
        <button v-else-if="isGameOver" @click="goToStart" class="ok-button">OK</button>
        <button v-else @click="restartGame" class="restart-button">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

// Use storeToRefs to maintain reactivity for reactive values
const {
  lastAnswer: mushroom,
  isGameOver,
  showResult,
  isCorrect,
  playerLives,
  score,
  currentLevel,
} = storeToRefs(gameStore)

// Destructure functions directly (they don't need storeToRefs)
const { nextQuestion: nextQuestionFn, restartCurrentGame, goToStartScreen } = gameStore

// Watch for changes in showResult
watch(
  showResult,
  (newValue) => {
    console.log('showResult changed to:', newValue)
  },
  { immediate: true },
)

const nextQuestion = () => {
  console.log('Next Question button clicked')
  console.log('Current showResult state:', showResult)
  nextQuestionFn()
  console.log('After nextQuestion call, showResult state:', showResult)
}

const restartGame = () => {
  console.log('Try Again button clicked')
  console.log('Current showResult state:', showResult)
  restartCurrentGame()
  console.log('After restartCurrentGame call, showResult state:', showResult)
}

const goToStart = () => {
  console.log('OK button clicked - going to start screen')
  goToStartScreen()
}

const handleOverlayClick = () => {
  // Prevent closing modal by clicking overlay
  // Modal only closes when clicking Next or Restart buttons
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  padding: 2rem 2rem 1rem;
  text-align: center;
  border-bottom: 1px solid #eee;
}

.result-title {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  font-weight: bold;
}

.result-title.correct {
  color: #4caf50;
}

.result-title.incorrect {
  color: #f44336;
}

.mushroom-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.result-image {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 8px;
  border: 2px solid #ddd;
}

.mushroom-name {
  font-size: 1.2rem;
  margin: 0 0 0.25rem 0;
  color: #333;
}

.mushroom-latin {
  font-size: 1rem;
  margin: 0;
  color: #666;
  font-style: italic;
}

.wrong-message,
.game-over-message {
  font-size: 1rem;
  color: #666;
  margin: 0.5rem 0 0 0;
  font-style: italic;
}

.game-over-message {
  color: #f44336;
  font-weight: 500;
}

.modal-body {
  padding: 1.5rem 2rem;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  margin: 0 0 1.5rem 0;
}

.game-stats {
  display: flex;
  justify-content: space-around;
  background: #d8d8d8;
  padding: 1rem;
  border-radius: 8px;
  margin: 0;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.modal-footer {
  padding: 1rem 2rem 2rem;
  text-align: center;
}

.next-button,
.restart-button,
.ok-button {
  background: #4caf50;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.next-button:hover,
.ok-button:hover {
  background: #45a049;
}

.restart-button {
  background: #f44336;
  font-weight: 600;
}

.restart-button:hover {
  background: #d32f2f;
}

@media (max-width: 480px) {
  .modal-content {
    margin: 0.5rem;
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .game-stats {
    flex-direction: column;
    gap: 0.5rem;
  }

  .stat {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
