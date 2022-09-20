<template>
  <v-app>
    <div class="root"><img class="background" ref="background" src="../assets/accai.png" /></div>
    <div class="pa-5">
      <v-divider></v-divider>
      <div class="ml-2 mr-2">
        <v-card outlined color="transparent" class="ml-6 mr-6 my-2" style="color:black;padding-left:3px;">
          <span elevation="5" class="text-h3"><strong elevation="5">Bem vindo</strong></span>
          <br>
          <v-icon elevation="5" color="gray" class="mr-2">mdi-calendar-blank</v-icon>{{ date }}
        </v-card>
      </div>
      <br>
      <br>
      <div class="ml-6 mr-6">
        <v-alert outlined color="transparent" dense border="left" elevation="5" colored-border
          class="font-weight-medium">
          Este site foi desenvolvido por estudantes de TI do IFC com o objetivo de melhorar o gerenciamento de vendas
          para lojas de açaí, um sistema simples, prático e organizado para acelerar os processos de suas vendas,
          deixando você no total controle, contando com históricos, informações de venda e listagem de produtos.
        </v-alert>
      </div>
      <br>
      <div class="ml-6 mr-6">
        <v-alert outlined color="transparent" colored-border elevation="5" border="left">
          <span class="text-h5"><strong>❝Faça o que você pode, com o que você tem, onde você estiver. ❞</strong></span>
          <br>
          <span style="color:gray;margin-left:10px;">- Theodore Roosevelt</span>
        </v-alert>
      </div>
      <br>
      <br>
      <!--TESTE                   TESTE                           TESTE-->

      

  </div>
<img class="foreground" ref="foreground" src="../assets/accai.png" />
<v-footer dark padless>
        <v-card flat tile class="black white--text py-5 px-5 text-center" width="100%">
            <v-row>
                <v-col cols="12" sm="4">
                    <v-card-text class="white--text pt-2">
                        <v-btn icon>
                            <v-icon color="#A7121D">fas fa-dragon</v-icon>
                        </v-btn>
                    </v-card-text>
                </v-col>

                <v-col cols="12" sm="4">
                    <v-card-text class="pt-2">
                        <v-btn v-for="icon in icons" :key="icon" class="mx-1 white--text" icon>
                            <v-icon size="24px">
                                {{ icon }}
                            </v-icon>
                        </v-btn>
                    </v-card-text>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-card-text class="pt-2">
                        <v-btn class="mx-1 white--text" icon>
                            <v-icon color="#A7121D">mdi-heart</v-icon>
                        </v-btn>
                        Created by AAE IdeaPro
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
    </v-footer>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      date: '',
      timerCount: '',
      image: "@/assets/dog.png",
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