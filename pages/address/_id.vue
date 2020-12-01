<template>
  <div>
    <div>
      <div>Order</div>
      
      <b> Add a country </b>
      <select v-model="country">
        <option v-for="country in countries" :key="country.alpha2Code" :value="country.name" :placeholder="address.country">{{country.name}}</option>
      </select>
      <b> Add a fullName </b>
      <input type="text" v-model="fullName" :placeholder="address.fullName"/>
      <b> Add a City </b>
      <select v-model="city">
        <option v-for="country in countries" :key="country.alpha2Code" :value="country.capital" :placeholder="address.city">{{country.capital}}</option>
      </select>
      <input type="text" :value="$auth.$state.user.email" />
      <input type="submit" @click="onUpdateOrder" />
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({$axios , params}) {
    try {
      let response = $axios.$get('http://localhost:3000/address/country')
      let oneAddress = $axios.$get(`http://localhost:3000/address/${params.id}`)

      let [countriesResponse, addressResponse] = await Promise.all([
          response,
          oneAddress
      ])

      return{
        countries : countriesResponse,
        address : addressResponse.address
      }
    }catch(err) {
      console.log(err)
    }
  },

  data() {
    return {
      country: "",
      fullName: "",
      city: ""
    };
  },
  methods: {
    async onUpdateOrder() {
      try {
        let data = {
          country: this.country,
          fullName: this.fullName,
          city: this.city
        }

        let result = await this.$axios.$put(`http://localhost:3000/address/${this.$route.params.id}`, data);
        
        if (result.success) {
          this.$router.push("/address")
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
};
</script>