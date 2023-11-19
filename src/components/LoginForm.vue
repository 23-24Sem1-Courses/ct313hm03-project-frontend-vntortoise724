<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate'; 

const $router = useRouter();

const props = defineProps({
    initialAccount: { type: Object, required: true},
});

const $emit = defineEmits(['submit: user']);

const userFormSchema = yup.object().shape({
    username: yup
        .string()
        .required("Please Enter your Username"),
    password: yup
        .string()
        .required("Please Enter your Password"),
});

const loginAccount = ref({ ...props.initialAccount });

function submitUser() {
    $emit('submit: user', loginAccount.value);
}

function goToRegister(){
    $router.push({ name: 'register' })
}

</script>

<template>
    <Form
        @submit="submitUser"
        :validation-schema="userFormSchema"
    >
        <div class="form-group">
            <label for="username">Username</label>
            <Field
                name="username"
                type="text"
                class="form-control"
                v-model="loginAccount.username"
            />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <Field 
                name="password"
                type="text"
                class="form-control"
                v-model="loginAccount.password"
            />
        </div>

        <div class="form-group">
            <button class="btn btn-primary"> Login </button>
            <button type="button" class="ml-2 btn btn-danger" @click="goToRegister"> Register </button>
        </div>
    </Form>
</template>

<style scoped>
@import '@/assets/form.css';
</style>