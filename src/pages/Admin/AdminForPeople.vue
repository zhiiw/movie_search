<template>
  <div>
    <q-card class="q-mx-auto q-my-lg" style="width: 80%">
      <q-card-section>
        <p class="text-h2 q-mt-lg">People list</p>
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
            <q-btn color="primary" :disable="loading" label="Add People" @click="Dialog = true" />
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
    <q-dialog v-model="Dialog" persistent style="width: 400px;">
      <q-card class="q-pa-xl">
        <q-form @submit="onSubmit" style="width: 400px">
          <q-input
            filled
            v-model="new_name"
            label="Person name *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Person name']"
          />
          <q-input
            filled
            v-model="new_gender"
            label="Person gender *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Person gender']"
          />
          <q-input
            filled
            v-model="new_place_birth"
            label="Person place_birth *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Person place_birth']"
          />

          <q-input
            filled
            v-model="new_birth"
            label="Person birth *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Person name']"
          />

          <q-input
            filled
            v-model="new_biography"
            label="Person biography *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Person biography']"
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
            label="Person name *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Person name']"
          />
          <q-input
            filled
            v-model="gender"
            label="Person gender *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Person name']"
          />

          <q-input
            filled
            v-model="place_birth"
            label="Person place_birth *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Person name']"
          />
          <q-input
            filled
            v-model="birth"
            label="Person birth *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Person name']"
          />

          <q-input
            filled
            v-model="biography"
            label="Person biography *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a Person name']"
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
        Are you sure to delete People?
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
      :max="546"
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
      Dialog: false,
      updateDialog: false,
      deleteDialog: false,
      imgDialog: false,
      show_img: '',
      delete_id: -1,
      new_revenue: 0,
      new_budget: 0,
      stat:{},
      new_name: '',
      new_place_birth: '',
      new_birth: '',
      new_score: 0,
      new_gender: '',
      new_tmdb_id: 0,
      new_biography: '',

      name: '',
      place_birth: '',
      birth: '',
      score: 0,
      gender: '',
      tmdb_id: 0,
      biography: '',
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
          label: 'Person ID',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Person name',
          align: 'left',
          field: row => row.name,
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Person gender',
          align: 'left',
          field: row => row.gender,
          sortable: true
        },
        {
          name: 'Birth',
          required: true,
          label: 'Birth',
          align: 'left',
          field: row => row.birth,

          sortable: true
        },
{
          name: 'PlaceBirth',
          required: true,
          label: 'Birth',
          align: 'left',
          field: row => row.place_birth,

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
    this.$axios.get('http://127.0.0.1:8000/persons').then(function (response) {
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
      this.$axios.get('http://127.0.0.1:8000/persons/?offset='+(_this.current-1)*100).then(function (response) {
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
      this.$axios.post('http://127.0.0.1:8000/persons/', {
        id: this.delete_id,
        name: this.new_name,
        gender: this.new_gender,
        birth: this.new_birth,
        tmdb_id: this.new_tmdb_id,
        biography: this.new_biography,
        place_birth: this.new_place_birth,
      }).then(function (response) {
        let res = response.data
        console.log(res)
        console.log()
        // _this.movies.push(res)
        _this.$forceUpdate()
      })
      this.Dialog = false
    },
    onDelete() {
      let _this = this
      this.$axios.delete('http://127.0.0.1:8000/persons/?id=' + this.delete_id).then(function (response) {
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
      this.$axios.get('http://127.0.0.1:8000/persons/?id=' + _this.delete_id).then(function (response) {
        console.log(response)
        let res = response.data.results[0]
        console.log(res)
        _this.name = res.name
        _this.gender = res.gender
        _this.birth = res.birth
        _this.revenue = res.revenue
        _this.budget = res.budget
        _this.score = res.score
        _this.tmdb_id = res.tmdb_id
        _this.biography = res.biography
        _this.place_birth = res.place_birth
        _this.place_birth = res.place_birth
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

      this.$axios.put('http://127.0.0.1:8000/persons/?id=' + this.delete_id, {

        name: this.name,
        gender: this.gender,
        birth: this.birth,
        revenue: this.revenue,
        budget: this.budget,
        score: this.score,
        tmdb_id: this.tmdb_id,
        biography: this.biography,
        place_birth: this.place_birth,
        directors: this.directors,
        actors: this.actors,
        categories: this.categories,
      }).then(function (response) {

        // _this.peoples.push(res)
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
