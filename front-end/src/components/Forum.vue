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
              <p>J'aime / J'aime pas</p>
              <p>commentaires</p>
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
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
//moment.locale("fr");

export default {
  name: "Forum",
  data() {
    return {
      messages: [],
      userId: "",
      isAdmin: "",
      authenticate: "",
      message_text: "",
    };
  },
  created() {
    axios
      .get("http://localhost:3000/api/forum")
      .then((response) => {
        this.messages = response.data;
      })
      .catch(() => {
        alert("Un problème est survenu ! Merci de réessayer ultérieurement !");
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
      return moment(date, "YYYY-MM-DD", "fr").format("DD-MM-YYYY");
    },

    getTime(date) {
      return moment(date, "HH-MM-SS").format("LT");
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
        .catch(() => {
          alert("Vous ne pouvez pas supprimer ce message ! ");
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
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          alert("Un problème est survenue durant l'envoie du message");
        });
    },
    goProfil(id) {
      this.$router.push({ name: "Profil", params: { id: id } });
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
  box-shadow: -12px 12px 10px 0px #ffd7d7 !important;
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
  margin-right: 1%;
}

.text-muted {
  font-style: italic;
}

.link {
  color: #fd2d01;
}

.link:hover {
  text-decoration: underline;
}
</style>