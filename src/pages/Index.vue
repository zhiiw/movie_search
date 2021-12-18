<template>
  <q-page class="q-pa-sm">
    <div>
      <q-card class="no-border no-shadow bg-transparent">
        <q-card-section class="q-pa-sm">
          <q-input
            v-on:keyup.enter="searchUpdate();"
            rounded
            v-model="search"
            outlined
            placeholder="Search Movie"
          >
            <template v-slot:append>
              <q-icon v-if="search === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
            </template>
          </q-input>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="item, item_index in data">
        <card-movie  v-if="item.tmdb_id!=null" :data="item"></card-movie>
      </div>
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
  </q-page>
</template>

<script >
import ExampleComponent from 'components/CompositionComponent.vue';
import { Notify } from 'quasar';
import CardMovie from 'src/components/CardMovie.vue';
import { defineComponent, ref } from 'vue';
import { api } from '../boot/axios'

const ee = [
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 2,
    amount: '$30',
    chip: 'Discount 90%',
    chip_color: 'grey-4',
    chip_class: 'text-blue absolute-top-right'
  },
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 4,
    amount: '$15',
  },
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 1,
    amount: '$50',
    chip: 'Sold Out',
    chip_color: 'grey-8',
    chip_class: 'text-white absolute-top-right'
  },
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 5,
    amount: '$70',
    chip: 'Discount 50%',
    chip_color: 'grey-4',
    chip_class: 'text-blue absolute-top-right'
  },
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 2,
    amount: '$50',
  },
  {
    title: 'Our Changing Planet',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    rating: 4,
    amount: '$30',
  },
];

export default defineComponent({
  name: 'PageIndex',

  components: { ExampleComponent, CardMovie },
  // setup() {
  //   let data = reactive({
  //     value: ee
  //   });
  //   console.log("ee")
  //   console.log(data.value.title)
  //   console.log("ee")

  //   let search = ref('ee');
  //   const init = async () => {
  //     for (let i = 0; i < 6; i++) {
  //       let res = await api.get(`/random_movie`);
  //       console.log(res.data);
  //       data.value[i] = res.data;
  //       console.log(data.value);
  //     }
  //   }
  //   init();
  //   const searchUpdate = () => {
  //     console.log(search.value)
  //     api.get('/movies/?search=' + (search.value)).then(res => {
  //       data = res.data.results;
  //       
  //     })
  //   }
  //   return {
  //     search:ref('ee'),
  //     data,
  //     // searchUpdate,
  //   };
  // },
  created(){
    let _this=this

    api.get('/movies/?offset=' + (this.current-1)).then(res => {
      _this.data = res.data.results;
      console.log(_this.data)
    })
    
    
  },
  data(){
    return {
      data:ee,
      current: 1,
      search:'',
      tags:[]
    }
  },
  methods: {
    onPaginationClick(){
      let _this=this
      api.get('/movies/?offset=' + (this.current-1)).then(res => {
        _this.data = res.data.results;
        console.log(_this.data)
      })
    },
    
    searchUpdate(){
      api.get('/movies/?search=' +(this.search)).then(res => {
        console.log(res)
        let ee = res.data
        if(ee.results.length>0){
          this.data = ee.results
        }else{
          Notify.create({
            message: 'No Result',
            color: 'negative',
            icon: 'error_outline'
          })
        }
      })
    }
  },
});
</script>
