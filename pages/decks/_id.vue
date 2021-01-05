<template>
  <div>
    <div>
      {{ deck.name }}
    </div>
    <div>
      <input type="submit" @click="onUpdateDeck" value="Submit" />
    </div>
    <div>Review</div>
    <form @submit.prevent="send">
      <b> Add a headline </b>
      <input type="text" v-model="headline" />
      <b> Review </b>
      <input type="text" v-model="body" />
      <input type="submit" @click="onAddReview" />
    </form>
    <div>
      <span> User Review </span>
      <ReviewSelection :deck="deck" :reviews="reviews" />
      <div v-if="commented">
        <img :src="$auth.$state.user.avatar">
        <div>
          Name :
          <span>{{ $auth.$state.user.email }}</span>
        </div>
        <div>
          Headline :
          <span>{{ headline }}</span>
        </div>
        <div>
          Body:
          <span>{{ body }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import ReviewSelection from "~/components/ReviewSelection";
const socket = io(process.env.baseApiUrl);
export default {
  middleware: "auth",
  auth: {
    strategies: {
      local: false
    }
  },
  component: {
    ReviewSelection
  },
  async asyncData({ $axios, params }) {
    try {
      let singleDeck = $axios.$get(`http://localhost:3000/decks/${params.id}`);
      let manyReview = $axios.$get(
        `http://localhost:3000/reviews/${params.id}`
      );
      const [deckResponse, reviewResponse] = await Promise.all([
        singleDeck,
        manyReview
      ]);
      return {
        deck: deckResponse.deck,
        reviews: reviewResponse.reviews
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      rating: 0,
      body: null,
      headline: null,
      selectedFile: null,
      fileName: null,
      user: null,
      commented: false
    };
  },
  methods: {
    send() {
      socket.emit("user-comment", {
        bd: this.body,
        hl: this.headline,
        user: `$auth.$state.user.email`
      });
      this.headline = null;
      this.body = null;
    },
    async onUpdateDeck() {
      try {
        let result = await this.$axios.$patch(
          `http://localhost:3000/decks/${this.$route.params.id}`,
          data
        );

        if (result.success) {
          this.$router.push("/decks");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async onAddReview() {
      try {
        let data = new FormData();
        data.append("headline", this.headline);
        data.append("body", this.body);

        let response = await this.$axios.$post(
          `http://localhost:3000/reviews/${this.$route.params.id}`,
          data,
        );

        if (response.success) {
          this.$router.push(`/decks/${this.$route.params.id}`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    socket.on("user-comment", data => {
      this.body = data.bd;
      this.headline = data.hl;
      this.user = data.user;
      this.commented = true;
    });
  }
};
</script>
