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
            {{ game.price }}
        </div>
    </div>
</template>