
<template>
    <div>
        <div class="container register-form">
            <div class="form">
                <div class="form-content">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input v-model="firstName" type="text" class="form-control" placeholder="Your first name *" value=""/>
                            </div>
                            <div class="form-group">
                                <input v-model="lastName" type="text" class="form-control" placeholder="Your last name*" value=""/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <input v-model="email" type="text" class="form-control" placeholder="Your Email*" value=""/>
                            </div>
                            <div class="form-group">
                                <input v-model="password" type="text" class="form-control" placeholder="Your Password *" value=""/>
                            </div>
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
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    },
    methods: {
        async onRegister(){
            try {
                let data = {
                    firstName: this.firstName,
                    lastName : this.lastName,
                    email : this.email,
                    password : this.password
                }
                let response = await this.$axios.$post("http://localhost:3000/api/auth/register",data)

                console.log(response)

                if (response.success) {
                    this.$auth.loginWith("local", {
                        data: {
                            email: this.email,
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