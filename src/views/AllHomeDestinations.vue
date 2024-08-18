<template>
    <div class="destinations">
      <h1 class="mt-4">Destinations</h1>
  
      <div class="row">
        <div class="col-12">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="destination in paginatedDestinations" :key="destination.destination_id">
                <th scope="row">{{ destination.destination_id }}</th>
                <td>
                  <router-link :to="{ name: 'ArtByDestName', params: { destinationName: destination.name } }">
                    {{ destination.name | capitalize }}
                  </router-link>
                </td>
                <td>{{ destination.country }}</td>
                
              </tr>
            </tbody>
          </table>
          <!-- Paginacija -->
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
              </li>
              <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
                <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        destinations: [],
        currentPage: 1,
        itemsPerPage: 5
      };
    },
    computed: {
      paginatedDestinations() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.destinations.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.destinations.length / this.itemsPerPage);
      }
    },
    created() {
      this.$axios.get('/api/destinations/home').then((response) => {
        this.destinations = response.data;
      });
    },
    methods: {
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Stilizuj paginaciju */
  .pagination {
    justify-content: center;
    margin-top: 20px;
  }
  .page-item.disabled .page-link {
    pointer-events: none;
    cursor: default;
  }
  .page-item.active .page-link {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
  }
  </style>
  
  