<template>
    <nav class="navbar navbar-expand navbar-blue bg-dark">
        <a 
            href="/"
            class="navbar-brand"
        > COG </a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link
                    :to="{ name: 'gamestore'}"
                    class = "nav-link"
                >
                COG Store
                <i class="fas fa-gamepad"></i>
                </router-link>
            </li>
            <li class="nav-item">
                    <router-link
                        :to="{ name: 'gamestore' }"
                        class = "nav-link"
                    >
                    Wishlist
                    <i class="fas fa-heart"></i>
                    </router-link>
            </li>
            <li class="nav-item">
                    <router-link
                        :to="{ name: 'gamestore' }"
                        class = "nav-link"
                    >
                    Your Cart
                    <i class="fas fa-cart-shopping"></i>
                    </router-link>
            </li>
            <li class="nav-item" >
            <router-link
                :to="{ name: 'register' }"
                class = "nav-link"
            >
                Register
                <i class="fas fa-user"></i>
            </router-link>
            </li>
        </div>
    </nav>
</template>