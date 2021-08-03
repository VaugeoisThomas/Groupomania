<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <p class="card-text mb-2 text-muted">
          Message publié par
          <span
            class="link"
            @click="goProfil(message.user_id)"
            style="cursor: pointer"
          >
            {{ message.name }}</span
          >
          le {{ dateTranslation(message.created_at) }} à
          {{ getTime(message.created_at) }}
        </p>
      </div>
      <div class="card-body">
        <p class="card-subtitle">{{ message.content }}</p>
      </div>
      <div class="card-footer">
        <div class="options">
          <button type="button" class="comment" @click="comment = !comment">
            <i class="fas fa-comment"></i>
          </button>
          <button
            class="btn btn-danger"
            @click="deleteMessage(message.id)"
            v-if="id == message.user_id || is_admin == 1"
          >
            Supprimer le message
          </button>
          <section v-show="comment">
            <form @submit.prevent="comment(message.id)" method="post">
              <input type="text" name="comment" id="comment">
              <button type="submit" class="comment"></button>
            </form>
          </section>
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
  name: "Messages",
  props: ["message"],
  data() {
    return {
      comments: [],
      id: "",
      is_admin: "",
      errMessage: "",
    };
  },
  created() {
    axios
      .get("http://localhost:3000/api/comment")
      .then((response) => { this.comments = response.data.result; })
      .catch((err) => { this.errMessage = err.response.data.error; });
  },
  mounted() {
    if (localStorage.id) this.id = localStorage.id;
    if (localStorage.is_admin) this.is_admin = localStorage.is_admin;
  },
  methods: {
    deleteMessage(id) {
      const configuration = {
        headers: {
          Authorization: `Bearer ` + this.token,
        },
      };
      axios
        .delete("http://localhost:3000/api/forum/" + id, configuration)
        .then(() => { window.location.reload(); })
        .catch((err) => { this.errMessage = err.response.data.error; });
    },

    addComment(id){
      axios
        .post("http://localhost:3000/api/comments", { user_id: this.id, message_id: id, content: this.comment})
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
  justify-content: space-evenly;
}

.comment {
  border: none !important;
}
</style>