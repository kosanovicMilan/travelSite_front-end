<template>
    <div class="users">
      <h1 class="mt-4">Users</h1>
  
      <div class="row">
        <div class="col-12">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Surname</th>
                <th scope="col">Email</th>
                <th scope="col">Type</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(us, index) in paginatedUsers" :key="us.user_id">
                <td>{{ us.name }}</td>
                <td>{{ us.surname }}</td>
                <td>{{ us.email }}</td>
                <td>{{ us.type }}</td>
                <td>{{ us.status }}</td>
                <td>
                  <!-- Edit Button -->
                  <router-link :to="{ name: 'EditUser', params: { userId: us.user_id } }" class="btn btn-warning btn-sm">
                    Edit
                  </router-link>
                  <!-- Delete Button -->
                  <button @click="deleteUser(us.user_id)" class="btn btn-danger btn-sm">
                    Delete
                  </button>
                  <!-- Change Status Button -->
                  <button @click="changeStatus(us.user_id, index)" class="btn btn-info btn-sm">
                    Change Status
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
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
      <router-link to="/user/addNew" class="btn btn-primary mb-3">Add New User</router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [],
        currentPage: 1,
        itemsPerPage: 5
      };
    },
    computed: {
      paginatedUsers() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.users.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.users.length / this.itemsPerPage);
      }
    },
    created() {
      this.$axios.get('/api/users').then((response) => {
        this.users = response.data;
      });
    },
    methods: {
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      },
      deleteUser(userId) {
        if (confirm("Are you sure you want to delete this user?")) {
          this.$axios
            .delete(`/api/users/${userId}`)
            .then(() => {
              alert('User deleted successfully!');
              this.users = this.users.filter(u => u.user_id !== userId);
            })
            .catch(err => {
              if (err.response && err.response.status === 409) {
                alert("You cannot delete this user due to existing dependencies.");
              } else {
                console.error(err);
              }
            });
        }
      },
      changeStatus(userId, index) {
        this.$axios
          .put(`/api/users/status/${userId}`)
          .then(() => {
            alert('User status updated successfully!');
            this.users[index].status = this.users[index].status === 'active' ? 'inactive' : 'active'; // Toggle status
          })
          .catch(err => {
            console.error('Error updating status:', err);
            alert('Error updating user status.');
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Style pagination */
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
  