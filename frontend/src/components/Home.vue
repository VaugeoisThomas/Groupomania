<template>
  <main class="container">
    <h1 class="animations">Groupomania</h1>
  </main>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 0;
  height: 78.6vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.animations {
  animation: slide-in-fwd-bottom 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  font-size: 150px;
  text-align: center;
  color: rgb(99, 110, 128);
  text-shadow: 0 5px rgb(89, 93, 100);
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