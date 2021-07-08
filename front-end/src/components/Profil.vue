<template>
    <main class="container">
        <section>
            <div class="row">
                <div class="card">
                    <card class="card-header bg-orange">
                        <h1>Profil de {{ profil.users_name }}</h1>
                    </card>
                    <div class="card-body">
                        <div class="card-text">
                            <p>Pseudo: {{ profil.users_name }}</p>
                        </div>
                        <div class="card-text">
                            <p>Email: {{ profil.users_email }}</p>
                        </div>
                        <div class="card-text">
                            <p>Admin : <span v-if="isAdmin == 1 || profil.isAdmin == 1">Oui</span>
                                       <span v-else>Non </span>
                            </p>
                        </div>

                    </div>
                    <div class="card-footer">
                        <button v-if="isAdmin == 1 || profil.users_id == userId" class="btn btn-danger" @click="deleteProfil = !deleteProfil">Supprimer son compte</button>
                        <button v-if="isAdmin == 1 || profil.users_id == userId" class="btn btn-info" @click="modifyProfil = !modifyProfil">Modifier son profil</button>
                    </div>
                </div>
            </div>
        </section>
        <section v-show="deleteProfil">
            <form @submit.prevent="deleteAccount(profil.users_id)" method="delete">
                <div class="card ">
                    <div class="card-header bg-danger">
                        <h2>Attention</h2>
                    </div>
                    <div class="card-body">
                        <div class="card-text">
                            <p>Vous êtes sur le point de supprimer votre profil ! Cette action est irreversible !</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-danger" @click="deleteAccount">Supprimer mon compte</button>
                    </div>
                </div>
            </form>
        </section>
        <section v-show="modifyProfil">
            <form @submit.prevent="modifyAccount(profil.users_id)" method="update" id="form-validation">
                <div class="card ">
                    <div class="card-header bg-info">
                        <h2>Modification du profil</h2>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="email">Email</label>
                                    <input type="email" class="form-control" id="email" name="email" v-model="user_email" placeholder="Adresse email" required />
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" class="form-control" id="password" name="password" placeholder="Mot de passe" v-model="user_password" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$" />
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label for="user_name">Pseudo</label>
                                    <input type="text" class="form-control" id="user_name" name="user_name" placeholder="Votre pseudo" v-model="user_name" required />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-success" @click="modifyAccount">Modifier mon compte</button>
                    </div>
                </div>
            </form>
        </section>
    </main>
</template>


<script>
import axios from 'axios';
export default {
    name: "Profil",
    data(){
        return{
            user_email: "",
            user_password: "",
            user_name: "",
            profil: [],
            userId: "",
            token: "",
            deleteProfil: false,
            modifyProfil: false,
        }
    },
    beforeRouteUpdate( to, from, next){
        this.findUser(to.params.id); 
        next();
    },
    created() {
        this.findUser(this.$route.params.id);

        if(localStorage.userId){
            this.userId = localStorage.userId;
        }
        if(localStorage.jwt){
            this.token = localStorage.jwt;    
        } 
        if(localStorage.isAdmin){
            this.isAdmin = localStorage.isAdmin;
        }

    },
    methods: {
        findUser(){
            axios.get(`http://localhost:3000/api/users/${this.$route.params.id}`)
            .then((response) => {
                this.profil = response.data;
            })
            .catch(() => {
                alert('Nous rencontrons des problèmes à vous identifier, veuillez rééssayer plus tard !')
            });
        },
        deleteAccount() {
            const configuration = {
                headers: {
                    Authorization: `Bearer ` + this.token,
                }
            };
            axios.delete("http://localhost:3000/api/users/" + this.userId, configuration)
            .then(() => {
                localStorage.clear();
                window.location.href = '/';
            }).catch(() => {
                alert('Vous ne pouvez pas supprimer ce profil');
            })
        },
        modifyAccount(e){
            if(e){
                e.preventDefault();
                e.stopPropagation();
            }
            const configuration = {
                headers: {
                    Authorization: `Bearer ` + this.token,
                }
            };

            axios.put("http://localhost:3000/api/users/" + this.userId + "/updateProfil", {
                users_email: this.user_email,
                users_password: this.user_password,
                users_name: this.user_name,
            }, 
            configuration
            )
            .then(() =>{
                window.location.reload();
            })
            .catch(() =>{
                alert("Un problème interne est survenue");
            })
        }
    }
}
</script>

<style scoped>

.container {
    display: flex;
    flex-direction: column;
    min-height: 73vh;
}

.row{
    width: 100%;
    margin: 0 auto !important;
}

.bg-orange{
    background-color: #fd2d01;
    color: white;
}

.bg-info{
    background-color: #ffd7d7!important;
    color: #fd2d01;
}

.card{
    width: 100%; 
}

.card-title{
    text-align: center;
}

.card-footer{
    display: flex;
    flex-direction: row;
}

.btn-info{
    background-color: #ffd7d7;
    color: #fd2d01;
    border: none;
    margin-left: 1%;
}
</style>