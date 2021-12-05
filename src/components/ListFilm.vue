<template>
    

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
import {Film,Actor ,Director,Review} from './models';
import { Notify ,Loading} from 'quasar'
import { useQuasar } from 'quasar'
import  {api} from '../boot/axios'
export default {
    props: {
        url: {
            type: String,
            required: true,
            default: '/api/getFilms',
        },
    },
    setup(props){
        const $q = useQuasar()
        const $router = useQuasar()
        const {url} = props

        const films = ref<Film[]>([])

        const getFilms = async () => {
            Loading.show()
            const response = await api.get(url)
            //films.value = response.data
            Loading.hide()
        }
        getFilms()

        return {
            films,
            getFilms,
        }
    }
}
</script>