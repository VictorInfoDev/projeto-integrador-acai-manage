<template>
  <v-app>
    <div class="pa-5">
      <div style="border-left-style:solid;border-left-color:#81D4FA;border-left-width:8px;padding-left:10px;"
        class="text-h4 my-8">Crie seus lembretes aqui!</div>
      <div style="color:gray;" class="h5 mt-2 mb-4">
        <v-alert outlined type="info" color="#81D4FA">Clique em <v-icon color="#81D4FA">mdi-card-plus-outline</v-icon>
          para criar seus lembretes.</v-alert>
      </div>
      <div class="text-h2 mt-10">Lembretes</div>
      <v-card outlined class="mt-8">
        <v-card-title></v-card-title>

        <!--Lembretes //////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\-->
        <v-col>
          <v-row>
        <v-card-text>
          <v-card class="font-size: 16px font-weight-black text-uppercase black--text rounded-xl" color="#81D4FA" dark
            max-width="400" elevation="13" rounded-lg rounded-t-0>
            <v-card-title class="light-blue lighten-2 pa-3"><span class="text-h6 font-weight-light">
                <h3>Pagar o fornecedor</h3>
              </span></v-card-title>
            <v-card-text color="#212121" class="white--text text-h5 font-weight-bold mt-2">
              <h5>"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type
                invalid as well."</h5>
            </v-card-text>
            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-chip class="ma-2" color="black--text white" label>
                      <v-icon left color="black">mdi-account-circle-outline</v-icon>John Leider
                    </v-chip>
                  </v-list-item-title>
                </v-list-item-content>
                <v-btn ripple="false" @click="dialogConcluir = !dialogConcluir" icon color="white" class="pa-5">
                  <v-icon fab dark class="mr-1 pa-3" large>mdi-check-bold</v-icon>
                </v-btn>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-card-text>
        </v-row>
        </v-col>

        <v-col>
          <v-row>
        <v-card-text>
          <v-card class="font-size: 16px font-weight-black text-uppercase black--text rounded-xl" color="#81D4FA" dark
            max-width="400" elevation="13" rounded-lg rounded-t-0>
            <v-card-title class="light-blue lighten-2 pa-3"><span class="text-h6 font-weight-light">
                <h3>Pagar o fornecedor</h3>
              </span></v-card-title>
            <v-card-text color="#212121" class="white--text text-h5 font-weight-bold mt-2">
              <h5>"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type
                invalid as well."</h5>
            </v-card-text>
            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-content>
                  <v-list-item-title>
                    <v-chip class="ma-2" color="black--text white" label>
                      <v-icon left color="black">mdi-account-circle-outline</v-icon>John Leider
                    </v-chip>
                  </v-list-item-title>
                </v-list-item-content>
                <v-btn ripple="false" @click="dialogConcluir = !dialogConcluir" icon color="white" class="pa-5">
                  <v-icon fab dark class="mr-1 pa-3" large>mdi-check-bold</v-icon>
                </v-btn>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-card-text>
        </v-row>
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

    <v-btn fixed fab large dark bottom right class="ma-5 light-blue lighten-2" @click="dialog = !dialog">
      <v-icon>mdi-card-plus-outline</v-icon>
    </v-btn>
    <!--JANELA DO LEMBRETE-->
    <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title class="light-blue lighten-2 pa-5">
              <v-icon color="white">mdi-text-box</v-icon>
              <span class="ml-2 white--text">Deixe seu lembrete</span>
              <v-spacer></v-spacer>
              <v-icon @click="dialog = false" color="white">mdi-close</v-icon>
            </v-card-title>
            <v-divider></v-divider>
            <v-form class="ml-10 mt-5 mr-10" max-width="300px">
              <v-text-field v-model="nomeLembrete" label="Nome lembrete" single-line full-width hide-details>
              </v-text-field>
              <v-divider></v-divider>
              <v-textarea v-model="nomeMensagem" label="Mensagem" counter maxlength="260" full-width single-line>
              </v-textarea>
              <v-container fluid full-width single-line>
                <v-row align="center">
                  <v-col class="d-flex" cols="12" sm="6">
                    <v-select :items="items" v-model="nomeDe" label="De" outlined>
                    </v-select>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6">
                    <v-select :items="items" v-model="nomePara" label="Para" outlined></v-select>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="light-blue lighten-2 mb-2" @click="doneComanda()">Criar</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
    
  </v-app>
</template>

<script>
//import * as fb from '@/plugins/firebase'
export default {
  data() {
    return {
      valid: true,
      dialog: false,
      dialogConcluir: false,
      items: ['Gerente', 'Dono', 'Vendedor(a)'],
      lembrete: [],

    }
  },

  mounted() {
    this.buscarLembretes();
  },

  methods: {
    salvarLembrete() {

    },
    concLembrete() {
      this.dialogConcluir = true
    },
  }
}
</script>

<style>
</style>