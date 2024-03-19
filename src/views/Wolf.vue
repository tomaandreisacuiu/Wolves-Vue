<template>
    <div v-if="loading">Loading...</div>
    <div v-else>
        <div v-if="errorMessage">Error while fetching: {{ errorMessage }}</div>
        <div v-else>
            <h1>Meet the wolf - {{ this.currentWolf.name }}</h1>
            <h3>Gender: {{ this.currentWolf.gender }}, birthday: {{ this.currentWolf.birthday }}</h3>
            <p>This wolf has id: {{ id }}</p>

            <p v-if="delationError" class="deletionError">Error encountered while deletion: {{ deletionError }}</p>

            <div class="buttons">
                <button class="wolfButton" @click="toggleModal">Delete this wolf</button>
                <button class="wolfButton" @click="toggleEditModal">Edit this wolf</button>
            </div>
            
        </div>
    </div>

    <div v-if="showEditModal">
        <AddEditModal :type="'edit'" :currentWolf="currentWolf" @cancel="toggleEditModal"/>
    </div>

    <div v-if="showDeleteModal" >
        <DeleteModal :type="'wolf'" :wolfOrPackName="currentWolf.name" @cancel="toggleModal" @confirmDeletion="deleteWolf"/>
    </div>
</template>

<script>
import DeleteModal from "../components/DeleteModal.vue"
import AddEditModal from "../components/AddEditModal.vue"

export default {
    props: ['id'],
    components: {DeleteModal, AddEditModal},
    data() {
        return {
            currentWolf: {
                name: '',
                gender: '',
                birthday: '',
            },
            loading: true,
            showDeleteModal: false,
            deletionError: null,
            errorMessage: null,
            showEditModal: false,
        }
    },
    mounted() {
        this.fetchWolf()
    },
    methods: {
        async fetchWolf() {
            let url = 'https://join.wolfpackit.nl/api/v1/wolves/'
            let urlToRequest = url.concat(this.id)
            fetch(urlToRequest, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6',
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.currentWolf.name = data.name
                this.currentWolf.gender = data.gender
                this.currentWolf.birthday = data.birthday
                this.loading = false
            })
            .catch(err => {
                this.errorMessage = err.message
                this.loading = false
            })
        },
        deleteWolf() {
            console.log("reached here")
            let url = 'https://join.wolfpackit.nl/api/v1/wolves/'
            let urlToRequest = url.concat(this.id)
            fetch(urlToRequest, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6',
                }
            })
            .then(res => {
                if (res.ok) {
                    this.toggleModal()
                    this.$router.push('/wolves');
                } else {
                    this.deletionError = 'Error deleting wolf'
                    throw new Error('Error deleting wolf');
                }
            })
            .catch(error => {
                this.deletionError = error.message
                this.toggleModal()
            });
        },
        toggleModal() {
            this.showDeleteModal = !this.showDeleteModal
        },
        toggleEditModal() {
            this.showEditModal = !this.showEditModal
        }
    }
}
</script>

<style>
button.wolfButton {
    background-color: gray;
    border: none;
    padding: 10px 20px;
    font-size: larger;
    cursor: pointer;
    border: 1px solid gray;
}

button.wolfButton:hover {
    border: 1px solid red;
}

button.wolfButton:active {
    background-color: #d3d3d3; 
}

.deletionError {
    color: red;
}

.buttons {
    display: flex;
    justify-content: center; 
    gap: 10px; 
}
</style>