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
            <button class="btn" @click="showComments = !showComments"> {{ post.commentsNbr }} commentaire(s)</button>
            <button class="btn btn-danger" @click="deletePost(post.id)" v-if="isAdmin == 1 || post.UserId == id"> Supprimer le message </button>
          </div> 
          <div class="commentsByPost">
            <section v-show="addComment">
              <form @submit.prevent="postComment(post.id)" method="post">
                <label :for="post.id" class="ml-1"></label>
                <input v-model="content" type="text" name="comment" :id="post.id" class="form-control" placeholder="Ajouter un commentaire" required>
                <button type="submit" class="btn btn-outline-info">Publier</button>
              </form>
            </section>
            <section v-show="showComments">
              {{comments.content}}
              <div class="commentShown" v-for="comment in comments" :key="comment.id">
                {{comment.content}}
              </div>
            </section>
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
      comments: [],
      addComment: false,
      showComments: false,
      PostId: '',
      id: '',
      isAdmin: 0,
      commentContent: ''
    };
  },

  mounted() {
    if (sessionStorage.id) this.id = sessionStorage.id;
    if (sessionStorage.isAdmin) this.isAdmin = sessionStorage.isAdmin;
  },
  
  methods: {

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
        .post("http://localhost:3000/api/comment", { UserId: this.id, PostId: id, content: this.content})
        .then(() => { window.location.reload();})
        .catch((err) => { this.errMessage = err.response.data.message; })
    },

    dateTranslation(date) {
      return moment(date).format(" Do/MM/YYYY");
    },

    getTime(date) {
      return moment(date).format("LTS");
    },

    goProfil(id){
      this.$router.push({name:'Profil', params:{ id: id }})
    },

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

.commentList {
  display: flex;
  flex-direction: column;
}
</style>