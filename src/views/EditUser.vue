<template>
    <div>
      <h1 class="mt-4">Edit User</h1>
      <form @submit.prevent="updateUser">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input 
            type="text" 
            v-model="us.name" 
            id="name" 
            class="form-control" 
            required 
          />
        </div>
        <div class="mb-3">
          <label for="surname" class="form-label">Surname</label>
          <input 
            type="text" 
            v-model="us.surrname" 
            id="surname" 
            class="form-control" 
            required 
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input 
            type="email" 
            v-model="us.email" 
            id="email" 
            class="form-control" 
            required 
          />
        </div>
        <div class="mb-3">
          <label for="type" class="form-label">Type</label>
          <select 
            v-model="us.type" 
            id="type" 
            class="form-select" 
            required
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="status" class="form-label">Status</label>
          <select 
            v-model="us.status" 
            id="status" 
            class="form-select" 
            required
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>
        <button type="submit" class="btn btn-success">Save Changes</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        us: {
          name: '',
          surname: '',
          email: '',
          type: '',
          status: '',
        },
      };
    },
    created() {
      const userId = this.$route.params.userId;
  
      // Fetch user data
      this.$axios.get(`/api/users/${userId}`)
        .then((response) => {
          this.us = response.data;
        })
        .catch((error) => {
          console.error('There was an error fetching the user data:', error);
          alert('Error loading user data.');
        });
    },
    methods: {
      updateUser() {
        const userId = this.$route.params.userId;
  
        // PUT request to update the user
        this.$axios.put(`/api/users/${userId}`, this.us)
          .then(() => {
            alert('User updated successfully!');
            this.$router.push('/users'); // Redirect back to the users list
          })
          .catch((error) => {
            console.error('There was an error updating the user data:', error);
            alert('Error updating user.');
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>
  