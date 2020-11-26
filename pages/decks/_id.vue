<template>
  <div>
    <div>
      {{ deck.name }}
    </div>
    <img :src="deck.image" />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params }) {
    try {
      let response = await $axios.$get(
        `http://localhost:3000/decks/${params.id}`
      );

      return {
        deck: response.deck
      };
    } catch (err) {
      console.log(err);
    }
  }
};
</script>
