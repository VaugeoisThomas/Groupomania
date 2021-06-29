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
    min-height: 71vh;
    padding: 1%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.container {
    margin: 1%;
    padding: 1%;
    color: white;
    text-shadow: 0 5px rgb(30, 30, 30);
}

.animations{
    animation: rotate_entrance 3s ease-in-out 0.6s both;
    font-size: 150px;
    text-align: center;

}

@keyframes rotate_entrance{
    from {
        transform: rotate(-360deg) scale(0);
        opacity: 0;
    }
    to {
        transform: rotate(180) scale(3);
        opacity: 1;
    }
}
</style>