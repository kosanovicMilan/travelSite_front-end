<template>
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">TravelHelper</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li v-if="$user && $user.type === 'Admin'" class="nav-item me-2"> Users |</li>
              <li v-if="$user && !$user.type" class="nav-item me-2"> Destinations</li>
              <li class="nav-item">
              <router-link :to="{name: 'AllDestinations'}" tag="a" class="nav-link" :class="{active: this.$router.currentRoute.name === 'AllDestinations'}">Destinations</router-link>
              </li>
            </ul>
            <span v-if="$user && $user.name">{{ $user.name }}</span>
            <form v-if="canLogout" class="d-flex" @submit.prevent="logout">
              <button class="btn btn-outline-secondary" type="submit">Logout</button>
            </form>
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
      }
    },
    watch: {
    '$route'() {
      // Ove promene će pokrenuti ponovno čitanje korisnika iz localStorage
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
  