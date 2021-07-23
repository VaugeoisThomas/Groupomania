<script>
export default {
  name: "Footer",
};
</script>

<template>
  <footer>
    <nav class="navbar navbar-expand-lg navbar-dark bg-blue">
      <div class="container-fluid">
        <ul class="navbar-nav me-auto my-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/LegalNotice">Mentions légales</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="mailto:contact@groupomania.com"
              >Contactez-nous</a
            >
          </li>
        </ul>
      </div>
    </nav>
  </footer>
</template>

<style scoped>


.bg-blue {
  background-color: rgb(26,45,75);
  border-top: 2px solid black;
}

.navbar-nav {
  display: flex !important;
  flex-direction: row !important;
}

.nav-item {
  justify-content: space-between !important;
}

.nav-link {
  color: rgb(212,207,207) !important;
}

</style>