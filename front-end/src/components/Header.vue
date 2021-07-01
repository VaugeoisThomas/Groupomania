<script>
export default {
    name: 'Header',
    data(){
        return {
            authenticate: "",
        };
    },
    methods: {
        logout() {
            localStorage.clear();
            window.location.href = "/";
        },
    },
    mounted() {
        if(localStorage.jwt) {
            this.authenticate = localStorage.jwt;
        }
    }
}
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-orange">
            <div class="container-fluid">
                <a href="/" class="navbar-brand"><img class="logo" src="../assets/groupomania-white.png" alt="Groupomania logo" /></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle Navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarScroll">
                    <ul class="nav nav-tabs" style="--bs-scroll-height: 100px;">
                        <li class="nav-item" v-if="authenticate"><router-link class="nav-link" to="/forum" exact>Forum</router-link></li>
                        <li class="nav-item" v-else ><router-link class="nav-link" to="/" exact>Accueil</router-link></li>
                        <li class="nav-item" v-if="authenticate"><router-link class="nav-link" to="/profil" exact>Profil</router-link></li>
                        <li class="nav-item" v-else><router-link class="nav-link" to="/login" exact>Connexion</router-link></li>
                        <li class="nav-item" v-if="authenticate" @click="logout"><router-link class="nav-link" to="/login" exact>Déconnexion</router-link></li>
                        <li class="nav-item" v-else><router-link class="nav-link" to="/register" exact>Inscription</router-link></li>
                    </ul>
                    <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Rechercher</button>
                    </form>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped>

header {
    min-height: 7vh;
    margin-bottom: 2vh;
}
.logo{
    width: 200px;
    max-height: 150px;
}

.bg-orange {
    background-color: #fd2d01;
}


</style>