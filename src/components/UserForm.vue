<script setup>
import { ref } from 'vue';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

const props = defineProps({
    initialAccount: { type: Object, required: true },
});

const $emit = defineEmits(['submit:user', 'delete:user']);

const userSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username invalid'),
    email: yup
        .string()
        .email('Incorrect Email')
        .required('Please enter Email'),
    first_name: yup
        .string()
        .required("Please Enter your First Name"),
    last_name: yup
        .string()
        .required("Please Enter your Last Name"),
    password: yup
        .string()
        .min(4)
        .max(20)
        .required("Please Enter the Password"),
});

const editedUser = ref({ ...props.initialAccount });

function submitUser(){
    $emit('submit:user', editedUser.value);
}

function deleteUser(){
    $emit('delete:user', editedUser.value.id);
}

</script>

<template>

    <Form
        @submit="submitUser"
        :validation-schema="userSchema"
    >
        <div class="form-group">
            <label for="username"> Username </label>
            <Field 
                name="username"
                type="text"
                class="form-control"
                v-model="editedUser.username"
            />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email"> Email </label>
            <Field 
                name="email"
                type="email"
                class="form-control"
                v-model="editedUser.email"
            />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="first_name"> First Name </label>
            <Field 
                name="first_name"
                type="text"
                class="form-control"
                v-model="editedUser.first_name"
            />
            <ErrorMessage name="first_name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="last_name"> First Name </label>
            <Field 
                name="last_name"
                type="text"
                class="form-control"
                v-model="editedUser.last_name"
            />
            <ErrorMessage name="last_name" class="error-feedback" />
         </div>
         <div class="form-group">
            <label for="password"> Password </label>
            <Field 
                name="password"
                type="password"
                class="form-control"
                v-model="editedUser.password"
            />
         </div>

         <div class="form-group">
            <button class="btn btn-primary"> Save </button>
            <button
                type="button"
                class="ml-2 btn btn-danger"
                @click="deleteUser"
            > Delete this Account </button>
         </div>
    </Form>

</template>

<style scoped>
@import '@/assets/form.css';
</style>