<template>
  <div>
    <h2>Profile</h2>
    <a href="#" @click="onLogout">Logout</a>
    <form>
    
      <div>
        <label>First Name</label>
       
      </div>
      <div>
        <label>Last Name</label>
        <input v-model="lastName" :placeholder="$auth.$state.user.lastName" />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          v-model="email"
          :placeholder="$auth.$state.user.email"
        />
      </div>
      <div>
        <label>Password</label>
        <input v-model="password" />
      </div>
      <button type="input" @click="onUpdateProfile">Submit</button>
    
    </form>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://localhost:3000/api/auth/user");

      console.log(response)

      return {
          users : response.user
      }


    } catch (err) {

    }
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async onUpdateProfile() {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      };
      try {
        let response = await this.$axios.$put(
          "http://localhost:3000/api/auth/user",
          data
        );
        if (response.success) {
            (this.firstName = ""),
            (this.lastName = ""),
            (this.email = ""),
            (this.password = "");

          await this.$auth.fetchUser();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async onLogout() {
      await this.$auth.logout();
    }
  }
};
</script>
