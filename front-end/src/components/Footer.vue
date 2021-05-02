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
  margin-top: 2vh;
  height: 7vh;
  width: 100%;
}
nav {
  background-color: rgb(30, 30, 30);
  color: #fff;
  height: 100%;
}

ul{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li {
    list-style: none;
}

li a{
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    font-size: 15px;
    padding: 5px 20px;
}
</style>