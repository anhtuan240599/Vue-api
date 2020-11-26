<template>
  <div>
    <div class="form-group">
      <input
        v-model="email"
        type="text"
        class="form-control"
        placeholder="Your email *"
        value=""
      />
    </div>
    <div class="form-group">
      <input
        v-model="password"
        type="text"
        class="form-control"
        placeholder="Your password*"
        value=""
      />
    </div>
    <button type="button" class="btnSubmit" @click="onLogin">Submit</button>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  auth: {
    strategies: {
      local: false
    }
  },
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async onLogin() {
      try {
        await this.$auth.loginWith("local", {
          data: {
            email: this.email,
            password: this.password
          }
        });
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
