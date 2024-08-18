<template>
  <div class="articles">
    <h1 class="mt-4">Articles</h1>

    <div class="row">
      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Date of creation</th>
              <th scope="col">Author</th>
              <th scope="col">Activity</th>
              <th scope="col">Destination</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in paginatedArticles" :key="article.article_id">
              <th scope="row">{{ article.article_id }}</th>
              <router-link :to="{ name: 'blog', params: { articleID: article.article_id } }" class = "text-truncate">
                {{ article.title | capitalize }}
              </router-link>
              <td>{{ article.text }}</td>
              <td>{{ article.created_on | formatDate }}</td>
              <td>{{ article.authorName }}</td>
              <td>{{ article.activityName }}</td>
              <td>{{ article.destinationName }}</td>
              <td>
                <!-- Edit Button -->
                <router-link :to="{ name: 'EditArticle', params: { articleId: article.article_id } }" class="btn btn-warning btn-sm">
                  Edit
                </router-link>
                <!-- Delete Button -->
                <button @click="deleteArticle(article.article_id)" class="btn btn-danger btn-sm">
                  Delete
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
    
    <router-link to="/article/addNew" class="btn btn-primary mb-3">Add New Article</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
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
    this.$axios.get('/api/articles').then((response) => {
      this.articles = response.data;
    });
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    deleteArticle(articleId) {
      if (confirm("Are you sure you want to delete this article?")) {
        this.$axios
          .delete(`/api/articles/${articleId}`)
          .then(() => {
            alert('Article deleted successfully!');
            this.articles = this.articles.filter(a => a.article_id !== articleId);
          })
          .catch(err => {
            console.error('Error deleting article:', err);
            alert('Error deleting article.');
          });
      }
    }
  }
};
</script>

<style scoped>
/* Style pagination */
.text-truncate {
  display: block;
  max-width: 200px; /* ili neka druga širina koja odgovara tvojoj tabeli */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
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
