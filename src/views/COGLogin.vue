<script setup>
import { ref } from 'vue';
import LoginForm from '@/components/LoginForm.vue';

const message = ref('');
</script>

<template>
    <div class="page">
        <h4>Login to COG</h4>
        <LoginForm />
        <p>{{ message }}</p>
    </div>
</template>