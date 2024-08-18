<template>
  <div class="home">
    <h2>Welcome to Travel helper, here are some of the newest articles:</h2>

    <div class="table-container">
      <table class="article-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Text</th>
            <th>Date of Creation</th>
            <th>Destination</th>
            <th>Activity</th>
            <th>Number of visits</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in paginatedArticles" :key="article.id">
            <td>
            <router-link :to="{ name: 'ArticleDetails', params: { articleId: article.article_id } }">
              {{ article.title | capitalize }}
            </router-link>
          </td>
            <td>{{ formatText(article.text) }}</td>
            <td>{{ formatDate(article.created_on) }}</td>
            <td>
            <router-link :to="{ name: 'ArtByDestName', params: { destinationName: article.destinationName } }">
              {{ article.destinationName | capitalize }}
            </router-link>
          </td>
          <td>
            <router-link :to="{ name: 'ArticlesByActivity', params: { activityId: article.activity_id } }">
              {{ article.activityName | capitalize }}
            </router-link>
          </td>
            <td>{{article.count}}</td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      articles: [],
      currentPage: 1,
      articlesPerPage: 5,
      totalArticles: 0,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalArticles / this.articlesPerPage);
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.articlesPerPage;
      return this.articles.slice(start, start + this.articlesPerPage);
    },
  },
  created() {
    this.$axios.get('/api/articles/home')
        .then(response => {
          this.articles = response.data;
          this.totalArticles = this.articles.length; // Or use a specific count from the API
        })
        .catch(error => {
          console.error("Error fetching articles:", error);
        });
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB');
    },
    formatText(text) {
      return text.length > 30 ? text.substring(0, 30) + '...' : text;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
  },
};
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.table-container {
  margin-top: 20px;
}

.article-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.article-table th,
.article-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.article-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.article-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.article-table tr:hover {
  background-color: #f1f1f1;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 15px;
}
</style>
