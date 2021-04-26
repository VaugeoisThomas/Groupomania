<script>
export default {
    name: 'Footer',
}
</script>

<template>
  <footer>
    <nav>
      <ul>
        <li><router-link to="/LegalNotice">Mentions légales</router-link></li>
        <li><a href="mailto:contact@groupomania.com">Contactez-nous</a></li>
      </ul>
    </nav>
  </footer>
</template>

<style scoped>
footer {
  height: auto;
  width: 100%;
}
nav {
  background-color: rgb(17, 37, 65);
  color: #fff;
  padding: 15px;
}
</style>