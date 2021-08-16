<template>
  <div class="container">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <p class="card-text mb-2 text-muted"> Message publié par <span class="link" @click="goProfil(post.User.id)" style="cursor: pointer" >{{ post.User.username }}</span> le {{ dateTranslation(post.createdAt) }} à {{ getTime(post.createdAt) }}</p>
        </div>
        <div class="card-body">
          <p class="card-subtitle">{{ post.content }}</p>
        </div>
        <div class="card-footer">
          <div class="options">
            <button class="btn" @click="addComment = !addComment"><i class="fas fa-comment"></i></button>
            <!--<button class="btn" @click="showComments = !showComments"> {{ totalCommentsByMessage }} commentaires</button>-->
            <section v-show="addComment">
              <form @submit.prevent="postComment(post.id)" method="post">
                <label :for="post.id" class="ml-1"></label>
                <input v-model="commentContent" type="text" name="comment" :id="post.id" class="form-control" placeholder="Ajouter un commentaire" required>
                <button type="submit" class="btn btn-outline-info">Publier</button>
              </form>
            </section>
            <!--<div class="comment" v-for="comment in comments.slice().reverse()" :key="comment.id">
              <section v-show="showComments">
                <div v-if="comment.message_id === message.msg_id">
                  <div class="comment_list">
                    <h3 v-if="comment.name"> {{ comment.name }}</h3>
                    <p class="text-muted">{{comment.content}}</p>
                  </div>
                </div>
                <div v-else> 0</div>
              </section>
            </div> -->
            <button class="btn btn-danger" @click="deletePost(post.id)" v-if="id == post.UserId || is_admin == 1" > Supprimer le message </button>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
moment.locale("fr");

export default {
  name: "Posts",
  props: ["post"],
  data() {
    return {
      comment: null,
      comments: [],
      addComment: false,
      showComments: false,
      commentContent: "",
      id: "",
      is_admin: "",
      errMessage: "",
      totalCommentsByPosts: []
    };
  },
  created() {
    axios
      .get("http://localhost:3000/api/comment")
      .then((response) => { this.comments = response.data.result; })
      .catch((err) => { this.errMessage = err.response.data.error; });
  },

  mounted() {
    if (sessionStorage.id) this.id = sessionStorage.id;
    if (sessionStorage.is_admin) this.is_admin = sessionStorage.is_admin;
  },
  
  methods: {

    getTotalCommentsByMessage(id){
      axios
        .get("http://localhost:3000/api/comment/" + id +"/messages")
        .then((response) => { console.log(response.data.result.length); })
        .catch((err) => { this.errMessage = err.response.data.error; })
    },

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

    postComment(id){
      axios
        .post("http://localhost:3000/api/comment", { user_id: this.id, message_id: id, content: this.comment})
        .then(() => { window.location.reload();})
        .catch((err) => { this.errMessage = err.response.data.error; })
    },

    dateTranslation(date) {
      return moment(date).format(" Do/MM/YYYY");
    },

    getTime(date) {
      return moment(date).format("LTS");
    },

    goProfil(id){
      this.$router.push({name:'Profil', params:{ id: id }})
    }
  },
};
</script>

<style scoped>
.options {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.comment {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.comment_list{
  display: flex;
  flex-direction: column;
}
</style>