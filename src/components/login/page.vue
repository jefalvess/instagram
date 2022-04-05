<template>
  <div
    style="
      margin-left: 1rem;
      margin-bottom: 7rem;
      margin-top: 7rem;
      margin-right: auto;
      margin-left: auto;
      max-width: 99rem;
      padding-right: 1rem;
      padding-left: 1rem;
    "
  >
    <div style="text-align: center" class="bx--col">
      <div style="padding-top: 1rem" class="bx--row">
        <div style="text-align: center" class="bx--col">
          <p style="font-size: 3em">Efetuar Login</p>
        </div>
      </div>

      <div style="padding-top: 1rem" class="bx--row">
        <p style="font-size: 1.2em">
          Acesse o nosso sistema utilizando o formulário abaixo para conseguir
          curtidas e seguidores. Utilizaremos os seus dados para efetuar login
          na sua conta do Instagram.
        </p>
      </div>

      <div style="padding-top: 1rem" class="bx--row">
        <p style="font-size: 1.2em">
          Todos os dados transmitidos através dos nossos servidores são
          cryptografados com AES-512bit (https).
        </p>
      </div>

      <!-- Login -->
      <div style="padding-top: 1rem" class="bx--row">
        <cv-text-input
          :light="true"
          label="Usuario do instagram"
          v-model="usuario"
        >
        </cv-text-input>
      </div>

      <div style="padding-top: 1rem" class="bx--row">
        <cv-text-input
          :light="true"
          label="Senha do insta"
          type="password"
          v-model="senha"
        >
        </cv-text-input>
      </div>

      <div style="padding-top: 1rem" class="bx--row">
        <cv-checkbox
          label="Declaro que li e que concordo com os Termos de Uso"
          :checked="true"
          :value="check"
        >
        </cv-checkbox>
      </div>

      <div v-if="erroMensagem" style="padding-top: 3rem" class="bx--row">
        <p style="font-size: 1.2em; color: red">
          {{ erroMensagem }}
        </p>
      </div>

      <div style="margin-top: 1rem; margin-left: -2rem" class="bx--row">
        <div class="bx--col-lg">
          <button
            class="bx--btn bx--btn--primary"
            :disabled="disabledButtonResolved"
            @click="createUser()"
            type="button"
          >
            Entra no site
          </button>
        </div>
      </div>

      <div style="padding-top: 3rem" class="bx--row">
        <p style="font-size: 1.2em">
          Ao utilizar o nosso sistema, você declara que leu e que concorda com
          os nossos <a href="/termos"> Termos de Uso </a> e que entende que NÃO
          somos endossados, patrocinados ou afiliados ao Instagram ou Facebook
          Inc.
        </p>
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
      erroLogin: false,
      check: 'true',
    };
  },
  computed: {
    ...mapGetters(['modalEdit']),
    disabledButtonResolved: {
      get: function () {
        if (this.desativarButton === true) {
          return true;
        }

        if (this.usuario.length < 4) {
          return true;
        }

        if (this.senha.length < 4) {
          return true;
        }

        return false;
      },
    },
  },
  methods: {
    ...mapActions(['setModalEdit', 'setCookieUserJson', 'setModalUser']),
    // Criar usuario / Login
    async createUser() {
      this.desativarButton = true;
      let payload = {
        usuario: this.usuario.toLowerCase(),
        senha: this.senha.toLowerCase(),
      };
      let response = await axios.post('/api/createUser', payload);

      this.desativarButton = false;

      if (response.data.status === true) {
        this.proximaPagina(response.data);
      } else if (response.data.status === 'error') {
        this.erroMensagem = response.data.mensagem;
      } else {
        this.$router.push('/info');
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
        }
      }
    },
  },
  mounted() {
    this.setModalEdit('login');
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
