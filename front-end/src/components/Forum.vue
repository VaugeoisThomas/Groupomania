<template>
    <main class="container">
        <div class="row">
            <div class="col-12">
                <div class="card-body">
                    <div class="m-auto">
                        <form action="post" @submit.prevent="post">
                            <label for="message">Publier un message</label>
                            <textarea name="message" id="message" v-model="messages.message" class="form-control" required></textarea>
                            <button type="submit" class="btn btn-success">Publier</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';
export default {
    name: "Forum",
    data() {
        return  {
            messages: []
        };
    },
    created(){
        axios.get("http://localhost:3000/api/forum")
        .then((response) => {
            this.messages = response.data.result;
        })
        .catch(() => {
            alert('Nous rencontrons un petit problème, merci de rééssayer !')
        });
    },
    mounted(){
        if(localStorage.userId) this.userId = localStorage.userId;
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