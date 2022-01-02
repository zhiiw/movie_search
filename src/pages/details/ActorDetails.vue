<template>
  <div>
    <q-card class="q-mx-auto q-mt-xl" style="width: 50%">
      <q-img
        :src=img_src
        basic
        style="height: 1100px"
      />
      <p class="text-h2 text-weight-bold q-my-lg q-mx-md text-center">&nbsp;{{name}}</p>
      <br>
      <q-card-section class="q-mx-md q-my-xl">
        <q-list>
          <q-item clickable v-if="gender!='N/A'">
            <q-item-section avatar>
              <q-icon color="primary" name="explore" style="font-size: 60px"/>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h4 text-weight-bold"> gender </q-item-label>
              <q-item-label class="text-h5" primary> {{gender}} </q-item-label>
            </q-item-section>
          </q-item>

          <br>

          <q-item clickable v-if="birth!='N/A'">
            <q-item-section avatar>
              <q-icon color="orange" name="money" style="font-size: 60px"/>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h4 text-weight-bold">  </q-item-label>
              <q-item-label class="text-h5" primary> {{ birth }} </q-item-label>
            </q-item-section>
          </q-item>

          <br>

          <q-item clickable v-if="biography!='N/A'">
            <q-item-section avatar>
              <q-icon color="red" name="fullscreen_exit" style="font-size: 60px"/>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h4 text-weight-bold"> biography </q-item-label>
              <q-item-label class="text-h5" primary> {{ biography }}  </q-item-label>
            </q-item-section>
          </q-item>

          <br>

          <q-item clickable v-if="place_birth!='N/A'">
            <q-item-section avatar>
              <q-icon color="green" name="credit_card" style="font-size: 60px"/>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h4 text-weight-bold"> Place Birth </q-item-label>
              <q-item-label class="text-h5" primary> {{ place_birth }}  </q-item-label>
            </q-item-section>
          </q-item>

          <br>

          
        </q-list>
      </q-card-section>
      
    </q-card>
  </div>
</template>

<script>import { Loading } from "quasar"
import { api } from "src/boot/axios"

export default {
  name: "Details",
  data () {
    return {
      img_src: "",
      id: 0,
      gender: 'N/A',
      name: '',
      birth: 'N/A',
      biography: '',
      place_birth: '',
      
      loggedIn: false,
    }
  },
  created() {
    Loading.show()
    this.loggedIn = sessionStorage.getItem('loggedIn') !== null
    // if(this.loggedIn) {
    //   if(this.$route.path === '/' || this.$route.path === '/reg')
    //     this.$router.push('/index')
    // }
    // else {
    //   if(this.$route.path !== '/' && this.$route.path !== '/reg')
    //     this.$router.push('/')
    // }
    console.log(this.$route.params)
    if(this.$route.params.id !== undefined){
      this.id = this.$route.params.id
      sessionStorage.setItem('id', this.id)
      console.log(this.$route.params)
    }else if(sessionStorage.getItem('id') !== null){
      this.id = sessionStorage.getItem('id')
    }
    else{
      api.get('/random_person').then((res) => {
        this.id = res.data.id
        this.$axios.get('http://127.0.0.1:8000/persons/?id=' + this.id).then(function (response) {
      // this.$axios.get('http://127.0.0.1:8000/persons/?id=3465784').then(function (response) {
      let res = response.data.results[0]
      if(true) {
        
        _this.id = res.id
        _this.gender = res.gender
        _this.name = res.name
        _this.birth = res.birth
        _this.biography = res.biography
        _this.place_birth = res.place_birth
      
      } else {
        _this.$q.notify({
          type: 'negative',
          message: 'Login error: ' + res.message
        })
      }

      api.get( "https://api.themoviedb.org/3/person/"+res.tmdb_id+"/images?api_key=1a4bbc34376a72ce96f097210c8d1e46").then(function (response) {
        console.log(response.data.profiles)
        _this.img_src = "https://image.tmdb.org/t/p/w500" + response.data.profiles[0].file_path
      }).catch(function (error) {
        console.log(error)
      })
    }).catch(function (error) {
      console.log(error)
      
    })
    Loading.hide()
    return
      })
    }
    let _this = this
    this.$axios.get('http://127.0.0.1:8000/persons/?id=' + this.id).then(function (response) {
      // this.$axios.get('http://127.0.0.1:8000/persons/?id=3465784').then(function (response) {
      let res = response.data.results[0]
      if(true) {
        
        _this.id = res.id
        _this.gender = res.gender
        _this.name = res.name
        _this.birth = res.birth
        _this.biography = res.biography
        _this.place_birth = res.place_birth
      
      } else {
        _this.$q.notify({
          type: 'negative',
          message: 'Login error: ' + res.message
        })
      }

      api.get( "https://api.themoviedb.org/3/person/"+res.tmdb_id+"/images?api_key=1a4bbc34376a72ce96f097210c8d1e46").then(function (response) {
        console.log(response.data.profiles)
        _this.img_src = "https://image.tmdb.org/t/p/w500" + response.data.profiles[0].file_path
      }).catch(function (error) {
        console.log(error)
      })
    }).catch(function (error) {
      console.log(error)
      
    })
    Loading.hide()
  },
}
</script>

<style scoped>
</style>