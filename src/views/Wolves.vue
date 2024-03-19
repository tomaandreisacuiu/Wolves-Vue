<template>
    <div class="list-of-wolves">
        <h1>List of wolves</h1>
        <h3>Click on them for more info or to be able to delete/edit one.</h3>
        <button class="addButton" @click="toggleAddModal">Add a new wolf</button>

        <p v-if="loading">Loading...</p>
        <p v-if="error">Error: {{ errorMessage }}</p>

        <div class="list-of-wolves">
            <div @click="redirectToWolf(wolf.id)" v-for="wolf in wolves" :key="wolf.id" class="wolf-card">
                <div class="wolf-details">
                    <h2>{{ wolf.name }}</h2>
                </div>
            </div> 
        </div>

    </div>

    <div v-if="showAddModal">
        <AddEditModal :type="'add'" :currentWolf="currentWolf" @cancel="toggleAddModal"/>
    </div>
  </template>

<script>
import AddEditModal from "../components/AddEditModal.vue"

export default {
    components: {AddEditModal},
    data() {
        return {
            wolves: [],
            error: false,
            errorMessage: '',
            loading: true,
            showAddModal: false,
            currentWolf: {
                name: '',
                gender: '',
                birthday: ''
            }
        };
    }, 
    mounted() {
        this.fetchWolves() 
    }, 
    methods: {
        async fetchWolves() {
                fetch('https://join.wolfpackit.nl/api/v1/wolves', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6',
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.wolves = data
                    this.loading = false
                })
                .catch(err => {
                    this.errorMessage = err.message
                    this.loading = false
                })
        },
        redirectToWolf(wolfId) {
            this.$router.push(`/wolves/${wolfId}`)
        },
        toggleAddModal() {
            this.showAddModal = !this.showAddModal
        }
    }
}
</script>

<style>
.wolf-card {
    background-color: 	#3b3b3b; /* color different than the map */
    border-radius: 8px;
    margin-bottom: 1rem;
    padding: 1rem;
    transition: transform 0.2s;
    width: 500px;
}

.wolf-card:hover {
    transform: translateY(-5px);
}

.wolf-details h2 {
    margin-top: 0;
}

.list-of-wolves {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.list-of-wolves {
    margin-top: 30px;
}


h1 {
    margin-bottom: 5px
}

h3 {
    margin-bottom: 50px;
}

button.addButton {
    background-color: gray;
    border: none;
    padding: 10px 20px;
    font-size: larger;
    cursor: pointer;
    border: 1px solid gray;
}

button.addButton:hover {
    border: 1px solid red;
}

button.addButton:active {
    background-color: #d3d3d3; 
}
</style>