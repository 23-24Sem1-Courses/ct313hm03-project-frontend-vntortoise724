<script setup>
import { useRouter } from "vue-router";
import { ref, computed, onMounted, watch, watchEffect } from 'vue';
import wishlistService from "@/services/wishlist.service";
import GameList from "@/components/GameList.vue";
import AppHeader from "@/components/AppHeader.vue";
import InputSearch from "@/components/InputSearch.vue";
import Pagination from "@/components/Pagination.vue";
import GameInformation from "@/components/GameInformation.vue";

const $router = useRouter();

const totalPages = ref(1);
const currentPage = ref(1);

const games = ref([]);
const selectedIndex = ref(-1);
const searchText = ref('');

const searchableGames = computed(() => 
    games.value.map((game) => {
        const { title, price } = game;
        return [ title, price ].join('');
    })
);

const filteredGames = computed(() => {
    if  (!searchText.value) return games.value;
    return games.value.filter((game, index) => 
        searchableGames.value[index].includes(searchText.value)
    );
});

const selectedGame = computed(() => {
    if (selectedIndex.value < 0) return null;
    return filteredGames.value[selectedIndex.value];
});

async function retrieveGames(page) {
    try {
        const chunk = await wishlistService.getWishlist(page);
        totalPages.value = chunk.metadata.lastPage ?? 1;
        games.value = chunk.games.sort((current, next) => 
            current.title.localeCompare(next.title)
        );
        selectedIndex.value = -1;
    } catch (error) {
        console.log(error);
    }
}

async function onRemovefromWishlist(id){
    if (confirm('You want to remove this game from wishlist ?')) {
        try {
            await wishlistService.removefromWishList(id);
        } catch (error) {
            console.log(error);
        }
    }
}

function goToStore(){
    $router.push({ name: 'gamestore'});
}

onMounted(() => retrieveGames(1));

watch(searchText, () => (selectedIndex.value = -1));

watchEffect(() => retrieveGames(currentPage.value))
</script>

<template>
    <AppHeader />
    <div class="page row mb-5">
        <div class="mt-3 col-md-6">
            <h4>
                WishList
                <i class="fas fa-heart"></i>
            </h4>
            <div class="my-3">
                <InputSearch v-model="searchText" />
            </div>
            <GameList 
                v-if="filteredGames.length > 0"
                :games="filteredGames"
                v-model:selectedIndex="selectedIndex"
            />
            <p v-else>
                No Game in WishList.
            </p>
            <div class="mt-3 d-flex justify-content-center align-items-center">
                <Pagination :totalPages="totalPages" v-model:currentPage="currentPage" />
            </div>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="goToStore">
                    <i class="fas fa-gamepad"></i> Back to Store
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="selectedGame">
                <h4>
                    Game Detail
                    <i class="fas fa-eye"></i> 
                </h4>
                <GameInformation :game="selectedGame" />
                <button 
                    class="btn btn-sm btn-success"
                    @click="onRemovefromWishlist(game)"
                >
                <i class="fas fa-heart"></i> Remove from WishList
                </button>
            </div>
        </div>

    </div>
</template>