<template>
    <main class="container">
        <section>
            <div class="row">
                <div class="card">
                    <card class="card-header bg-secondary">
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
                        <button class="btn btn-danger" v-on:click="deleteProfil = !deleteProfil">Supprimer son compte</button>
                    </div>
                </div>
            </div>
        </section>
        <section v-show="deleteProfil">
            <form @submit.prevent="deleteAccount(profil.users_id)" method="delete">
                <div class="card">
                    <div class="card-header bg-danger">
                        <h2>Attention</h2>
                    </div>
                    <div class="card-body">
                        <div class="card-text">
                            <p>Vous êtes sur le point de supprimer votre profil ! Cette action est irreversible !</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-success" v-on:click="deleteAccount">Supprimer mon compte</button>
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
            profil: [],
            userId: "",
            token: "",
            deleteProfil: false,
        }
    },
    created() { 
        if(localStorage.userId){
            this.userId = localStorage.userId;
        }
        if(localStorage.token){
            this.token = localStorage.jwt;    
        } 
        axios.get("http://localhost:3000/api/users/" + this.userId)
        .then((response) => {
            this.profil = response.data;
        })
        .catch(() => {
            alert('Nous rencontrons des problèmes à vous identifier, veuillez rééssayer plus tard !')
        });
    },
    methods: {
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