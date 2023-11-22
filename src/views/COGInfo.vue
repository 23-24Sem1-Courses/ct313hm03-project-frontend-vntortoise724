<script setup>
import UserInfo from '@/components/UserInfo.vue';
import userService from '@/services/user.service';
//import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useAuthStore from '@/store/auth.store';
import useUsersStore from '@/store/users.store';

const authStore = useAuthStore();
const { user: authUser } = storeToRefs(authStore);

const usersStore = useUsersStore();

const props = defineProps({
    user: { type: String, required: true},
});

const $router = useRouter();
const $route = useRoute();

async function getUser(id){
    try {
        await userService.getUser(id);
    } catch (error) {
        console.log(error);
        $router.push({
            name: 'notfound',
            params: { pathMatch: $route.path.split('/').slice(1) },
            query: $route.query,
            hash: $route.hash,
        })
    }
}

getUser(props.user);
usersStore.getAll();
</script>

<template>
    <div v-if="user" class="page">
        <h4> {{ authUser?.first_name }} Information </h4>
        <UserInfo :user="getUser" />
    </div>
</template>