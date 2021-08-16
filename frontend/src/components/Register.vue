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
                  v-model="email"
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
                  v-model="password"
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
                  v-model="name"
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
        <div class="row">
          <div v-if="errMessage" class="alert alert-danger">
            {{ errMessage }}
          </div>
          <div v-if="successMessage" class="alert alert-success">
            {{ successMessage }}
          </div>
        </div>
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
      email: null,
      password: null,
      name: null,
      errMessage: "",
      successMessage: "",
    };
  },
  methods: {
    registration() {
      let form = document.querySelector("#form-validation"),
        that = this,
        email_form = document.querySelector("#email"),
        password_form = document.querySelector("#password");

      if (email_form === "" || email_form === null) that.errMessage = "Veuillez entrer un email valide";
      if (password_form === "" || password_form === null) that.errMessage = "Veuillez entrer un password valide";

      if (form.checkValidity(event) === false) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("notOk");
      } else {
        form.classList.add("ok");
        axios
          .post("http://localhost:3000/api/user", { email: this.email, password: this.password, username: this.name })
          .then((response) => {
            that.successMessage = response.data.message;
            sessionStorage.setItem("jwt", response.data.token);
            sessionStorage.setItem("id", response.data.id);
            sessionStorage.setItem("isAdmin", response.data.isAdmin);
            response.headers = {
              Authorization: "Bearer " + response.data.token,
            };
            window.location.href = "/forum";
          })
          .catch((err) => { that.errMessage = err.response.data.message; });
      }
    },
  },
};
</script>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  height: 76.5vh;
  margin-top: 0.5%;
  margin-bottom: 0.5%;
}

.card {
  border: none;
  border-radius: 10px;
  background-color: rgb(248, 242, 242);
}

.card-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.bg-primary {
  background-color: rgb(26, 45, 75) !important;
  color: white;
}

.card-title {
  text-align: center;
}

.ok {
  border: 1px solid green;
}

.notOk {
  border: 1px solid red;
}
</style>
