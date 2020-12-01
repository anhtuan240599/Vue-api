<template>
    <div>
        <div>
            
        </div>
        <div v-for="(address,index) in addresses" :key="address._id">
            <b> {{message}}</b>
            <div>
                FullName:
                <b>{{ address.fullName }}</b>
            </div>
            <div>
                Country:
                <b>{{ address.country }}</b>
            </div>
            <div>
                City:
                <b>{{ address.city }}</b>
            </div>
            <div>
                <nuxt-link :to="`/address/${address._id}`">Edit</nuxt-link>
                <a href="#" @click="onDeleteAddress(address._id, index)">Delete</a>
                <a href="#" @click="onSetDefault(address._id)">Set Default</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    async asyncData({ $axios }) {
        try {
            let response = await $axios.$get('http://localhost:3000/address')
            console.log(response)
            return {
                addresses: response.address
               
            }
        } catch (err) {
            console.log(err)
        }
    },
    data() {
        return {
            message: ""
        }
    },
    methods: {
        async onDeleteAddress(id) {
            try{
                let response = await this.$axios.$delete(`http://localhost:3000/address/${id}`)

                if(response.success) {
                    this.message = response.message
                    this.addresses.splice(index, 1)
                }
            }catch (err) {
                this.message = err.message
                console.log(err)
            }
        },
        async onSetDefault(id) {
            try {
                let response = await this.$axios.$put(`http://localhost:3000/address/set/default`,{id : id})

                if (response.success) {
                    this.message = response.message
                    await this.$auth.fetchUser();
                }
            } catch (err) {
                this.message = err.message
                console.log(err)
            }

        }
    },
}
</script>