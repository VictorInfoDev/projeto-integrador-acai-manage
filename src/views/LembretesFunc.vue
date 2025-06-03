<template>
    <v-app :style="{'background-image':'url()'}">
      <div class="pa-5">
        <v-row class="pa-2">
          <v-icon large color="success" class="mb-2">mdi-store</v-icon>
          <span class="ml-3 text-h5 success--text">{{ nomeLojaAlocado }}</span>
          <v-spacer></v-spacer>
          <v-btn outlined to="/VendaFunc" color="success"><v-icon color="success" left>mdi-basket-unfill</v-icon> Vendas</v-btn>
        </v-row>
        <v-divider class="mt-2"></v-divider>
        <div style=" border-left-style: solid; border-left-color: gray; border-left-width: 8px; padding-left: 10px;" class="text-h4 my-8">Crie seus lembretes aqui!</div>
        <div style="color: gray" class="h5 mt-2 mb-4">
          <v-alert outlined type="info" color="dark">Clique <v-icon color="">mdi-card-plus-outline</v-icon> para criar seus lembretes.</v-alert>
        </div>
        <div class="text-h2 mt-10">Lembretes</div>
        <v-divider class="ma-5 ml-0"></v-divider>
        <v-card class="mt-5" color="transparent" elevation="0">
          <!--Lembretes //////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\-->
        <v-row class="mt-3">
          <v-col cols="12" sm="3" v-for="lembrete in lembretes" :key="lembrete.id">
            <v-card elevation="3" class="blue-grey lighten-4 rounded-lg">
              <v-card-title class="black--text blue-grey lighten-3 mb-3">{{ lembrete.nome }}</v-card-title>
              <v-card-text height="300px" class="black--text">{{ lembrete.descricao }}</v-card-text>
  
                <v-chip mall :ripple="false" link class="ma-1" color="black--text white" outlined>De:
                  <v-icon left color="black" class="ml-1">mdi-account-circle-outline</v-icon>{{ lembrete.criador }}
                </v-chip>

                <v-chip mall :ripple="false" link class="ma-1" color="black--text white" outlined>Para:
                  <v-icon left color="black" class="ml-1">mdi-account-circle-outline</v-icon>{{ lembrete.destinatario }}
                </v-chip>
  
                <v-card-actions>
                  <v-spacer></v-spacer>
                <v-btn ripple="false" @click="dialogConcluir = !dialogConcluir, idLembreteEx = lembrete.id" icon color="" class="mr-3 pa-5">
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
      <v-btn fixed fab large dark bottom right class="ma-5 blue-grey lighten-4" @click="criarLembrete()">
        <v-icon color="black">mdi-card-plus-outline</v-icon>
      </v-btn>
      <!--JANELA DO LEMBRETE-->
      <v-dialog v-model="dialogLembrete" max-width="500px">
        <v-card>
          <v-card-title class="pa-5 grey darken-3">
            <v-icon color="white">mdi-text-box</v-icon>
            <span class="ml-2 white--text">Deixe seu lembrete</span>
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
        </v-card>
      </v-dialog>
    </v-app>
  </template>
  
  <script>
  import Swal from 'sweetalert2'
  import { doc, deleteDoc} from "firebase/firestore";
  import * as fb from '@/plugins/firebase'
  export default {
    data() {
      return {
        nomeLojaAlocado: "",
        idLembreteEx: "",
        uid: "",
        show: false,
        valid: true,
        dialogLembrete: false,
        dialogConcluir: false,
        items: [],
        lembretes: [],
        nomeLembrete: '',
        descricaoLembrete: '',
        destinatarioLembrete: '',
        dataLembrete: ((new Intl.DateTimeFormat('default', {dateStyle: 'short'}).format())),
      };
    },
    mounted() {
        this.uidLoja();
        this.buscarLembretes();
        this.buscarUsersLembrete()
;    },
    methods: {
        async buscarUsersLembrete(){
            this.uid = fb.auth.currentUser.uid;
            this.items = ["Administrador"]
            const searchUidLoja = await fb.perfilCollection
                .where("owner", "==", this.uid)
                .get();
            for (const doc of searchUidLoja.docs) {
                this.uid = doc.data().alocado
            }
            const logLembreteUsers = await fb.perfilCollection
                .where("alocado", "==", this.uid)
                .get();
            for (const doc of logLembreteUsers.docs) {
                this.items.push(doc.data().nome);
            }
        },
        async uidLoja(){
            this.uid = fb.auth.currentUser.uid;
            const searchUidLoja = await fb.perfilCollection
                .where("owner", "==", this.uid)
                .get();
            for (const doc of searchUidLoja.docs) {
                this.uid = doc.data().alocado
            }
            const logNomeLoja = await fb.perfilCollection
                .where("owner", "==", this.uid)
                .get();
            for (const doc of logNomeLoja.docs) {
                this.nomeLojaAlocado = doc.data().nome
            }
        },     
        async salvarLembretes() {
            this.errors = [];
            if (!this.nomeLembrete) {
            this.errors.push('O nome é obrigatório.');
            }
            if (!this.descricaoLembrete) {
            this.errors.push('A idade é obrigatória.');
            }
            else{
              const uidUser = fb.auth.currentUser.uid;
              const searchNome = await fb.perfilCollection
                  .where("owner", "==", uidUser)
                  .get();
              for (const doc of searchNome.docs) {
                  this.nomeCriador = doc.data().nome
              }
              const res = await fb.lembretesCollection.add({
                  uid: this.uid,
                  nome_lembrete: this.nomeLembrete,
                  nome_destinatario: this.destinatarioLembrete,
                  nome_criador: this.nomeCriador,
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
            }
            
        },
    
        async resetForm(){
            this.nomeLembrete = ''
            this.descricaoLembrete = ''
            this.destinatarioLembrete = ''
            this.dataLembrete = ''
        },
        async buscarLembretes() {
            this.uid = fb.auth.currentUser.uid;
            const searchUidLoja = await fb.perfilCollection
                .where("owner", "==", this.uid)
                .get();
            for (const doc of searchUidLoja.docs) {
                this.uid = doc.data().alocado
            }
            this.lembretes = [];
            const logLembrete = await fb.lembretesCollection
                .where("uid", "==", this.uid)
                .get();
            for (const doc of logLembrete.docs) {
                this.lembretes.push({
                nome: doc.data().nome_lembrete,
                destinatario: doc.data().nome_destinatario,
                criador: doc.data().nome_criador,
                descricao: doc.data().descricao,
                data: doc.data().data_lembrete,
                id: doc.data().ID_lembrete
                });
            }
        },
        async criarLembrete(){
            this.dialogLembrete = true
            var dataAtual = new Date();
            var dia = dataAtual.getDate();
            var mes = (dataAtual.getMonth() + 1);
            var ano = dataAtual.getFullYear();
            var data = dia + "/" + mes + "/" + ano
            this.dataLembrete = data
    
        },
    
        async doneLembrete(){
            await deleteDoc(doc(fb.lembretesCollection, this.idLembreteEx));
            this.buscarLembretes();
            this.dialogConcluir = false
            Swal.fire(
            'Lembrete concluído!',
            '',
            'success'
            )
        },
        },
  };
  </script>
  
  <style>
  body {
    font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif; 
  }
  </style>
  
