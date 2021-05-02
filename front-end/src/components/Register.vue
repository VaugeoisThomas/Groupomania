<template>
    <main class="container">
        <div class="row m-5">
            <h4 v-if="error" class="alert alert-danger mt-4">
                {{ error }}
            </h4>
            <h4 v-if="success" class="alert alert-success mt-4">
                {{ success }}
            </h4>
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h1 class="card-title text-uppercase">Inscription</h1>
                </div>
                <div class="card-body">
                    <form @submit="registration" method="post" id="form-validation" enctype="multipart/form-data" novalidate>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input v-model="datas.email" type="email" class="form-control" id="email" name="email" placeholder="Adresse email" required>
                                    <div class="error">Merci de saisir un email valide</div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input v-model="datas.password" type="password" class="form-control" id="password" name="password" placeholder="Mot de passe" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$">
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
const axios = require("axios");
export default {
    name: "Register",
    data(){
        return {
            datas : {
                email: '',
                password: '',
            },
            error: "",
            success: ""
        }
    },
    methods: {
        registration(){
            const formData = new FormData();
            formData.append("email", this.datas.email);
            formData.append("password", this.datas.password);

            let validation = document.querySelector('#form-validation');
            if(validation.checkValidity(event) === false){
                event.preventDefault();
                event.stopPropagation();
            }else{
                axios.post("http://localhost:3000/api/users", formData)
                    .then(response => {
                        this.error = "";
                        this.success = "Inscription réussie";
                        response.headers = { Authorization: "Bearer " + response.data.token};
                        setTimeout(() => {
                            window.location.href = "/profil";
                        }, 2000)
                    })
                    .catch(() => {
                        this.error = "L'email est déjà utilisé";
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
</style>
