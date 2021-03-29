<template>
  <h2>
    Ad new deck
    <div>
      <form>
        <div>
          <label>Seclect</label>
          <select v-model="name">
            <option value="Tuan">Tuan </option>
            <option value="Huynh">Huynh </option>
          </select>
          <label>Description</label>
          <input type="text" v-model="description" />
          <label>Image</label>
          <input type="file" multiple @change="onFileSelected" />
          <p>{{ selectedFile }}</p>
          <span @click="onAddDeck">Add deck</span>
        </div>
      </form>
    </div>
  </h2>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      let ownerResponse = await $axios.$get(
        "http://localhost:3000/api/auth/user"
      );

      return {
        users: ownerResponse.users
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      name: "",
      description: "",
      selectedFile: [],
      fileName: [],
      image: []
    };
  },
  methods: {
    onFileSelected(event) {
      this.image = event.target.files[0]
      this.selectedFile = event.target.files[0]

      console.log(typeof(this.image))
    },
    async onAddDeck() {
      let data = new FormData();
      data.append("name", this.name);
      data.append("title", this.description);
      data.append("image", this.image);

      let result = await this.$axios.$post("http://localhost:3000/decks", data);

      this.$router.push("/");
    }
  }
};
</script>
