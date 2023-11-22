<script setup>
import AppHeader from '@/components/AppHeader.vue';
import UserInfo from '@/components/UserInfo.vue';
import UserForm from '@/components/UserForm.vue';
import userService from '@/services/user.service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    userId: { type: String, required: true},
});

const $router = useRouter();
const user = ref(null);

const message = ref('');

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

async function onUpdateUser(editedUser){
    try {
        await userService.updateUser(editedUser.id, editedUser);
        message.value = 'Profile Update Successfully !!';
    } catch (error) {
        console.log(error);
    }
}

async function onDeleteUser(id){
    if (confirm('Do you truly want to delete this account ?')){
         try {
            await userService.deleteUser(id);
            $router.push({ name: 'gamestore' });
        } catch (error) {
            console.log(error);
        }
    }
}

getUser(props.userId);

function goToStore() {
    $router.push({ 
        name: 'gamestore', 
        params: { id: props.userId },
    });
}

</script>

<template>
    <AppHeader />
    <div
        v-if="user" 
        class="page" 
    >
        <UserInfo 
        :user="user"
    />
        <div class="p-1">
            <button class="btn btn-primary"> Go To WishList </button>
            <button class="ml-2 btn btn-success"> Go To Cart</button>
            <button
                type="button"
                class="ml-2 btn btn-secondary"
                @click="goToStore"
            >
            Back to Store
            </button>
        </div>
        <UserForm 
            :initial-account="user"
            @submit:user="onUpdateUser"
            @delete:user="onDeleteUser"
        />
    </div>
</template>