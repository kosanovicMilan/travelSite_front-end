<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <router-link :to="{ name: 'home' }" tag="a" class="nav-link fs-3" :class="{ active: this.$router.currentRoute.name === 'home' }">
            TravelHelper
          </router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
             
              <li v-if="$user && ($user.type === 'Admin' || $user.type === 'User')" class="nav-item">
              <router-link :to="{name: 'AllDestinations'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'AllDestinations'}">Destinations</router-link>
              </li>

              <li v-if="$user && ($user.type === 'Admin' || $user.type === 'User')" class="nav-item">
                <router-link :to="{ name: 'AllArticles' }" tag="a" class="nav-link" :class="{ active: this.$router.currentRoute.name === 'AllArticles' }">
                  Articles
                </router-link>
              </li>

              <li v-if="$user && $user.type === 'Admin'" class="nav-item">
                <router-link :to="{ name: 'AllUsers' }" tag="a" class="nav-link" :class="{ active: this.$router.currentRoute.name === 'AllUsers' }">
                  Users
                </router-link>
              </li>
              
              <li v-if="$user && ($user.type === 'Admin' || $user.type === 'User' || $user.type === '')" class="nav-item">Blog</li>

              
            </ul>
            <span v-if="$user && $user.name">Welcome, {{ $user.name }}!</span>
            <div>

            </div>
            <form v-if="canLogout" class="d-flex" @submit.prevent="logout">
              <button v-if="$user.name && $user.name.trim() !== ''" class="btn btn-outline-danger me-2" type="submit">Logout</button>
            </form>
  
            <button v-if="!isLoggedIn && $route.name !== 'LoginPage'" class="btn btn-outline-primary me-2" @click="login">Log In</button>

          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NavBar',
    computed: {
      user() {
        return this.$user;
      },
      canLogout() {
        return this.$route.name !== 'LoginPage';
      },
      isLoggedIn() {
      return !!localStorage.getItem('jwt');
    }
    },
    methods: {
      logout() {
        localStorage.removeItem('jwt');

        this.$user = {
          name: '',
          email: '',
          type: '',
        };
        this.$router.push({ name: 'LoginPage' });
      },
      
      login() {
        this.$router.push({ name: 'LoginPage' });
      }
    },
    watch: {
    '$route'() {
      console.log("azurrao sam navBar!")
      this.$forceUpdate();
    }
  }
  };
  </script>

<style scoped>
.nav-item {
  margin-right: 15px; /* Razmak između stavki */
}
.nav-item:last-child {
  margin-right: 0; /* Ukloni razmak sa poslednje stavke */
}
</style>
  