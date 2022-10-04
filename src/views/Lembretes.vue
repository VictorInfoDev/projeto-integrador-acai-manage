<template>
  <v-app>
    <div class="pa-5">
      <div style=" border-left-style: solid; border-left-color: #81d4fa; border-left-width: 8px; padding-left: 10px;" class="text-h4 my-8">Crie seus lembretes aqui!</div>
      <div style="color: gray" class="h5 mt-2 mb-4">
        <v-alert outlined type="info" color="#81D4FA">Clique em <v-icon color="#81D4FA">mdi-card-plus-outline</v-icon> para criar seus lembretes.</v-alert>
      </div>
      <div class="text-h2 mt-10">Lembretes</div>
      <v-card outlined class="mt-8">
        <v-card-title></v-card-title>

        <!--Lembretes //////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\-->
        <v-col>
        <v-card elevation="8" class="ml-5 blue-grey lighten-4 rounded-xl" max-width="344">
          <v-card-title class="mt-1">{{ nomeLembrete }}</v-card-title>
          <v-card-subtitle>
            <v-chip mall :ripple="false" link class="ma-1" color="black--text white" outlined>
              <v-icon left color="black">mdi-account-circle-outline</v-icon>{{ nomeCriador }}</v-chip>
              </v-card-subtitle>
          <v-card-actions>
            <v-btn ripple="false" @click="dialogConcluir = !dialogConcluir" icon color="" class="ml-3 pa-5">
              <v-icon fab dark class="mr-1 pa-3" large>mdi-check-bold</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{show ? "mdi-chevron-up" : "mdi-chevron-down"}}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text>{{ descMensagem }}</v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>

        <v-spacer></v-spacer>

        <v-col>
            <v-card elevation="8" class="ml-5 blue-grey lighten-4 rounded-xl" max-width="344">
          <v-card-title class="mt-1">{{ nomeLembrete }}</v-card-title>
          <v-card-subtitle>
            <v-chip mall :ripple="false" link class="ma-1" color="black--text white" outlined>
              <v-icon left color="black">mdi-account-circle-outline</v-icon>{{ nomeCriador }}</v-chip>
              </v-card-subtitle>
          <v-card-actions>
            <v-btn ripple="false" @click="dialogConcluir = !dialogConcluir" icon color="" class="ml-3 pa-5">
              <v-icon fab dark class="mr-1 pa-3" large>mdi-check-bold</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{show ? "mdi-chevron-up" : "mdi-chevron-down"}}</v-icon>
            </v-btn>
          </v-card-actions>
          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>
              <v-card-text>{{ descMensagem }}</v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
        </v-col>
      </v-card>
    </div>
    <v-dialog v-model="dialogConcluir" persistent max-width="300px">
      <v-card color="blue-grey darken-2">
        <v-card-title class="white--text">Concluir Lembrete?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text class="error white--text" @click="dialogConcluir = false">Não</v-btn>
          <v-btn class="success" @click="doneLembrete()">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn fixed fab large dark bottom right class="ma-5 light-blue lighten-2" @click="dialogLembrete = !dialogLembrete">
      <v-icon>mdi-card-plus-outline</v-icon>
    </v-btn>
    <!--JANELA DO LEMBRETE-->
    <v-dialog v-model="dialogLembrete" max-width="500px">
      <v-card>
        <v-card-title class="light-blue lighten-2 pa-5">
          <v-icon color="white">mdi-text-box</v-icon>
          <span class="ml-2 white--text">Deixe seu lembrete</span>
          <v-spacer></v-spacer>
          <v-icon @click="dialogLembrete = false" color="white">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>

        <v-form class="ml-10 mt-5 mr-10" max-width="600px" fer="form">
          <v-text-field v-model="nomeLembrete" label="Nome lembrete" single-line full-width hide-details>
          </v-text-field>
          <v-divider></v-divider>
          <v-textarea v-model="descMensagem" label="Mensagem" counter maxlength="260" full-width single-line prepend-icon="">
          </v-textarea>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="mb-2" color=""  @click="reset(nomeLembrete, descMensagem, nomePara)">fechar</v-btn>
            <v-btn flat class="light-blue lighten-2 mb-2" @click="salvarLembrete()">Criar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
//import { db } from '../plugins/firebase';

//import * as fb from '@/plugins/firebase'
export default {
  data() {
    return {
      show: false,
      valid: true,
      dialogLembrete: false,
      dialogConcluir: false,
      items: ["Gerente", "Dono", "Vendedor(a)"],
      lembrete: [],
      nomeLembrete: '',
      nomeCriador: "Adelar P.",
      descMensagem: '',
    };
  },

  methods: {
    async salvarLembrete(e){

      e.preventDefault();

      //console.log("Lembrete criado")

      const data = {
        nomeLembrete: this.nomeLembrete,
        descMensagem: this.descMensagem,
      }

      console.log(data);

    }
  },
};
</script>

<style></style>
