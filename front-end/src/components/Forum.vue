<template>
    <main class="container">
    </main>
</template>

<script>
import axios from 'axios';
export default {
    name: "Forum",
    data() {
        return {
            messages: [],
        }
    },
    created(){
        axios.get("http://localhost:3000/api/forum")
            .then((response) => {
                this.messages = response.data.result;
            })
            .catch(() => {
                alert('Un problème est survenu, merci de raffraichir la page')
            });
    },
    mounted(){
        if(localStorage.userId){
            this.userId = localStorage.userId
        }
        if(localStorage.jwt){
            this.token = localStorage.jwt;
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    min-height: 71vh;
    border: 1px solid red;
}
</style>