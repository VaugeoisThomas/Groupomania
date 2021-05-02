<template>
  <div id="app">
      <Header/>
      <router-view/>
      <Footer />
  </div>
</template>

<script>

import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name:'app',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
  #app{
    background-color: rgb(180, 183, 187);
  }
</style>
