<template>
  <button class="mushroom-option" @click="handleClick" :disabled="disabled">
    <div v-if="imageError" class="image-placeholder">🍄</div>
    <img
      v-else
      :src="mushroom.image"
      :alt="mushroom.name"
      class="mushroom-image"
      @error="handleImageError"
      @load="handleImageLoad"
    />
  </button>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  mushroom: {
    type: Object,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['select'])

const imageError = ref(false)

const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src)
  console.error('Mushroom:', props.mushroom)
  imageError.value = true
}

const handleImageLoad = (event) => {
  console.log('Image loaded successfully:', event.target.src)
  imageError.value = false
}

const handleClick = () => {
  console.log('Mushroom clicked:', props.mushroom.name)
  console.log('Button disabled:', props.disabled)
  if (!props.disabled) {
    console.log('Emitting select event with mushroom:', props.mushroom)
    emit('select', props.mushroom)
  } else {
    console.log('Button is disabled, not emitting event')
  }
}
</script>

<style scoped>
.mushroom-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.8rem;
  border: 3px solid #ddd;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  height: 235px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.mushroom-option:hover:not(:disabled) {
  border-color: #4caf50;
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.mushroom-option:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.mushroom-image {
  width: 180px;
  height: 180px;
  object-fit: contain;
  border-radius: 8px;
}

.image-placeholder {
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  background: #f0f0f0;
  border-radius: 8px;
}
</style>
