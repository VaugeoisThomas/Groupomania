<template>
    <main class="container">
        <section>
            <div class="row">
                <div class="card">
                    <card class="card-header bg-success">
                        <h1>Profil de {{ profil.users_name }}</h1>
                    </card>
                    <div class="card-body">
                        <div class="card-text">
                            <p>Pseudo: {{ profil.users_name }}</p>
                        </div>
                        <div class="card-text">
                            <p>Age: {{ profil.users_age }}</p>
                        </div>
                        <div class="card-text">
                            <p>Biographie: {{ profil.users_biography }}</p>
                        </div>
                        <div class="card-text">
                            <p>Email: {{ profil.users_email }}</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-success" v-on:click="updateProfil = !updateProfil">Modifier son profil</button>
                        <button class="btn btn-danger" v-on:click="deleteProfil = !deleteProfil">Supprimer son compte</button>
                    </div>
                </div>
            </div>
        </section>
        <section v-show="updateProfil">
                <div class="card">
                    <div class="card-header bg-primary">
                        <h2>Modification du profil</h2>
                    </div>
                    <div class="card-body">
                        <form @submit="update" method="put" id="form-validation" novalidate>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="username">Modification pseudo</label>
                                        <input v-model="profil.users_name" type="text" class="form-control" id="username" name="username" required />
                                        <div class="error">Merci de saisir un pseudo</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="age">Modification d'age</label>
                                        <input v-model="profil.users_age" type="number" class="form-control" id="age" name="age" required />
                                        <div class="error">Merci de saisir un chiffre compris entre 18 et 99</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="text">Modification Biographie</label>
                                        <textarea v-model="profil.users_biography" class="form-control" id="biography" name="biography"/>
                                    </div>
                                </div>
                            </div> 
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="form-group">
                                        <label for="email">Modification email</label>
                                        <input v-model="profil.users_email" type="email" class="form-control" id="email" name="email" required />
                                        <div class="error">Merci de saisir un email valide</div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-success" v-on:click: "update" ></button>
                    </div>
                </div>
        </section>
    </main>
</template>


<script>
import axios from 'axios';
export default {
    name: "Profil",
    data(){
        return{
            profil: [],
            userId: '',
            token: '',
            updateProfil: false,
            deleteProfil: false,
        }
    },
    created() {
        if(localStorage.userId) this.userId = localStorage.userId;
        if(localStorage.token) this.token = localStorage.jwt;
        axios.get("http://localhost:3000/api/users/" + this.userId)
        .then((response) => {
            this.profil = response.data;
        })
        .catch(() => {
            alert('Nous rencontrons des problèmes à vous identifier, veuillez rééssayer plus tard !')
        })
    },
    methods: {
        update() {

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