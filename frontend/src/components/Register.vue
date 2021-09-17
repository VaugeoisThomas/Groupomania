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
      isFormValid: false,
    };
  },
  mounted(){
      let that = this,
          email_form = document.querySelector("#email"),
          password_form = document.querySelector("#password");

      email_form.addEventListener('input', () => {
        if(!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email_form.value))) {
          that.errMessage = "Veuillez entrer un email valide";
        } else {
          that.errMessage = "";
          that.successMessage = "Email validé";
          that.isFormValid = true;
        }
      });
      
      password_form.addEventListener('input', () => {
        if(password_form.value === "" || password_form.value.length < 8){
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
    registration() {
      let form = document.querySelector("#form-validation");
      if(!this.isFormValid){
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("notOk");
        this.errMessage = "Un ou plusieur champs sont manquants";
      } else {
        form.classList.add("ok");
        axios
          .post("http://localhost:3000/api/user", { email: this.email, password: this.password, username: this.name })
          .then((response) => {
            this.successMessage = "Vous allez être rediriger, veuillez maintenant vous connecter";
            response.headers = {
              Authorization: "Bearer " + response.data.token
            };
            window.location.href = '/';
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

.ok {
  border: 1px solid green;
}

.notOk {
  border: 1px solid red;
}
</style>
