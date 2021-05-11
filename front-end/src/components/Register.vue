<template>
    <main class="container">
        <div class="row m-5">
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h1 class="card-title text-uppercase">Inscription</h1>
                </div>
                <div class="card-body">
                    <form @submit="registration" method="post" id="form-validation" novalidate>
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
                            <div class="col-sm-12 col-md-12 mt-2">
                                <button class="btn btn-secondary" id="valider" value="valider" type="submit">Inscription</button>
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
    name: "Register",
    data(){
        return {
            user_email: null,
            user_password: null,
        };
    },
    methods: {
        registration(event){
            var that = this;

            event.preventDefault();
            let form = document.querySelector('#form-validation');
            if(form.checkValidity(event) === false){
                event.preventDefault();
                event.stopPropagation();
            }else{
                axios.post("http://localhost:3000/api/users", {users_email: this.user_email, users_password: this.user_password})
                    .then((response) => {
                        localStorage.setItem("jwt", response.data.token);
                        localStorage.setItem("userId", response.data.userId);
                        response.headers = { 
                            Authorization: "Bearer " + response.data.token
                        };
                        window.location.href = "/profil";
                    })
                    .catch(() => {
                        that.error = "L'email est déjà utilisé";
                    });
            }
        }
    }
}
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

input:invalid{
    border: 2px solid red;
}
input:valid{
    border: 2px solid green;
}
</style>
