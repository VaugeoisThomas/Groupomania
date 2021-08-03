<template>
  <main class="container">
    <div class="card">
      <div class="card-header bg-primary text-white">
        <h1 class="card-title text-uppercase">Connexion</h1>
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
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
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
              @click="login()"
              class="btn btn-secondary"
              id="submit"
              value="submit"
              type="submit"
            >
              Connexion
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
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      errMessage: "",
      successMessage: "",
    };
  },
  methods: {
    login() {
      var that = this,
        form = document.querySelector("#form-validation"),
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
          .post("http://localhost:3000/api/user/login", { email: this.email, password: this.password })
          .then((response) => {
            that.successMessage = response.data.message;
            localStorage.setItem("jwt", response.data.token);
            localStorage.setItem("id", response.data.id);
            localStorage.setItem("is_admin", response.data.is_admin);
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
