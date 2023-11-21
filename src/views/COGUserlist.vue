
<script setup>
import { ref, computed, onMounted, watch, watchEffect } from "vue";
//import { useRouter } from 'vue-router';
import UserInfo from '@/components/UserInfo.vue';
import InputSearch from '@/components/InputSearch.vue';
import UserList from '@/components/UserList.vue';
import Pagination from '@/components/Pagination.vue';
import userService from '@/services/user.service';

//const $router = useRouter();
const totalPages = ref(1);
const currentPage = ref(1);

const contacts = ref([]);
const selectedIndex = ref(-1);
const searchText = ref('');

//
const searchableUsers = computed(() =>
    contacts.value.map((user) => {
        const { title, description } = user;
        return [title, description].join('');
    })
);

//
const filteredUsers = computed(() => {
    if (!searchText.value) return contacts.value;
    return contacts.value.filter((user, index) =>
        searchableUsers.value[index].includes(searchText.value)
    );
});

const selectedUser = computed(() => {
    if (selectedIndex.value < 0) return null;
    return filteredUsers.value[selectedIndex.value];
});

async function retrieveUsers(page) {
    try {
        const chunk = await userService.getManyUser(page);
        totalPages.value = chunk.metadata.lastPage ?? 1;
        contacts.value = chunk.contacts.sort((current, next) =>
            current.username.localeCompare(next.username)
        );
        selectedIndex.value = -1;
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => retrieveUsers(1));

watch(searchText, () => (selectedIndex.value = -1));

watchEffect(() => retrieveUsers(currentPage.value));
</script>

<template>
    <div class="page row mb-5">
        <div class="mt-3 col-md-6">
            <h4>
                USER MANAGEMENT
                <i class="fas fa-gamepad"></i>
            </h4>
            <div class="my-3">
                <InputSearch v-model="searchText" />
            </div>
            <UserList v-if="filteredUsers.length > 0" :contacts="filteredUsers" v-model:selectedIndex="selectedIndex" />
            <p v-else>
                There is no user on the list !!
            </p>
            <div class="mt-3 d-flex justify-content-center align-items-center">
                <Pagination :totalPages="totalPages" v-model:currentPage="currentPage" />
            </div>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="retrieveGames(currentPage)">
                    <i class="fas fa-redo"></i> Refresh Page
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="selectedUser">
                <h4>
                    User Detail
                    <i class="fas fa-eye"></i>
                </h4>
                <UserInfo :user="selectedUser" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>