<script setup>
defineProps({
    games: { type: Array, default: () => [] },
    selectedIndex: { type: Number, default: -1 },
});

const $emit = defineEmits(['update:selectedIndex']);
</script>

<template>
    <ul class="list-group">
        <li
            class="list-group-item px-3"
            v-for="(game, index) in games"
            :class="{ active: index === selectedIndex }"
            :key="game.id"
            @click="$emit('update:selectedIndex', index)"
        >
            {{ game.title }}
        </li>
    </ul>
</template>