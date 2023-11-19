<script setup>
defineProps({
    game: { type: Object, required: true }
});
</script>

<template>
    <div>
        <div class="p-1">
            <strong>Title</strong>
            {{ game.title }}
        </div>
        <div class="p-1">
            <strong>Description</strong>
            {{ game.description }}
        </div>
        <div class="p-1"> 
            <strong>Price</strong>
            <i
                v-if="game.isfree"
            >
            Free 
            </i>
            <i
                v-else
            >
            {{ game.price }}
            </i>
        </div>
    </div>
</template>