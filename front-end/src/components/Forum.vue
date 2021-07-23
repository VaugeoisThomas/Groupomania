<template>
  <div class="container">
    <div
      class="row messages"
      v-for="message in messages"
      :key="message.messages_id"
    >
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <p class="card-text mb-2 text-muted">
              Message publié par
              <span
                class="link"
                @click="goProfil(message.users_id)"
                style="cursor: pointer"
              >
                {{ message.users_name }}</span
              >
              le {{ dateTranslation(message.createdAt) }} à
              {{ getTime(message.createdAt) }}
            </p>
          </div>
          <div class="card-body">
            <p class="card-subtitle">{{ message.messages_text }}</p>
          </div>
          <div class="card-footer">
            <div class="btn-options">
              <button
                type="submit"
                class="btn btn-outline-secondary"
                @click="like(message.messages_id)"
              >
                <i class="far fa-thumbs-up"></i>
              </button>
              <button
                type="submit"
                class="btn btn-outline-secondary"
                @click="dislike(message.messages_id)"
              >
                <i class="far fa-thumbs-down"></i>
              </button>
              <button
                type="submit"
                class="btn btn-outline-secondary"
                @click="comment(message.messages_id)"
              >
                <i class="fas fa-comments"></i>
              </button>
            </div>
            <button
              class="btn btn-danger"
              @click="deleteMessage(message.messages_id)"
              v-if="userId == message.users_id || isAdmin == 1"
            >
              Supprimer le message
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row send">
      <div class="col-md-12">
        <div class="input-group mb-3">
          <input v-model="message_text" type="text" class="form-control" />
          <button @click="addMessage" type="button" class="btn btn-secondary">
            Envoyer un message
          </button>
        </div>
      </div>
    </div>
    <div class="row">
      <div v-if="errMessage" class="alert alert-danger">
        {{ errMessage }}
      </div>
      <div v-if="successMessage" class="alert alert-success">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
moment.locale("fr");

export default {
  name: "Forum",
  data() {
    return {
      messages: [],
      userId: "",
      isAdmin: "",
      authenticate: "",
      message_text: "",
      successMessage: "",
      errMessage: "",
    };
  },
  created() {
    axios
      .get("http://localhost:3000/api/forum")
      .then((response) => {
        this.messages = response.data;
      })
      .catch((err) => {
        this.errMessage = err.response.data.message;
      });
  },
  mounted() {
    if (localStorage.userId) {
      this.userId = localStorage.userId;
    }
    if (localStorage.isAdmin) {
      this.isAdmin = localStorage.isAdmin;
    }
  },
  methods: {
    dateTranslation(date) {
      return moment(date).format(" Do/MM/YYYY");
    },

    getTime(date) {
      return moment(date).format("LTS");
    },

    deleteMessage(message_id) {
      const configuration = {
        headers: {
          Authorization: `Bearer ` + this.token,
        },
      };
      axios
        .delete("http://localhost:3000/api/forum/" + message_id, configuration)
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          this.errMessage = err.response.data.message
        });
    },
    addMessage(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      axios
        .post("http://localhost:3000/api/forum", {
          messages_text: this.message_text,
          users_id: this.userId,
        })
        .then((response) => {
          this.successMessage = response.data.result
          window.location.reload();
        })
        .catch((err) => {
          this.errMessage = err.response.data.message;
        });
    },
    goProfil(id) {
      this.$router.push({ name: "Profil", params: { id: id } });
    },
    like(id) {
      alert("J'aime le message " + id);
    },
    dislike(id) {
      alert("Je n'aime le message " + id);
    },
    comment(id) {
      alert("Je commente le message " + id);
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 1%;
  min-height: 71vh;
}

.card {
  box-shadow: -12px 12px 10px 0px rgb(89,93,100) !important;
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
  color: rgb(26,45,75) !important;
}

.link:hover {
  text-decoration: underline;
}
</style>