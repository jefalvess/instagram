<template>
  <div
    style="margin-left: 1rem; margin-bottom: 7rem; margin-top: 7rem"
    class="bx--grid"
  >
    <!-- Login -->
    <div class="bx--row">
      <cv-text-input label="Usuario do instagram" v-model="usuario">
      </cv-text-input>
    </div>

    <div class="bx--row">
      <cv-text-input label="Senha do insta" type="password" v-model="senha">
      </cv-text-input>
    </div>

    <div style="padding-top: 1rem;" class="bx--row">
      <p style="color: red">
        <strong>
          Para logar em nosso sistema, sua conta precisa ter pelo menos uma
          publicaçao no feed.<br /> Caso contrario o sistema ira entender que se trata
          de um perfil fake e seu acesso sera bloqueado.
        </strong>
      </p>
    </div>

    <div v-if="erroMensagem !== false" class="bx--row">
      <p>{{ erroMensagem }}</p>
    </div>

    <div style="margin-top: 1rem; margin-left: -2rem;" class="bx--row">
      <div class="bx--col-lg">
        <button
          class="bx--btn bx--btn--primary"
          :disabled="desativarButton"
          @click="createUser()"
          type="button"
        >
          Entra no site
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
export default {
  data() {
    return {
      usuario: '',
      senha: '',
      erroMensagem: false,
      desativarButton: false,
    };
  },
  computed: {
    ...mapGetters(['modalEdit']),
  },
  methods: {
    ...mapActions(['setModalEdit', 'setCookieUserJson', 'setModalUser']),
    // Criar usuario / Login
    async createUser() {
      this.desativarButton = true;
      let payload = { usuario: this.usuario, senha: this.senha };
      let response = await axios.post('/api/login/user', payload);

      if (response.data.status === false) {
        this.erroMensagem = response.data.mensagem;
      }

      this.desativarButton = false;

      if (response.data.status === true) {
        this.proximaPagina(response.data);
      }
    },
    proximaPagina(data) {
      this.$cookies.set('token', data.token, '8h');
      this.setCookieUserJson(data.token);
      this.setModalEdit(data.usuario);
      this.setModalUser(data);
      this.$router.push('/timeline');
    },
    criarUsuario() {
      this.$router.push('/create');
    },
    async checarToken() {
      let cookie = this.$cookies.get('token');
      if (cookie !== null) {
        let response = await axios.post('/api/token/user', { token: cookie });
        if (response.data.status === true) {
          this.proximaPagina(response.data);
        } else {
          this.mensagem = response.data.mensagem;
        }
      }
    },
  },
  mounted() {
    this.checarToken();
  },
};
</script>

<style lang="scss">
.bx--grid {
  margin-left: 0;
}
p {
  font-size: 1.2em;
  color: black;
}
</style>
