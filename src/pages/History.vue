<template>
  <q-page class="q-pa-sm">
    
    <div class="row q-col-gutter-sm">
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12" v-for="(item, item_index) in comments">
        <card-comments  v-if="item!=null&&item.movie!=null&&item.movie.tmdb_id!=null" :data="item"></card-comments>
      </div>
    </div>
  </q-page>
</template>

<script >
import ExampleComponent from 'components/CompositionComponent.vue';
import { Notify } from 'quasar';
import CardMovie from 'src/components/CardMovie.vue';
import { defineComponent, ref } from 'vue';
import { api } from '../boot/axios'
import CardComments from 'src/components/CardComments.vue';
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

  components: { ExampleComponent, CardMovie, CardComments },
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
    let id = sessionStorage.getItem('user_id')
    console.log("the comment user is"+id)
    api.get('/comments/?user_id='+id).then(res=>{
      
      let emm = res.data.results
      emm.reverse()
      const ee = new Set()
      //delete the depublicate item in results
      let i=0
      for(i=0;i<emm.length;i++){
        if(ee.has(emm[i].movie_id)){
          
        }else{
          console.log("easdaf")
          ee.add(emm[i].movie_id)
          _this.comments.push(emm[i])     
        }
      }

      console.log("length is"+ _this.comments.length)

      //re verse the array


      for(let i=0;i<_this.comments.length;i++){
        console.log("id:"+_this.comments[i].movie_id)
        let movie_id=_this.comments[i].movie_id
        api.get('/movies/?id='+movie_id).then(res=>{
          let emm = res.data.results[0]
          _this.comments[i].movie=emm
          console.log("eee")
              console.log(_this.comments[i])

        })
      }
    })
   
    
  },
  data(){
    return {
      data:ee,
      search:'',
      comments:[],
      tags:[]
    }
  },
  methods: {
    
    
  },
});
</script>
