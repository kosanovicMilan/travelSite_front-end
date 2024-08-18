<template>
    <div class="destinations">
      <h1 class="mt-4">Listed articles for destination : {{this.destinationName}}</h1>
  
      <div class="row">
        <div class="col-12">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Date of creation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="article in paginatedArticles" :key="article.article_id">
                <th scope="row">{{ article.article_id }}</th>
                <td>
                <router-link :to="{ name: 'ArticleDetails', params: { articleId: article.article_id } }">
                    {{ article.title | capitalize }}
                  </router-link>
                  </td>
                <td>{{ article.text }}</td>
                <td>{{ article.created_on | formatDate }}</td>
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
        articles: [],
        destinationName: this.$route.params.destinationName,
        currentPage: 1,
        itemsPerPage: 5
      };
    },
    computed: {
      paginatedArticles() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.articles.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.articles.length / this.itemsPerPage);
      }
    },
    created() {
      this.$axios.get(`/api/articles/home/destination/${this.destinationName}`).then((response) => {
        console.log(response.data);
        this.articles = response.data;
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
  