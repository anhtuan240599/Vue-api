<template>
  <div>
    <div class="form-group">
      <input
        v-model="name"
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
    <div>
      <div>
        Quên mật khẩu
      </div>
      <input
        v-model="email"
        type="text"
        class="form-control"
        placeholder="Your email *"
        value=""
      />
      <button type="button" class="btnLostPass" @click="onLostPass">Submit</button>
      <b> {{message}} </b>
    </div>
    
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
      email: "",
      message: "",
      login: {
        name: "",
        password: "",
      }
    };
  },
  methods: {
    async onLogin() {
      try {
        await this.$auth.loginWith("local", {
          data: {
            name: this.name,
            password: this.password
          }
        });
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
    async onLostPass() {
      try {
        let data = {
          email : this.email
        }
        let result = await this.$axios.$post("http://localhost:3000/api/auth/lostPassword",data)
        console.log(result.message)
        if (result.success) {
          this.message = result.message
        }
      } catch (err) {
        this.message = "Khong tim thay tai khoan co email nay"

      }
      
    }
  }
};
</script>
