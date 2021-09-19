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
      isFormValid: false,
    };
  },

  mounted() {
    let that = this,
        passwordForm = document.querySelector('#password'),
        emailForm = document.querySelector('#email');

    emailForm.addEventListener('input', () => {
      if(!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailForm.value))) {
        that.errMessage = "Veuillez entrer un email valide";
      } else {
        that.errMessage = "";
        that.successMessage = "Email validé";
        that.isFormValid = true;
      }
    });
      
    passwordForm.addEventListener('input', () => {
      if(passwordForm.value === "" || passwordForm.value.length < 8){
        that.successMessage = "";
        that.errMessage = "Le mot de passe doit contenir à minima 8 caractères";
      } else {
        that.errMessage = "";
        that.successMessage = "Mot de passe validé";
        that.isFormValid = true;
      }
    });

  },

  methods: {
    login() {
      let form = document.querySelector("#form-validation");

      if(!this.isFormValid) {
        event.preventDefault();
        event.stopPropagation();
        this.errMessage = "Un ou plusieur champs sont invalides";
      } else {
        form.classList.add("ok");
        axios
          .post("http://localhost:3000/api/user/login", { email: this.email, password: this.password })
          .then((response) => {
            this.successMessage = "Connexion réussie";
            sessionStorage.setItem("jwt", response.data.token);
            sessionStorage.setItem("id", response.data.id);
            sessionStorage.setItem("isAdmin", response.data.isAdmin);
            response.headers = {
              Authorization: "Bearer " + response.data.token,
            };
            setTimeout(() => {window.location.href = "/forum"; }, 2000);

          })
          .catch((err) => { this.errMessage = err.response.data.message; });
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
</style>
