<template>
  <main class="container">
    <div class="card">
      <div class="card-header bg-primary text-white">
        <h1 class="card-title text-uppercase">Inscription</h1>
      </div>
      <div class="card-body">
        <form method="post" id="form-validation">
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  v-model="user_email"
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  placeholder="Adresse email"
                  required
                />
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  v-model="user_password"
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  placeholder="Mot de passe"
                  required
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                />
              </div>
            </div>
            <div class="col-sm-12">
              <div class="form-group">
                <label for="user_name">Pseudo</label>
                <input
                  v-model="user_name"
                  type="text"
                  class="form-control"
                  id="user_name"
                  name="user_name"
                  placeholder="Votre pseudo"
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col-sm-12 col-md-12 mt-2">
            <button
              @click="registration()"
              class="btn btn-secondary"
              id="submit"
              value="submit"
              type="submit"
            >
              Inscription
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row md-12">
      <div v-if="errMessage" class="alert alert-danger">
        {{ errMessage }}
      </div>
      <div v-if="successMessage" class="alert alert-success">
        {{ successMessage }}
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      user_email: null,
      user_password: null,
      user_name: null,
      errMessage: "",
      successMessage: "",
    };
  },
  methods: {
    registration(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      var that = this;
      axios
        .post("http://localhost:3000/api/users", {
          users_email: this.user_email,
          users_password: this.user_password,
          users_name: this.user_name,
        })
        .then((response) => {
          that.errMessage = "";
          that.successMessage =
            "Inscription effectuée avec succés ! Bienvenue sur notre site !";
          localStorage.setItem("jwt", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          response.headers = {
            Authorization: "Bearer " + response.data.token,
          };
          window.location.href = "/forum";
        })
        .catch(() => {
          that.errMessage = "L'email est déjà utilisé";
        });
    },
  },
};
</script>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  height: 78.6vh;
}

.card {
  border: none;
  border-radius: 10px;
  background-color: rgb(248, 242, 242);
  margin-bottom: 2%;
}

.bg-primary {
  background-color: #fd2d01 !important;
  color: white;
}

.card-title {
  text-align: center;
}
</style>
