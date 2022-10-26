<template>
  <v-app>
    <div class="root"><img class="background" ref="background" src="../assets/accai.png" /></div>
    <div class="pa-5">
      <v-divider></v-divider>
      <div class="mr-2">
        <v-card outlined color="transparent" class="ml-6 mr-6 my-2" style="color:black;padding-left:3px;">
          <span elevation="5" class="text-h3"><strong elevation="5">Bem vindo</strong></span>
          <br>
          <v-icon elevation="5" color="black" class="mr-2">mdi-calendar-blank</v-icon><b>{{ date }}</b>
        </v-card>
      </div>
      <div class="ml-6 mr-6 mt-10">
        <v-card class="mb-10 font-weight-bold text-h4 basil--text black--text" color="transparent" elevation="0">
          <v-btn
            class=""
            fab
            dark
            large
            color="#550953"
            to="/Produtos"
          >
            <v-icon color="success">
              mdi-play
            </v-icon>
          </v-btn>
          Começar<span class="success--text">...</span> 
        </v-card>
        <v-alert dense border="left" elevation="5" colored-border class="font-weight-medium" color="#550953">
          Este site foi desenvolvido por estudantes de TI do IFC com o objetivo de melhorar o gerenciamento de vendas
          para lojas de açaí, um sistema simples, prático e organizado para acelerar os processos de suas vendas,
          deixando você no total controle, contando com históricos, informações de venda e listagem de produtos.
        </v-alert>
      </div>
      <div class="ml-6 mr-6 mt-10">
        <v-alert colored-border elevation="5" border="left" color="success">
          <span class="text-h5"><strong>❝Faça o que você pode, com o que você tem, onde você estiver. ❞</strong></span>
          <br>
          <span style="color:gray;margin-left:10px;">- Theodore Roosevelt</span>
        </v-alert>
      </div>
  </div>
  <v-card class="text-center mt-10 orange lighten-1" tile>
    <v-card-title class="warning white--text"><v-icon class="mr-3" color="white">mdi-star</v-icon>Vídeo recomendado</v-card-title>
    <div class="pa-10">
      <iframe width="1280" height="720" src="https://www.youtube.com/embed/w4DjUB8Ln4E" title="COMO LUCRAR COM AÇAÍ | Pedebis Açaiteria #açaí #empreendedorismo #dicas #tutorial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
  </v-card>
<img class="foreground" ref="foreground" src="../assets/accai.png" />
<v-footer padless fixed class="blue-grey lighten-4">
    <v-col
      class="text-center black--text"
      cols="12"
    >
      @__adelar @jfonsakkka @victorhgca— <strong>Projeto Açaí Manager</strong>
    </v-col>
  </v-footer>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      date: '',
      timerCount: '',
      links: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us',
      ],
    }
  },
  methods: {
    printDate: function () {
      return new Date().toLocaleDateString();
    },
  },
  mounted: function () {
    this.date = this.printDate();
  },
}
</script>
<style>
img.background,
img.foreground {
  /* Fill background */
  min-height: 100%;
  min-width: 1024px;

  /* Scale proportionately */
  width: 100%;
  height: auto;
}

img.background {
  /* Positioning */
  position: fixed;
  top: 0;
  left: 0;
}
</style>
