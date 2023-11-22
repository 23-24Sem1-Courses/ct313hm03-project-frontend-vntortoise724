<script setup>
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useAuthStore } from '@/store'; 

const $router = useRouter();

const LoginSchema = yup.object().shape({
    username: yup
        .string()
        .required("Please Enter your Username"),
    password: yup
        .string()
        .required("Please Enter your Password"),
});

function submitUser(values, { setErrors }) {
    const authStore = useAuthStore();
    const { username, password } = values;
    
    return authStore.login(username, password)
        .catch(error => setErrors({ apiError: error}));
}

function goToRegister(){
    $router.push({ name: 'register' })
}

</script>

<template>
    <Form
        @submit="submitUser"
        :validation-schema="LoginSchema"
    >
        <div class="form-group">
            <label for="username">Username</label>
            <Field
                name="username"
                type="text"
                class="form-control"
            />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <Field 
                name="password"
                type="password"
                class="form-control"
            />
        </div>

        <div class="form-group">
            <button class="btn btn-primary"> Login </button>
            <button type="button" class="ml-2 btn btn-danger" @click="goToRegister"> Register </button>
        </div>

        <div v-if="errors.apiError" class=" alert alert-danger mt-3 mb-0">{{ errors.apiError }}</div>
    </Form>
</template>

<style scoped>
@import '@/assets/form.css';
</style>