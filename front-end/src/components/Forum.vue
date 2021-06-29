<template>
    <div class="main">
        <div class="container">
            <div class="row" v-for="message in messages" :key="message.messages_id"> 
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <p>{{ message.messages_text}} </p>
                        </div>
                        <div class="card-footer">
                            <p> Message publié par <a href="/#" >{{ message.users_name}}</a> le {{ DateTranslation(message.createdAt)}}</p>
                            <button @click="deleteMessage" v-if="userId == message.users_id">Supprimer votre message ?</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
moment.locale("fr");

export default {
    name: "Forum",
    data(){
        return {
            messages: [],
            userId: '',
            authenticate: ''
        }
    },
    created(){
        axios.get("http://localhost:3000/api/forum")
            .then((response) => {
                this.messages = response.data;
            })
            .catch(() => {
                alert('Un problème est survenu ! Merci de réessayer ultérieurement !');
            })
    },
    mounted(){
        if(localStorage.userId){
            this.userId = localStorage.userId;
        }
    },
    methods: {
        DateTranslation(date){
            return moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY');
        },
        deleteMessage(){
            alert('Vous supprimer ce message !');
        },

    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    min-height: 71vh;
    border: 1px solid red;
}

.row{
    width: 100%;
}
</style>