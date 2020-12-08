
<template>
    <div>
        <div class="container register-form">
            <div class="form">
                <div class="form-content">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input v-model="name" type="text" class="form-control" placeholder="Your MSSV*" value=""/>
                            </div>
                            <div class="form-group">
                                <input v-model="email" type="text" class="form-control" placeholder="Your Email*" value=""/>
                            </div>
                            <div class="form-group">
                                <input v-model="password" type="text" class="form-control" placeholder="Your Password *" value=""/>
                            </div>
                            <select v-model="yearID">
                                <option v-for="year in years" :value="year._id" :key="year._id" >{{ year.schoolYear }}</option>
                            </select>
                        </div>
                    </div>
                    <button type="button" class="btnSubmit" @click="onRegister">Submit</button>
                </div>
            </div>
        </div>
        <h1> Have an account </h1>
        <b>
            <nuxt-link to="/login">Login</nuxt-link>
        </b>
    </div>
</template>

<script>

export default {
    middleware: "auth",
    auth: "guest",
    async asyncData({ $axios }) {
    try {
      let response = await $axios.$get(
        "http://localhost:3000/api/auth/year"
      );

      return {
        years: response.foundYear
      };
    } catch (err) {
      console.log(err);
    }
  },
    data() {
        return {
            name:"",
            yearID:"",
            email: "",
            password: "",
        }
    },
    methods: {
        async onRegister(){
            try {
                let data = {
                    name: this.name,
                    yearID : this.yearID,
                    email : this.email,
                    password : this.password
                }
                let response = await this.$axios.$post("http://localhost:3000/api/auth/register",data)

                console.log(response)

                if (response.success) {
                    this.$auth.loginWith("local", {
                        data: {
                            name: this.name,
                            password: this.password
                        }
                    })
                    this.$router.push("/")
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>