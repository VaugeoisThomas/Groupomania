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
        <button
          class="btn btn-danger"
          @click="deleteMessage(message.id)"
          v-if="userId == message.user_id || is_admin == 1"
        >
          Supprimer le message
        </button>
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
        userId: "",
        is_admin: ""
    };
  },
  methods: {
    dateTranslation(date) {
      return moment(date).format(" Do/MM/YYYY");
    },

    getTime(date) {
      return moment(date).format("LTS");
    },

    deleteMessage(id) {
      const configuration = {
        headers: {
          Authorization: `Bearer ` + this.token,
        },
      };
      axios
        .delete("http://localhost:3000/api/forum/" + id, configuration)
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