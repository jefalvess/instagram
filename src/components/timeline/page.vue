<template>
  <div class="bx--grid">
    <div class="bx--row">
      <!-- info perfil -->
      <div
        style="
          border-radius: 6%;
          text-align: center;
          border: 1px solid black;
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
              style="border-radius: 50%"
              v-bind:src="rota + info.id + prefix"
              height="300"
              width="300"
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
        <div class="bx--row">
          <div style="cursor: pointer" class="bx--col-lg">
            <p>
              Para ganhar seguidores em nosso site, clique no botao abaixo !
            </p>
          </div>
        </div>

        <!-- botao seguidor -->
        <div class="bx--row">
          <div style="text-align: center" class="bx--col-lg">
            <button
              class="bx--btn bx--btn--primary"
              :disabled="desativarButton"
              @click="ganharSeguidores()"
              type="button"
            >
              Ganhar seguidores
            </button>
            {{ this.mensagens }}
          </div>
        </div>
      </div>
      <!-- timeline -->
      <div style="overflow: auto; height: 100vh" class="bx--col-lg-8">
        <div class="bx--row">
          <div class="bx--col-lg">
            <div
              v-for="(item, index) in timeline"
              v-bind:key="index"
              class="bx--row"
              style="
                padding-top: 1rem;
                padding-bottom: 1rem;
                margin-bottom: 2rem;
              "
            >
              <div class="bx--col-lg">
                <div class="bx--row">
                  <div class="bx--col-lg">
                    <p><strong> id publicaçao : </strong> {{ item['id'] }}</p>
                  </div>
                </div>

                <div class="bx--row">
                  <div class="bx--col-lg">
                    <img
                      v-bind:src="rota + item.id + prefix"
                      height="250"
                      width="250"
                    />
                  </div>
                </div>

                <div class="bx--row">
                  <div class="bx--col-lg">
                    <p><strong> Likes : </strong> {{ item['likes'] }}</p>
                  </div>
                </div>

                <div class="bx--row">
                  <div style="cursor: pointer" class="bx--col-lg">
                    <button
                      class="bx--btn bx--btn--primary"
                      :disabled="desativarButtonLike"
                      @click="ganharlike(item.id)"
                      type="button"
                    >
                      Ganhar like
                    </button>
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
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'page',
  components: {},
  data() {
    return {
      desativarButton: false,
      mensagens: '',
      info: {},
      timeline: [],
      rota: '/images/',
      prefix: '.png',
      desativarButtonLike: false

    };
  },
  computed: {
    ...mapGetters(['modalEdit']),
  },
  methods: {
    async checarUsuario() {
      if (this.modalEdit === '') {
        this.$router.push('/');
      }
      let cookie = this.$cookies.get('token');
      let payload = { token: cookie };
      let response = await axios.post('/api/info/perfil', payload);
      this.info = response.data.info;
      this.timeline = response.data.timeline;
    },
    async ganharSeguidores() {
      this.desativarButton = true;
      let cookie = this.$cookies.get('token');
      let payload = { token: cookie };
      let response = await axios.post('/api/ganhar/seguidores', payload);
      this.desativarButton = false;
      this.mensagens = response.data.message;
    },
    async ganharlike(id) {
      this.desativarButtonLike = true;
      let cookie = this.$cookies.get('token');
      let payload = { token: cookie, mediaId: id };
      let response = await axios.post('/api/ganhar/likes', payload);
      this.desativarButtonLike = false;
      console.log(response.data);
    },
  },
  async mounted() {
    await this.checarUsuario();
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
