<template>
  <v-app>
    <div class="pa-5">
      <div style=" border-left-style: solid; border-left-color: gray; border-left-width: 8px; padding-left: 10px;" class="text-h4 my-8">Crie seus lembretes aqui!</div>
      <div style="color: gray" class="h5 mt-2 mb-4">
        <v-alert outlined type="info" color="dark">Clique em <v-icon color="">mdi-card-plus-outline</v-icon> para criar seus lembretes.</v-alert>
      </div>
      <div class="text-h2 mt-10">Lembretes</div>
      <v-card outlined class="mt-5">
        <!--Lembretes //////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\-->
      <v-row>
        <v-col cols="12" sm="3" v-for="lembrete in lembretes" :key="lembrete.id">
          <v-card elevation="3" class="ma-5 blue-grey lighten-4" tile>
            <v-card-title class="mt-1 black--text">{{ lembrete.nome }}</v-card-title>
            <v-card-text fixed height="300px" class="black--text">{{ lembrete.descricao }}</v-card-text>

            <v-chip mall :ripple="false" link class="ma-1" color="black--text white" outlined>
                <v-icon left color="black">mdi-account-circle-outline</v-icon>{{ lembrete.destinatario }}
              </v-chip>

              <!--hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh-->

              <v-chip mall :ripple="false" link class="ma-1" color="black--text" outlined>
                <v-icon left color="black">mdi-calendar-range</v-icon>{{ lembrete.data }}
              </v-chip>
              <v-card-actions>
              <v-btn ripple="false" @click="dialogConcluir = !dialogConcluir" icon color="" class="mr-3 pa-5">
                <v-icon color="black" fab dark class="mr-1 pa-3" large>mdi-check-bold</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
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
    <!--Botao criação lembrete-->
    <v-btn fixed fab large dark bottom right class="ma-5 blue-grey lighten-4" @click="dialogLembrete = !dialogLembrete">
      <v-icon color="black">mdi-card-plus-outline</v-icon>
    </v-btn>
    <!--JANELA DO LEMBRETE-->
    <v-dialog v-model="dialogLembrete" max-width="500px">
      <v-card>
        <v-card-title class="pa-5 grey darken-3">
          <v-icon color="white">mdi-text-box</v-icon>
          <span class="ml-2 white--text">Deixe seu lembrete</span>
          <v-spacer></v-spacer>
          <v-icon @click="dialogLembrete = false" color="white">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>

        <v-form class="ml-10 mt-5 mr-10" max-width="600px" fer="form">
          <v-text-field v-model="nomeLembrete" label="Nome lembrete" single-line full-width hide-details></v-text-field>
          <v-divider></v-divider>
          <v-textarea v-model="descricaoLembrete" label="Mensagem" counter maxlength="260" full-width single-line prepend-icon=""></v-textarea>            
          <v-container fluid full-width single-line>
            <v-row align="center">
              <v-col class="d-flex" cols="12" sm="12">
                <v-select
                  :items="items"
                  v-model="destinatarioLembrete"
                  label="Destinatário"
                  outlined>
                </v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="mb-2 white black--text" @click="dialogLembrete = false, resetForm()">fechar</v-btn>
            <v-btn flat dark class="mb-2" @click="salvarLembretes()">Criar</v-btn>

          </v-card-actions>
        </v-form>
        <v-card-subtitle>
              <v-chip mall :ripple="false" link class="ma-1" color="" outlined>
                <v-icon left color="">mdi-calendar-range</v-icon>{{ dataLembrete }}
              </v-chip>
            </v-card-subtitle>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import * as fb from '@/plugins/firebase'
export default {
  data() {
    return {
      uid: "",
      show: false,
      valid: true,
      dialogLembrete: false,
      dialogConcluir: false,
      items: ["Gerente", "Dono", "Vendedor(a)"],
      lembretes: [],
      nomeLembrete: '',
      descricaoLembrete: '',
      destinatarioLembrete: '',
      ola: 'adelar',
      dataLembrete: ((new Intl.DateTimeFormat('default', {dateStyle: 'short'}).format())),
    };
  },
  mounted() {
    this.buscarLembretes();
  },
  methods: {

    async salvarLembretes() {
      this.uid = fb.auth.currentUser.uid;
      const res = await fb.lembretesCollection.add({
          uid: this.uid,
          nome_lembrete: this.nomeLembrete,
          nome_destinatario: this.destinatarioLembrete,
          descricao: this.descricaoLembrete,
          data_lembrete: this.dataLembrete,
      });
      const idLembreteAdd = res.id;
        await fb.lembretesCollection.doc(idLembreteAdd).update({
          ID_lembrete: idLembreteAdd,
      });
      this.resetForm();
      this.dialogLembrete = false
      this.buscarLembretes();
      
    },

    async resetForm(){
      this.nomeLembrete = ''
      this.descricaoLembrete = ''
      this.destinatarioLembrete = ''
      this.dataLembrete = ''
    },
    async buscarLembretes() {
      this.uid = fb.auth.currentUser.uid;
      this.lembretes = [];
      const logLembrete = await fb.lembretesCollection
        .where("uid", "==", this.uid)
        .get();
      for (const doc of logLembrete.docs) {
        this.lembretes.push({
          nome: doc.data().nome_lembrete,
          destinatario: doc.data().nome_destinatario,
          descricao: doc.data().descricao,
          data: doc.data().data_lembrete,
        });
      }
    },
  },
};
</script>

<style></style>
