<script>
export default {
  name: "Header",
  data() {
    return {
      authenticate: "",
      userId: "",
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      window.location.href = "/";
    },
  },
  mounted() {
    if (localStorage.jwt) {
      this.authenticate = localStorage.jwt;
    }
    if (localStorage.userId) {
      this.userId = localStorage.userId;
    }
  },
};
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-blue">
      <div class="container-fluid">
        <a href="/" class="navbar-brand"
          ><img
            class="logo"
            src="../assets/groupomania-white.png"
            width="150"
            height="200"
            alt="Groupomania logo"
        /></a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
          <ul class="nav nav-tabs" style="--bs-scroll-height: 100px">
            <li class="nav-item" v-if="authenticate">
              <router-link class="nav-link" to="/forum" exact
                >Forum</router-link
              >
            </li>
            <li class="nav-item" v-else>
              <router-link class="nav-link" to="/" exact>Accueil</router-link>
            </li>
            <li class="nav-item" v-if="authenticate">
              <router-link
                class="nav-link"
                :to="{ name: 'Profil', params: { id: userId } }"
                exact
                >Profil</router-link
              >
            </li>
            <li class="nav-item" v-else>
              <router-link class="nav-link" to="/login" exact
                >Connexion</router-link
              >
            </li>
            <li class="nav-item" v-if="authenticate" @click="logout">
              <router-link class="nav-link" to="/login" exact
                >Déconnexion</router-link
              >
            </li>
            <li class="nav-item" v-else>
              <router-link class="nav-link" to="/register" exact
                >Inscription</router-link
              >
            </li>
          </ul>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Rechercher
            </button>
          </form>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.logo {
  width: 130px;
  height: auto;
}

nav {
  padding: 0;
}

.container-fluid {
  padding: 0 !important;
}

.nav-link {
  color: rgba(122, 76, 81, 255);
  background-color: white;
  margin-right: 5%;
  border: 1px solid rgb(89, 93, 100) !important;
  border-radius: 10px !important;
}

.bg-blue {
  background-color: rgb(26, 45, 75);
  border-bottom: 2px solid black;
}
</style>