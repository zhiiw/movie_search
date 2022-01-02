<template>
  <q-card class="">
    <q-img :src=img_src height="440px">
    </q-img>

   

    <q-card-section>
      <div class="text-h6">
        {{ data.title }}
      </div>
      <div class="text-subtitle1 text-justify q-mt-sm">
        {{ data.overview.substring(0, 100) + '...' }}
      </div>
      <div>
        <q-rating
          v-model="data.score"
          max="5"
          size="1.5em"
          color="yellow"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half" readonly
          no-dimming
        />
      </div>
    </q-card-section>
    <q-card-section>
      <div class="col-12">
        <span class="text-h6">{{ data.language }}</span>
        <span class="text-h6 float-right">
          <q-btn label="View Details" @click="goMovie()" color="secondary" outline></q-btn>
        </span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { api } from '../boot/axios'
import {defineComponent} from 'vue'
export default defineComponent({
  name: "CardProduct",
  props: ['data'],
  data() {
    return {
      img_src: '',
    }
  },
  methods: {
    goMovie(){
      this.$router.push({
        name: 'movie',
        params: {
          id: this.data.id
        }
      })
    }
  },
  created(){
    let id=this.data.tmdb_id
    let _this = this
 
    api.get("https://api.themoviedb.org/3/movie/"+ id  +"/images?api_key=1a4bbc34376a72ce96f097210c8d1e46").then(function (response) {
          _this.img_src = "https://image.tmdb.org/t/p/w500" + response.data.backdrops[0].file_path
        }).catch(function (error) {
          console.log(error);
        });
  },
  computed: {
    isShow() { 
        return this.data.tmdb_id
    }
},  
  watch:{
    data:function(newVal, oldVal) {
      let id = newVal.tmdb_id
      let _this = this

      api.get("https://api.themoviedb.org/3/movie/"+ id  +"/images?api_key=1a4bbc34376a72ce96f097210c8d1e46")
        .then(function(response)  {
          _this.img_src = "https://image.tmdb.org/t/p/w500" + response.data.backdrops[0].file_path

        }).catch(err => {
          console.log(err)
        })
    }
  }
  
  
})
</script>

<style scoped>
</style>