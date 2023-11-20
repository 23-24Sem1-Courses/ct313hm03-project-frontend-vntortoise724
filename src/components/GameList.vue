<script setup>
defineProps({
    game_list: { type: Array, default: () => [] },
    selectedIndex: { type: Number, default: -1 },
});

const $emit = defineEmits(['update:selectedIndex']);
</script>

<template>
    <ul class="list-group">
        <li class="list-group-item px-3" 
            v-for="(game, index) in game_list"
            :class="{ active: index === selectedIndex }"
            :key="game.game_id" 
            @click="$emit('update:selectedIndex', index)">
            {{ game.title }}
        </li>
    </ul>
</template>
