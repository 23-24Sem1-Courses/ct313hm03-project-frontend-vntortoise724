<script setup>
import { useRouter } from 'vue-router';

const $router = useRouter();

defineProps ({
    user: { type: Object, required: true}
});

function goToStore(){
    $router.push({ name: 'gamestore' });
}
</script>

<template>
    <div class="row mb-5">
        <div class="p-1">
            <strong>Username: </strong>
            {{ user.username }}
        </div>
        <div class="p-1">
            <strong>Full Name: </strong>
            {{ user.last_name }} {{ user.first_name }}
        </div>
        <div class="p-1">
            <strong>Email: </strong>
            {{ user.email }}
        </div>
        <div class="p-1">
            <button class="btn btn-primary">Edit Account</button>
            <button
                type="button"
                class="ml-2 btn btn-secondary"
                @click="goToStore"
            >
            Back to Store
            </button>
        </div>
    </div>
</template>