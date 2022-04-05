<template>
  <div class="bx--grid">
    <div class="bx--row">
      <!-- info perfil -->
      <div
        style="
          text-align: center;
          margin-right: 1rem;
          padding-bottom: 1rem;
          margin-bottom: 2rem;
        "
        class="bx--col-lg-3"
      >
        <!--Foto -->
        <div class="bx--row">
          <div class="bx--col-lg">
            <img
              style="border-radius: 10%; width: 12rem"
              v-bind:src="rota + info.userId + prefix"
            />
          </div>
        </div>

        <!--nome -->
        <div class="bx--row">
          <div class="bx--col-lg">
            <p><strong> Nome: </strong> {{ info.full_name }}</p>
          </div>
        </div>

        <!--bio -->
        <div class="bx--row">
          <div class="bx--col-lg">
            <p><strong> Bio: </strong> {{ info.biography }}</p>
          </div>
        </div>

        <!-- seguidores -->
        <div class="bx--row">
          <div class="bx--col-lg">
            <p>
              <strong>Seguidores : </strong>{{ info.edge_followed_by.count }}
            </p>
          </div>
        </div>

        <!--seguindo -->
        <div class="bx--row">
          <div class="bx--col-lg">
            <p><strong> Seguindo : </strong> {{ info.edge_follow.count }}</p>
          </div>
        </div>

        <!--mensagem  -->
        <div
          style="padding-top: 1rem"
          v-if="desativarButtonSeguidoresResolved === false"
          class="bx--row"
        >
          <div class="bx--col-lg">
            <p>
              Para ganhar seguidores em nosso site, clique no botao abaixo !
            </p>
          </div>
        </div>

        <!-- botao seguidor -->
        <div class="bx--row">
          <div style="text-align: center; padding-top: 1rem" class="bx--col-lg">
            <button
              class="bx--btn bx--btn--primary"
              :disabled="desativarButtonSeguidoresResolved"
              @click="ganharSeguidores()"
              type="button"
            >
              Ganhar seguidores
            </button>
          </div>
        </div>

        <div v-if="desativarButtonSeguidoresResolved === true" class="bx--row">
          <div style="text-align: center" class="bx--col-lg">
            <p>
              Faltam <strong> {{ tempoEsperaSeguidores }} </strong> para você
              voltar a ganhar seguidores em nosso sistema
            </p>
          </div>
        </div>
      </div>
      <!-- timeline -->
      <div style="overflow: auto; height: 100vh" class="bx--col">
        <div class="bx--row">
          <div class="bx--col-lg">
            <div
              v-for="(item, index) in timeline"
              v-bind:key="index"
              class="bx--row"
              style="
                padding-top: 3rem;
                padding-bottom: 1rem;
                margin-bottom: 2rem;
                padding-left: 1rem;
                padding-right: 1rem;
              "
            >
              <div class="bx--col-lg sombra">
                <div class="bx--row">
                  <div
                    style="padding-left: 3rem; padding-bottom: 0.5rem"
                    class="bx--col-lg"
                  >
                    <p>
                      <em>
                        Data da publicaçao: 01/01/2020 Publicaçao ID :
                        {{ item['id'] }}
                      </em>
                    </p>
                  </div>
                </div>

                <div class="bx--row">
                  <div class="bx--col-lg">
                    <img
                      style="border-radius: 1%; max-width: 100%; width: 40rem"
                      v-bind:src="rota + item.id + prefix"
                    />
                  </div>
                </div>

                <div style="padding-top: 1rem" class="bx--row">
                  <div style="padding-left: 2rem" class="bx--col--lg">
                    <img
                      style="border-radius: 10%; width: 2rem"
                      src="/images/like.png"
                    />
                  </div>
                  <div
                    style="padding-top: 0.3rem; padding-left: 0.5rem"
                    class="bx--col--lg"
                  >
                    <p><strong> Likes : </strong> {{ item['likes'] }}</p>
                  </div>

                  <div
                    style="padding-left: 2rem; padding-top: 0.4rem"
                    class="bx--col--lg"
                  >
                    <img
                      style="border-radius: 20%; width: 2.3rem"
                      src="/images/comentario.png"
                    />
                  </div>

                  <div
                    style="padding-top: 0.3rem; padding-left: 0.5rem"
                    class="bx--col--lg"
                  >
                    <p><strong> Comentarios : </strong> {{ item['likes'] }}</p>
                  </div>
                </div>

                <div style="padding-top: 1rem" class="bx--row">
                  <div class="bx--col-lg" style="max-width: 29rem">
                    <cv-text-input
                      :disabled="desativarButtonComentarioResolved"
                      label="Qual comentario voce quer receber em sua foto"
                      v-model="comentario"
                    >
                    </cv-text-input>
                  </div>
                </div>

                <div style="padding-top: 1rem" class="bx--row">
                  <div style="max-width: 10rem" class="bx--col">
                    <button
                      class="bx--btn bx--btn--primary"
                      :disabled="desativarButtonLikeResolved"
                      @click="ganharlike(item.id)"
                      type="button"
                    >
                      Ganhar like
                    </button>
                  </div>
                  <div class="bx--col">
                    <button
                      class="bx--btn bx--btn--primary"
                      :disabled="desativarButtonComentarioResolved"
                      @click="ganharComentario(item.id)"
                      type="button"
                    >
                      Ganhar comentario
                    </button>
                  </div>
                </div>
                <div
                  v-if="desativarButtonLikeResolved === true"
                  style="padding-top: 1rem"
                  class="bx--row"
                >
                  <div class="bx--col-lg">
                    <p>
                      Faltam <strong> {{ tempoEsperaLike }} </strong> para você
                      voltar a ganhar Likes em nosso sistema
                    </p>
                  </div>
                </div>

                <div
                  v-if="desativarButtonComentarioResolved === true"
                  style="padding-top: 1rem"
                  class="bx--row"
                >
                  <div class="bx--col-lg">
                    <p>
                      Faltam <strong> {{ tempoEsperaComentario }} </strong> para
                      você voltar a ganhar comentarios em nosso sistema
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import axios from 'axios';

export default {
  name: 'page',
  components: {},
  data() {
    return {
      mensagens: '',
      info: {},
      timeline: [],
      rota: '/uploads/',
      prefix: '-a.png',
      comentario: '',
      ultimoLikePedidoMaisde24Horas: false,
      ultimoSeguidoresPedidoMaisde24Horas: false,
      ultimoComentarioPedidoMaisde24Horas: false,
      tempoEsperaLike: '',
      tempoEsperaComentario: 0,
      tempoEsperaSeguidores: 0,
    };
  },
  computed: {
    ...mapGetters(['modalEdit']),
    desativarButtonLikeResolved: {
      get: function () {
        // intervalo menor que 24horas
        if (this.ultimoLikePedidoMaisde24Horas === false) {
          return true;
        }

        return false;
      },
    },
    desativarButtonComentarioResolved: {
      get: function () {
        // intervalo menor que 24horas
        if (this.ultimoComentarioPedidoMaisde24Horas === false) {
          return true;
        }

        return false;
      },
    },
    desativarButtonSeguidoresResolved: {
      get: function () {
        // intervalo menor que 24horas
        if (this.ultimoSeguidoresPedidoMaisde24Horas === false) {
          return true;
        }

        return false;
      },
    },
  },
  methods: {
    ...mapActions(['setModalEdit', 'setCookieUserJson', 'setModalUser']),
    async ganharSeguidores() {
      this.ultimoSeguidoresPedidoMaisde24Horas = true;
      let cookie = this.$cookies.get('token');
      let payload = { token: cookie };
      let response = await axios.post('/api/ganhar/seguidores', payload);
      this.mensagens = response.data.message;
      this.temporizadorSeguidores(100);
    },
    async ganharlike(id) {
      this.ultimoLikePedidoMaisde24Horas = true;
      let cookie = this.$cookies.get('token');
      let payload = { token: cookie, mediaId: id };
      await axios.post('/api/ganhar/likes', payload);
      this.temporizadorLikes(100);
    },
    async ganharComentario(id) {
      this.ultimoComentarioPedidoMaisde24Horas = true;
      let cookie = this.$cookies.get('token');
      let payload = { token: cookie, mediaId: id, comentario: this.comentario };
      await axios.post('/api/ganhar/comentario', payload);
      this.comentario = ' ';
      this.temporizadorComentarios(100);
    },
    async temporizadorLikes(duration) {
      duration = 60 * 60 * 24 - duration;

      let timer = duration,
        hours,
        minutes,
        seconds;
      let run = this;
      setInterval(function () {
        hours = parseInt(timer / 60 / 60, 10);
        minutes = parseInt(timer / 60 - hours * 60, 10);
        seconds = parseInt(timer % 60, 10);
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        run.tempoEsperaLike =
          hours + ' Horas ' + minutes + ' Minutos ' + seconds + ' Segundos ';

        if (--timer < 0) {
          timer = duration;
        }
      }, 1000);
    },
    async temporizadorSeguidores(duration) {
      duration = 60 * 60 * 24 - duration;
      let timer = duration,
        hours,
        minutes,
        seconds;
      let run = this;
      setInterval(function () {
        hours = parseInt(timer / 60 / 60, 10);
        minutes = parseInt(timer / 60 - hours * 60, 10);
        seconds = parseInt(timer % 60, 10);
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        run.tempoEsperaSeguidores =
          hours + ' Horas ' + minutes + ' Minutos ' + seconds + ' Segundos ';

        if (--timer < 0) {
          timer = duration;
        }
      }, 1000);
    },
    async temporizadorComentarios(duration) {
      duration = 60 * 60 * 24 - duration;
      let timer = duration,
        hours,
        minutes,
        seconds;
      let run = this;
      setInterval(function () {
        hours = parseInt(timer / 60 / 60, 10);
        minutes = parseInt(timer / 60 - hours * 60, 10);
        seconds = parseInt(timer % 60, 10);
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        run.tempoEsperaComentario =
          hours + ' Horas ' + minutes + ' Minutos ' + seconds + ' Segundos ';

        if (--timer < 0) {
          timer = duration;
        }
      }, 1000);
    },
    async infoPerfil() {
      if (this.modalEdit === '') {
        this.$router.push('/');
      }
      let cookie = this.$cookies.get('token');
      let payload = { token: cookie };
      axios.post('/api/infoperfil', payload).then((response) => {
        this.info = response.data.info;
      });
    },
    async ultimosPedidos() {
      if (this.modalEdit === '') {
        this.$router.push('/');
      }
      let cookie = this.$cookies.get('token');
      let payload = { token: cookie };
      axios.post('/api/pedidos', payload).then((response) => {
        this.ultimoLikePedidoMaisde24Horas =
          Date.now() - response.data.ultimoLikePedidoMaisde24Horas >
          1000 * 60 * 60 * 24
            ? true
            : false;
        this.ultimoSeguidoresPedidoMaisde24Horas =
          Date.now() - response.data.ultimoSeguidoresPedidoMaisde24Horas >
          1000 * 60 * 60 * 24
            ? true
            : false;
        this.ultimoComentarioPedidoMaisde24Horas =
          Date.now() - response.data.ultimoComentarioPedidoMaisde24Horas >
          1000 * 60 * 60 * 24
            ? true
            : false;

        if (this.ultimoLikePedidoMaisde24Horas === false) {
          this.temporizadorLikes(
            parseInt(
              (Date.now() - response.data.ultimoLikePedidoMaisde24Horas) / 1000
            )
          );
        }

        if (this.ultimoComentarioPedidoMaisde24Horas === false) {
          this.temporizadorComentarios(
            parseInt(
              (Date.now() - response.data.ultimoComentarioPedidoMaisde24Horas) /
                1000
            )
          );
        }

        if (this.ultimoSeguidoresPedidoMaisde24Horas === false) {
          this.temporizadorSeguidores(
            parseInt(
              (Date.now() - response.data.ultimoSeguidoresPedidoMaisde24Horas) /
                1000
            )
          );
        }
      });
    },
    async buscarTimeLine() {
      if (this.modalEdit === '') {
        this.$router.push('/');
      }
      let cookie = this.$cookies.get('token');
      let payload = { token: cookie };
      axios.post('/api/timeline', payload).then((response) => {
        this.timeline = response.data.timeline;
      });
    },
  },
  async mounted() {
    this.setModalEdit('timeline');
    this.infoPerfil();
    this.ultimosPedidos();
    this.buscarTimeLine();
  },
};
</script>

<style lang="scss">
.bx--grid {
  margin-left: 0;
  max-width: 100%;
}
p {
  font-size: 1.2em;
  color: black;
}
.sombra {
  border-radius: 3%;
  border: 1px solid;
  padding: 10px;
  box-shadow: 1px 1px;
  background: white;
  max-width: 41rem;
}
</style>
