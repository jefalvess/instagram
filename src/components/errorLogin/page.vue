<template>
  <div
    style="
      margin-left: 1rem;
      margin-bottom: 7rem;
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
          <img style="width: 11rem; height: 11rem" src="/images/alert.png" />
        </div>
      </div>
      <div style="padding-top: 1rem" class="bx--row">
        <div style="text-align: center" class="bx--col">
          <p style="font-size: 1.5rem; padding-top: 0.2rem">
            <strong>
              Nao foi possivel realizar login em nosso site <br />
              Veja quais os principais motivos que podem causar o bloqueio de
              login.
            </strong>
          </p>
        </div>
      </div>

      <div style="padding-top: 5rem" class="bx--row">
        <div style="text-align: center" class="bx--col">
          <p style="font-size: 1.5rem">
            <strong> 1 - </strong> Para logar em nosso sistema, sua conta
            precisa ter pelo menos uma publicaçao no feed.
          </p>
        </div>
      </div>
      <div style="padding-top: 1rem" class="bx--row">
        <div style="text-align: center" class="bx--col">
          <p style="font-size: 1rem">
            <em>
              Para segurança e qualidade dos nossos serviços, todos os nossos
              usuarios precisam possuir publicaçoes no seu feed do instagram,
              isso faz com que o perfil seja melhor visto por todos da
              plataforma, a nossa plataforma busca perfis reais.
            </em>
          </p>
        </div>
      </div>

      <div style="padding-top: 1rem" class="bx--row">
        <div style="text-align: center" class="bx--col">
          <img style="width: 100%; border-radius: 5%" src="/images/pub.jpeg" />
        </div>
      </div>

      <div style="padding-top: 5rem" class="bx--row">
        <div style="text-align: center" class="bx--col">
          <p style="font-size: 1.5rem">
            <strong> 2 - </strong> Sua conta precisa ter foto de perfil.
          </p>
        </div>
      </div>

      <div style="padding-top: 1rem" class="bx--row">
        <div style="text-align: center" class="bx--col">
          <p style="font-size: 1rem">
            <em>
              Para segurança e qualidade dos nossos serviços, todos os nossos
              usuarios precisam possuir foto de perfil, a foto de perfil faz com
              que o perfil se torne mais realista e garanta a satisfaçao de
              todos os clientes que buscam engajamento.
            </em>
          </p>
        </div>
      </div>

      <div style="padding-top: 1rem" class="bx--row">
        <div style="text-align: center" class="bx--col">
          <img
            style="width: 100%; border-radius: 5%"
            src="/images/fotoperfil.jpeg"
          />
        </div>
      </div>

      <div style="padding-top: 5rem" class="bx--row">
        <div style="text-align: center" class="bx--col">
          <p style="font-size: 1.5rem">
            <strong> 3 - </strong> Você também pode ter sofrido um bloqueio
            temporario, veja a imagem a baixo como desbloquear o seu acesso.
          </p>
        </div>
      </div>

      <div style="padding-top: 1rem" class="bx--row">
        <div style="text-align: center" class="bx--col">
          <p style="font-size: 1rem">
            <em>
              Caso tenha sofrido bloqueio temporario, você vai precisar acessar
              sua conta do instagram pelo aplicativo do celular. Entrar nas
              opções e desbloquear o acesso ao site. O instagram bloqueia
              acessos desconhecidos, para conseguir usufruor dos nosso seviçoes,
              sera necessario fazer o desbloqueio.
            </em>
          </p>
        </div>
      </div>

      <div style="padding-top: 1rem" class="bx--row">
        <div style="text-align: center" class="bx--col">
          <img
            style="width: 100%; border-radius: 5%"
            src="/images/desbloqueio.jpeg"
          />
        </div>
      </div>

      <div style="margin-top: 4rem; margin-left: -2rem" class="bx--row">
        <div class="bx--col-lg">
          <button
            class="bx--btn bx--btn--primary"
            :disabled="desativarButton"
            @click="login()"
            type="button"
          >
            * Login instagramLikes *
          </button>
        </div>
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
  },
  methods: {
    ...mapActions(['setModalEdit', 'setCookieUserJson', 'setModalUser']),
    async checarToken() {
      let cookie = this.$cookies.get('token');
      if (cookie !== null) {
        let response = await axios.post('/api/token/user', { token: cookie });
        if (response.data.status === true) {
          this.proximaPagina(response.data);
        }
      }
    },
    async login() {
      this.$router.push('/');
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
