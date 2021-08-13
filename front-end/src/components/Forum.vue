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
    if (localStorage.id) this.UserId = localStorage.id;
    if (localStorage.is_admin) this.is_admin = localStorage.is_admin;
  },

  methods: {
    addPost(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      axios
        .post("http://localhost:3000/api/post", { content: this.content, UserId: this.UserId })
        .then(() => { window.location.reload(); })
        .catch((err) => {this.errMessage = err.response.data.message;});
    },

    deletePost(id) {
      const configuration = {
        headers: {
          Authorization: `Bearer ` + this.token,
        },
      };
      axios
        .delete("http://localhost:3000/api/post/" + id, configuration)
        .then(() => { window.location.reload(); })
        .catch((err) => { this.errMessage = err.response.data.message; });
    },
  },
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