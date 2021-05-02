<script>
export default {
    name: 'Header',
}
</script>

<template>
    <header>
        <nav>
            <ul>
                <img class="header-logo" src="../assets/groupomania-white.png" alt="Groupomania logo" />
                <li v-if="authenticate">
                    <router-link to="/forum" exact>Forum</router-link>
                </li>
                <li v-else >
                    <router-link to="/" exact>Accueil</router-link>
                </li>
                <li v-if="authenticate">
                    <router-link to="/profil" exact>Profil</router-link>
                </li>
                <li v-else>
                    <router-link to="/login" exact>Connexion</router-link>
                </li>
                <li v-if="authenticate">
                    <router-link to="/login" exact>Déconnexion</router-link>
                </li>
                <li v-else>
                    <router-link to="/register" exact>Inscription</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>

header {
    width: 100%;
    min-height: 7vh;
    margin-bottom: 2vh;
}

nav {
    background-color: rgb(30, 30, 30);
    color: #fff;
    display: flex;
    justify-content: space-between;
}

ul{
    display: flex;
    align-items: center;
}

.header-logo{
    max-height: 150px;
}

li {
    list-style: none;
}

li a{
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    padding: 5px 20px;
}
</style>