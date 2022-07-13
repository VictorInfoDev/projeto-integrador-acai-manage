<template>
  <v-app>
      <div class="pa-10">
        <v-row>
          <v-col>
            <v-card class="pa-5" elevation="5" height="570px">
            <v-card-title>Nome da empresa<v-spacer></v-spacer><v-btn @click="verificar()">verificar</v-btn></v-card-title>
            <v-card-subtitle>empresaemail@gmail.com</v-card-subtitle>
            <v-card-text><b>CNPJ:</b>12345678901</v-card-text>
            <v-divider></v-divider>
            <v-card
              class="text-center"
              color="white"
              outlined
            >
              <v-card-text>
                <div class="text-h4 black--text">
                  Últimas vendas
                </div>
              </v-card-text>
              <v-card-text>
                <v-sheet color="white" rounded>
                  <v-sparkline
                    :value="value"
                    color="black"
                    height="100"
                    padding="24"
                    stroke-linecap="round"
                    smooth
                  >
                    <template v-slot:label="item">
                      R${{ item.value }}
                    </template>
                  </v-sparkline>
                </v-sheet>
              </v-card-text>
            </v-card>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
          <v-card class="pa-5" elevation="5" height="570px">
            <v-card-title>Últimas vendas</v-card-title>
              <v-simple-table
                fixed-header
                height="425px"
              >
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Nome pedido
                      </th>
                      <th class="text-left">
                        Valor Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in desserts"
                      :key="item.name"
                    >
                      <td>{{ item.name }}</td>
                      <td>{{ item.calories }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
          </v-card></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card class="pa-5" elevation="5">
              opa
            </v-card>
          </v-col>
        </v-row>


      </div>
  </v-app>
</template>

<script>
import * as fb from '@/plugins/firebase'
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
export default {
    data () {
      return {
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
        ],
        value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
          ],
      }
    },
    methods:{
      async verificar(){
        const auth = getAuth();
        const user = fb.auth.currentUser;
        const email = user.email;
        sendPasswordResetEmail(auth, email)
        .then(() => {
          alert('sim')
        })
        .catch(() => {
          alert('nao')
        });
      }
    }
}
</script>

<style>
</style>