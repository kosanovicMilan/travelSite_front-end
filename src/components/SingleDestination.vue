<template>
    <div>
      <h2>
        Name: {{ destination.name }}
      </h2>
  
      <h5>Description:</h5>
      <p>
        {{ destination.description }} <br><br>
      </p>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "SingleDestination",
    props: {
      destination: {
        type: Object,
        required: true,
      }
    },
  }
  </script>
  
  <style scoped>
  
  </style>
  