<template>
  <main class="container">
    <section>
      <div class="row">
        <div class="card">
          <card class="card-header bg-blue">
            <h1>Profil de {{ profil.username }}</h1>
          </card>
          <div class="card-body">
            <div class="card-text">
              <p>Pseudo: {{ profil.username }}</p>
            </div>
            <div class="card-text">
              <p>Email: {{ profil.email }}</p>
            </div>
            <div class="card-text">
              <p>
                Admin :
                <span v-if="isAdmin == 1 || profil.isAdmin == 1">Oui</span>
                <span v-else>Non </span>
              </p>
            </div>
          </div>
          <div class="card-footer">
            <button
              v-if="isAdmin == 1 || profil.id == id"
              class="btn btn-danger"
              @click="deleteProfil = !deleteProfil"
            >
              Supprimer son compte
            </button>
            <button
              v-if="isAdmin == 1 || profil.id == id"
              class="btn btn-info"
              @click="modifyProfil = !modifyProfil"
            >
              Modifier son profil
            </button>
          </div>
        </div>
      </div>
    </section>
    <section v-show="deleteProfil">
      <form @submit.prevent="deleteAccount(profil.id)" method="delete">
        <div class="card">
          <div class="card-header bg-danger">
            <h2>Attention</h2>
          </div>
          <div class="card-body">
            <div class="card-text">
              <p>
                Vous êtes sur le point de supprimer votre profil ! Cette action
                est irreversible !
              </p>
            </div>
          </div>
          <div class="card-footer">
            <button type="submit" class="btn btn-danger" @click="deleteAccount">
              Supprimer mon compte
            </button>
          </div>
        </div>
      </form>
    </section>
    <section v-show="modifyProfil">
      <form
        @submit.prevent="modifyAccount(profil.id)"
        method="update"
        id="form-validation"
      >
        <div class="card">
          <div class="card-header bg-info">
            <h2>Modification du profil</h2>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    name="email"
                    v-model="email"
                    placeholder="Adresse email"
                    required
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    name="password"
                    placeholder="Mot de passe"
                    v-model="password"
                    required
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="name">Pseudo</label>
                  <input
                    type="text"
                    class="form-control"
                    id="name"
                    name="name"
                    placeholder="Votre pseudo"
                    v-model="name"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button
              type="submit"
              class="btn btn-success"
              @click="modifyAccount"
            >
              Modifier mon compte
            </button>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>


<script>
import axios from "axios";
export default {
  name: "Profil",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      profil: [],
      id: "",
      token: "",
      deleteProfil: false,
      modifyProfil: false,
      errMessage: "",
      successMessage: ""
    };
  },
  beforeRouteUpdate(to, from, next) { 
    this.findUser(to.params.id); 
    next();
  },

  created() {
    this.findUser(this.$route.params.id);
    if (sessionStorage.id) this.id = sessionStorage.id;
    if (sessionStorage.jwt) this.token = sessionStorage.jwt;
    if (sessionStorage.isAdmin) this.isAdmin = sessionStorage.isAdmin;
  },
  methods: {
    findUser() {
      axios
        .get(`http://localhost:3000/api/user/${this.$route.params.id}`)
        .then((response) => { this.profil = response.data.result; })
        .catch((err) => { this.errMessage = err.response.data.message; });
    },

    deleteAccount() {
      const configuration = {
        headers: { Authorization: `Bearer ` + this.token},
      };
      axios
        .delete("http://localhost:3000/api/user/" + this.id, configuration)
        .then(() => {
          localStorage.clear();
          window.location.href = "/";
        })
        .catch((err) => { this.errMessage = err.response.data.error; });
    },
    modifyAccount(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      const configuration = {
        headers: { Authorization: `Bearer ` + this.token}
      };

      axios
        .put("http://localhost:3000/api/user/" + this.id + "/updateProfil", {email: this.email, password: this.password, username: this.name}, configuration)
        .then(() => { window.location.reload(); })
        .catch((err) => { this.errMessage = err.response.data.error; });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 78.6vh;
}

.row {
  width: 100%;
  margin: 0 auto !important;
}

.bg-blue {
  background-color: rgb(26, 45, 75);
  color: white;
}

.bg-info {
  background-color: rgb(89, 93, 100) !important;
  color: white;
}

.card {
  width: 100%;
}

.card-title {
  text-align: center;
}

.card-footer {
  display: flex;
  flex-direction: row;
}

.btn-info {
  background-color: rgb(89, 93, 100);
  color: white;
  border: none;
  margin-left: 1%;
}
</style>