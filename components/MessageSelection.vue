<style>
  .float-right {
    float : right ;
  }
</style>
<template>
    <div>
        <div v-for="message in mess" :key="message._id">
            <div>   
                <span :class="{ 'float-right': message.from === $auth.$state.user._id }">{{ message.message }}</span>
                <br>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    props
        : ["user","mess"]
    
}
</script>