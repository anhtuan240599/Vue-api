<template>
  <div>
    <div>
      <b>{{ deck.name }}</b>
    </div>
    <div>
      <b> {{ deck.description }} </b>
    </div>
   
    <div>
      <div>Review</div>
      <b> Add photo </b>
      <input type="file" @change="onFileSelected" />
      <p>{{fileName}}</p>
      <b> Add a headline </b>
      <input type="text" v-model="headline" />
      <b> Review </b>
      <input type="text" v-model="body" />
      <input type="text" :value="$auth.$state.user.email">
      <input type="submit" @click="onAddReview"/>
    </div>
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
  },
  data() {
    return {
      rating: 0,
      body: "",
      headline: "",
      selectedFile: null,
      fileName: null
    };
  },
  methods: {
    onFileSelected() {
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },
    async onAddReview() {
      try {
        let data = new FormData();
        data.append("headline",this.headline)
        data.append("body",this.body)
        data.append("image",this.selectedFile,this.selectedFile.name)

        let response = await this.$axios.$post(`http://localhost:3000/reviews/${this.$route.params.id}`,data)

        if(response.success) {
          this.$router.push(`/decks/${this.$route.params.id}`)
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
};
</script>
