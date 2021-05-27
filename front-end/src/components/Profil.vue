<template>
    <main class="container">
        <div class="row">
            <div class="card">
                <div v-if="profil.users_name === ''" class="card-body">
                    <h1 class="card-title text-uppercase">Création du profil </h1>
                    <form @submit="creationProfil.prevent" method="put" id="form-validation" novalidate>
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="user_name">Pseudo</label>
                                    <input v-model="user_name" type="text" class="form-control" id="user_name" name="user_name" placeholder="Votre pseudo" required>
                                    <div class="error">Merci de saisir votre pseudo</div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="user_age">Age</label>
                                    <input v-model="user_age" type="number" class="form-control" id="user_age" name="user_age" placeholder="Votre age" required>
                                    <div class="error">Votre age doit être un chiffre entre 18 et 99</div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="user_biography">Votre biographie</label>
                                    <textarea v-model="user_biography" type="text" class="form-control" id="user_biography" name="user_biography" placeholder="Votre biographie" />
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12 mt-2">
                                <button class="btn btn-secondary" id="valider" value="valider" type="submit">Création du profil</button>
                            </div>
                        </div>
                    </form>     
                </div>
                <div v-else class="card-body">
                    <div class="card-title text-uppercase">Informations</div>
                    <p class="card-text">Votre pseudo: {{ profil.users_name }}</p>
                    <p class="card-text">Votre adresse email: {{ profil.users_email }}</p>
                    <p class="card-text">Votre age: {{ profil.users_age }}</p>
                    <p class="card-text">Votre biographie: {{ profil.users_biography }}</p>
                </div>
                <div class="card-footer">
                    <h1>Options</h1>
                    <button class="btn btn-danger" type="button" id="suppression" value="suppression" @click="deletionProfil()">Supprimer votre compte</button>
                    <button class="btn btn-success" type="button" id="modification" value="modification" @click="profilModification()">Modifier votre profil</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

import axios from 'axios';
export default {
    name: "Profil",
    data(){
        return {
            user_name: null,
            user_age: null,
            user_biography: null,
            profil: [],
            userId: "",
            token: "",
        }

    },
    created(){
        if(localStorage.userId) {
            this.userId = localStorage.userId
        }
        if(localStorage.jwt) {
            this.token = localStorage.jwt;
        }
        axios.get("http://localhost:3000/api/users/" + this.userId)
        .then((response) => {
            this.profil = response.data;
        })
        .catch(() => {
            alert('Un problème inconnu viens de se produire !')
        });
    },
    methods: {
        creationProfil(event) {
            var that = this;
            event.preventDefault();

            let form = document.querySelector('#form-validation');
            if(form.checkValidity(event) === false){
                event.preventDefault();
                event.stopPropagation();
            }else{
                axios.put("http://localhost:3000/api/users/" + this.userId + "/profil", {users_name: this.user_name, users_age: this.user_age, users_biography: this.user_biography })
                    .then((response) => {
                        response.headers = { 
                            Authorization: "Bearer " + response.data.token
                        };
                        window.location.href = '/profil';
                    })
                    .catch(() => {
                        that.error = "L'email est déjà utilisé";
                    });
            }
        },
        deletionProfil(){
            const configuration = {
                headers: { Authorization: 'Bearer ' + this.token },
            }
            axios.delete("http://localhost:3000/api/users/" + this.userId, configuration)
                .then(() => {
                    localStorage.clear();
                    window.location.href = "/";
                })
                .catch(() => {
                    alert('Vous n\'avez pas les droits de supprimer ce profil !')
                })
        }
    }
}
</script>

<style scoped>

.container {
    display: flex;
    flex-direction: column;
    min-height: 71vh;
    border: 1px solid red;
}

.row{
    width: 100%;
    margin: 0 auto !important;
}

.card{
    width: 100%;
}

.card-title {
    text-align: center;
}
</style>