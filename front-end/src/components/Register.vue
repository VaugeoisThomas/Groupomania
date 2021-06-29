<template>
  <main class="container">
    <div class="row md-5">
      <div v-if="errMessage" class="alert alert-danger">
          {{ errMessage }}
      </div>
      <div v-if="successMessage" class="alert alert-success">
          {{ successMessage }}
      </div>
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h1 class="card-title text-uppercase">Inscription</h1>
        </div>
        <div class="card-body">
          <form method="post" id="form-validation" >
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input v-model="user_email" type="email" class="form-control" id="email" name="email" placeholder="Adresse email" required />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="password">Password</label>
                  <input v-model="user_password" type="password" class="form-control" id="password" name="password" placeholder="Mot de passe" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="user_name">Pseudo</label>
                  <input v-model="user_name" type="text" class="form-control" id="user_name" name="user_name" placeholder="Votre pseudo" required />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="user_age">Age</label>
                  <input v-model="user_age" type="number" class="form-control" id="user_age" name="user_age" placeholder="Votre age" required />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="user_biography">Votre biographie</label>
                  <textarea v-model="user_biography" type="text" class="form-control" id="user_biography" name="user_biography" placeholder="Votre biographie" />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-sm-12 col-md-12 mt-2">
              <button @click="registration()" class="btn btn-secondary" id="submit" value="submit" type="submit">Inscription</button>
            </div>
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
      user_email: null,
      user_password: null,
      user_name: null,
      user_age: null,
      user_biography: null,
      errMessage: "",
      successMessage: "",
    };
  },
  methods: {
    registration(e) {
      if(e){
        e.preventDefault();
        e.stopPropagation();
      }
      var that = this;
      axios.post("http://localhost:3000/api/users", {
        users_email: this.user_email,
        users_password: this.user_password,
        users_name: this.user_name,
        users_age: this.user_age,
        users_biography: this.user_biography,
      })
      .then((response) => {
        that.errMessage = "";
        that.successMessage = "Inscription effectuée avec succés ! Bienvenue sur notre site !"
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
  min-height: 71vh;
}

.bg-primary {
  background-color: rgb(30, 30, 30) !important;
}

.card-title {
  text-align: center;
}
</style>
