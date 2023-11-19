<script setup>
import UserInfo from '@/components/UserInfo.vue';
import userService from '@/services/user.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    userId: { type: String, required: true},
})

const $router = useRouter();
const user = ref(null);

async function getUser(id){
    try {
        user.value = await userService.getUser(id);
    } catch (error) {
        console.log(error);
        $router.push({
            name: 'notfound',
            params: { pathMatch: $router.path.split('/').slice(1) },
            query: $router.query,
            hash: $router.hash,
        });
    }
}

getUser(props.userId);
</script>

<template>
    <div>
        <UserInfo 
        @submit:user="getUser"
        />
    </div>
</template>