<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script lang="ts">
import { Todo, Meta,Film } from 'components/models';
import ExampleComponent from 'components/CompositionComponent.vue';
import { defineComponent, ref } from 'vue';
import  {api} from '../boot/axios'

export default defineComponent({
  name: 'PageIndex',
  
  components: { ExampleComponent },
  setup() {
    let url = 'http://127.0.0.1:8000/api/v1/film/'
    const todos = ref<Film[]>([]);

    api.get(url).then(res => {
      console.log(res.data)
    })
    const meta = ref<Meta>({
      totalCount: 1200
    });
    return { todos, meta };
  }
});
</script>
