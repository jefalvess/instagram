<template>
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col-lg-3">
        <img src="https://www.example.com/images/dinosaur.jpg" />

        <img v-bind:src="info.profile_pic_url_hd" height="288" width="388" />
      </div>
    </div>

    <div class="bx--row">
      <div class="bx--col-lg-3">
        {{ info.full_name }}
      </div>
    </div>

    <div class="bx--row">
      <div class="bx--col-lg-3">
        {{ info.biography }}
      </div>
    </div>

    <div class="bx--row">
      <div class="bx--col-lg-3">Seguidores : {{ info.edge_followed_by }}</div>
    </div>

    <div class="bx--row">
      <div class="bx--col-lg-3">Seguindo : {{ info.edge_follow }}</div>
    </div>

    <div class="bx--row">
      <div class="bx--col-lg-3">
        <div
          v-for="(item, index) in timeline"
          v-bind:key="index"
          class="bx--row"
        >
          <div class="bx--col-lg-3">
            id : {{ item['node']['id'] }}
            {{
              item['node']['edge_media_to_caption']['edges'][0]['node']['text']
            }}

            <img
              v-bind:srcset="item['node']['display_url']"
              width="300"
              height="200"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="bx--row">
      <div style="cursor: pointer" class="bx--col-lg-3">
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
      <div style="overflow: auto; height: 100vh" class="bx--col-lg-8">-</div>
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
      this.timeline =
        response.data.timeline.user.edge_owner_to_timeline_media.edges;
    },
    async ganharSeguidores() {
      this.desativarButton = true;
      let cookie = this.$cookies.get('token');
      let payload = { token: cookie };
      let response = await axios.post('/api/ganhar/seguidores', payload);
      this.desativarButton = false;
      this.mensagens = response.data.message;
    },
  },
  mounted() {
    this.checarUsuario();
  },
};
</script>
