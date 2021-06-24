<template>
    <div class="card">
        <div class="d-flex flex-column justify-content-start ml-2">
            <span>Envoyé par {{ message.user_id }} </span>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="card-header">
                    <h1> {{ messages_titre }} </h1>
                </div>
                <div>
                    <p> {{ messages_text }} </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Message', 
    props: ['message'],
    data (){
        return{
            userId: '',
            isAdmin: '',
        }
    }
}
</script>