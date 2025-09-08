import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGameStore = defineStore('game', () => {
  // State
  const gameStarted = ref(false)
  const currentLevel = ref(1)
  const playerLives = ref(3)
  const score = ref(0)
  const gameOver = ref(false)
  const timeLeft = ref(60)
  const timer = ref(null)
  const showResult = ref(false)
  const lastAnswer = ref(null)
  const isCorrect = ref(false)

  // Mushroom data
  const mushrooms = ref([
    {
      id: 1,
      name: "Caesar's Mushroom (Amanita caesarea)",
      englishName: "Caesar's Mushroom",
      latinName: 'Amanita caesarea',
      image: '/src/assets/images/amanita_caesarea.png',
      description:
        'A choice edible mushroom with a bright orange cap and white gills. Known as the "Caesar\'s mushroom" and highly prized in Mediterranean cuisine.',
    },
    {
      id: 2,
      name: 'Panther Cap (Amanita pantherina)',
      englishName: 'Panther Cap',
      latinName: 'Amanita pantherina',
      image: '/src/assets/images/amanita_pantherina.png',
      description:
        'A highly toxic mushroom with a brown cap covered in white spots. Contains deadly toxins and should never be consumed.',
    },
    {
      id: 3,
      name: 'Honey Mushroom (Armillaria mellea)',
      englishName: 'Honey Mushroom',
      latinName: 'Armillaria mellea',
      image: '/src/assets/images/armillaria_mellea.png',
      description:
        'A parasitic mushroom that grows in clusters on wood. Edible when young, but can cause digestive issues in some people.',
    },
    {
      id: 4,
      name: 'Red-cracked Bolete (Boletus erythropus)',
      englishName: 'Red-cracked Bolete',
      latinName: 'Boletus erythropus',
      image: '/src/assets/images/boletus erythropus.png',
      description:
        'A bolete mushroom with a dark brown cap and red pores. Edible when young, but can cause digestive issues if consumed in large quantities.',
    },
    {
      id: 5,
      name: 'Cep (Boletus edulis)',
      englishName: 'Cep',
      latinName: 'Boletus edulis',
      image: '/src/assets/images/boletus.png',
      description:
        'A classic bolete mushroom with a brown cap and white stem. One of the most recognizable and commonly foraged edible mushrooms.',
    },
    {
      id: 6,
      name: 'Chanterelle (Cantharellus)',
      englishName: 'Chanterelle',
      latinName: 'Cantharellus',
      image: '/src/assets/images/cantharellus.png',
      description:
        'A chanterelle mushroom with a yellow-orange cap and false gills. Known for its excellent flavor and meaty texture when cooked.',
    },
    {
      id: 7,
      name: 'Golden Chanterelle (Cantharellus cibarius)',
      englishName: 'Golden Chanterelle',
      latinName: 'Cantharellus cibarius',
      image: '/src/assets/images/cantharellus_yellow.png',
      description:
        'The golden chanterelle, a highly prized edible mushroom with a distinctive funnel shape and fruity aroma. Excellent for cooking.',
    },
    {
      id: 8,
      name: "Dryad's Saddle (Cerioporus squamosus)",
      englishName: "Dryad's Saddle",
      latinName: 'Cerioporus squamosus',
      image: '/src/assets/images/cerioporus_squamosus.png',
      description:
        "The dryad's saddle, a large bracket fungus with a scaly cap. Edible when young and tender, often found on dead wood.",
    },
    {
      id: 9,
      name: 'Truffle (Choiromyces meandriformis)',
      englishName: 'Truffle',
      latinName: 'Choiromyces meandriformis',
      image: '/src/assets/images/choiromyces_meandriformis.png',
      description:
        'A subterranean fungus highly prized for its culinary value. Known for its intense aroma and flavor, often used in gourmet cooking.',
    },
    {
      id: 10,
      name: 'Horn of Plenty (Craterellus cornucopioides)',
      englishName: 'Horn of Plenty',
      latinName: 'Craterellus cornucopioides',
      image: '/src/assets/images/craterellus_cornucopioides.png',
      description:
        'A funnel-shaped mushroom with a dark, trumpet-like appearance. Excellent edible mushroom with a rich, earthy flavor.',
    },
    {
      id: 11,
      name: 'Enoki (Flammulina velutipes)',
      englishName: 'Enoki',
      latinName: 'Flammulina velutipes',
      image: '/src/assets/images/flammulina_velutipes.png',
      description:
        'A winter mushroom with long, thin stems and small caps. Popular in Asian cuisine and often used in soups and stir-fries.',
    },
    {
      id: 12,
      name: 'False Morel (Gyromitra esculenta)',
      englishName: 'False Morel',
      latinName: 'Gyromitra esculenta',
      image: '/src/assets/images/gyromitra_esculenta.png',
      description:
        'A brain-like mushroom that resembles a morel. Contains toxins and should be avoided unless properly prepared by experts.',
    },
    {
      id: 13,
      name: "Lion's Mane (Hericium erinaceus)",
      englishName: "Lion's Mane",
      latinName: 'Hericium erinaceus',
      image: '/src/assets/images/hericium_erinaceus.png',
      description:
        "A unique mushroom with cascading spines resembling a lion's mane. Edible and known for its seafood-like flavor and texture.",
    },
    {
      id: 14,
      name: 'Milk Cap (Lactarius)',
      englishName: 'Milk Cap',
      latinName: 'Lactarius',
      image: '/src/assets/images/lactarius.png',
      description:
        'A milk cap mushroom that exudes a milky latex when cut. Many species are edible, but some can be toxic, so identification is crucial.',
    },
    {
      id: 15,
      name: 'Saffron Milk Cap (Lactarius deliciosus)',
      englishName: 'Saffron Milk Cap',
      latinName: 'Lactarius deliciosus',
      image: '/src/assets/images/lactarius_deliciosus.png',
      description:
        'A colorful milk cap with orange and green tones. Edible and highly prized, especially in Mediterranean cuisine.',
    },
    {
      id: 16,
      name: 'Chicken of the Woods (Laetiporus sulphureus)',
      englishName: 'Chicken of the Woods',
      latinName: 'Laetiporus sulphureus',
      image: '/src/assets/images/laetiporus_sulphureus.png',
      description:
        'A bright orange bracket fungus that grows on trees. Edible when young and has a texture similar to chicken when cooked.',
    },
    {
      id: 17,
      name: 'Puffball (Lycoperdon perlatum)',
      englishName: 'Puffball',
      latinName: 'Lycoperdon perlatum',
      image: '/src/assets/images/lycoperdon_perlatum.png',
      description:
        'A round mushroom that releases spores when mature. Edible when young and white inside, but avoid if yellow or brown.',
    },
    {
      id: 18,
      name: 'Parasol Mushroom (Macrolepiota)',
      englishName: 'Parasol Mushroom',
      latinName: 'Macrolepiota',
      image: '/src/assets/images/macrolepiota.png',
      description:
        'A large mushroom with a distinctive scaly cap and ring on the stem. Edible and popular in European cuisine.',
    },
    {
      id: 19,
      name: 'Morel (Morchella)',
      englishName: 'Morel',
      latinName: 'Morchella',
      image: '/src/assets/images/morchella.png',
      description:
        'A highly prized edible mushroom with a distinctive honeycomb cap. Considered a delicacy and often very expensive.',
    },
    {
      id: 20,
      name: 'Garlic Mushroom (Mycetinis alliaceus)',
      englishName: 'Garlic Mushroom',
      latinName: 'Mycetinis alliaceus',
      image: '/src/assets/images/mycetinis_alliaceus.png',
      description:
        'A small mushroom with a strong garlic odor. Edible and often used as a flavoring agent in cooking.',
    },
    {
      id: 21,
      name: 'Oyster Mushroom (Pleurotus)',
      englishName: 'Oyster Mushroom',
      latinName: 'Pleurotus',
      image: '/src/assets/images/oyster.png',
      description:
        'A common cultivated mushroom with a fan-shaped cap. Mild flavor and versatile in cooking, often used as a meat substitute.',
    },
    {
      id: 22,
      name: 'Pink Oyster (Pleurotus)',
      englishName: 'Pink Oyster',
      latinName: 'Pleurotus',
      image: '/src/assets/images/oyster_rose.png',
      description:
        'A cultivated mushroom with a pink cap and oyster-like shape. Popular in Asian cuisine and easy to grow.',
    },
    {
      id: 23,
      name: 'Yellow Oyster (Pleurotus)',
      englishName: 'Yellow Oyster',
      latinName: 'Pleurotus',
      image: '/src/assets/images/oyster_yellow.png',
      description:
        'A cultivated mushroom with a yellow cap and oyster-like shape. Mild flavor and tender texture when cooked.',
    },
    {
      id: 24,
      name: 'Stinkhorn (Phallus)',
      englishName: 'Stinkhorn',
      latinName: 'Phallus',
      image: '/src/assets/images/phallus.png',
      description:
        'A distinctive mushroom with a phallic shape and foul odor. Not typically consumed due to its smell and texture.',
    },
    {
      id: 25,
      name: 'Green Russula (Russula aeruginea)',
      englishName: 'Green Russula',
      latinName: 'Russula aeruginea',
      image: '/src/assets/images/russula_aeruginea.png',
      description:
        'A russula mushroom with a green cap. Many russula species are edible, but some are toxic, so proper identification is essential.',
    },
    {
      id: 26,
      name: 'Yellow Russula (Russula claroflava)',
      englishName: 'Yellow Russula',
      latinName: 'Russula claroflava',
      image: '/src/assets/images/russula_claroflava.png',
      description:
        'A russula mushroom with a yellow cap. Edible when properly identified, but many russula species look similar.',
    },
    {
      id: 27,
      name: 'Shrimp Russula (Russula xerampelina)',
      englishName: 'Shrimp Russula',
      latinName: 'Russula xerampelina',
      image: '/src/assets/images/russula_xerampelina.png',
      description:
        'A russula mushroom with a distinctive shrimp-like odor when mature. Edible and considered one of the better russula species.',
    },
    {
      id: 28,
      name: 'Scarlet Cup (Sarcoscypha coccinea)',
      englishName: 'Scarlet Cup',
      latinName: 'Sarcoscypha coccinea',
      image: '/src/assets/images/sarcoscypha_coccinea.png',
      description:
        'A small, bright red cup fungus that grows on dead wood. Edible but not commonly collected due to its small size.',
    },
    {
      id: 29,
      name: "Devil's Bolete (Rubroboletus satanas)",
      englishName: "Devil's Bolete",
      latinName: 'Rubroboletus satanas',
      image: '/src/assets/images/satanas.png',
      description:
        'A toxic bolete mushroom with a red cap and stem. Contains toxins that cause severe gastrointestinal symptoms.',
    },
    {
      id: 30,
      name: 'Slippery Jack (Suillus luteus)',
      englishName: 'Slippery Jack',
      latinName: 'Suillus luteus',
      image: '/src/assets/images/suillus_luteus.png',
      description:
        'A bolete mushroom with a slimy cap and distinctive ring. Edible when the slimy skin is removed before cooking.',
    },
    {
      id: 31,
      name: 'Red-cracked Bolete (Xerocomellus chrysenteron)',
      englishName: 'Red-cracked Bolete',
      latinName: 'Xerocomellus chrysenteron',
      image: '/src/assets/images/xerocomellus_chrysenteron.png',
      description:
        'A bolete mushroom with a cracked cap surface. Edible but not considered choice, often used in mixed mushroom dishes.',
    },
    {
      id: 32,
      name: 'Peppery Bolete (Chalciporus piperatus)',
      englishName: 'Peppery Bolete',
      latinName: 'Chalciporus piperatus',
      image: '/src/assets/images/сhalciporus_piperatus.png',
      description:
        'A small bolete mushroom with a peppery taste. Used as a spice rather than a main ingredient due to its strong flavor.',
    },
    {
      id: 33,
      name: 'Cortinariaceae',
      englishName: 'Cortinariaceae',
      latinName: 'Cortinariaceae',
      image: '/src/assets/images/cortinariaceae.png',
      description:
        'A family of mushrooms that includes many species. Some are edible, but many are toxic, so expert identification is crucial.',
    },
    {
      id: 34,
      name: 'Entoloma Clypeatum',
      englishName: 'Entoloma Clypeatum',
      latinName: 'Entoloma Clypeatum',
      image: '/src/assets/images/entoloma_clypeatum.png',
      description:
        'A bolete mushroom with a cracked cap surface. Edible but not considered choice, often used in mixed mushroom dishes.',
    },
    {
      id: 35,
      name: 'Galerina Marginata',
      englishName: 'Galerina Marginata',
      latinName: 'Galerina Marginata',
      image: '/src/assets/images/galerina_marginata.png',
      description:
        'A small bolete mushroom with a peppery taste. Used as a spice rather than a main ingredient due to its strong flavor.',
    },
    {
      id: 36,
      name: 'Morchella Conica',
      englishName: 'Morchella Conica',
      latinName: 'Morchella Conica',
      image: '/src/assets/images/morchella_conica.png',
      description:
        'A family of mushrooms that includes many species. Some are edible, but many are toxic, so expert identification is crucial.',
    },
    {
      id: 37,
      name: 'Stropharia Aeruginosa',
      englishName: 'Stropharia Aeruginosa',
      latinName: 'Stropharia Aeruginosa',
      image: '/src/assets/images/stropharia_aeruginosa.png',
      description:
        'A bolete mushroom with a cracked cap surface. Edible but not considered choice, often used in mixed mushroom dishes.',
    },
    {
      id: 38,
      name: 'Tricholoma Equestre',
      englishName: 'Tricholoma Equestre',
      latinName: 'Tricholoma Equestre',
      image: '/src/assets/images/tricholoma_equestre.png',
      description:
        'A small bolete mushroom with a peppery taste. Used as a spice rather than a main ingredient due to its strong flavor.',
    },
    {
      id: 39,
      name: 'Tricholoma portentosum',
      englishName: 'Tricholoma portentosum',
      latinName: 'Tricholoma portentosum',
      image: '/src/assets/images/tricholoma_portentosum.png',
      description:
        'A family of mushrooms that includes many species. Some are edible, but many are toxic, so expert identification is crucial.',
    },
  ])

  // Current question data
  const currentQuestion = ref(null)
  const currentOptions = ref([])
  const correctAnswer = ref(null)

  // Computed
  const isGameOver = computed(() => playerLives.value <= 0 || gameOver.value)

  // Actions
  function startGame() {
    console.log('startGame() called')
    console.log('Setting gameStarted to true')
    gameStarted.value = true
    console.log('gameStarted is now:', gameStarted.value)
    console.log('Calling startNewGame()')
    startNewGame()
  }

  function startNewGame() {
    console.log('startNewGame() called')
    console.log('Current showResult state:', showResult.value)

    // Clear any existing timer
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }

    console.log('Resetting game state...')
    currentLevel.value = 1
    playerLives.value = 3
    score.value = 0
    gameOver.value = false

    console.log('Setting showResult to false')
    showResult.value = false
    console.log('showResult is now:', showResult.value)

    lastAnswer.value = null
    isCorrect.value = false

    console.log('Game state reset, generating question...')
    generateQuestion()
  }

  function restartCurrentGame() {
    console.log('restartCurrentGame() called - keeping current lives')
    console.log('Current lives:', playerLives.value)

    // Clear any existing timer
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }

    // Don't reset lives, score, or level - just close modal and continue
    showResult.value = false
    lastAnswer.value = null
    isCorrect.value = false

    console.log('Closing modal and continuing current game')
    generateQuestion()
  }

  function goToStartScreen() {
    console.log('Going back to start screen')
    gameStarted.value = false
    showResult.value = false
    gameOver.value = false
    lastAnswer.value = null
    isCorrect.value = false

    // Clear timer
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }

  function generateQuestion() {
    console.log('Generating new question...')
    console.log('Available mushrooms:', mushrooms.value.length)

    // Reset timer
    timeLeft.value = 60
    clearInterval(timer.value)

    // Start countdown
    timer.value = setInterval(() => {
      timeLeft.value--
      if (timeLeft.value <= 0) {
        handleTimeUp()
      }
    }, 1000)

    // Select random mushroom as correct answer
    const shuffled = [...mushrooms.value].sort(() => Math.random() - 0.5)
    correctAnswer.value = shuffled[0]
    currentQuestion.value = correctAnswer.value

    // Select 3 other random mushrooms as wrong options
    const wrongOptions = shuffled.slice(1, 4)

    // Combine correct answer with wrong options and shuffle
    currentOptions.value = [correctAnswer.value, ...wrongOptions].sort(() => Math.random() - 0.5)

    console.log('Question generated:')
    console.log('Current question:', currentQuestion.value)
    console.log('Current options:', currentOptions.value)
    console.log('Correct answer:', correctAnswer.value)
  }

  function selectAnswer(selectedMushroom) {
    console.log('selectAnswer called with:', selectedMushroom)
    console.log('Correct answer:', correctAnswer.value)
    console.log('Current timer:', timer.value)

    clearInterval(timer.value)

    isCorrect.value = selectedMushroom.id === correctAnswer.value.id
    lastAnswer.value = selectedMushroom

    console.log('Answer is correct:', isCorrect.value)
    console.log('Current score:', score.value)
    console.log('Current lives:', playerLives.value)

    if (isCorrect.value) {
      score.value += 10
      console.log('Score increased to:', score.value)
      playSuccessSound()
    } else {
      playerLives.value--
      console.log('Lives decreased to:', playerLives.value)
      playErrorSound()

      if (playerLives.value <= 0) {
        gameOver.value = true
        console.log('Game over!')
      }
    }

    console.log('Showing result modal')
    showResult.value = true
  }

  function handleTimeUp() {
    clearInterval(timer.value)
    playerLives.value--
    isCorrect.value = false
    lastAnswer.value = correctAnswer.value

    if (playerLives.value <= 0) {
      gameOver.value = true
    }

    showResult.value = true
  }

  function nextQuestion() {
    console.log('nextQuestion() called')
    console.log('isGameOver:', isGameOver.value)

    if (isGameOver.value) {
      console.log('Game is over, returning early')
      return
    }

    console.log('Setting showResult to false')
    showResult.value = false
    console.log('showResult is now:', showResult.value)

    console.log('Incrementing level from', currentLevel.value, 'to', currentLevel.value + 1)
    currentLevel.value++

    console.log('Generating new question')
    generateQuestion()
  }

  function playSuccessSound() {
    // Simple beep sound - in a real app you'd use actual audio files
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1)

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  function playErrorSound() {
    // Simple error beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(200, audioContext.currentTime)
    oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1)

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  return {
    // State
    gameStarted,
    currentLevel,
    playerLives,
    score,
    gameOver,
    timeLeft,
    showResult,
    lastAnswer,
    isCorrect,
    mushrooms,
    currentQuestion,
    currentOptions,
    correctAnswer,

    // Computed
    isGameOver,

    // Actions
    startGame,
    startNewGame,
    restartCurrentGame,
    goToStartScreen,
    generateQuestion,
    selectAnswer,
    nextQuestion,
  }
})
