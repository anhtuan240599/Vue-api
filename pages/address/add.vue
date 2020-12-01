<template>
  <div>
    <div>
      <div>Order</div>
      
      <b> Add a country </b>
      <select v-model="country">
        <option v-for="country in countries" :key="country.alpha2Code" :value="country.name">{{country.name}}</option>
      </select>
      <b> Add a fullName </b>
      <input type="text" v-model="fullName" />
      <b> Add a City </b>
      <select v-model="city">
        <option v-for="country in countries" :key="country.alpha2Code" :value="country.capital">{{country.capital}}</option>
      </select>
      <input type="text" :value="$auth.$state.user.email" />
      <input type="submit" @click="onAddOrder" />
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({$axios}) {
    try {
      let response = await $axios.$get('http://localhost:3000/address/country')

      return{
        countries : response
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
    async onAddOrder() {
      try {
        let data = {
          country: this.country,
          fullName: this.fullName,
          city: this.city
        }

        let result = await this.$axios.$post("http://localhost:3000/address", data);
        
        if (result.success) {
          this.$router.push("/")
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
};
</script>
