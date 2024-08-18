<template>
    <div class="article-details">
      <div class="container">
        <h1>{{ article.title }}</h1>
  
        <p><strong>Text:</strong></p>
        <p>{{ article.text }}</p>
  
        <p><strong>Date of Creation:</strong> {{ formatDate(article.created_on) }}</p>
        <p><strong>Activity:</strong> {{ article.activityName }}</p>
        <p><strong>Author:</strong> {{ article.authorName }}</p>
        <p><strong>Destination:</strong> {{ article.destinationName }}</p>
        <p><strong>Visit Count:</strong> {{ article.count }}</p>
  
        <button @click="goBack" class="btn btn-secondary">Go Back</button>
  
        <div v-if="comments.length" class="comments-section">
          <h2>Comments:</h2>
          <div v-for="comment in comments" :key="comment.comment_id" class="comment">
            <p><strong>Writer:</strong> {{ comment.writer }}</p>
            <p><strong>Comment:</strong> {{ comment.text }}</p>
            <p><strong>Date:</strong> {{ formatDate(comment.created_on) }}</p>
          </div>
        </div>
  
        <!-- New Comment Form -->
        <div class="comment-form">
          <h2>Add a Comment:</h2>
          <form @submit.prevent="addComment">
            <div class="form-group">
              <label for="writer">Writer:</label>
              <input v-model="newComment.writer" type="text" id="writer" required />
            </div>
            <div class="form-group">
              <label for="text">Comment:</label>
              <textarea v-model="newComment.text" id="text" required></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary">Add Comment</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ArticleDetails',
    data() {
      return {
        article: {},
        comments: [],
        newComment: {
          writer: '',
          text: '',
          article_id: '',
          created_on: '' // Default to today's date
        }
      };
    },
    created() {
      const articleId = this.$route.params.articleId;
      this.fetchArticleDetails(articleId);
      this.fetchComments(articleId);
    },
    methods: {
      fetchArticleDetails(articleId) {
        this.$axios.get(`/api/articles/home/${articleId}`)
          .then(response => {
            this.article = response.data;
            this.newComment.article_id = this.article.id; // Set article_id for the new comment
          })
          .catch(error => {
            console.error("Error fetching article details:", error);
          });
      },
      fetchComments(articleId) {
        this.$axios.get(`/api/comments/forArticle/${articleId}`)
          .then(response => {
            this.comments = response.data;
          })
          .catch(error => {
            console.error("Error fetching comments:", error);
          });
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
      },
      formatDateNew(dateString) {
  const date = new Date(dateString);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}
      ,
      goBack() {
        this.$router.go(-1);
      },
      addComment() {
        this.newComment.article_id = this.$route.params.articleId
        this.newComment.created_on = this.formatDateNew(new Date())
        this.$axios.post('/api/comments', this.newComment)
          .then(response => {
            this.comments.push(response.data); // Add the new comment to the list
            this.newComment = { writer: '', text: '', article_id: this.article.id, created_on: this.formatDate(new Date()) }; // Reset form
          })
          .catch(error => {
            console.error("Error adding comment:", error);
          });
      }
    },
  };
  </script>
  
  <style scoped>
  .article-details {
    padding: 20px;
  }
  
  .container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  h1 {
    font-size: 2em;
    margin-bottom: 20px;
  }
  
  p {
    margin: 10px 0;
  }
  
  .btn {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
    border: none;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
  }
  
  .comments-section {
    margin-top: 30px;
  }
  
  .comments-section h2 {
    font-size: 1.5em;
    margin-bottom: 15px;
  }
  
  .comment {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  
  .comment p {
    margin: 5px 0;
  }
  
  .comment-form {
    margin-top: 30px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  textarea {
    resize: vertical;
    height: 100px;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
    border: none;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  