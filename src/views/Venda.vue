<template>
  <v-app>
      <div class="pa-5">
        <div style="border-left-style:solid;border-left-color:#4CAF50;border-left-width:8px;padding-left:10px;" class="text-h4 my-8">Gerencie suas vendas aqui!</div>
        <v-alert
        outlined
        type="info"
        color="success"
        >
        Clique em <v-icon color="success">mdi-plus-circle</v-icon> para criar seus pedidos ou realizar uma venda.
        </v-alert>
        <div class="text-h2 success--text mt-10">Comandas</div>
        <v-divider class="ma-5 ml-0"></v-divider>
          <v-row>
            <v-col cols="12" sm="2" v-for="comanda in comandas" :key="comanda.id">
                <v-hover v-slot="{ hover }">
                  <v-card 
                    height="" width="" class=""
                    :elevation="hover ? 12 : 5"
                    :class="{ 'on-hover': hover }"
                    @click="test()"
                  >
                    <v-card-title class="success white--text">
                      {{ comanda.nome }}
                      <v-spacer></v-spacer>
                      <v-icon
                        left
                        color="white"
                      >
                        {{ comanda.prioridade }}
                      </v-icon>
                    </v-card-title>
                    <v-card-text class="mt-3">
                      Horário de criação: <b>{{ comanda.hora }}</b><br>
                      Data de criação: <b>{{ comanda.data }}</b>
                    </v-card-text>
                  </v-card>
                </v-hover>
              
            </v-col>
          </v-row>
        </div>
      <v-btn
        color="success"
        fixed
        fab
        large
        dark
        bottom
        right
        class="ma-5"
        @click="dialogVenda = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-dialog v-model="dialogVenda" persistent max-width="700px">
        <v-card class="">
          <v-card-title class="success white--text text-h5">
            <v-icon class="mr-2" color="white">mdi-clipboard-edit-outline</v-icon> Pedido
          </v-card-title>
          <v-card-text class="">
              <v-row class="mt-5">
                <v-col cols="12" sm="12">
                  <v-text-field
                    color="success"
                    label="Nome do pedido"
                    outlined
                  ></v-text-field>
                  <v-textarea
                    solo
                    name="input-7-4"
                    label="Descrição do pedido"
                    color="success"
                  ></v-textarea>
                </v-col>
              </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialogVenda = false">Cancelar</v-btn>
            <v-btn @click="test()" class="ml-3 success">Criar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
//import { db, doc, setDoc } from "firebase/firestore";
//import { doc, deleteDoc } from "firebase/firestore";
//import * as fb from '@/plugins/firebase'
export default {
    data(){
        return{
          dialogVenda: false,
          comandas:[
            {nome: 'Mesa 01', data: '10/10/2022', hora: '21:37', prioridade: 'mdi-star'},
            {nome: 'Mesa 02', data: '10/10/2022', hora: '21:37', prioridade: ''}
          ]
        }
    },
    methods: {
      test(){
        var dataAtual = new Date();
        var horas = dataAtual.getHours();
        var minutos = dataAtual.getMinutes();
        var dia = dataAtual.getDate();
        var mes = (dataAtual.getMonth() + 1);
        var ano = dataAtual.getFullYear();
        alert(horas + ":" + minutos)
        alert(dia + "/" + mes + "/" + ano)
      }
    }
}
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>