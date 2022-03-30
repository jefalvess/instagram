<template>
  <div class="bx--grid" >
    <div class="bx--row">
      <div style="cursor: pointer;"  class="bx--col-lg-3">
      
            <button  class="bx--btn bx--btn--primary" :disabled="desativarButton" @click="ganharSeguidores()" type="button">
            Ganhar seguidores
        </button>
        {{ this.mensagens }}
      </div>
      <div style="overflow: auto; height: 100vh;" class="bx--col-lg-8">
        -
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'page',
  components: {
  },
  data() {
    return {
      desativarButton: false,
      mensagens: '',
    };
  },
  computed: {
    ...mapGetters(['modalEdit'])
  },
  methods: {
    checarUsuario() {
      if (this.modalEdit === '') {
        this.$router.push('/');
      }
    },
    async ganharSeguidores() { 
      this.desativarButton = true
      let cookie = this.$cookies.get("token")
      let payload = { token: cookie }; 
      let response = await axios.post('/api/ganhar/seguidores', payload  );
      this.desativarButton = false;
      this.mensagens = response.data.message;
    }
  },
  mounted() {
    this.checarUsuario();
  }
};
</script>
