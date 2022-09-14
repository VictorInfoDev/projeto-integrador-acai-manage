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
        <template>
          <v-expansion-panels>
            <v-expansion-panel
            v-for="comanda of quadroComandas" :key="comanda.id"
            >
              <v-expansion-panel-header class="text-h5">
                {{ comanda.nome }}
              </v-expansion-panel-header>
              <v-divider></v-divider>
              <v-expansion-panel-content class="mt-5">
                {{ comanda.desc }}                
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </template>
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
            <v-btn class="ml-3 success">Criar</v-btn>
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
          quadroComandas: [
            {nome: "mesa 01", desc:"pedido"}
          ],
        }
    },
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