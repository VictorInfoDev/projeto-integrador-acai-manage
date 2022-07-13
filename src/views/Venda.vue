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
              v-for="(item,i) in 5"
              :key="i"
            >
              <v-expansion-panel-header class="text-h5">
                Item
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
      <v-dialog v-model="dialogVenda">
        <v-card>
          <v-card-title class="success white--text text-h5">
            <v-icon class="mr-2" color="white">mdi-plus</v-icon> Pedido
          </v-card-title>
          <v-card-text>

          </v-card-text>
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
          btnADD: true,
          selectedItem: 1,
          items: [
            { text: 'Super Copo' },
            { text: 'Super Copo' },
            { text: 'Super Copo' },
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