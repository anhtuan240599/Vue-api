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
          <label >Description</label>
          <input type="text"  v-model="description" />
          <label>Owner</label>
          <input v-model="owner" />
          <label>Image</label>
          <input type="file" multiple @change="onFileSelected"/>
          <p> {{ fileName }}</p>
          <span @click="onAddDeck" >Add deck</span>
        </div>
      </form>
    </div>
  </h2>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      let ownerResponse = await $axios.$get("http://localhost:3000/api/auth/user");
       
      return {
        users: ownerResponse.users
      };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
      return {
          owner: null,
          name: "",
          description: "",
          selectedFile: null,
          fileName: ""

      }
  },
  methods: {
      onFileSelected(event) {
          this.selectedFile = event.target.files[1];
          this.fileName = event.target.files[1].name
      },
      async onAddDeck() {
          let data = new FormData();
          data.append("name", this.name)
          data.append("description", this.description)
          data.append("owner", this.owner)
          data.append("image", this.selectedFile, this.selectedFile.name)
          
          let result = await this.$axios.$post('http://localhost:3000/decks', data);
          
          this.$router.push("/")
      }
  }
};
</script>
