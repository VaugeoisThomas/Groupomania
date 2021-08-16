<template>
  <div class="container">
    <posts
      class="row post"
      v-for="post in posts.slice().reverse()"
      :key="post.id"
      :post="post"
    >
    </posts>

    <div class="row send">
      <div class="col-md-12">
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="content" required/>
          <button @click="addPost" type="button" class="btn btn-secondary">
            Envoyer un message
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Posts from "./Posts";

export default {
  name: "Forum",
  components: {
    posts: Posts,
  },
  data() {
    return {
      posts: [],
      content: "",
      UserId: "",
      is_admin: "",
      successMessage: "",
      errMessage: "",
    };
  },
  created() {
    axios
      .get("http://localhost:3000/api/post")
      .then((response) => { this.posts = response.data.result })
      .catch((err) => { this.errMessage = err.response.data.message})
  },
  mounted() {
    if (sessionStorage.id) this.UserId = sessionStorage.id;
    if (sessionStorage.is_admin) this.is_admin = sessionStorage.is_admin;
  }
};
</script>

<style scoped>
.container {
  margin-top: 1%;
}

.card {
  border: 2px solid black;
  border-radius: 25px;
  margin-bottom: 2%;
}

.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.row {
  width: 100%;
  margin-bottom: 1%;
}

.send {
  bottom: 5vh;
  position: static;
  max-width: 60%;
}

.btn-options {
  display: flex;
  flex-direction: row;
}

.text-muted {
  font-style: italic;
}

.link,
.btn-outline-secondary {
  color: rgb(26, 45, 75) !important;
}

.link:hover {
  text-decoration: underline;
}
</style>