<template>
  <main class="main">
    <div class="container">
        <p class="animations">Groupomania</p>
    </div>
  </main>
</template>

<script>
export default {
    name:"Home"
}
</script>


<style scoped>
.main {
    max-width: 100%;
    min-height: 73vh;
    padding: 1%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.container {
    margin: 1%;
    padding: 1%;
    color: #fd2d01;
    text-shadow: 0 5px #ffd7d7;
}

.animations{
    animation: slide-in-fwd-bottom 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    font-size: 150px;
    text-align: center;

}

@keyframes slide-in-fwd-bottom {
  0% {
    -webkit-transform: translateZ(-1400px) translateY(800px);
            transform: translateZ(-1400px) translateY(800px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0) translateY(0);
            transform: translateZ(0) translateY(0);
    opacity: 1;
  }
}

</style>