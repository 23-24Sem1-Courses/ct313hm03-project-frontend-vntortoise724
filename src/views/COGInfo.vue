<script setup>
import UserInfo from '@/components/UserInfo.vue';
import userService from '@/services/user.service';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({
    userId: { type: String, required: true},
});

const $router = useRouter();
const $route = useRoute();

const user = ref(null);

async function getUser(id){
    try {
        user.value = await userService.getUser(id);
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

getUser(props.userId);
</script>

<template>
    <div v-if="user" class="page">
        <h4>User Information</h4>
        <UserInfo 
            :intitial-user="user"
        />
    </div>
</template>