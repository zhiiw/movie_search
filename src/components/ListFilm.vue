<template>
    <!-- <div class="q-pa-md" style="max-width: 80%">
        <div class="q-gutter-xs">
      <q-chip  color="primary" text-color="white" icon="cake">
        Ice cream
      </q-chip>
      <q-chip  color="teal" text-color="white" icon="cake">
        Eclair
      </q-chip>
      <q-chip  color="orange" text-color="white" icon="cake">
        Cupcake
      </q-chip>
      <q-chip  color="red" text-color="white" icon="cake">
        Gingerbread
      </q-chip>
    </div>
        <q-list>
            <q-item clickable v-for="film in films">
                <q-item-section>
                    <q-item-label>{{ film.title }}</q-item-label>
                    <q-item-label
                        caption
                    >Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                </q-item-section>

                <q-item-section side top>
                    <q-item-label caption>1h 24m</q-item-label>
                    <div class="text-orange">
                        <q-icon v-for="ee in ees" name="star" />
                        <q-icon name="star" />
                        <q-icon name="star" />
                    </div>
                </q-item-section>
                <q-separator></q-separator>
            </q-item>
            
        </q-list>
        <q-pagination
      v-model="current"
      color="black"
      :max="10"
      :max-pages="6"
    style=" align-self: center; margin-top: 20px;"
      :boundary-numbers="false"
    ></q-pagination>
    </div> -->
    
</template>

<script >

import {
    defineComponent,
    PropType,
    computed,
    ref,
    toRef,
    Ref,
} from 'vue';
import { Film, Actor, Director, Review } from './models';
import { Notify, Loading } from 'quasar'
import { useQuasar } from 'quasar'
import { api } from '../boot/axios'
import CardMovieVue from './CardMovie.vue';
import CardMovie from './CardMovie.vue';
export default {
    props: {
        url: {
            type: String,
            required: true,
            default: "/movies",
        },
    },
    setup(props) {
        const $q = useQuasar();
        const $router = useQuasar();
        const { url } = props;
        const films = ref([]);
        const getImage = async (tmdb_id) => {
            img_src = "";
            const res = await api.api.get("https://api.themoviedb.org/3/movie/" + tmdb_id + "/images?api_key=1a4bbc34376a72ce96f097210c8d1e46").then(function (response) {
                console.log(response.data.backdrops);
                img_src = "https://image.tmdb.org/t/p/w500" + response.data.backdrops[0].file_path;
                console.log(_this.img_src);
            });
            return res.data;
        };
        const getFilms = async () => {
            Loading.show();
            const response = await api.get(url);
            console.log(response.data);
            if (response.status === 200) {
                films.value = response.data.results;
            }
            else {
                Notify.create({
                    message: "Error",
                    color: "negative",
                    textColor: "white",
                    position: "top",
                    timeout: 2000,
                });
            }
            films.value = response.data.results;
            //films.value = response.data
            Loading.hide();
        };
        getFilms();
        return {
            films,
            current: ref(5),
            getFilms,
        };
    },
    components: { CardMovie }
}
</script>