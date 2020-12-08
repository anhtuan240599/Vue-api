<template>
  <div>
    <div>
        {{user.email}}
    </div>
    <img  />
    <div>
      
      
    </div>
  </div>
</template>

<script>

export default {
  async asyncData({ $axios, params }) {
    try {
      let response = await $axios.$get(`http://localhost:3000/api/auth/${params.id}`);

        console.log(response)
      return{
        user : response.user
      }
        
    } catch (err) {
      console.log(err);
    }
  }
};
</script>
