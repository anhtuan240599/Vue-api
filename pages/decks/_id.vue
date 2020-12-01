<template>
  <div>
    <div>
      {{deck.name}}
    </div>
    <img  />
    <div>
      <span> Review </span>
      <ReviewSelection :deck="deck" :reviews="reviews" />
    </div>
  </div>
</template>

<script>
import ReviewSelection from "~/components/ReviewSelection"
export default {
  component:{
    ReviewSelection
  },
  async asyncData({ $axios, params }) {
    try {
      let singleDeck = $axios.$get(`http://localhost:3000/decks/${params.id}`);
      let manyReview = $axios.$get(`http://localhost:3000/reviews/${params.id}`);
      const [deckResponse, reviewResponse] = await Promise.all([
          singleDeck,
          manyReview
      ])
      return{
        deck : deckResponse.deck,
        reviews : reviewResponse.reviews  
      }

    } catch (err) {
      console.log(err);
    }
  }
};
</script>
