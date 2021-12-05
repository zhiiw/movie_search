<template>
    <div class="search">
        <div class="search__input">
        <input type="text" v-model="query" @keyup.enter="search" placeholder="Search for a movie, TV show, or person">
        </div>
        <div class="search__results">
        <div class="search__results__item" v-for="result in results">
            <router-link :to="'/' + result.media_type + '/' + result.id">
            <img :src="result.poster_path" alt="">
            <div class="search__results__item__info">
                <h3>{{ result.title }}</h3>
                <p>{{ result.overview }}</p>
            </div>
            </router-link>
        </div>
        </div>
    </div>
</template>
<script setup>
    
</script>