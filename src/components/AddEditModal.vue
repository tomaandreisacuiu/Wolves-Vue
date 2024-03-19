<template>
    <div class="backdrop">
        <div class="modal">
            <h1 v-if="type === 'add'">Add a wolf here</h1>
            <h1 v-else>Edit this wolf here</h1>

            <form @submit.prevent="createWolf" class="wolf-form">
                <input type="text" v-model="newWolf.name" placeholder="Name" required>
                <input type="text" v-model="newWolf.gender" placeholder="Gender" required>
                <input type="date" v-model="newWolf.birthday" placeholder="Birthday" required>

                <p v-if="errorMessage" class="errorMessage">{{ errorMessage }}</p>
                
                <div class="buttons">
                    <button class="buttonCancel" @click="cancelModal">Cancel</button>
                    <button class="buttonConfirm" @click="addOrEditWolf">Confirm</button>
                </div>
            </form>

        </div>
    </div>
</template>

<script>
// same modal for adding and editing, distinguish by the 'type' prop
export default {
    props: ['type', 'currentWolf'],
    data() {
        return {
            newWolf: {
                name: this.currentWolf.name,
                gender: this.currentWolf.gender, 
                birthday: this.currentWolf.birthday,
            },
            errorMessage: null,
        }
    },
    methods: {
        cancelModal() {
            this.$emit('cancel')
        },
        addOrEditWolf() {
            if (this.type === 'add') {
                fetch("https://join.wolfpackit.nl/api/v1/wolves", {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6',
                    },
                    body: JSON.stringify(this.newWolf)
                })
                .then(res => {
                    if (res.ok) {
                        // do something - an alert, or message
                    } else {
                        this.errorMessage = 'Error adding the new wolf'
                        throw new Error('Error adding the new wolf')
                    }
                })
                .then(data => {
                    console.log(data)
                    this.newWolf = {
                        name: '',
                        gender: '',
                        birthday: '',
                    }
                    this.$router.push('/wolves')
                })
                .catch(error => {
                    this.errorMessage = error.toString()
                })
            } else {
                // update wolf - PUT method, with url https://join.wolfpackit.nl/api/v1/wolves/:id
            }
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

button.buttonConfirm {
    background-color: skyblue;
    border: none;
    padding: 10px 20px;
    font-size: larger;
    cursor: pointer;
    border: 1px solid skyblue;
}

button.buttonConfirm:hover {
    border: 1px solid red;
}

button.buttonConfirm:active {
    background-color: #d3d3d3; 
}

.errorMessage {
    color: red;
}

.wolf-form {
    display: flex;
    flex-direction: column;
}

input {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box; 
    margin-bottom: 15px;
}

h1 {
    margin-bottom: 15px;
}
</style>