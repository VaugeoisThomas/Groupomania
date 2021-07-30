<template>
  <div class="container">
    <message
      class="row message"
      v-for="message in messages.slice().reverse()"
      :key="message.msg_id"
      :message="message"
    >
    </message>

    <div class="row send">
      <div class="col-md-12">
        <div class="input-group mb-3">
          <input type="text" class="form-control" />
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
import Messages from "./Messages";

export default {
  name: "Forum",
  components: {
    message: Messages,
  },
  data() {
    return {
      messages: [],
      userId: "",
      authenticate: "",
      successMessage: "",
      errMessage: "",
    };
  },
  created() {
    axios
      .get("http://localhost:3000/api/forum")
      .then((response) => {
        this.messages = response.data.result;
      })
      .catch((err) => {
        this.errMessage = err.response.data.message;
      });
  },
  mounted() {
    if (localStorage.userId) {
      this.userId = localStorage.userId;
    }
    if (localStorage.is_admin) {
      this.is_admin = localStorage.is_admin;
    }
  },
  methods: {
    addMessage(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      axios
        .post("http://localhost:3000/api/forum", {
          content: this.content,
          user_id: this.userId,
        })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          this.errMessage = err.response.data.message;
        });
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