<template>
    <div class="pt-5">
      <h1>Welcome to Log In page, please log in to continue!</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
        <input v-model="email" type="text" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginPage",
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      login() {
        this.$axios.post('/api/users/login', {
          email: this.email,
          password: this.password,
        }).then(response => {
          localStorage.setItem('jwt', response.data.jwt)
          this.$router.push({name: 'home'});
        }).catch(error => {
          if (error.response && error.response.status === 422) {
           alert("Wrong email or password!");
           } else {
              alert("An error occurred: " + error.message);
            }
          });
      }
    },
  }
  </script>
  
  <style scoped>
  
  </style>
  