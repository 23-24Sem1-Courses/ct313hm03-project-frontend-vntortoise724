
<script setup>
import { ref, computed, onMounted, watch, watchEffect } from "vue";
import GameInformation from '@/components/GameInformation.vue';
import AppHeader from "@/components/AppHeader.vue";
import InputSearch from '@/components/InputSearch.vue';
import GameList from '@/components/GameList.vue';
import Pagination from '@/components/Pagination.vue';
import gameService from '@/services/gamestore.service';
import gameuserService from '@/services/gameuser.service';
import wishlistSer from '@/services/wishlist.service';
import cartService from '@/services/cart.service';
import { useRouter } from "vue-router";

const props = defineProps({
    userId: { type: String, required: true},
});

const $router = useRouter();

const totalPages = ref(1);
const currentPage = ref(1);

const games = ref([]);
const user = ref(null);
const selectedIndex = ref(-1);
const searchText = ref('');

const message = ref('');

const searchableGames = computed(() => 
    games.value.map((game) => {
        const { title, description, price } = game;
        return [ title, description, price ].join('');
    })
);

const filteredGames = computed(() => {
    if (!searchText.value) return games.value;
    return games.value.filter((game, index) =>
        searchableGames.value[index].includes(searchText.value)
    );
});

const selectedGame = computed(() => {
    if(selectedIndex.value < 0) return null;
    return filteredGames.value[selectedIndex.value];
});

async function retrieveGames(page) {
    try {
        const chunk = await gameService.getGameList(page);
        totalPages.value = chunk.metadata.lastPage ?? 1;
        games.value = chunk.games.sort((current, next) =>
            current.title.localeCompare(next.title)
        );
        selectedIndex.value = -1;
    } catch (error) {
        console.log(error);
    }
}

async function getUser(id) {
    try {
        user.value = await gameuserService.getUser(id);
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

async function onAddtoWishList(game_id, user_id){
    try{
        await wishlistSer.addToWishList(game_id, user_id);
        message.value = 'Successfully Adding Game To WishList.';
    } catch (error) {
        console.log(error);
    }
}

async function onAddtoCart(game){
    try{
        await cartService.addToCart(game);
        message.value = 'Successfully Adding Game To Cart'
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => retrieveGames(1));

watch(searchText, () => (selectedIndex.value = -1));

watchEffect(() => retrieveGames(currentPage.value));

getUser(props.userId);

function goToAccount() {
    $router.push({
        name: 'userInfo',
        params: { id: user.value.id },
    });
}

</script>

<template>
    <AppHeader />

    <div class="page row mb-5">
        <div class="mt-3 col-md-6">
            <h4>
                COG STORE 
                <i class="fas fa-gamepad"></i>
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
                There is no game on the list !!
            </p>
            <div class="mt-3 d-flex justify-content-center align-items-center">
                <Pagination
                    :totalPages="totalPages"
                    v-model:currentPage="currentPage"
                />
            </div>
            <div class="mt-3 row justify-content-around align-items-center">
                <button
                    class="btn btn-sm btn-primary"
                    @click="retrieveGames(currentPage)"
                >
                <i class="fas fa-redo"></i> Refresh Page
                </button>
                <button
                    class="ml-2 btn-sm btn-secondary"
                    @click="goToAccount"
                >
                Go To Your Account
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
                <hr />
                <button 
                    v-if="user"
                    :game="selectedGame.id"
                    :id="user.id"
                    class="btn btn-sm btn-success"
                    @click="onAddtoWishList(game, id)"
                >
                <i class="fas fa-heart"></i> Add to WishList
                </button>
                <button
                    v-if="user"
                    class="ml-2 btn btn-sm btn-primary"
                    @click="onAddtoCart(game)"
                >
                <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page{
    text-align: left;
    max-width: 750px;
}

</style>