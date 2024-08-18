<template>
    <div class="edit-article">
      <h1>Edit Article</h1>
  
      <form @submit.prevent="updateArticle">
        
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
  
        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary">Update Article</button>
      </form>
  
      <!-- Form to add a new activity -->
      <h3 class="mt-5">Add New Activity</h3>
      <form @submit.prevent="addNewActivity">
        <div class="form-group">
          <label for="newActivityName">Activity Name:</label>
          <input
            type="text"
            id="newActivityName"
            v-model="newActivity.name"
            class="form-control"
            required
          />
        </div>
  
        <button type="submit" class="btn btn-success">Add Activity</button>
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
        },
        destinations: [],
        activities: [],
        newActivity: {
          name: ""
        },
      };
    },
    created() {
      const articleId = this.$route.params.articleId;
  
      // Fetch article data
      this.$axios.get(`/api/articles/${articleId}`).then((response) => {
        this.article = response.data;
        const date = new Date(this.article.created_on);
        this.article.created_on = date.toISOString().split("T")[0];
      });
  
      // Fetch destinations and activities
      this.fetchDestinations();
      this.fetchActivities();
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
      updateArticle() {
        const articleId = this.$route.params.articleId;
        
        console.log("OVO je poslato za update!")
        console.log(JSON.stringify(this.article, null, 2));

        this.$axios
          .put(`/api/articles/${articleId}`, this.article)
          .then(() => {
            alert("Article updated successfully!");
            this.$router.push({ name: "AllArticles" });
          })
          .catch((error) => {
            console.error("Error updating article:", error);
            alert("Error updating article.");
          });
      },
      addNewActivity() {
        this.$axios
          .post("/api/activities", this.newActivity)
          .then(() => {
            alert("New activity added successfully!");
            this.fetchActivities(); // Refresh the activities list
            this.newActivity.name = ""; // Clear the form
          })
          .catch((error) => {
            console.error("Error adding activity:", error);
            alert("Error adding activity.");
          });
      },
    },
  };
  </script>
  
  <style scoped>
  /* Stilizacija forme za editovanje */
  .edit-article {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
  