<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UserForm from '@/components/UserForm.vue';
import userService from '@/services/user.service';

const $router = useRouter();

const message = ref('');

async function onAddUser(user){
    try{
        await userService.createUser(user);
        message.value = 'Successfully Registered.';
        $router.push({ name: 'gamestore' });
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <div class="page">
        <h4> Register New Account </h4>
        <UserForm
            @submit:user="onAddUser"
        />
        <p>{{ message }}</p>
    </div>
</template>