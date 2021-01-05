<style>
  .float-right {
    float : right ;
  }
</style>
<template>
    <div>
        <div v-for="mess in mess1" :key="mess._id">
            <div>
                <span :class="'float-right'">{{ mess.message }}</span>
                <br>
            </div>
        </div>
        <div v-for="mess in mess2" :key="mess._id">
            <div>
                <span>{{ mess.message }}</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props
        : ["user","mess1","mess2"]
    
}
</script>