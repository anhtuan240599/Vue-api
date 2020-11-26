<template>
  <div>
    <div v-for="(deck) in decks" :key="deck._id">
      <div>
        {{ deck.name }}
      </div>
      <img :src="deck.image" />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://localhost:3000/decks")
     
      return{
        decks : response.decks
      }
    } catch (err) {
      console.log(err);
    }
  },
}


</script>
