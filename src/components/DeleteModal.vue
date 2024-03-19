<template>
    <div class="backdrop">
        <div class="modal">
            <p v-if="type === 'wolf'">Are you sure you want to delete the wolf: {{ wolfOrPackName }}?</p>
            <p v-else>Are you sure you want to delete the pack: {{ wolfOrPackName }}?</p>
            <div class="buttons">
                <button class="buttonCancel" @click="cancelModal">Cancel</button>
                <button v-if="type === 'wolf'" class="buttonDelete" @click="confirmDeletion">Delete wolf</button>
                <button v-else class="buttonDelete" @click="confirmDeletion">Delete pack</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['wolfOrPackName', 'type'],
        methods: {
            cancelModal() {
                this.$emit('cancel')
            },
            confirmDeletion() {
                this.$emit('confirmDeletion')
            }
        }
    }
</script>

<style scoped>
.modal {
    width: 400px;
    padding: 20px;
    margin: 100px auto;
    background: gray;
    border-radius: 10px;
}

.backdrop {
    top: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
}

.modal p {
    font-style: normal;
}

.modal.sale {
    background: crimson;
    color: white;
}

.modal.sale h1{
    color: white;
}

.buttons {
    display: flex;
    justify-content: center; 
    gap: 10px; 
}

button.buttonCancel {
    background-color: lightgray;
    border: none;
    padding: 10px 20px;
    font-size: larger;
    cursor: pointer;
    border: 1px solid lightgray;
}

button.buttonCancel:hover {
    border: 1px solid red;
}

button.buttonCancel:active {
    background-color: #d3d3d3; 
}

button.buttonDelete {
    background-color: rgb(236, 90, 90);
    border: none;
    padding: 10px 20px;
    font-size: larger;
    cursor: pointer;
    border: 1px solid rgb(236, 90, 90);
}

button.buttonDelete:hover {
    border: 1px solid red;
}

button.buttonDelete:active {
    background-color: #d3d3d3; 
}
</style>