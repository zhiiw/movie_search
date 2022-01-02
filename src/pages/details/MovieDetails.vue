<template>
  <div>
    <q-card class="q-mx-auto q-mt-xl" style="width: 60%">
      <q-img :src="img_src" style="height: 600px" />
      <p class="text-h1 text-weight-bold q-my-lg q-mx-md text-center">&nbsp;{{ title }}</p>

      <q-card-section class="q-mx-md q-my-xl">
        <q-chip
          clickable
          v-for="item in tags"
          color="teal"
          text-color="white"
          icon="bookmark"
        >{{ item }}</q-chip>
        <br />

        <q-list>
          <q-item>
            <q-item-section avatar>
              <q-icon color="primary" name="summarize" style="font-size: 60px" />
            </q-item-section>
            <q-item-section>
              <q-expansion-item class="text-h4 text-weight-bold" label="overview" expand-separator>
                <q-card class="text-h5">
                  <q-card-section>{{ overview }}</q-card-section>
                </q-card>
              </q-expansion-item>
            </q-item-section>
          </q-item>

          <br />
          <q-item>
            <q-item-section avatar>
              <q-icon color="blue" name="accessibility" style="font-size: 60px" />
            </q-item-section>

            <q-item-section v-if="actor_names != []">
              <q-expansion-item
                expand-separator
                label="Actors"
                class="text-h4 text-weight-bold left"
                style="text-align: left;"
              >
                <q-item clickable @click="goActor(index);" v-for="(item,index) in actor_names">
                  <q-item-label class="text-h5" clickable>{{ item }}</q-item-label>
                </q-item>
              </q-expansion-item>
            </q-item-section>
          </q-item>
          <br />
          <br />
          <q-separator />
          <br />
          <br />
          <br />
          <q-item clickable @click="goPeople()" v-if="directors != ''">
            <q-item-section avatar>
              <q-icon color="pink" name="face" style="font-size: 60px" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h4 text-weight-bold">directors</q-item-label>
              <q-item-label class="text-h5" primary>{{ directors_name }}</q-item-label>
            </q-item-section>
          </q-item>
          <br />
          <q-item v-if="length != '[]'">
            <q-item-section avatar>
              <q-icon color="orange" name="straighten" style="font-size: 60px" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h4 text-weight-bold">length</q-item-label>
              <q-item-label class="text-h5" primary>{{ length }}</q-item-label>
            </q-item-section>
          </q-item>

          <br />

          <q-item v-if="score != 0">
            <q-item-section avatar>
              <q-icon color="red" name="star" style="font-size: 60px" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h4 text-weight-bold">score</q-item-label>
              <q-item-label class="text-h5" primary>{{ score }}</q-item-label>
            </q-item-section>
          </q-item>

          <br />

          <q-item v-if="language != 'N/A'">
            <q-item-section avatar>
              <q-icon color="green" name="translate" style="font-size: 60px" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h4 text-weight-bold">language</q-item-label>
              <q-item-label class="text-h5" primary>{{ language }} W</q-item-label>
            </q-item-section>
          </q-item>

          <br />

          <q-item v-if="nickname != 'N/A'">
            <q-item-section avatar>
              <q-icon color="purple" name="badge" style="font-size: 60px" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h4 text-weight-bold">nickname</q-item-label>
              <q-item-label class="text-h5" primary>{{ nickname }}</q-item-label>
            </q-item-section>
          </q-item>

          <br />

          <q-item v-if="status != 'N/A'">
            <q-item-section avatar>
              <q-icon color="amber" name="assessment" style="font-size: 60px" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h4 text-weight-bold">status</q-item-label>
              <q-item-label class="text-h5" primary>{{ status }}</q-item-label>
            </q-item-section>
          </q-item>

          <br />
          <q-item v-if="budget != -1">
            <q-item-section avatar>
              <q-icon color="grey" name="attach_money" style="font-size: 60px" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h4 text-weight-bold">budget</q-item-label>
              <q-item-label
                class="text-h5"
                primary
              >{{ budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</q-item-label>
            </q-item-section>
          </q-item>
          <br />
          <q-item v-if="revenue != -1">
            <q-item-section avatar>
              <q-icon color="yellow" name="paid" style="font-size: 60px" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h4 text-weight-bold">revenue</q-item-label>
              <q-item-label
                class="text-h5"
                primary
              >{{ revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-page-sticky position="bottom-right" :offset="[18, 100]">
        <q-btn fab color="positive" @click="getReview()">History Review</q-btn>
      </q-page-sticky>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab color="accent" @click="dialog = true">Adding Review</q-btn>
      </q-page-sticky>
      <q-dialog v-model="dialog" persistent>
        <q-card>
          <q-card-section>
            <br />
            <q-rating
              v-model="ratingModel"
              size="1.5em"
              color="grey"
              :color-selected="ratingColors"
            />
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="review"
              label="Add your Movie Review"
              type="text"
              placeholder="Review"
              :error="review_error"
              :error-label="review_error_label"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat color="accent" @click="dialog = false">Cancel</q-btn>

            <q-btn flat color="accent" @click="addToFavorites()">Add</q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dialog_history" @click="showHistory();" persistent>
        <q-card class="column">
          <q-card-section>
            <br />
            <q-rating v-model="ratingModelHistory" size="1.5em" color="red" readonly />
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="reviewHistory"
              readonly
              label="View your Movie Review"
              type="text"
              placeholder="Review"
              :error="review_error"
              :error-label="review_error_label"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat color="accent" @click="dialog_history = false">Cancel</q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
      <br />
    </q-card>
    <q-card v-if ="allComments.length!=0" class="q-mx-auto q-mt-xl" style="width: 60%">
      <q-item-label
        style="padding-left:0.5em;padding-top: 10px;"
        offset-1
        class="text-h4 text-weight-bold"
        left="20%"
      >
        Movie Comments
        <q-icon name="movie" />
      </q-item-label>
      <br />
      <q-expansion-item
        bordered
        v-if="allComments!=[]"
        v-for="(mail, index) in allComments"
        :key="index"
        style="border-radius: 10px"
        popup
        header-class="bg-white"
      >
        <template v-slot:header>
          <q-item-section>
            <q-item-label>{{ users[mail.user_id] }}</q-item-label>
            <q-item-label caption>the score is {{ mail.score }}</q-item-label>
          </q-item-section>
        </template>

        <q-separator />
        <q-card>
          <q-card-section>{{ mail.content }}</q-card-section>
        </q-card>
      </q-expansion-item>
    </q-card>
  </div>
</template>

<script>
import { Notify } from 'quasar'
import { api } from '../../boot/axios'

export default {
  name: "Details",


  data() {
    return {
      users: {},
      img_src: "",
      allComments: [],
      review: '',
      ratingModel: 0,
      ratingColors: ['light-green-3', 'light-green-6', 'green', 'green-9', 'green-10'],
      dialog: false,
      dialog_history: false,
      id: 1230,
      title: 'N/A',
      overview: 'N/A',
      length: 'N/A',
      score: 0,
      language: 'N/A',
      nickname: 'N/A',
      status: 'N/A',
      budget: 'N/A',
      revenue: 0,
      actors: [],
      actor_names: [],
      user_id: 0,
      directors: 'Empty for now',
      directors_name: '',
      loggedIn: true,
      directors_id: 0,
      tags: [],
      ratingModelHistory: 0,
      reviewHistory: '',
    }
  },
  methods: {
    getAllReviews() {
      console.log('get all reviews')
      api.get('/comments/?movie_id=' + this.id).then(response => {
        this.allComments = response.data.results
        console.log(this.allComments)
        console.log("length is" + this.allComments.length)
      })
    },
    getReview() {
      this.dialog_history = true
      let user_id = sessionStorage.getItem('user_id')
      api.get("/comments/?user_id=" + user_id + "&movie_id=" + this.id).then(
        response => {
          this.reviewHistory = response.data.results[0].content
          this.ratingModelHistory = response.data.results[0].score
        }
      ).catch(
        error => {
          console.log(error)
        }
      )
    },
    addReview() {
      if (this.review === '') {
        this.review_error = true
        this.review_error_label = 'Review is required'
      } else {
        this.review_error = false
        this.review_error_label = ''
        this.dialog = false
        this.review = ''
      }
      console.log(this.img_src)
    },
    goPeople() {
      if (this.directors != 0) {
        this.$router.push({ name: 'people', params: { id: this.directors_id } })

      } else {
        Notify.create({
          type: 'negative',
          message: 'No director found'
        })
      }
    },
    goActor(index) {
      if (this.actors[index] !== 0) {

        this.$router.push({ name: 'people', params: { id: this.actors[index] } })
      } else {
        Notify.create({
          type: 'negative',
          message: 'No actor found'
        })
      }

    },
    addToFavorites() {
      let user_id = sessionStorage.getItem('user_id')
      if (true) {
        this.$axios.post('http://127.0.0.1:8000/comments/', {
          movie_id: this.id,
          user_id: user_id,
          content: this.review,
          score: this.ratingModel,
        })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })

        this.dialog = false
      } else {
        this.$q.notify({
          color: 'red-6',
          textColor: 'white',
          icon: 'error',
          message: 'You must be logged in to add to comments'
        })
      }
    },
    showHistory() {
      console.log('show history')
      let _this = this;
      _this.dialog_history = true
      _this.$axios.get('http://127.0.0.1:8000/comments/', {
        params: {
          movie_id: _this.id
        }
      })
        .then(res => {
          _this.comments = res.data
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })

      getAllReviews();


    },

  },

  created() {
    this.user_id = sessionStorage.getItem('user_id')
    this.loggedIn = sessionStorage.getItem('loggedIn') !== null
    // if(this.loggedIn) {
    //   if(this.$route.path === '/' || this.$route.path === '/reg')
    //     this.$router.push('/index')
    // }
    // else {
    //   if(this.$route.path !== '/' && this.$route.path !== '/reg')
    //     this.$router.push('/')
    // }
    //only get the fist ten characters of this string\
    api.get('http://127.0.0.1:8000/user_id_name').then(response => {
      let ee = response.data.result
      this.users = ee
      console.log("woeee")
      console.log(this.users)
    })
    if (this.$route.params.id !== undefined) {
      this.id = this.$route.params.id
      console.log('get all reviews')
      api.get('/comments/?movie_id=' + this.id).then(response => {
        this.allComments = response.data.results
        this.allComments.reverse()
        console.log(this.allComments)
        console.log("length is" + this.allComments.length)
      })
      sessionStorage.setItem('movie_id', this.id)
    } else if (sessionStorage.getItem('movie_id') !== null) {
      this.id = sessionStorage.getItem('movie_id')
      console.log('get all reviews')
      api.get('/comments/?movie_id=' + this.id).then(response => {
        this.allComments = response.data.results
        this.allComments.reverse()

        console.log(this.allComments)
        console.log("length is" + this.allComments.length)
      })
    }
    else {
      api.get('/random_movie').then((res) => {
        this.id = res.data.id
        console.log('get all reviews')
        api.get('/comments/?movie_id=' + this.id).then(response => {
          this.allComments = response.data.results
          console.log(this.allComments)
          this.allComments.reverse()

          console.log("length is" + this.allComments.length)
        })
        this.$axios.get('http://127.0.0.1:8000/movies/?id=' + this.id).then(function (response) {

          let res = response.data.results[0]
          console.log(res)
          if (true) {
            _this.tags = res.categories

            // remove the duplicate tags
            _this.tags = _this.tags.filter((item, index) => {
              return _this.tags.indexOf(item) >= index
            })

            //get the tag name
            for (let i = 0; i < _this.tags.length; i++) {
              api.get('/categories/?id=' + _this.tags[i]).then(function (response) {
                _this.tags[i] = response.data.results[0].name
              })
            }
            _this.tmdb_id = res.tmdb_id
            _this.tags
            _this.id = res.id
            _this.title = res.title
            _this.overview = res.overview
            _this.length = res.length
            _this.score = res.score
            _this.tmdb_id = res.tmdb_id
            _this.language = res.language
            _this.nickname = res.nickname
            _this.status = res.status
            _this.budget = res.budget
            _this.revenue = res.revenue
            _this.actors = res.actors
            _this.directors = res.directors

            console.log(_this.directors)
            api.get("https://api.themoviedb.org/3/movie/" + res.tmdb_id + "/images?api_key=1a4bbc34376a72ce96f097210c8d1e46").then(function (response) {
              console.log(response.data.backdrops)
              _this.img_src = "https://image.tmdb.org/t/p/w500" + response.data.backdrops[0].file_path
              console.log(_this.img_src)
            }).catch(function (error) {
              console.log(error);
            });


            api.get('http://127.0.0.1:8000/persons/?id=' + res.directors[0]).then(function (response) {
              console.log(response.data.results[0])
              _this.directors_name = response.data.results[0].name
              _this.directors_id = response.data.results[0].id
            }).catch(function (error) {
              console.log(error)

            })
            for (let i = 0; i < _this.actors.length; i++) {
              api.get('http://127.0.0.1:8000/persons/?id=' + res.actors[i]).then(function (response) {
                _this.actor_names[i] = (response.data.results[0].name)
              }).catch(function (error) {
                console.log(error)
               
              })
            }
          } else {
            _this.$q.notify({
              type: 'negative',
              message: 'Login error: ' + res.message
            })
          }
        }).catch(function (error) {
          console.log(error)
          
          
        })
        return
      }).catch((err) => {
        console.log(err)
      })
    }
    let _this = this

    // this.$axios.get('http://127.0.0.1:8000/api/get_id/' + this.id).then(function (response) {
    this.$axios.get('http://127.0.0.1:8000/movies/?id=' + this.id).then(function (response) {

      let res = response.data.results[0]
      console.log(res)
      if (true) {
        _this.tags = res.categories

        // remove the duplicate tags
        _this.tags = _this.tags.filter((item, index) => {
          return _this.tags.indexOf(item) >= index
        })

        //get the tag name
        for (let i = 0; i < _this.tags.length; i++) {
          api.get('/categories/?id=' + _this.tags[i]).then(function (response) {
            _this.tags[i] = response.data.results[0].name
          })
        }
        _this.tmdb_id = res.tmdb_id
        _this.tags
        _this.id = res.id
        _this.title = res.title
        _this.overview = res.overview
        _this.length = res.length
        _this.score = res.score
        _this.tmdb_id = res.tmdb_id
        _this.language = res.language
        _this.nickname = res.nickname
        _this.status = res.status
        _this.budget = res.budget
        _this.revenue = res.revenue
        _this.actors = res.actors
        _this.directors = res.directors
        console.log(_this.directors)
        api.get("https://api.themoviedb.org/3/movie/" + res.tmdb_id + "/images?api_key=1a4bbc34376a72ce96f097210c8d1e46").then(function (response) {
          console.log(response.data.backdrops)
          _this.img_src = "https://image.tmdb.org/t/p/w500" + response.data.backdrops[0].file_path
          console.log(_this.img_src)
        }).catch(function (error) {
          console.log(error);
        });


        api.get('http://127.0.0.1:8000/persons/?id=' + res.directors[0]).then(function (response) {
          console.log(response.data.results[0])
          _this.directors_name = response.data.results[0].name
          _this.directors_id = response.data.results[0].id
        }).catch(function (error) {
          console.log(error)
          
          
        })
        for (let i = 0; i < _this.actors.length; i++) {
          api.get('http://127.0.0.1:8000/persons/?id=' + res.actors[i]).then(function (response) {
            _this.actor_names[i] = (response.data.results[0].name)
          }).catch(function (error) {
            console.log(error)
            
            
          })
        }
      } else {
        _this.$q.notify({
          type: 'negative',
          message: 'Login error: ' + res.message
        })
      }
    }).catch(function (error) {
      console.log(error)
      
      
    })

  },
  mounted() {
    let _this = this


  },
}
</script>

<style scoped>
</style>
