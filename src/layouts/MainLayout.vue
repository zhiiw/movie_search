<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          Movie Search
          <q-badge color="red" v-if="isAdmin" align="top" show-if-above>Admin</q-badge>
        </q-toolbar-title>

    
        
      </q-toolbar>
      <q-tabs>
        <q-route-tab to="/">
          <q-tab-item>
            <q-icon v-if="!isAdmin" name="home" />Home
          </q-tab-item>
        </q-route-tab>
        <q-route-tab v-if="!isAdmin" to="/movies">
          <q-tab-item>
            <q-icon name="movie" />Movies
          </q-tab-item>
        </q-route-tab>

        <q-route-tab v-if="!isAdmin" to="/people">
          <q-tab-item>
            <q-icon name="account_circle" />People
          </q-tab-item>
        </q-route-tab>
        
        
        <q-route-tab v-if="!isAdmin" to="/history">
          <q-tab-item>
            <q-icon name="person" />Users
          </q-tab-item>
        </q-route-tab>
        <q-route-tab v-if="isAdmin" to="/admin">
          <q-tab-item >
            <q-icon name="admin_panel_settings" />Admin Movie
          </q-tab-item>
        </q-route-tab>
        <q-route-tab v-if="isAdmin" to="/adminComment">
          <q-tab-item >
            <q-icon name="admin_panel_settings" />Admin Comment
          </q-tab-item>
        </q-route-tab>
        <q-route-tab v-if="isAdmin" to="/adminPeople">
          <q-tab-item >
            <q-icon name="admin_panel_settings" />Admin Person
          </q-tab-item>
        </q-route-tab>
        <q-route-tab to="/about">
          <q-tab-item >
            <q-icon name="people_alt" />About
          </q-tab-item>
        </q-route-tab>
                <q-tab  @click="onLogout()" icon="logout"></q-tab>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script >
export default {
  data() {
    return {
      leftDrawerOpen: false,
      loggedIn: false,
      isAdmin: false,
    }
  },
  created() {
    this.loggedIn = sessionStorage.getItem('loggedIn') !== null
    const timer = setInterval(() => {
      this.checkLogin();
    }, 500)
  },
  methods: {
    onLogout() {
      console.log('logout')
      sessionStorage.removeItem('loggedIn')
      sessionStorage.removeItem('userid')
      sessionStorage.removeItem('role')
      this.loggedIn = true
      this.$router.replace('/')
    },
    checkLogin() {
      this.isAdmin = sessionStorage.getItem('role') === '1'
      console.log("the role is"+sessionStorage.getItem('role'))
      this.loggedIn = sessionStorage.getItem('loggedIn') !== null
      if(this.loggedIn) {
        if(this.$route.path === '/' || this.$route.path === '/reg')
          this.$router.push('/index')
      }
      else {
        if(this.$route.path !== '/' && this.$route.path !== '/reg')
          this.$router.push('/login')
      }
    }
  }
}
</script>
