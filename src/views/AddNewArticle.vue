<template>
    <div class="add-new-article">
      <h1>Add New Article</h1>
  
      <form @submit.prevent="addArticle">
  
        <!-- Title Input -->
        <div class="form-group">
          <label for="title">Title:</label>
          <input
            type="text"
            id="title"
            v-model="article.title"
            class="form-control"
            required
          />
        </div>
  
        <!-- Text Input -->
        <div class="form-group">
          <label for="text">Text:</label>
          <textarea
            id="text"
            v-model="article.text"
            class="form-control"
            rows="5"
            required
          ></textarea>
        </div>
  
        <!-- Date Input -->
        <div class="form-group">
          <label for="created_on">Date of Creation:</label>
          <input
            type="date"
            id="created_on"
            v-model="article.created_on"
            class="form-control"
            required
          />
        </div>
  
        <!-- Destination Dropdown -->
        <div class="form-group">
          <label for="destination">Destination:</label>
          <select
            id="destination"
            v-model="article.destination_id"
            class="form-control"
            required
          >
            <option
              v-for="destination in destinations"
              :key="destination.destination_id"
              :value="destination.destination_id"
            >
              {{ destination.name }}
            </option>
          </select>
        </div>
  
        <!-- Activity Dropdown -->
        <div class="form-group">
          <label for="activity">Activity:</label>
          <select
            id="activity"
            v-model="article.activity_id"
            class="form-control"
            required
          >
            <option
              v-for="activity in activities"
              :key="activity.activity_id"
              :value="activity.activity_id"
            >
              {{ activity.name }}
            </option>
          </select>
        </div>
  
        <!-- Author Dropdown -->
        <div class="form-group">
          <label for="author">Author:</label>
          <select
            id="author"
            v-model="article.author_id"
            class="form-control"
            required
          >
            <option
              v-for="author in authors"
              :key="author.user_id"
              :value="author.user_id"
            >
              {{ author.name }}
            </option>
          </select>
        </div>
  
        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary">Add Article</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        article: {
          title: "",
          text: "",
          created_on: "",
          destination_id: null,
          activity_id: null,
          author_id: null,
        },
        destinations: [],
        activities: [],
        authors: []
      };
    },
    created() {
      // Fetch destinations, activities, and authors
      this.fetchDestinations();
      this.fetchActivities();
      this.fetchAuthors();
    },
    methods: {
      fetchDestinations() {
        this.$axios.get("/api/destinations").then((response) => {
          this.destinations = response.data;
        });
      },
      fetchActivities() {
        this.$axios.get("/api/activities").then((response) => {
          this.activities = response.data;
        });
      },
      fetchAuthors() {
        this.$axios.get("/api/users").then((response) => {
          this.authors = response.data;
        });
      },
      addArticle() {
        console.log("OVO je poslato za pravljenje novog!");
        console.log(JSON.stringify(this.article, null, 2));
        
        this.$axios
          .post("/api/articles", this.article)
          .then(() => {
            alert("Article added successfully!");
            this.$router.push({ name: "AllArticles" });
          })
          .catch((error) => {
            console.error("Error adding article:", error);
            alert("Error adding article.");
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Stilizacija forme za dodavanje novog članka */
  .add-new-article {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
  