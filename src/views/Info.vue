<template>
  <v-app>
      <div class="pa-10">
        <v-row>
          <v-col>
            <v-card class="pa-5" elevation="5" height="600">
            <v-card-title>Nome da empresa</v-card-title>
            <v-card-subtitle>empresaemail@gmail.com</v-card-subtitle>
            <v-card-text>
                <b>CNPJ:</b>12345678901<br>
                <v-btn @click="dialogInfo = true, buscarInfoEdit()" outlined class="mt-2">Editar</v-btn>
            </v-card-text>
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
          <v-card class="pa-5" elevation="5" height="600px">
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
      <v-dialog v-model="dialogInfo" max-width="500">
        <v-card v-for="Edit in Edits" :key="Edit.id">
          <v-card-title class="dark"><v-icon class="mr-3">mdi-store-edit</v-icon>Editar informações</v-card-title>
          <v-divider></v-divider>
          <v-btn
            block
            elevation="2"
            tile
            class="success"
            v-if="BtnEmailVerificado"
            @click="verifiedEmail()"
          >Verificar email</v-btn>
          <v-alert
            class="ma-6"
            v-model="BtnEmailVerificado"
            type="warning"
          >Assim que verificar o e-mail faça o <router-link to="/login">login</router-link> novamente.</v-alert>
          <div v-if="!BtnEmailVerificado" class="mt-5 success--text ml-5"><v-icon class="mr-3" color="success" large>mdi-checkbox-marked-circle-outline</v-icon>E-mail verificado!</div>
          <v-card-text>
            <v-text-field
              v-model="Edit.nome"
              label="Nome da loja"
              filled  
              class="mt-5"
              :disabled="disabledEdit"
            ></v-text-field>
            <v-text-field
              v-model="Edit.cnpj"
              label="CNPJ"
              :disabled="disabledEdit"
            ></v-text-field>
            <v-text-field
              v-model="Edit.email"
              label="E-mail"
              :disabled="disabledEdit"
            ></v-text-field>
            <v-btn :disabled="disabledEdit" @click="ResetEmail(Edit.email)" text class="mt-5 mr-2 primary">Redefinir Email</v-btn>
            <v-btn :disabled="disabledEdit" @click="ResetSenha()" text class="mt-5 warning">Redefinir senha</v-btn><br>
            <div class="mt-3">Enviaremos um link de recuperação para o seu email, verifique a caixa de spam caso o e-mail não apareça na caixa de entrada.</div> 
            <v-alert
              v-model="emailRec"
              transition="scale-transition"
              dismissible
              class="mt-5"
              type="success"
            >
              E-mail enviado com sucesso!
            </v-alert>
            <v-alert
              v-model="emailRec2"
              transition="scale-transition"
              dismissible
              class="mt-5"
              type="primary"
            >
              E-mail de cancelamento enviado!
            </v-alert>
            <v-alert
              v-model="emailRec3"
              transition="scale-transition"
              dismissible
              class="mt-5"
              type="error"
            >
              Este e-mail já está em uso!
            </v-alert>
          </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="dialogInfo = false">Cancelar</v-btn>
              <v-btn :disabled="disabledEdit" @click="salvarInfoEdit(Edit.cnpj, Edit.nome, Edit.id)" class="ml-3 success">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
import * as fb from '@/plugins/firebase'
import { sendPasswordResetEmail, getAuth, sendEmailVerification, updateEmail } from "firebase/auth";
export default {
    data () {
      return {
        Edits: [],
        dialogInfo: false,
        emailRec: false,
        emailRec2: false,
        emailRec3: false,
        BtnEmailVerificado: true,
        StkEmailverificado: false,
        disabledEdit: true,
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
    mounted(){
      this.buscarInfoEdit();
    },
    methods:{
      async ResetSenha(){
        const auth = getAuth();
        const user = fb.auth.currentUser;
        const email = user.email;
        sendPasswordResetEmail(auth, email)
        .then(() => {
          this.emailRec = true;
        })
        .catch(() => {
          
        });
      },
      async ResetEmail(email){
        const auth = getAuth();
        updateEmail(auth.currentUser, email).then(() => {
          this.emailRec2 = true
        }).catch(() => {
          this.emailRec3 = true
        });
      },
    async buscarInfoEdit (){
        this.Edits = [];
        this.uid = fb.auth.currentUser.uid;
        const logTasks = await fb.perfilCollection.where("owner","==",this.uid).get();
        const auth = getAuth();
        const user = auth.currentUser;
        const email = user.email;
        for (const doc of logTasks.docs) {
          this.Edits.push({
            nome: doc.data().nomeEmpresa,
            cnpj: doc.data().CNPJ,
            email: email,
            id: doc.data().idPerfil
          })
        }
        if (user !== null) {
          this.BtnEmailVerificado = !user.emailVerified;
          this.disabledEdit = this.BtnEmailVerificado;
        }
    },
    async verifiedEmail (){
      const auth = getAuth();
      sendEmailVerification(auth.currentUser)
        .then(() => {
            this.emailRec = true;
        });
    },
      async salvarInfoEdit(cnpj, nome, id){
          await fb.perfilCollection.doc(id).update({
              nomeEmpresa: nome,
              CNPJ: cnpj,
        });
          this.buscarInfoEdit();
          this.dialogInfo = false;
      },
    }
}
</script>

<style>
</style>
