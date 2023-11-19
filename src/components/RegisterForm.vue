<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

const $router = useRouter();

const props = defineProps({
	initialAccount: { type: Object, required: true},
});

const $emit = defineEmits(['submit:user']);

const userFormSchema = yup.object().shape({
	username: yup
		.string()
		.required("Invalid Username")
		.max(14, "Maximum Username Length is 14 letters"),
	email: yup
		.string()
		.email()
		.max(50, "Maximum E-mail Length is 50 letters")
		.required("Invalid E-mail"),
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
	confirmPassword: yup
		.string()
		.required("Please Confirm your Password")
		.oneOf([yup.ref("password"), null], "Password Unmatch!"),
});

const registerAccount = ref({ ...props.initialAccount });

function submitUser() {
	$emit('submit:user', registerAccount.value);
}

function goToLoginForm(){
	$router.push({ name: 'login' });
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
				v-model="registerAccount.username"
			/>
			<ErrorMessage name="username" class="error-feedback" />
		</div>
		<div class="form-group">
			<label for="email">E-mail</label>
			<Field 
				name="email"
				type="email"
				class="form-control"
				v-model="registerAccount.email"
			/>
			<ErrorMessage name="email" class="error-feedback" />
		</div>
		<div class="form-group">
			<label for="first_name">Firstname</label>
			<Field 
				name="first_name"
				type="text"
				class="form-control"
				v-model="registerAccount.first_name"
			/>
			<ErrorMessage name="first_name" class="error-feedback" />
		</div>
		<div class="form-group">
			<label for="last_name">Lastname</label>
			<Field 
				name="last_name"
				type="text"
				class="form-control"
				v-model="registerAccount.last_name"
			/>
			<ErrorMessage name="last_name" class="error-feedback" />
		</div>

		<div class="form-group">
			<label for="password">Password</label>
			<Field 
				name="password"
				type="text"
				class="form-control"
				v-model="registerAccount.password"
			/>
			<ErrorMessage name="password" class="error-feedback" />
		</div>

		<div class="form-group">
			<label for="confirmPassword">Confirm Password</label>
			<Field 
				name="confirmPassword"
				type="text"
				class="form-control"
				v-model="registerAccount.confirmPassword"
			/>
		</div>

		<div class="form-group">
			<button class="btn btn-primary">Register</button>
			<button
				type="button"
				class="ml-2 btn btn-secondary"
				@click="goToLoginForm"
			>
			Login
			</button>
		</div>
	</Form>
</template>

<style scoped>
@import '@/assets/form.css';
</style>
