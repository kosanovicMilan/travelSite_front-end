<template>
    <div class="destinations">
        <h1 class="mt-4">Destinations</h1>

        <div class="row">
            <div class="col-4">
            <table class="table">
                <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">name</th>
                <th scope="col">Country</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="destination in destinations" :key="destination.destination_id">
                <th scope="row">{{ destination.destination_id }}</th>
                <td>{{ destination.name | capitalize }}</td>
                <td>{{ destination.country}}</td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
</template>
  
  <script>
  //import SingleDestination from "../components/SingleDestination.vue";
  export default {
    //components:{SingleDestination},
    data() {
      return {
        destinations: []
      }
    },
    created() {
      this.$axios.get('/api/destinations').then((response) => {
        this.destinations = response.data;
      });
    },
  }
  </script>
  