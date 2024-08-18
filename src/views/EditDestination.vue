<template>
    <div class="edit-destination">
      <h1>Edit Destination</h1>
      <form @submit.prevent="updateDestination">
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            type="text" 
            id="name" 
            v-model="destination.name" 
            :placeholder="destination.name" 
            class="form-control" 
            required
          />
        </div>
  
        <div class="form-group">
          <label for="country">Country</label>
          <input 
            type="text" 
            id="country" 
            v-model="destination.country" 
            :placeholder="destination.country" 
            class="form-control" 
            required
          />
        </div>
  
        <div class="form-group">
          <label for="description">Description</label>
          <textarea 
            id="description" 
            v-model="destination.description" 
            :placeholder="destination.description" 
            class="form-control" 
            required
          ></textarea>
        </div>
  
        <button type="submit" class="btn btn-primary">Save Changes</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        destination: {
          name: '',
          country: '',
          description: ''
        }
      };
    },
    created() {
      const destinationId = this.$route.params.destinationId;
        console.log(destinationId)
      // Get request to fetch the destination by ID
      this.$axios.get(`/api/destinations/${destinationId}`).then((response) => {
        this.destination = response.data; 
      }).catch((err) => {
        console.error(err);
        alert("Error loading destination data.");
      });
    },
    methods: {
      updateDestination() {
        const destinationId = this.$route.params.destinationId;
  
        // PUT request to update the destination
        this.$axios.put(`/api/destinations/${destinationId}`, this.destination)
          .then(() => {
            alert("Destination updated successfully!");
            this.$router.push('/destinations'); // Redirect back to destinations list
          })
          .catch((err) => {
            console.error(err);
            alert("Error updating destination.");
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .edit-destination {
    max-width: 600px;
    margin: 0 auto;
    padding-top: 40px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  </style>
  