<template>
  <div class="list-of-packs">
      <h1>List of packs</h1>
      <h3>Click on them for more info or to be able to delete/edit one.</h3>

      <p v-if="loading">Loading...</p>
      <p v-if="error">Error: {{ errorMessage }}</p>

      <div class="list-of-packs">
          <div @click="redirectToPack(pack.id)" v-for="pack in packs" :key="pack.id" class="wolf-card">
              <div class="pack-details">
                  <h2>{{ pack.name }}</h2>
              </div>
          </div> 
      </div>

  </div>

</template>

<script>
import AddEditModal from "../components/AddEditModal.vue"

export default {
  components: {AddEditModal},
  data() {
      return {
          packs: [],
          error: false,
          errorMessage: '',
          loading: true,
          showAddModal: false,
      };
  }, 
  mounted() {
      this.fetchPacks() 
  }, 
  methods: {
      async fetchPacks() {
              fetch('https://join.wolfpackit.nl/api/v1/packs', {
                  method: 'GET',
                  headers: {
                      'Authorization': 'Bearer 9bAqXRPplyiGfF6n81NVUGpAqeLI1QHw46aqICVL1BLaGI6',
                  }
              })
              .then(res => res.json())
              .then(data => {
                  this.packs = data
                  this.loading = false
              })
              .catch(err => {
                  this.errorMessage = err.message
                  this.loading = false
              })
      },
      redirectToPack(packId) {
          this.$router.push(`/packs/${packId}`)
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

.pack-details h2 {
    margin-top: 0;
}

.list-of-packs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.list-of-packs {
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