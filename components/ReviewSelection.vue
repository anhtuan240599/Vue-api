<template>
    <div>
        <div v-for="review in reviews" :key="review._id">
            <div>
                Name :
                <span>{{ review.user.name }}</span>
            </div>
            <div>
                Headline :
                <span>{{ review.headline }}</span>
            </div>
            <div>
                Body:
                <span>{{ review.body }}</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props
        : ["deck","reviews"]
    
}
</script>