<template>
    <div v-if="loading">Loading...</div>
    <div v-else>
        <div v-if="errorMessage">Error while fetching: {{ errorMessage }}</div>
        <div v-else>
            <h1>Wolcome to the pack - {{ this.currentPack.name }}</h1>
    
            <p>This pack has id: {{ id }}</p>

            <p v-if="delationError" class="deletionError">Error encountered while deletion: {{ deletionError }}</p>

            <div class="buttons">
                <button class="wolfButton" @click="toggleModal">Delete this pack</button>
                <!-- <button class="wolfButton" @click="toggleEditModal">Edit this pack</button> -->
            </div>
            
        </div>
    </div>

    <div v-if="showDeleteModal" >
        <DeleteModal :type="'pack'" :wolfOrPackName="currentPack.name" @cancel="toggleModal" @confirmDeletion="deletePack"/>
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
            currentPack: {
                name: '',
            },
            loading: true,
            showDeleteModal: false,
            deletionError: null,
            errorMessage: null,
            showEditModal: false,
        }
    },
    mounted() {
        this.fetchPack()
    },
    methods: {
        async fetchPack() {
            let url = 'https://join.wolfpackit.nl/api/v1/packs/'
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
                this.currentPack.name = data.name
                this.loading = false
            })
            .catch(err => {
                this.errorMessage = err.message
                this.loading = false
            })
        },
        deletePack() {
            console.log("reached here")
            let url = 'https://join.wolfpackit.nl/api/v1/packs/'
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
                    this.$router.push('/packs');
                } else {
                    this.deletionError = 'Error deleting pack'
                    throw new Error('Error deleting pack');
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