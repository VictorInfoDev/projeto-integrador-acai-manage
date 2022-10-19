<template>
  <v-app :style="{'background-image':'url(https://static.vecteezy.com/ti/fotos-gratis/p2/6986555-moderno-soft-fade-roxo-para-rosa-gradiente-abstrato-fundo-citacoes-e-tipos-de-apresentacao-baseado-fundo-design-adequado-para-papel-de-parede-cotacoes-site-abertura-apresentacao-perfil-pessoal-foto.jpg)'}">
      <div class="pa-10">
        <v-card class="mb-5">
          <v-card-title class="pa-7"><v-icon class="mr-2" color="red">mdi-chart-donut</v-icon> Metas de vendas <v-spacer></v-spacer><v-icon large @click="test()">mdi-pencil</v-icon></v-card-title>
          <v-row class="pa-15 pt-10">
            <v-col class="text-center">
              <div class="mb-5 purple--text"><h1>Meta do dia: 10</h1></div>
              <v-progress-circular
                :rotate="270"
                :size="150"
                :width="20"
                :value="valueDia"
                color="purple"
              >
                {{ valueDia }}%
              </v-progress-circular>
            </v-col>
            <v-col class="text-center">
              <div class="mb-5 success--text"><h1>Meta do mês: 24</h1></div>
              <v-progress-circular
                :rotate="270"
                :size="150"
                :width="20"
                :value="valueMes"
                color="success"
              >
                {{ valueMes }}%
              </v-progress-circular>
            </v-col>
            <v-col class="text-center">
              <div class="mb-5 orange--text"><h1>Meta do ano: 2000</h1></div>
              <v-progress-circular
                :rotate="270"
                :size="150"
                :width="20"
                :value="valueAno"
                color="orange"
              >
                {{ valueAno }}%
              </v-progress-circular>
            </v-col>
          </v-row>
        </v-card>
        <v-row>
          <v-col>
            <v-card class="pa-5" elevation="5" height="600" v-for="info in infos" :key="info.id">
            <v-card-title>{{ info.nomeempresa }}</v-card-title>
            <v-card-subtitle>{{ info.email }}</v-card-subtitle>
            <v-card-text>
                <b>CNPJ:</b>{{ info.cnpj }}<br>
                <v-btn @click="dialogInfo = true, buscarInfoEdit()" tile class="mt-2 white--text" color="purple"><v-icon class="mr-2">mdi-pencil</v-icon> Editar</v-btn>
            </v-card-text>
            <v-divider></v-divider>
            <v-card
              class="text-center"
              color="white"
              outlined
            >
              <v-card-text>
                <div class="text-h4 black--text">
                   Progresso da semana
                </div>
              </v-card-text>
              <v-card-text>
                <v-sheet color="white" rounded>
                  <v-sparkline
                    :labels="labels"
                    :value="value"
                    color="black"
                    :gradient="gradient"
                    height="100"
                    padding="24"
                    stroke-linecap="round"
                    smooth
                    auto-draw
                  >
                    <template>
                    </template>
                  </v-sparkline>
                </v-sheet>
              </v-card-text>
            </v-card>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
          <v-card class="pa-5" elevation="5" height="600px">
            <v-card-title><v-icon class="mr-2" color="warning">mdi-clipboard-text-clock-outline</v-icon>Vendas de hoje</v-card-title>
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
                        Valor(R$)
                      </th>
                      <th class="text-left">
                        Horário
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="ultimas_vendas in vendas"
                      :key="ultimas_vendas.name"
                    >
                      <td>{{ ultimas_vendas.nome }}</td>
                      <td>{{ ultimas_vendas.valor.toFixed(2) }}</td>
                      <td>{{ ultimas_vendas.horario }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
          </v-card></v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card class="pa-3" elevation="5">
              <div class="ma-5"><h2>Histórico de vendas</h2></div>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Procurar"
                single-line
                hide-details
                class="ma-5"
                color="purple"
              ></v-text-field>
              <v-data-table :headers="headers" :items="desserts" :search="search">
                <template v-slot:item.idvenda="{ item }">
                  <v-chip v-model="item.idvenda" color="pink accent-1 white--text">
                    {{ item.idvenda }}
                  </v-chip>
                </template>
                <template v-slot:item.iconTable="{ item }">
                <v-chip
                  :disabled="configOpcao"
                  class="success ml-3"
                  @click="dialogInfoVenda = true"
                >
                  <v-icon v-model="item.iconTableExluir" color="white"> mdi-script-text-outline </v-icon>
                </v-chip>
              </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <v-dialog v-model="dialogInfo" max-width="500">
        <v-card v-for="Edit in Edits" :key="Edit.id">
          <v-card-title class="dark white--text" :style="{'background-image':'url(https://static.vecteezy.com/ti/fotos-gratis/p2/6986555-moderno-soft-fade-roxo-para-rosa-gradiente-abstrato-fundo-citacoes-e-tipos-de-apresentacao-baseado-fundo-design-adequado-para-papel-de-parede-cotacoes-site-abertura-apresentacao-perfil-pessoal-foto.jpg)'}"><v-icon class="mr-3" color="white">mdi-store-edit</v-icon>Editar informações</v-card-title>
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
      <v-dialog v-model="dialogInfoVenda" max-width="500">
        <v-card>
          <v-card-title class="success white--text">Mesa 1 <v-spacer></v-spacer><v-icon @click="dialogInfoVenda = false" color="white">mdi-close</v-icon></v-card-title>
          <div class="ma-5 mt-2 mb-2"><h3>Informaçoes</h3></div>
          <v-card-text class="">
            <b>Dia:</b> 15/10/2022<br>
            <b>Hora:</b> 20:35<br>
            <b>Desconto:</b> R$ 5,00 <br>
            <b>Valor total:</b> R$ 15,00 <br>
          </v-card-text>
          <v-divider></v-divider>
          <div class="ma-5 mt-2 mb-2"><h3>Produtos</h3></div>
          <v-list-item>
          <v-list-item-content>
              <v-list-item-title class="ml-1">Coca 2L: <span class="success--text"> R$ 2,00</span></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <div class="ml-5 mt-2"><h3>Copos</h3></div>
        </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
const gradients = [
    ['purple'],
    ['green'],
    ['green', 'purple', 'purple'],
    ['purple', 'green'],
    ['purple', 'purple', 'green'],
    ['orange', 'purple', 'red'],
  ]
import * as fb from '@/plugins/firebase'
import { sendPasswordResetEmail, getAuth, sendEmailVerification, updateEmail } from "firebase/auth";
export default {
    data () {
      return {
        metaDia: 10,
        metaMes: 240,
        metaAno: 2000,
        dbDia: 3,
        dbMes: 24,
        dbAno: 250,
        gradient: gradients[5],
        gradientDirection: 'top',
        gradients,
        dialogInfoVenda: false,
        search: "",
        infos: [],
        Edits: [],
        dialogInfo: false,
        emailRec: false,
        emailRec2: false,
        emailRec3: false,
        BtnEmailVerificado: true,
        StkEmailverificado: false,
        disabledEdit: true,
        // tabela vendaahoje
        vendas: [
          { nome: 'Mesa 01', valor: 12, horario: '21:13'},
          { nome: 'Mesa 03', valor: 7, horario: '9:54'},
          { nome: 'Mesa 02', valor: 22, horario: '13:23'},
          { nome: 'Mesa 07', valor: 15.50, horario: '12:45'},
          { nome: 'Mesa 08', valor: 8.25, horario: '23:48'},
          { nome: 'Mesa 01', valor: 12, horario: '21:13'},
          { nome: 'Mesa 03', valor: 7, horario: '9:54'},
          { nome: 'Mesa 02', valor: 22, horario: '13:23'},
          { nome: 'Mesa 07', valor: 15.50, horario: '12:45'},
          { nome: 'Mesa 08', valor: 8.25, horario: '23:48'},
        ],
        // grafico ultimas vendas
        value: [
        423,
        446,
        675,
        510,
        590,
        610,
        760,
          ],
        labels: [
          "DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"
        ],
        // infos tabela vendas
        headers: [
        {
          text: "Data",
          align: "start",
          sortable: false,
          value: "data",
        },
        { text: "Valor (R$)", value: "valor" },
        { text: "Horário", value: "hora", sortable: false },
        { text: "ID", value: "idvenda", sortable: false },
        { text: "", value: "iconTable", sortable: false },
        ],
        desserts: [
          {data: "15/10/2022", valor: 15.50, hora: "10:43", idvenda: "12342344567"}, 
          {data: "16/11/2022", valor: 16.00, hora: "21:12", idvenda: "12342344568"},
          {data: "18/09/2022", valor: 17.50, hora: "22:45", idvenda: "12342344569"},
          {data: "09/05/2022", valor: 20.50, hora: "17:23", idvenda: "12342344566"}
      ],
      }
    },
    mounted(){
      this.buscarInfoEdit();
      this.buscarInfoUser();
    },
    computed: {
      valueMes () {
        const divmeta = this.metaMes / 100
        const result = this.dbMes / divmeta
        return result
      },
      valueDia () {
        const divmeta = this.metaDia / 100
        const result = this.dbDia / divmeta
        return result
      },
      valueAno () {
        const divmeta = this.metaAno / 100
        const result = this.dbAno / divmeta
        return result
      }

    },

    methods: {
      // functions principais
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
    async buscarInfoUser(){
      this.infos = [];
      this.uid = fb.auth.currentUser.uid;
        const logPerfilUser = await fb.perfilCollection.where("owner","==",this.uid).get();
        const auth = getAuth();
        const user = auth.currentUser;
        const email = user.email;
        for (const doc of logPerfilUser.docs) {
          this.infos.push({
            nomeempresa: doc.data().nomeEmpresa,
            cnpj: doc.data().CNPJ,
            email: email,
          })
        }
    },
    async buscarInfoEdit (){
        this.Edits = [];
        this.uid = fb.auth.currentUser.uid;
        const logInfoEdit = await fb.perfilCollection.where("owner","==",this.uid).get();
        const auth = getAuth();
        const user = auth.currentUser;
        const email = user.email;
        for (const doc of logInfoEdit.docs) {
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
    },
}
</script>

<style>
</style>
