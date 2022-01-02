<template>
  <div>
    <q-card class="q-mx-auto q-my-lg" style="width: 80%">
      <q-card-section>
        <p class="text-h2 q-mt-lg">Comment List</p>
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
            <q-btn color="primary" :disable="loading" label="Add comment" @click="Dialog = true" />
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
            v-model="new_content"
            label="comment content *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a comment content']"
          />
          <q-input
            filled
            v-model="new_score"
            label="comment score *"
            lazy-rules
            :rules="[val => val && val.length > 0&&val>0 || 'Please type a comment score']"
          />
          <q-input
            filled
            v-model="new_user_id"
            label="comment user_id *"
            lazy-rules
            :rules="[val => val && val.length > 0&&val>0 || 'Please type a comment user_id']"
          />

          <q-input
            filled
            v-model="new_movie_id"
            label="comment movie_id *"
            lazy-rules
            :rules="[val => val && val.length > 0&&val>0 || 'Please type a comment content']"
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
            v-model="content"
            label="comment content *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a comment content']"
          />
          <q-input
            filled
            v-model="score"
            label="comment score *"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type a comment content']"
          />

          <q-input
            filled
            v-model="user_id"
            label="comment user_id *"
            lazy-rules
            :rules="[val => val && val.length > 0&&user_id>0 || 'Please type a comment content']"
          />
          <q-input
            filled
            v-model="movie_id"
            label="comment movie_id *"
            lazy-rules
            :rules="[val => val && val.length > 0&&val>0 || 'Please type a comment content']"
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
        Are you sure to delete comment?
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
      :max="1"
      :max-pages="6"
      boundary-numbers
    />
  </div>
</template>

<script>import { Notify } from "quasar"


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

      stat:{},
      new_content: '',
      new_user_id: '',
      new_movie_id: '',
      new_score: '',
      new_biography: '',
      new_budget: 0,

      content: '',
      user_id: '',
      movie_id: '',
      score: 0,
      biography: '',
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
          label: 'comment ID',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'content',
          required: true,
          label: 'comment content',
          align: 'left',
          field: row => row.content,
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'score',
          align: 'left',
          field: row => row.score,
          sortable: true
        },
        {
          name: 'movie_id',
          required: true,
          label: 'movie_id',
          align: 'left',
          field: row => row.movie_id,

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
    this.$axios.get('http://127.0.0.1:8000/comments').then(function (response) {
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
      this.$axios.get('http://127.0.0.1:8000/comments/?offset='+(_this.current-1)*100).then(function (response) {
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
      this.$axios.post('http://127.0.0.1:8000/comments/', {
        id: this.delete_id,
        content: this.new_content,
        score: this.new_score,
        movie_id: this.new_movie_id,
        biography: this.new_biography,
        user_id: this.new_user_id,
      }).then(function (response) {
        let res = response.data
        if(response.Status===500){
            Notify.create({
              message: "maybe some doesn/'t exist",
              color: 'red',
              icon: 'error_outline'
            })
        }
        console.log("eee")
        console.log(res)
        console.log()
        // _this.movies.push(res)
        _this.$forceUpdate()
      }).catch(function (error) {
            Notify.create({
              message: "maybe some doesn't exist",
              color: 'red',
              icon: 'error_outline'
            })

        console.log(error)
      })
      this.Dialog = false
    },
    onDelete() {
      let _this = this
      this.$axios.delete('http://127.0.0.1:8000/comments/?id=' + this.delete_id).then(function (response) {
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
      this.$axios.get('http://127.0.0.1:8000/comments/?id=' + _this.delete_id).then(function (response) {
        console.log(response)
        let res = response.data.results[0]
        console.log(res)
        _this.content = res.content
        _this.score = res.score
        _this.movie_id = res.movie_id
        _this.user_id = res.user_id


      })
      this.updateDialog = true
    },
    onUpdate(props) {
      let _this = this

      this.$axios.put('http://127.0.0.1:8000/comments/?id=' + this.delete_id, {
        content: this.content,
        movie_id: this.movie_id,
        score: this.score,
        user_id: this.user_id,
      }).then(function (response) {

        // _this.comments.push(res)
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
