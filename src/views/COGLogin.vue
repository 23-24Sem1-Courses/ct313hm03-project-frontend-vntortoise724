<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import userService from '@/services/user.service';

const $router = useRouter();
const $route = useRoute();

const message = ref('');

async function onLogin(user){
    try {
        user.value = await userService.getUser(user);
        localStorage.setItem('token', user.data.token);
        message.value = 'Welcome to COG!';
        $route.push({ name: 'userInfo' });
    } catch (error) {
        console.log(error);
        $router.push({
            name: 'notfound',
            params: { pathMatch: $route.path.split('/').slice(1) },
            query: $route.query,
            hash: $route.hash,
        });
    }
}

</script>

<template>
    <div class="page">
        <h4>Login to COG</h4>
        <LoginForm 
            @submit:user="onLogin"
        />
        <p>{{ message }}</p>
    </div>
</template>