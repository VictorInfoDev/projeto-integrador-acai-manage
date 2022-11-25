<template>
  <v-app :style="{'background-image':'url(https://static.vecteezy.com/ti/fotos-gratis/p2/6986555-moderno-soft-fade-roxo-para-rosa-gradiente-abstrato-fundo-citacoes-e-tipos-de-apresentacao-baseado-fundo-design-adequado-para-papel-de-parede-cotacoes-site-abertura-apresentacao-perfil-pessoal-foto.jpg)'}">
      <div class="pa-10">
        <v-card class="mb-5">
          <v-card-title class="pa-7">
            <v-icon class="mr-2" color="red">mdi-chart-donut</v-icon> 
            Metas de vendas 
            <v-spacer></v-spacer>
            <v-btn
              text
              color="red"
              @click="dialogMetas = true, buscarMetas()"
            >
              Editar metas
              <v-icon>mdi-trending-up</v-icon>
            </v-btn>
          </v-card-title>
          <v-row class="pa-15 pt-10">
            <v-col class="text-center">
              <div class="mb-5 purple--text"><h1>Meta do dia: {{ metaDia }}</h1></div>
              <v-progress-circular
                :rotate="270"
                :size="150"
                :width="20"
                :value="valueDia"
                color="purple"
              >
                <span v-if="!diaCheck">{{ valueDia.toFixed(2) }}%</span> <v-icon x-large color="purple" v-if="diaCheck">mdi-check</v-icon>
              </v-progress-circular>
              <div class="mt-2 purple--text"><b>{{ dbDia }}</b><v-icon color="purple" class="ml-1" small>mdi-basket-unfill</v-icon></div>
            </v-col>
            <v-col class="text-center">
              <div class="mb-5 success--text"><h1>Meta do mês: {{ metaMes }}</h1></div>
              <v-progress-circular
                :rotate="270"
                :size="150"
                :width="20"
                :value="valueMes"
                color="success"
              >
                <span v-if="!mesCheck">{{ valueMes.toFixed(2) }}%</span> <v-icon x-large color="success" v-if="mesCheck">mdi-check</v-icon>
              </v-progress-circular>
              <div class="mt-2 success--text"><b>{{ dbMes }}</b><v-icon color="success" class="ml-1" small>mdi-basket-unfill</v-icon></div>
            </v-col>
            <v-col class="text-center">
              <div class="mb-5 orange--text"><h1>Meta do ano: {{ metaAno }}</h1></div>
              <v-progress-circular
                :rotate="270"
                :size="150"
                :width="20"
                :value="valueAno"
                color="orange"
              >
                <span v-if="!anoCheck">{{ valueAno.toFixed(2) }}%</span> <v-icon x-large color="orange" v-if="anoCheck">mdi-check</v-icon>
              </v-progress-circular>
              <div class="mt-2 warning--text"><b>{{ dbAno }}</b><v-icon color="warning" class="ml-1" small>mdi-basket-unfill</v-icon></div>
            </v-col>
          </v-row>
        </v-card>
        <v-row>
          <v-col>
            <v-card class="pa-5" elevation="5" height="600" v-for="info in infos" :key="info.id">
            <v-card-title>{{ info.nomeempresa }}</v-card-title>
            <v-card-subtitle>{{ info.email }}</v-card-subtitle>
            <v-card-text>
                <v-btn @click="dialogInfo = true, buscarInfoEdit()" tile class="mt-2 white--text" color="purple"><v-icon class="mr-2">mdi-pencil</v-icon> Editar</v-btn>
                <v-btn @click="dialogInfoUsers = true, gerenciarUsers()" tile class="mt-2 white--text ml-2" color="info"><v-icon class="mr-2">mdi-account</v-icon>funcionários</v-btn>
            </v-card-text>
            <v-divider></v-divider>
            <v-card
              class="text-center"
              color="white"
              outlined
            >
              <v-card-text>
                <div class="text-h4 black--text">
                   Sale Line Semanal
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
            <v-card-title><v-icon class="mr-2" color="warning">mdi-clipboard-text-clock-outline</v-icon>Vendas de hoje<v-spacer></v-spacer><span class="success--text mr-2"><b>Total:</b></span>R$ {{ valorVendasHojeTabela.toFixed(2) }}</v-card-title>
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
                      :key="ultimas_vendas.id"
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
              <v-card-title class="ma-2"><h3>Histórico de vendas</h3><v-spacer></v-spacer><span class="success--text mr-2"><b>Total: </b></span> R$ {{ valorVendasDaTabela.toFixed(2) }}</v-card-title>
              <v-row class="ml-2 mr-2">
                <v-col cols="12" sm="6">
                  <v-text-field
                    class="" 
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Procurar"
                    single-line
                    hide-details
                    color="purple"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-select 
                    class="" 
                    v-model="mesFiltro" 
                    :items="itemsMesFiltro" 
                    clearable label="Mês"
                    color="purple"
                    >
                  </v-select>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-text-field
                    class="" 
                    v-model="anoFiltro"
                    label="Ano"
                    color="purple"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col class="mt-3" cols="12" sm="1">
                  <v-btn dark @click="filtrarTabela()">
                    filtar
                    <v-icon>mdi-filter-variant</v-icon>
                  </v-btn>
                </v-col>
                <v-col class="mt-3" cols="12" sm="1">
                  <v-btn
                  outlined
                  @click="buscarVendasTabela()"
                  >
                    Resetar
                  </v-btn>
                </v-col>
              </v-row>
              <v-data-table :headers="headers" :items="desserts" :search="search" class="mr-4 ml-4">
                <template v-slot:item.idvenda="{ item }">
                  <v-chip v-model="item.idvenda" color="pink accent-1 white--text">
                    {{ item.idvenda }}
                  </v-chip>
                </template>
                <template v-slot:item.iconTable="{ item }">

                <v-tooltip left color="primary">
                  <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    :disabled="configOpcao"
                    class="primary ml-3"
                    @click="dialogInfoVenda = true, buscarInfoVendas(item.idvenda)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon v-model="item.iconTableExluir" color="white"> mdi-script-text-outline </v-icon>
                  </v-chip>
                  </template>
                <span class="white--text">Informações</span>
                </v-tooltip>

                <v-tooltip right color="error">
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip
                      class="error ml-3"
                      v-bind="attrs"
                      v-on="on"
                      @click="idvendaDelete = item.idvenda, excluirVenda = true"
                    >
                      <v-icon v-model="item.iconTableExluir" color="white"> mdi-basket-remove</v-icon>
                    </v-chip>
                  </template>
                  <span class="white--text">Excluir venda</span>
                </v-tooltip>
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
              <v-btn :disabled="disabledEdit" @click="salvarInfoEdit(Edit.nome, Edit.id)" class="ml-3 success">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogInfoVenda" max-width="500">
        <v-card v-for="itemInfo in infoVendas" :key="itemInfo.id">
          <v-card-title class="primary white--text">{{ itemInfo.nome }}<v-spacer></v-spacer><v-icon @click="dialogInfoVenda = false" color="white">mdi-close</v-icon></v-card-title>
          <div class="">
            <v-list-item class="">
              <v-list-item-content>
                <v-list-item-title><v-icon class="mr-2" color="green">mdi-cash-multiple</v-icon>R$ {{ itemInfo.valor.toFixed(2) }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class=""></v-divider>
            <v-list-item class="">
              <v-list-item-content>
                <v-list-item-title><v-icon class="mr-2" color="warning">mdi-cash-refund</v-icon>R$ {{ itemInfo.valorDesconto.toFixed(2) }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class=""></v-divider>
            <v-list-item class="">
              <v-list-item-content>
                <v-list-item-title><v-icon class="mr-2" color="primary">mdi-calendar</v-icon>{{ itemInfo.data }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class=""></v-divider>
            <v-list-item class="">
              <v-list-item-content>
                <v-list-item-title><v-icon class="mr-2" color="primary">mdi-clock-time-four-outline</v-icon>{{ itemInfo.hora }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class=""></v-divider>
            <v-list-item three-line class="">
              <v-list-item-content>
                <v-list-item-title>Descrição</v-list-item-title>
                <v-list-item-subtitle>
                  {{ itemInfo.desc }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
          <v-divider></v-divider>
          <v-expansion-panels accordion>
          <v-expansion-panel>
            <v-expansion-panel-header class="">
              Produtos
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list dense nav class="">
                <v-list-item-group
                  style="border-left-style: solid;border-left-color: #1976d2;border-left-width: 2px;padding-left: 10px;"
                  color="primary"
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Nome/<span class="success--text">Valor</span> </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item v-for="itemInfoProduto in infoVendasProduto" :key="itemInfoProduto.id">
                    <v-list-item-content>
                      <v-list-item-title>{{ itemInfoProduto.nome }}/<span class="success--text">R$ {{ itemInfoProduto.valor.toFixed(2) }}</span> </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Copos
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list dense nav class="">
                <v-list-item-group
                  style="border-left-style: solid;border-left-color: purple;border-left-width: 2px;padding-left: 10px;"
                  color="purple"
                >
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Nome/<span class="success--text">Valor</span> </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item v-for="itemInfoCopo in infoVendasCopo" :key="itemInfoCopo.id">
                    <v-list-item-content>
                      <v-list-item-title>{{ itemInfoCopo.nome }}/<span class="success--text">R$ {{ itemInfoCopo.valor.toFixed(2) }}</span> </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
    </v-expansion-panels>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogMetas" max-width="500" persistent>
        <v-card>
          <v-card-title class="error--text grey lighten-4">Editar metas<v-icon color="error">mdi-trending-up</v-icon></v-card-title>
          <v-divider></v-divider>
          <v-card-text class="mt-5">
            <v-text-field
            type="number"
            v-model="metaDia"
            label="Dia"
            filled
            rounded
            color="purple"
          ></v-text-field>
          <v-text-field
            type="number"
            v-model="metaMes"
            label="Mês"
            filled
            rounded
            color="success"
          ></v-text-field>
          <v-text-field
            type="number"
            v-model="metaAno"
            label="Ano"
            filled
            rounded
            color="warning"
          ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="dialogMetas = false, buscarMetas(), checkMetas()">
              cancelar
            </v-btn>
            <v-btn class="error" @click="salvarMetas()">
              salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="excluirVenda" persistent justify="center" max-width="400px">
      <v-card color="blue-grey darken-2">
        <v-card-title class="white--text">Deseja deletar a venda?<br>Você não poderá recuperar os dados!</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text class="white--text" @click="excluirVenda = false">Não</v-btn>
          <v-btn class="error" @click="deletarVenda(), excluirVenda = false">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogInfoUsers" max-width="550">
      <v-card class="pb-5">
        <v-card-title class="info white--text"><v-icon color="white" class="mr-2">mdi-account</v-icon> 
          Gerenciar funcionários
          <v-spacer></v-spacer>
          <v-icon color="white" @click="dialogInfoUsers = false">mdi-close</v-icon>
        </v-card-title>
        <v-row class="ma-3 mb-0">
          <v-chip color=""><b>Código de loja:</b><span class="ml-1">{{ uid }}</span></v-chip>
          <v-chip @click="test()" class="ml-2">Copiar <v-icon small class="ml-1">mdi-content-copy</v-icon></v-chip>
        </v-row>
        <div class="ma-3 ml-4 mt-2">Este código será usado para os funcionários se alocarem a sua loja!</div>
        <div class="ma-3 ml-5 mt-5"><h4>Solicitações</h4></div>
        <v-divider class="ma-3 ml-5 mb-0"></v-divider>
        <v-list-item class="ml-1" v-for="account in accountsInv" :key="account.id">
          <v-list-item-avatar>
            <v-avatar  color="#212121" size="50" class="white--text">
              <v-icon color="white">mdi-account-tie-outline</v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title><b>{{ account.nome }}</b></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-row class="pa-2">
              <v-btn @click="aceitarFunc(account.id)" depressed small color="success">aceitar<v-icon color="white" right>mdi-account-check</v-icon></v-btn>
              <v-btn @click="rejeitarFunc(account.id)" class="ml-2" depressed small color="error"><v-icon color="white">mdi-close</v-icon></v-btn>
            </v-row>
          </v-list-item-action>
        </v-list-item>
        <div class="ma-3 ml-5 mt-10"><h4>Funcionários alocados</h4></div>
        <v-divider class="ma-3 ml-5 mb-0"></v-divider>
        <v-list-item class="ml-1" v-for="funcionario in funcionarios" :key="funcionario.id">
          <v-list-item-avatar>
            <v-avatar  color="#212121" size="50" class="white--text">
              <v-icon color="white">mdi-account-tie-outline</v-icon>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title><b>{{ funcionario.nome }}</b></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-row class="pa-2">
              <v-btn @click="dialogInfoUsers = false, dialogInfoFunc = true, buscarInfoFunc(funcionario.id)" depressed small color="info">Perfil<v-icon color="white" right>mdi-open-in-new</v-icon></v-btn>
              <v-btn @click="confirmRemoveFunc(funcionario.id)" class="ml-2" depressed small color="error"><v-icon color="white">mdi-account-remove</v-icon></v-btn>
            </v-row>
          </v-list-item-action>
        </v-list-item>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogInfoFunc" max-width="550">
      <v-card v-for="infoFunc in infosFunc" :key="infoFunc.id">
        <v-card-title class="primary white--text">
          <v-icon color="white" class="mr-2">mdi-account-tie-outline</v-icon>
          {{ infoFunc.nome }}
          <v-spacer></v-spacer>
          <v-icon @click="dialogInfoUsers = true, dialogInfoFunc = false" color="white" class="">mdi-arrow-left</v-icon>
        </v-card-title>
        <div class="pa-5">
          <div class="text-h6 info--text">Total de vendas: <span class="grey--text">{{ infoFuncVendas }}</span></div>
          <v-divider class="mt-3 mb-3"></v-divider>
          <div class="text-h6 green--text">Total de vendas em dinheiro: <span class="grey--text">R$ {{ valorVendasDoFunc.toFixed(2) }}</span></div>
        </div>
      </v-card>
    </v-dialog>
    <div class="">
      <v-snackbar class="mb-10" dark v-model="snackbarCopy">
        Código de solicitação copiado!
        <v-spacer></v-spacer>
        <template v-slot:action="{ attrs }">
          <v-btn color="info" text v-bind="attrs" @click="snackbarCopy = false">
            OK
          </v-btn>
        </template>
      </v-snackbar>
  </div>
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
import { doc, deleteDoc } from "firebase/firestore";
import Swal from 'sweetalert2'
import * as fb from '@/plugins/firebase'
import { sendPasswordResetEmail, getAuth, sendEmailVerification, updateEmail } from "firebase/auth";
export default {
    data () {
      return {
        snackbarCopy: false,
        uid: "",
        dialogInfoUsers: false,
        infoVendas: [],
        infoVendasProduto: [],
        infoVendasCopo: [],
        infosFunc: [],
        anoFiltro: "",
        mesFiltro: null,
        itemsMesFiltro:['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        excluirVenda: false,
        idvendaDelete: "",
        diaCheck: false,
        mesCheck: false,
        anoCheck: false,
        dataHoje: "",
        metaDia: 0,
        metaMes: 0,
        metaAno: 0,
        dbDia: 0,
        dbMes: 0,
        dbAno: 0,
        infoFuncVendas: 0,
        gradient: gradients[5],
        gradientDirection: 'top',
        gradients,
        dialogInfoVenda: false,
        dialogMetas: false,
        search: "",
        valorVendasHojeTabela: 0,
        valorVendasHoje:[],
        valorVendasTabela:[],
        valorVendasDaTabela: 0,
        valorVendasDoFunc: 0,
        valorVendasFunc: [],
        infos: [],
        Edits: [],
        accountsInv: [],
        funcionarios: [],
        dialogInfoFunc: false,
        dialogInfo: false,
        emailRec: false,
        emailRec2: false,
        emailRec3: false,
        BtnEmailVerificado: true,
        StkEmailverificado: false,
        disabledEdit: true,
        // tabela vendaahoje
        vendas: [],
        // grafico ultimas vendas
        value: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
          ],
        labels: [
          "DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"
        ],
        // infos tabela vendas
        headers: [
        {
          text: "Nome pedido",
          align: "start",
          sortable: false,
          value: "nome",
        },
        { text: "Data", value: "data", sortable: false},
        { text: "Horário", value: "hora", sortable: false },
        { text: "Valor (R$)", value: "valor" },
        { text: "Usuário", value: "user", sortable: false },
        { text: "ID", value: "idvenda", sortable: false },
        { text: "", value: "iconTable", sortable: false },
        ],
        desserts: [],
      }
    },
    mounted(){
      this.gerenciarUsers();
      this.buscarInfoEdit();
      this.buscarInfoUser();
      this.buscarProdutosHoje();
      this.buscarMetas();
      this.buscarVendasMetas();
      this.checkMetas();
      this.buscarVendasTabela();
      this.buscarDadosGrafico();
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
      async buscarInfoFunc(funcID){
        this.valorVendasDoFunc = 0
        this.infoFuncVendas = 0
        this.valorVendasFunc = []
        this.infosFunc = []
        const logInfoFunc = await fb.perfilCollection
        .where("idPerfil","==", funcID)
        .get();
        for (const doc of logInfoFunc.docs) {
          this.infosFunc.push({
            nome: doc.data().nome,
          })
          this.nomeFunc = doc.data().nome
        }

        const logInfoFuncVendas = await fb.comandasCollection
        .where("nome_user","==", this.nomeFunc)
        .where("estado", "==", "vendido")
        .get();
        for (const doc of logInfoFuncVendas.docs) {
          this.valorVendasFunc.push(doc.data().valor_comanda)
        }

        var somaTabelaFunc = 0;
            for(var i = 0; i < this.valorVendasFunc.length; i ++) {
                somaTabelaFunc += this.valorVendasFunc[i];
        }
        this.valorVendasDoFunc = somaTabelaFunc
        this.infoFuncVendas = this.valorVendasFunc.length
      },
      async confirmRemoveFunc(funcID){
        Swal.fire({
          title: 'Tem certeza que deseja remover este funcionário?',
          text: "",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, deletar!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.removeFunc(funcID)
          }
        })
      },
      async removeFunc(funcID){
        this.uid = fb.auth.currentUser.uid;
        await fb.perfilCollection.doc(funcID).update({
          conviteLoja: "",
          alocado: "",
        });
        this.gerenciarUsers();
      },
      async aceitarFunc(funcID){
        this.uid = fb.auth.currentUser.uid;
        await fb.perfilCollection.doc(funcID).update({
          conviteLoja: "aceito",
          alocado: this.uid,
        });
        this.gerenciarUsers();
      },
      async rejeitarFunc(funcID){
        await fb.perfilCollection.doc(funcID).update({
          conviteLoja: "",
        });
        this.gerenciarUsers();
      },
      async gerenciarUsers(){
        //buscar convites
        this.accountsInv = []
        const logAccountsInv = await fb.perfilCollection
        .where("conviteLoja","==",this.uid)
        .get();
        for (const doc of logAccountsInv.docs) {
          this.accountsInv.push({
            nome: doc.data().nome,
            id: doc.data().idPerfil
          })
        }

        //buscar funcionários
        this.funcionarios = []
        const logFuncionarios = await fb.perfilCollection
        .where("alocado","==",this.uid)
        .get();
        for (const doc of logFuncionarios.docs) {
          this.funcionarios.push({
            nome: doc.data().nome,
            id: doc.data().idPerfil
          })
        }
      },
      async test(){
        await navigator.clipboard.writeText(this.uid)
        this.snackbarCopy = true
      },
      async buscarDadosGrafico(){
        this.value = [];
        for(var i = 0; i < 7; i++) {
          const dados = await fb.comandasCollection
          .where("uid", "==", this.uid)
          .where("estado", "==", "vendido")
          .where("diaSemana", "==", i)
          .get();
          const uni = dados.docs.length
          this.value.push(uni)
        }

      },
      async buscarInfoVendas(idvenda){
        this.infoVendas = [];
        this.infoVendasProduto = [];
        this.infoVendasCopo = [];
        this.uid = fb.auth.currentUser.uid;
        const logInfoVendas = await fb.comandasCollection
        .where("uid","==",this.uid)
        .where("estado", "==", "vendido")
        .where("ID_comanda", "==", idvenda)
        .get();
        for (const doc of logInfoVendas.docs) {
          this.infoVendas.push({
            nome: doc.data().nome_comanda,
            valor: doc.data().valor_comanda,
            valorDesconto: doc.data().desconto,
            data: doc.data().data,
            hora: doc.data().horario,
            desc: doc.data().descricao_comanda
          })
        }

        const logInfoVendasProduto = await fb.produtosComandaCollection
        .where("uid","==",this.uid)
        .where("ID_comanda_produto", "==", idvenda)
        .get();
        for (const doc of logInfoVendasProduto.docs) {
          this.infoVendasProduto.push({
            nome: doc.data().nome_produto_comanda,
            valor: doc.data().preco_produto_comanda,
          })
        }

        const logInfoVendasCopo = await fb.coposComandaCollection
        .where("uid","==",this.uid)
        .where("ID_comanda_copo", "==", idvenda)
        .get();
        for (const doc of logInfoVendasCopo.docs) {
          this.infoVendasCopo.push({
            nome: doc.data().nome_copo_comanda,
            valor: doc.data().valor_copo_comanda,
          })
        }
      },

      // functions principais
      async filtrarTabela(){
        const mesFiltroReset = this.mesFiltro
        if(this.mesFiltro == "Janeiro"){this.mesFiltro = "01"}
        if(this.mesFiltro == "Fevereiro"){this.mesFiltro = "02"}
        if(this.mesFiltro == "Março"){this.mesFiltro = "03"}
        if(this.mesFiltro == "Abril"){this.mesFiltro = "04"}
        if(this.mesFiltro == "Maio"){this.mesFiltro = "05"}
        if(this.mesFiltro == "Junho"){this.mesFiltro = "06"}
        if(this.mesFiltro == "Julho"){this.mesFiltro = "07"}
        if(this.mesFiltro == "Agosto"){this.mesFiltro = "08"}
        if(this.mesFiltro == "Setembro"){this.mesFiltro = "09"}
        if(this.mesFiltro == "Outubro"){this.mesFiltro = "10"}
        if(this.mesFiltro == "Novembro"){this.mesFiltro = "11"}
        if(this.mesFiltro == "Dezembro"){this.mesFiltro = "12"}
        if(this.mesFiltro == null && this.anoFiltro == ""){
          Swal.fire(
              'Insira o mês ou ano para filtrar!',
              '',
              'info'
            )
        }
        else{
          if(this.mesFiltro == null){
            this.desserts = [];
            this.valorVendasTabela = [];
            this.uid = fb.auth.currentUser.uid;
            const logTabelaVendaFiltroAno = await fb.comandasCollection
            .where("uid","==",this.uid)
            .where("estado", "==", "vendido")
            .where("ano", "==", this.anoFiltro)
            .get();
            for (const doc of logTabelaVendaFiltroAno.docs) {
              this.desserts.push({
                nome: doc.data().nome_comanda,
                data: doc.data().data,
                valor: doc.data().valor_comanda,
                hora: doc.data().horario,
                idvenda: doc.data().ID_comanda
              })
              this.valorVendasTabela.push(doc.data().valor_comanda)
            }
            var somaTabelaAno = 0;
            for(var i = 0; i < this.valorVendasTabela.length; i++) {
                somaTabelaAno += this.valorVendasTabela[i];
            }
            this.valorVendasDaTabela = somaTabelaAno
          }
          if(this.anoFiltro == ""){
            this.desserts = [];
            this.valorVendasTabela = [];
            this.uid = fb.auth.currentUser.uid;
            const logTabelaVendaFiltroMes = await fb.comandasCollection
            .where("uid","==",this.uid)
            .where("estado", "==", "vendido")
            .where("mes", "==", this.mesFiltro)
            .get();
            for (const doc of logTabelaVendaFiltroMes.docs) {
              this.desserts.push({
                nome: doc.data().nome_comanda,
                data: doc.data().data,
                valor: doc.data().valor_comanda,
                hora: doc.data().horario,
                idvenda: doc.data().ID_comanda
              })
              this.valorVendasTabela.push(doc.data().valor_comanda)
            }
            var somaTabelaMes = 0;
            for(var i2 = 0; i2 < this.valorVendasTabela.length; i2 ++) {
                somaTabelaMes += this.valorVendasTabela[i2];
            }
            this.valorVendasDaTabela = somaTabelaMes
            this.mesFiltro = mesFiltroReset
            }

          if(this.mesFiltro != null && this.anoFiltro != ""){
            this.desserts = [];
            this.valorVendasTabela = [];
            this.uid = fb.auth.currentUser.uid;
            const logTabelaVendaFiltroAll = await fb.comandasCollection
            .where("uid","==",this.uid)
            .where("estado", "==", "vendido")
            .where("mes", "==", this.mesFiltro)
            .where("ano", "==", this.anoFiltro)
            .get();
            for (const doc of logTabelaVendaFiltroAll.docs) {
              this.desserts.push({
                nome: doc.data().nome_comanda,
                data: doc.data().data,
                valor: doc.data().valor_comanda,
                hora: doc.data().horario,
                idvenda: doc.data().ID_comanda
              })
              this.valorVendasTabela.push(doc.data().valor_comanda)
            }
            var somaTabelaAll = 0;
            for(var i3 = 0; i3 < this.valorVendasTabela.length; i3 ++) {
                somaTabelaAll += this.valorVendasTabela[i3];
            }
            this.valorVendasDaTabela = somaTabelaAll
            this.mesFiltro = mesFiltroReset
          }
            
        }
        
      },
      async buscarVendasTabela(){
        this.desserts = [];
        this.valorVendasTabela = []
        this.uid = fb.auth.currentUser.uid;
        const logTabelaVenda = await fb.comandasCollection
        .where("uid","==",this.uid)
        .where("estado", "==", "vendido")
        .get();
        for (const doc of logTabelaVenda.docs) {
          this.desserts.push({
            nome: doc.data().nome_comanda,
            data: doc.data().data,
            valor: doc.data().valor_comanda,
            hora: doc.data().horario,
            idvenda: doc.data().ID_comanda,
            user: doc.data().nome_user
          }),
          this.valorVendasTabela.push(doc.data().valor_comanda)
        }
        var somaTabela = 0;
        for(var i = 0; i < this.valorVendasTabela.length; i++) {
            somaTabela += this.valorVendasTabela[i];
        }
        this.valorVendasDaTabela = somaTabela
        this.mesFiltro = null
        this.anoFiltro = ""
      },
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
            nomeempresa: doc.data().nome,
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
            nome: doc.data().nome,
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
      async salvarInfoEdit(nome, id){
          await fb.perfilCollection.doc(id).update({
              nome: nome,
        });
          this.buscarInfoEdit();
          this.dialogInfo = false;
      },
      async buscarProdutosHoje(){
        this.uid = fb.auth.currentUser.uid;
        this.vendas = []
        this.valorVendasHoje = []
        var dataAtual = new Date();
        var dia = dataAtual.getDate();
        var mes = (dataAtual.getMonth() + 1);
        var ano = dataAtual.getFullYear();
        if(dia < 10){dia = "0"+dia}
        if(mes < 10){mes = "0"+mes}
        var data = dia + "/" + mes + "/" + ano
        this.dataHoje = data
        const logVendaHoje = await fb.comandasCollection
        .where("uid","==",this.uid)
        .where("data", "==", data)
        .where("estado", "==", "vendido")
        .get();
        for (const doc of logVendaHoje.docs) {
          this.vendas.push({
            nome: doc.data().nome_comanda,
            valor: doc.data().valor_comanda,
            horario: doc.data().horario
          }),
          this.valorVendasHoje.push(doc.data().valor_comanda)
        }
        var somaHoje = 0;
        for(var i = 0; i < this.valorVendasHoje.length; i++) {
            somaHoje += this.valorVendasHoje[i];
        }
        this.valorVendasHojeTabela = somaHoje
      },
      async buscarMetas(){
        this.uid = fb.auth.currentUser.uid;
        const logMetas = await fb.perfilCollection
        .where("owner","==",this.uid)
        .get();
        for (const doc of logMetas.docs) {
          this.metaDia = doc.data().MetaDia
          this.metaMes = doc.data().MetaMes
          this.metaAno = doc.data().MetaAno
        }

      },
      async salvarMetas(){
        this.uid = fb.auth.currentUser.uid;
        const logMetasSave = await fb.perfilCollection
        .where("owner","==",this.uid)
        .get();
        for (const doc of logMetasSave.docs) {
          var idPerfil = doc.data().idPerfil
        }
        await fb.perfilCollection.doc(idPerfil).update({
            MetaDia: this.metaDia,
            MetaMes: this.metaMes,
            MetaAno: this.metaAno
          });
        this.dialogMetas = false
        this.buscarMetas();
        this.checkMetas();
      },
      async buscarVendasMetas(){
        var dataAtual = new Date();
        var mes = (dataAtual.getMonth() + 1);
        var ano = dataAtual.getFullYear();

        //vendas do dia
        this.uid = fb.auth.currentUser.uid;
        const vendasHoje = await fb.comandasCollection
        .where("uid", "==", this.uid)
        .where("estado", "==", "vendido")
        .where("data", "==", this.dataHoje)
        .get();
        const totalVendaHoje = vendasHoje.docs.length
        this.dbDia = totalVendaHoje

        //vendas do mes
        const vendasDoMes = await fb.comandasCollection
        .where("uid", "==", this.uid)
        .where("estado", "==", "vendido")
        .where("mes", "==", mes.toString())
        .where("ano", "==", ano.toString())
        .get();
        const totalVendaDoMes = vendasDoMes.docs.length
        this.dbMes = totalVendaDoMes

        //vendas do ano
        const vendasDoAno = await fb.comandasCollection
        .where("uid", "==", this.uid)
        .where("estado", "==", "vendido")
        .where("ano", "==", ano.toString())
        .get();
        const totalVendaDoAno = vendasDoAno.docs.length
        this.dbAno = totalVendaDoAno
        this.checkMetas();
      },
      async checkMetas(){
        //dia
        if(this.valueDia >= 100){
          this.diaCheck = true
        }
        else{
          this.diaCheck = false
        }
        //mes
        if(this.valueMes >= 100){
          this.mesCheck = true
        }
        else{
          this.mesCheck = false
        }
        //ano
        if(this.valueAno >= 100){ 
          this.anoCheck = true
        }
        else{
          this.anoCheck = false
        }
        
      },
      async deletarVenda(){
            await deleteDoc(doc(fb.comandasCollection, this.idvendaDelete));
            var deleteProdutos = fb.produtosComandaCollection.where("ID_comanda_produto", "==", this.idvendaDelete);
            deleteProdutos.get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                doc.ref.delete();
              });
            });
            var deleteCopos = fb.coposComandaCollection.where("ID_comanda_copo", "==", this.idvendaDelete);
            deleteCopos.get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                doc.ref.delete();
              });
            });
            var deleteAdicionais = fb.adicionaisCopoCollection.where("ID_comanda_copo", "==", this.idvendaDelete);
            deleteAdicionais.get().then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                doc.ref.delete();
              });
            });
            Swal.fire(
              'Venda deletada!',
              '',
              'info'
            )
            this.buscarProdutosHoje();
            this.buscarMetas();
            this.buscarVendasMetas();
            this.checkMetas();
            this.buscarVendasTabela();
            this.buscarDadosGrafico();
          }
    },
}
</script>

<style>
body {
  font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif; 
}
</style>
