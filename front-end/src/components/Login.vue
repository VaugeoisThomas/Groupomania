<template>
    <main class="container">
        <div class="row md-5">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h1 class="card-title text-uppercase">Connexion</h1>
                </div>
                <div class="card-body">
                    <form @submit="login" method="post" id="form-validation">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input v-model="user_email" type="email" class="form-control" id="email" name="email" placeholder="Adresse email" required>
                                    <div class="error">Merci de saisir un email valide</div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input v-model="user_password" type="password" class="form-control" id="password" name="password" placeholder="Mot de passe" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$">
                                    <div class="error">Votre mot de passe doit contenir minimum 8 caractères dont une majuscule et un chiffre</div>
                                </div>
                            </div>
                            <div class="col-sm-6 col-md-6 mt-2">
                                <button class="btn btn-secondary" id="valider" value="valider" type="submit">Connexion</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";

export default {
    name: "Login",
    data(){
        return {
            user_email: null,
            user_password: null
        };
    },
    methods: {
        login(e){
            e.preventDefault();
            let form = document.querySelector("#form-validation");
            if(form.checkValidity(e) === false){
                e.preventDefault();
                e.stopPropagation();
            } else {
                axios.post("http://localhost:3000/api/users/login", {
                    users_email: this.user_email, 
                    users_password: this.user_password
                    })
                    .then((response) => {
                        localStorage.setItem("jwt", response.data.token);
                        localStorage.setItem("userId", response.data.userId);
                        localStorage.setItem("isAdmin", response.data.isAdmin)
                        response.headers = {
                            Authorization: "Bearer " + response.data.token,
                        };
                        window.location.href = "/forum";
                    })
                    .catch("Utilisateur non reconnu");
            }
        }  
    }
};
</script>

<style scoped>

.container {
    display: flex;
    justify-content: center;
    min-height: 71vh;
}

.bg-primary{
    background-color: rgb(30, 30, 30) !important;
}

.card-title{
    text-align: center; 
}

.ok{
    border: 1px solid green;
}
</style>
