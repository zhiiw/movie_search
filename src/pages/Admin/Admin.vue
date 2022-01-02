<template>
  <div>
    <q-card class="q-mx-auto q-my-lg" style="width: 80%">
      <q-card-section>
        <p class="text-h2 q-mt-lg">Movie list</p>
      </q-card-section>
      <q-card-section>
        <q-table
          :data="movies"
          :rows="movies"
          :columns="columns"
          :pagination.sync="pagination"
          row-key="id"
          :loading="loading"
        >
          <template v-slot:top>
            <q-btn color="primary" :disable="loading" label="Add Movie" @click="addDialog = true" />
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn dense round flat color="blue" @click="onUpdateClick(props)" icon="update"></q-btn>
              <q-btn dense round flat color="red" @click="onDeleteClick(props)" icon="delete"></q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <q-dialog v-model="addDialog" persistent style="width: 400px;">
      <q-card class="q-pa-xl">
        <q-form @submit="onSubmit" style="width: 400px">
          <q-input
            filled
            v-model="new_name"
            label="Movie name *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Movie name']"
          />
          <q-input
            filled
            v-model="new_overview"
            label="Movie overview *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Movie name']"
          />
          <q-input
            filled
            v-model="new_status"
            label="Movie status *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Movie name']"
          />
          <q-input
            filled
            v-model="new_nickname"
            label="Movie nickname *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Movie name']"
          />
          <q-input
            filled
            v-model="new_language"
            label="Movie language *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Movie name']"
          />

          <q-input
            filled
            v-model="new_length"
            label="Movie length *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Movie name']"
          />

          <q-input
            filled
            type="number"
            v-model="new_revenue"
            label="Movie Revenue *"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please type Movie price',
              val => val > 0 || 'Please type a positive Movie price'
            ]"
          />
          <q-input
            filled
            type="number"
            v-model="new_tmdb_id"
            label="Movie tmdb_id *"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please type Movie price',
              val => val > 0 || 'Please type a positive Movie price'
            ]"
          />
          <q-input
            filled
            type="number"
            v-model="new_score"
            label="Movie score *"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please type Movie price',
              val => val > 0 || 'Please type a positive Movie price'
            ]"
          />

          <q-input
            filled
            type="number"
            v-model="new_budget"
            label="Movie budget *"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please type Movie price',
              val => val > 0 || 'Please type a positive Movie price'
            ]"
          />
          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          </div>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="updateDialog" persistent style="width: 400px;">
      <q-card class="q-pa-xl">
        <q-form @submit="onUpdateClick" style="width: 400px">
          <q-input
            filled
            v-model="name"
            label="Movie name *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Movie name']"
          />
          <q-input
            filled
            v-model="overview"
            label="Movie overview *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Movie name']"
          />
          <q-input
            filled
            v-model="status"
            label="Movie status *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Movie name']"
          />
          <q-input
            filled
            v-model="nickname"
            label="Movie nickname *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Movie name']"
          />
          <q-input
            filled
            v-model="language"
            label="Movie language *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Movie name']"
          />

          <q-input
            filled
            v-model="length"
            label="Movie length *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Movie name']"
          />

          <q-input
            filled
            type="number"
            v-model="revenue"
            label="Movie Revenue *"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please type Movie price',
              val => val > 0 || 'Please type a positive Movie price'
            ]"
          />
          <q-input
            filled
            type="number"
            v-model="tmdb_id"
            label="Movie tmdb_id *"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please type Movie price',
              val => val > 0 || 'Please type a positive Movie price'
            ]"
          />
          <q-input
            filled
            type="number"
            v-model="score"
            label="Movie score *"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please type Movie price',
              val => val > 0 || 'Please type a positive Movie price'
            ]"
          />

          <q-input
            filled
            type="number"
            v-model="budget"
            label="Movie budget *"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please type Movie price',
              val => val > 0 || 'Please type a positive Movie price'
            ]"
          />
          <div>
            <q-btn label="Submit" @click="onUpdate()" type="submit" color="primary" />
            <q-btn label="Cancel" color="primary" flat class="q-ml-sm" v-close-popup />
          </div>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteDialog" persistent style="width: 400px;">
      <q-card class="q-pa-xl">
        Are you sure to delete Movie?
        <div>
          <q-btn label="Remove" color="red" @click="onDelete" flat v-close-popup />
          <q-btn label="Cancel" color="primary" flat class="q-ml-sm" v-close-popup />
        </div>
      </q-card>
    </q-dialog>
  </div>
   <div class="q-pa-lg flex flex-center">
    <q-pagination
    @click="onPaginationClick"
      v-model="current"
      color="purple"
      :max="312"
      :max-pages="6"
      boundary-numbers
    />
  </div>
</template>

<script>

export default {
  name: "Movie",
  data() {
    return {
      max_pages: 1,
      current: 1,
      loggedIn: false,
      user_type: '',
      movies: [],
      filter: '',
      loading: true,
      addDialog: false,
      updateDialog: false,
      deleteDialog: false,
      imgDialog: false,
      show_img: '',
      delete_id: -1,

      stat:{},
      new_name: '',
      new_status: '',
      new_nickname: '',
      new_language: '',
      new_score: 0,
      new_overview: '',
      new_tmdb_id: 0,
      new_length: '',
      new_revenue: 0,
      new_budget: 0,

      name: '',
      status: '',
      nickname: '',
      language: '',
      score: 0,
      overview: '',
      tmdb_id: 0,
      length: '',
      revenue: 0,
      budget: 0,
      actors: [],
      directors: [],
      categories: [],



      new_img: null,
      options: [],
      columns: [
        {
          name: 'ID',
          required: true,
          label: 'Movie ID',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Movie name',
          align: 'left',
          field: row => row.title,
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Movie status',
          align: 'left',
          field: row => row.status,
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Movie language',
          align: 'left',
          field: row => row.language,
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Movie Budget',
          align: 'left',
          field: row => row.budget,
          sortable: true
        },
        {
          name: 'price',
          required: true,
          label: 'Revenue',
          align: 'left',
          field: row => row.revenue,
          format: val => `$` + val,
          sortable: true
        },

        { name: 'actions', label: 'Actions', field: '', align: 'center' }
      ],
      pagination: {
        rowsPerPage: 10
      }
    }
  },
  created() {
    // this.loggedIn = sessionStorage.getItem('loggedIn') !== null
    // if(this.loggedIn) {
    //   if(this.$route.path === '/' || this.$route.path === '/reg')
    //     this.$router.push('/index')
    // }
    // else {
    //   if(this.$route.path !== '/' && this.$route.path !== '/reg')
    //     this.$router.push('/')
    // }
    this.user_type = sessionStorage.getItem('isAdmin')
    this.username = sessionStorage.getItem('loggedIn')
    let _this = this
    this.loading = true
    this.$axios.get('http://127.0.0.1:8000/movies').then(function (response) {
      let res = response.data
      console.log(res)
      _this.max_pages = res.count/100+1
      _this.movies = res.results
      console.log(_this.movies)
      _this.$forceUpdate()
    })
    this.loading = false
  },
  methods: {
    onPaginationClick(){
      this.loading = true
      let _this = this
      this.$axios.get('http://127.0.0.1:8000/movies/?offset='+(_this.current-1)*100).then(function (response) {
      let res = response.data
      console.log(res)
      _this.movies = res.results
      console.log(_this.movies)
      _this.$forceUpdate()
    })
    this.loading = false
      // this.$axios.get('http://
    },
    onSubmit() {
      let _this = this
      this.$axios.post('http://127.0.0.1:8000/movies/', {
        id: this.delete_id,
        title: this.new_name,
        overview: this.new_overview,
        language: this.new_language,
        revenue: this.new_revenue,
        budget: this.new_budget,
        score: this.new_score,
        tmdb_id: this.new_tmdb_id,
        length: this.new_length,
        status: this.new_status,
        directors: this.new_directors,
        actors: this.new_actors,
        categories: this.new_categories,
      }).then(function (response) {
        let res = response.data
        console.log(res)
        console.log()
        // _this.movies.push(res)
        _this.$forceUpdate()
      })
      this.addDialog = false
    },
    onDelete() {
      let _this = this
      this.$axios.delete('http://127.0.0.1:8000/movies/?id=' + this.delete_id).then(function (response) {
        console.log(response)
        if (response.status === 200) {
          _this.$q.notify({
            type: 'positive',
            message: 'Successfully removed.'
          })
          _this.deleteDialog = false
        } else {
          _this.$q.notify({
            type: 'negative',
            message: 'Remove error.'
          })
        }
      }).catch(function (error) {
        console.log(error)
        
      })
    },

    onDeleteClick(props) {
      this.delete_id = props.row.id
      this.deleteDialog = true
    },
    onUpdateClick(props) {
      this.stat = props.row
      this.delete_id = props.row.id
      console.log(props.row.id)
      let _this = this
      this.$axios.get('http://127.0.0.1:8000/movies/?id=' + _this.delete_id).then(function (response) {
        console.log(response)
        let res = response.data.results[0]
        console.log(res)
        _this.name = res.title
        _this.overview = res.overview
        _this.language = res.language
        _this.revenue = res.revenue
        _this.budget = res.budget
        _this.score = res.score
        _this.tmdb_id = res.tmdb_id
        _this.length = res.length
        _this.status = res.status
        _this.nickname = res.nickname
        _this.revenue = res.revenue
        _this.budget = res.budget
        _this.actors = res.actors
        _this.directors = res.directors
        _this.categories = res.categories
      })
      this.updateDialog = true
    },
    onUpdate(props) {
      let _this = this

      this.$axios.put('http://127.0.0.1:8000/movies/?id=' + this.delete_id, {

        title: this.name,
        overview: this.overview,
        language: this.language,
        revenue: this.revenue,
        budget: this.budget,
        score: this.score,
        tmdb_id: this.tmdb_id,
        length: this.length,
        status: this.status,
        directors: this.directors,
        actors: this.actors,
        categories: this.categories,
      }).then(function (response) {

        // _this.movies.push(res)
        _this.$forceUpdate()
        _this.updateDialog = false
      })
    },
    onChangeShow() {
      if (this.showAll === 'Show all') {
        this.table_data = this.classes
      } else {
        this.table_data = this.customer_classes
      }
    },
    onImgRejected() {
      this.$q.notify({
        type: 'negative',
        message: 'Error, selected file is not a image.'
      })
    },
  }
}
</script>

<style scoped>
</style>
