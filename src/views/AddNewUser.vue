<template>
    <div>
      <h1 class="mt-4">Add New User</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input type="text" v-model="name" id="name" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="surname" class="form-label">Surname</label>
          <input type="text" v-model="surname" id="surname" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" v-model="email" id="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" v-model="password" id="password" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input type="password" v-model="confirmPassword" id="confirmPassword" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="type" class="form-label">Type</label>
          <select v-model="type" id="type" class="form-control">
            <option>User</option>
            <option>Admin</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="status" class="form-label">Status</label>
          <select v-model="status" id="status" class="form-control" required>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>
        <button type="submit" class="btn btn-success">Add User</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        type: 'User',
        status: 'Active'
      };
    },
    methods: {
      submitForm() {
        if (this.password !== this.confirmPassword) {
          alert('Passwords do not match!');
          return;
        }

        console.log(this.email + this + 'ovo je sta je prosledjeno')
  
        this.$axios
          .post('/api/users', {
            name: this.name,
            surrname: this.surname,
            type: this.type,
            password: this.password,
            email: this.email,
            status: this.status
          })
          .then(() => {
            alert('User added successfully!');
            this.$router.push({ name: 'AllUsers' });
          })
          .catch((err) => {
            if (err.response && err.response.status === 409) {
              alert("User with this email already exist!");
            } else {
                alert("Something went wrong!")
              console.error(err);
            }
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Dodaj stilove po potrebi */
  </style>
  