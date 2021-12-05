<template class="fullscreen ">
  <q-page class="flex bg-image flex-center fullscreen">
    <q-card class="absolute-center" style="width: 25%">
      <div class="text-h3 text-center q-my-lg">
        Login
      </div>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md q-mt-xl"
      >
        <q-input
          filled
          v-model="username"
          label="Your username *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type your username']"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Your password *"

          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Please type your password',
          ]"
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div class="text-center">
          <q-btn label="Login" type="submit" color="primary"/>
          <q-btn label="Not a user?" color="primary" flat class="q-ml-sm" @click="onReg()"/>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import {ref} from 'vue'
import { Notify ,Loading} from 'quasar'
import { useQuasar } from 'quasar'
import  {api} from '../boot/axios'
export default {
  props: {
    url: {
      type: String,
      default: 'api/login',
    },

  },
  setup(props) {
    const $q = useQuasar()
    const $router = useQuasar()
    const {url} = props
    console.log(url)
    let username=ref("")
    let password=ref("")
    let accept =ref(false)
    const onSubmit = () => {
      if (!accept.value) {
        Notify.create({
          type: 'warning',
          message: 'License and terms must be accepted!'
        })
        return
      }
      let _this = this
      $q.loading.show({
        delay: 0,
        message: 'Logging in...',
      })
      api.post(url, {
        username: username.value,
        password: password.value,
      }).then(function (response) {
        $q.loading.hide()
        if (response.data.status === 'success') {
          sessionStorage.setItem('user_id', response.data.user.id)

          $router.push('/')
        } else {
          Notify.create({
            type: 'negative',
            message: response.data.message
          })
        }
      }).catch(function (error) {
        $q.loading.hide()
        Notify.create({
          type: 'negative',
          message: error.message
        })
      })

    }
    const onReg = () => {
      $router.push({
        name: '/reg',
      })
    }
    return {
      onSubmit,
      onReg,
      username,
      password,
      accept
    }
  }

}
</script>

<style>
  .bg-image {
    background-image: linear-gradient(to right, #c31432, #240b36)
  }
</style>
