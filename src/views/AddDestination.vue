<template>
    <div>
      <h1 class="mt-4">Add New Destination</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" v-model="name" id="name" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="country" class="form-label">Country</label>
          <input type="text" v-model="country" id="country" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea v-model="description" id="description" class="form-control" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-success">Add Destination</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        country: '',
        description: ''
      };
    },
    methods: {
      submitForm() {
        if (this.name && this.country && this.description) {
          this.$axios
            .post('/api/destinations', {
              name: this.name,
              country: this.country,
              description: this.description
            })
            .then(() => {
              this.$router.push({ name: 'AllDestinations' });
            })
            .catch(err => {
                if (err.response && err.response.status === 409) {
              alert("Destination with this name already exists!");
            } else {
                alert("Something went wrong!")
              console.error(err);
            }
            });
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Dodaj stilove po potrebi */
  </style>
  