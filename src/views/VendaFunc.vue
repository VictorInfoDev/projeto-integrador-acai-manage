<template>
    <v-app :style="{ 'background-image': 'url()' }">
      <div class="pa-5">
        <div style="border-left-style:solid;border-left-color:#4CAF50;border-left-width:8px;padding-left:10px;"
          class="text-h4 my-8">Gerencie suas vendas aqui!</div>
        <v-alert outlined type="info" color="success">
          Clique em <v-icon color="success">mdi-plus-circle</v-icon> para criar seus pedidos ou realizar uma venda.
        </v-alert>
  
        <!--Quadro de comandas-->
        <div class="text-h2 success--text mt-10">Comandas</div>
        <v-divider class="ma-5 ml-0"></v-divider>
        <v-row>
          <v-col cols="12" sm="2" v-for="comanda in comandas" :key="comanda.id" @click="editarComanda(comanda.id)">
            <v-hover v-slot="{ hover }">
              <v-card height="" width="" class="" :elevation="hover ? 12 : 5" :class="{ 'on-hover': hover }"
                @click="test()">
                <v-expand-transition>
                  <div v-if="hover" class="d-flex transition-fast-in-fast white v-card--reveal text-h4 success--text"
                    style="height: 100%;">
                    Abrir
                  </div>
                </v-expand-transition>
                <v-card-title class="success white--text">
                  {{ comanda.nome }}
                  <v-spacer></v-spacer>
                  <v-icon left color="white">
                    {{ comanda.prioridade }}
                  </v-icon>
                </v-card-title>
                <v-card-text class="mt-3">
                  <b>Horário de criação:</b>  {{ comanda.hora }}<br>
                  <b>Data de criação:</b>  {{ comanda.data }}
                </v-card-text>
              </v-card>
            </v-hover>
  
          </v-col>
        </v-row>
      </div>
      <!--Botão do dialog venda-->
      <v-btn color="success" fixed fab large dark bottom right class="ma-5"
        @click="criarComanda(), buscarProdutosVenda()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
  
      <!-- Dialog Venda-->
      <v-dialog v-model="dialogVenda" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="success" tile>
            <v-btn v-if="editComanda" icon dark @click="excluirComandaLog(), dialogVenda = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ texttitle }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-checkbox v-model="comandaPrioridade" label="Prioridade" color="orange" value="mdi-star" hide-details
              class="mr-5">
            </v-checkbox>
            <v-toolbar-items>
              <v-btn dark text @click="salvarComanda()">
                {{ textbtn }}
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <!--area de trabalho comandas-->
          <v-row>
            <v-col cols="12" sm="6">
              <v-card elevation="0" class="ma-5">
                <div>
                  <h2>Informações</h2>
                </div>
                <v-text-field v-model="nomeComanda" label="Nome da comanda" color="success" maxlength="25" counter>
                </v-text-field>
                <v-textarea v-model="descricaoComanda" class="mt-3" solo name="input-7-4" label="Descrição do pedido"
                  maxlength="250" counter></v-textarea>
                <div>
                  <h2>Produtos</h2>
                </div>
                <v-simple-table fixed-header height="300px">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Nome
                        </th>
                        <th class="text-left">
                          Preço
                        </th>
                        <th>
  
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="produtoVenda in produtosVenda" :key="produtoVenda.id">
                        <td>{{ produtoVenda.nome }}</td>
                        <td>R$ {{ produtoVenda.preco }}</td>
                        <td>
                          <v-icon class="" color="success"
                            @click="addProdutoPedido(produtoVenda.nome, produtoVenda.preco)">
                            mdi-plus
                          </v-icon>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="ma-5">
                <h2>Copos</h2>
              </div>
              <v-card outlined class="ma-5 pa-3">
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-card @click="addCopoComanda()">
                      <v-card-title class="success white--text">
                        <v-icon color="white" class="mr-2">mdi-plus</v-icon>Adicionar copo
                      </v-card-title>
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="4" v-for="copo in copos" :key="copo.id">
                    <v-card>
                      <v-card-title class="purple darken-3 white--text">
                        <v-icon v-model="copo.valor" class="mr-2" color="white">mdi-cup-outline</v-icon>
                        {{ copo.nome }}
                        <v-spacer></v-spacer>
                        <v-icon @click="excluirCopoComandaQuadro(copo.id, copo.valor)" color="white">mdi-close</v-icon>
                      </v-card-title>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title><b>Copo:</b> {{ copo.tipo }}</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-content>
                          <v-list-item-title><b>Valor:</b> <span class="success--text">R$ {{ copo.valor.toFixed(2)
                          }}</span></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider></v-divider>
  
                      <div class="ma-4 mt-0">
                        <div v-for="copoItem in coposItems" :key="copoItem.id">
                          <div v-if="copo.id == copoItem.id">
                            <div class="mb-2"><b>{{ copoItem.classe }}:</b> {{ copoItem.adicional }}</div>
                          </div>
                        </div>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
              <div class="ma-5 mb-0">
                <h2>Produtos adicionados</h2>
              </div>
              <v-list class="">
                <v-list-item-group color="primary">
                  <v-list-item v-for="produtoComanda in produtosComandas" :key="produtoComanda.id" color="success">
                    <v-list-item-icon>
                      <v-icon @click="deletarProdutoComanda(produtoComanda.id, produtoComanda.preco)">mdi-close</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ produtoComanda.nome }}: <span class="success--text">R$ {{ produtoComanda.preco
                      }}</span></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-divider class="ma-5 mt-10"></v-divider>
              <div class="ml-5">
                <h1>Valor total</h1>
              </div>
              <div class="ml-5"><span class="success--text">
                  <h2>R$ {{ infos.valorTotal.toFixed(2) }}</h2>
                </span></div>
              <v-text-field v-model="valorDesconto" class="ma-5 mt-2 mb-0" type="number" prefix="R$" color="warning"
                :disabled="descontoValid" outlined label="Desconto" append-icon="mdi-send"
                @click:append="descontoValorComanda()"></v-text-field>
              <v-row class="ma-5 mt-1">
                  <v-btn outlined class="warning white--text mr-2 mb-2" :disabled="!descontoValid" @click="resetarDesconto()">
                    Resetar desconto
                    <v-icon class="">mdi-replay</v-icon>
                  </v-btn>
                  <v-btn class="error mr-2 mb-2" v-if="!editComanda" @click="snackbarDeleteComanda = true">
                    excluir comanda
                  </v-btn>
                  <v-btn class="success" v-if="!editComanda" @click="snackbarVenda = true">
                    finalizar venda
                  </v-btn>
              </v-row>
            </v-col>
          </v-row>
          <div class="text-center ma-2">
            <v-snackbar class="mb-10" dark v-model="snackbarInvalidCopo">
              Nenhum copo registrado!
              <v-spacer></v-spacer>
              <template v-slot:action="{ attrs }">
                <v-btn color="success" text v-bind="attrs" @click="snackbarInvalidCopo = false">
                  OK
                </v-btn>
              </template>
            </v-snackbar>
          </div>
          <div class="text-center ma-2">
            <v-snackbar class="mb-10" dark v-model="snackbarInvalidVenda">
              Nome da comanda nulo ou produtos insuficientes!
              <v-spacer></v-spacer>
              <template v-slot:action="{ attrs }">
                <v-btn color="success" text v-bind="attrs" @click="snackbarInvalidVenda = false">
                  OK
                </v-btn>
              </template>
            </v-snackbar>
            <v-snackbar class="mb-10" dark v-model="snackbarDeleteComanda">
              Deseja excluir a comanda?
              <v-spacer></v-spacer>
              <template v-slot:action="{ attrs }">
                <v-btn class="" text v-bind="attrs" @click="snackbarDeleteComanda = false">
                  Cancelar
                </v-btn>
                <v-btn color="error" text v-bind="attrs" @click="snackbarDeleteComanda = false, excluirComandaLog()">
                  Sim
                </v-btn>
              </template>
            </v-snackbar>
            <v-snackbar class="mb-10" dark v-model="snackbarVenda">
              Deseja finalizar a venda?
              <v-spacer></v-spacer>
              <template v-slot:action="{ attrs }">
                <v-btn class="" text v-bind="attrs" @click="snackbarVenda = false">
                  Cancelar
                </v-btn>
                <v-btn color="success" text v-bind="attrs" @click="snackbarVenda = false, concluirVenda()">
                  Sim
                </v-btn>
              </template>
            </v-snackbar>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogAddCopo" max-width="700" persistent>
        <v-card>
          <v-card-title class="purple darken-3 white--text">
            Criando copo...
            <v-spacer></v-spacer>
            <div class="warning--text mr-3">R$ {{ valorCopoComanda.toFixed(2) }}</div>
            <v-icon color="white" @click="dialogAddCopo = false, excluirCopoComanda()">mdi-close</v-icon>
          </v-card-title>
          <v-stepper v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1" color="purple darken-3">
              Copo
              <small>Escolha o tamanho do copo</small>
            </v-stepper-step>
            <v-stepper-content step="1">
              <v-card class="ml-3" elevation="0">
                <v-radio-group v-model="radioGroupValue">
                  <v-row>
                    <v-col cols="12" sm="4" v-for="copo in coposRadio" :key="copo.id">
                      <v-radio @click="proxBtnCopo = false" color="purple darken-3" :label="copo.nome" :value="copo.id">
                      </v-radio>
                    </v-col>
                  </v-row>
                </v-radio-group>
              </v-card>
              <v-btn color="purple darken-3 white--text" @click="addValorCopo(), e6 = 2" :disabled="proxBtnCopo">
                Continuar
              </v-btn>
            </v-stepper-content>
  
            <v-stepper-step color="purple darken-3" :complete="e6 > 2" step="2">
              Adicionais
              <small>Escolha os adicionais </small>
            </v-stepper-step>
  
            <v-stepper-content step="2">
              <v-card class="mb-3">
                <v-tabs background-color="purple darken-3" center-active dark>
                  <v-tab v-for="classeCopoVenda in classesCopoVenda" :key="classeCopoVenda.id"
                    @click="buscarProdutoClass(classeCopoVenda.nome)">{{ classeCopoVenda.nome }}
                  </v-tab>
                </v-tabs>
                <v-list-item class="purple darken-3">
                  <v-list-item-title class="white--text">
                    <v-icon class="mr-2" color="white">mdi-information</v-icon>Escolha uma classificação de adicionais
                    acima, caso não tenha registre uma.
                  </v-list-item-title>
                </v-list-item>
                <v-list-item v-for="adicional in adicionais" :key="adicional.classe">
                  <v-list-item-content>
                    <v-list-item-title><b>{{ adicional.nome }}:</b> <span class="success--text">R${{
                        adicional.valor.toFixed(2)
                    }}</span> </v-list-item-title>
  
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-chip class="success"
                        @click="addAdicionalCopo(adicional.classe, adicional.nome, adicional.valor)">
                        <v-icon color="">mdi-plus</v-icon>
                      </v-chip>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-card>
              <v-card class="mt-3 mb-3" outlined>
                <v-card-title>
                  <font color="#6200EA">Adicionais</font>
                </v-card-title>
                <v-divider></v-divider>
                <v-list-item v-for="adicionalCopo in adicionaisCopo" :key="adicionalCopo.id">
                  <v-list-item-content>
                    <v-list-item-title><b>{{ adicionalCopo.classe }}:</b> {{ adicionalCopo.nome }} <span
                        class="success--text">R${{ adicionalCopo.valor.toFixed(2) }}</span> </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn icon>
                      <v-icon color="error" @click="excluirAdicionalCopo(adicionalCopo.id, adicionalCopo.valor)">mdi-close
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-card>
              <v-btn color="purple darken-3 white--text" @click="e6 = 3">
                Continuar
              </v-btn>
              <v-btn text @click="resetCopo(), e6 = 1, proxBtnCopo = true">
                Voltar
              </v-btn>
            </v-stepper-content>
  
            <v-stepper-step color="purple darken-3" :complete="e6 > 3" step="3">
              Complemento
            </v-stepper-step>
  
            <v-stepper-content step="3">
              <v-card elevation="0">
                <div>
                  <h4>Copo aberto ou fechado?</h4>
                </div>
                <v-radio-group v-model="copoComplemento" column class="ml-2">
                  <v-radio label="Aberto" color="purple darken-3" value="Aberto"></v-radio>
                  <v-radio label="Fechado" color="purple darken-3" value="Fechado"></v-radio>
                </v-radio-group>
              </v-card>
              <v-btn color="purple darken-3 white--text" @click="salvarCopoComanda(), e6 = 4">
                Finalizar
              </v-btn>
              <v-btn text @click="e6 = 2">
                Voltar
              </v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-card>
      </v-dialog>
      <div class="text-center ma-2">
        <v-snackbar class="mb-10" dark v-model="snackbarAlertVenda">
          Você não tem produtos registrados!
          <v-spacer></v-spacer>
          <template v-slot:action="{ attrs }">
            <v-btn color="success" text v-bind="attrs" @click="snackbarAlertVenda = false">
              OK
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-app>
  </template>
  
  <script>
  //import { db, doc, setDoc } from "firebase/firestore";
  import Swal from 'sweetalert2'
  import { doc, deleteDoc } from "firebase/firestore";
  import * as fb from '@/plugins/firebase'
  export default {
    data() {
      return {
        editComanda: true,
        texttitle: "Criação da comanda",
        textbtn: "Criar",
        validnome: "null",
        snackbarDeleteComanda: false,
        snackbarInvalidCopo: false,
        snackbarAlertVenda: false,
        snackbarInvalidVenda: false,
        snackbarVenda: false,
        comandaValid: "",
        nomeComanda: "",
        descricaoComanda: "",
        copoComplemento: "Aberto",
        proxBtnCopo: true,
        classeProdutoAd: "",
        valorCancelarCopo: null,
        radioGroupValue: "",
        valorCopoComanda: 0,
        e6: 1,
        descontoValid: false,
        valorDesconto: null,
        infos: { valorTotal: 0 },
        idCopoComandaLog: "",
        idComandaLog: "",
        comandaPrioridade: "",
        dialogAddCopo: false,
        dialogVenda: false,
        adicionaisCopo: [],
        adicionais: [],
        classesCopoVenda: [],
        produtosVenda: [],
        produtosComandas: [],
        coposRadio: [],
        copos: [],
        coposItems: [],
        comandas: []
      }
    },
    mounted() {
      this.buscarProdutosVenda();
      this.buscarComandas();
      this.buscarCodLoja();
    },
    methods: {
      async buscarCodLoja(){
                
      },
      async buscarProdutosVenda() {
        this.uid = fb.auth.currentUser.uid;
        this.produtosVenda = [];
        const logProdutoVenda = await fb.produtosCollection
          .where("uid", "==", this.uid)
          .where("classe", "==", "Produtos")
          .get();
        for (const doc of logProdutoVenda.docs) {
          this.produtosVenda.push({
            nome: doc.data().produto,
            preco: doc.data().valor,
            id: doc.data().produtoID,
          });
        }
      },
      async criarComanda() {
        this.dialogVenda = false
        this.uid = fb.auth.currentUser.uid;
        const produtosDocsCollecion = await fb.produtosCollection
          .where("uid", "==", this.uid)
          .get();
        const tamanhoProdutosDocs = produtosDocsCollecion.docs.length
        if (tamanhoProdutosDocs == 0) {
          this.snackbarAlertVenda = true
        }
        else {
          this.dialogVenda = true
          this.editComanda = true
          this.textbtn = "Criar"
          this.texttitle = "Criação da comanda"
          var dataAtual = new Date();
          var horas = dataAtual.getHours();
          var minutos = dataAtual.getMinutes();
          var dia = dataAtual.getDate();
          var mes = (dataAtual.getMonth() + 1);
          var ano = dataAtual.getFullYear();
          if(dia < 10){dia = "0"+dia}
          if(mes < 10){mes = "0"+mes}
          if(horas < 10){horas = "0"+horas}
          if(minutos < 10){minutos = "0"+minutos}
          var horario = horas + ":" + minutos
          var data = dia + "/" + mes + "/" + ano
          var dateWeek = new Date(Date.now());
          var weekday = dateWeek.getDay();
          const res = await fb.comandasCollection.add({
            uid: this.uid+"invalidComanda",
            data: data,
            horario: horario,
            estado:"edit",
            dia: dia.toString(),
            mes: mes.toString(),
            ano: ano.toString(),
            diaSemana: weekday,
          });
          const idComanda = res.id;
          await fb.comandasCollection.doc(idComanda).update({
            ID_comanda: idComanda,
          });
          this.idComandaLog = idComanda
          this.buscarCoposComanda();
          this.buscarAdicionaisCopoComanda();
          this.buscarProdutoComanda();
          this.infos.valorTotal = 0
          this.nomeComanda = ""
          this.descricaoComanda = ""
          this.comandaPrioridade = ""
          this.comandaValid = true
          this.snackbarInvalidVenda = false
          this.snackbarInvalidCopo = false
          this.valorDesconto = 0
          this.descontoValid = false
          this.snackbarDeleteComanda = false
          this.snackbarVenda = false
        }
      },
      async excluirComandaLog() {
        await deleteDoc(doc(fb.comandasCollection, this.idComandaLog));
        var deleteProdutos = fb.produtosComandaCollection.where("ID_comanda_produto", "==", this.idComandaLog);
        deleteProdutos.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
        });
        var deleteCopos = fb.coposComandaCollection.where("ID_comanda_copo", "==", this.idComandaLog);
        deleteCopos.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
        });
        var deleteAdicionais = fb.adicionaisCopoCollection.where("ID_comanda_copo", "==", this.idComandaLog);
        deleteAdicionais.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
        });
        this.dialogVenda = false
        this.buscarComandas();
        Swal.fire(
          'Comanda cancelada!',
          '',
          'info'
        )
      },
      async addProdutoPedido(nome, preco) {
        this.uid = fb.auth.currentUser.uid;
        const res = await fb.produtosComandaCollection.add({
          uid: this.uid,
          nome_produto_comanda: nome,
          preco_produto_comanda: preco,
          ID_comanda_produto: this.idComandaLog
        });
        const idProdutoComanda = res.id;
        await fb.produtosComandaCollection.doc(idProdutoComanda).update({
          ID_produto_comanda: idProdutoComanda,
        });
        this.buscarProdutoComanda();
        this.infos.valorTotal += preco
        this.comandaValidFunction();
      },
      async buscarProdutoComanda() {
        this.uid = fb.auth.currentUser.uid;
        this.produtosComandas = [];
        const logProdutoComanda = await fb.produtosComandaCollection
          .where("uid", "==", this.uid)
          .where("ID_comanda_produto", "==", this.idComandaLog)
          .get();
        for (const doc of logProdutoComanda.docs) {
          this.produtosComandas.push({
            nome: doc.data().nome_produto_comanda,
            preco: doc.data().preco_produto_comanda,
            id: doc.data().ID_produto_comanda,
          });
        }
      },
      async deletarProdutoComanda(idDeleteProduto, preco) {
        await deleteDoc(doc(fb.produtosComandaCollection, idDeleteProduto));
        this.buscarProdutoComanda();
        if (this.infos.valorTotal - preco < 0) {
          this.infos.valorTotal = 0
        }
        else {
          this.infos.valorTotal -= preco
        }
        this.comandaValidFunction();
      },
      async descontoValorComanda() {
        if (this.infos.valorTotal - this.valorDesconto < 0) {
          this.infos.valorTotal = 0
        }
        else {
          this.infos.valorTotal -= this.valorDesconto
          this.descontoValid = true
        }
      },
      async resetarDesconto() {
        var numberDesconto = parseFloat(this.valorDesconto)
        this.infos.valorTotal += numberDesconto
        this.valorDesconto = 0
        this.descontoValid = false
      },
      async addCopoComanda() {
        this.dialogAddCopo = false
        this.uid = fb.auth.currentUser.uid;
        const copoDocs = await fb.produtosCollection
          .where("uid", "==", this.uid)
          .where("classe", "==", "Copos")
          .get();
        const tamanhoDocsCopo = copoDocs.docs.length
        if (tamanhoDocsCopo == 0) {
          this.snackbarInvalidCopo = true
        }
        else {
          this.dialogAddCopo = true
          const res = await fb.coposComandaCollection.add({
            uid: this.uid,
            ID_comanda_copo: this.idComandaLog
          });
          const idCopo = res.id;
          await fb.coposComandaCollection.doc(idCopo).update({
            ID_copo_comanda: idCopo,
          });
          this.valorCopoComanda = 0
          this.e6 = 1
          this.proxBtnCopo = true
          this.idCopoComandaLog = idCopo
          this.buscarCoposAddComanda();
          this.buscarClassesAdicionais();
          this.buscarAdicionais();
          this.buscarAdicionaisCopo();
          this.comandaValidFunction();
        }
      },
      async buscarCoposAddComanda() {
        this.uid = fb.auth.currentUser.uid;
        this.coposRadio = [];
        const logCopoRadio = await fb.produtosCollection
          .where("uid", "==", this.uid)
          .where("classe", "==", "Copos")
          .get();
        for (const doc of logCopoRadio.docs) {
          this.coposRadio.push({
            nome: doc.data().produto,
            valor: doc.data().valor,
            id: doc.data().produtoID,
          });
        }
      },
      async addValorCopo() {
        this.uid = fb.auth.currentUser.uid;
        const logBuscaRadio = await fb.produtosCollection
          .where("uid", "==", this.uid)
          .where("produtoID", "==", this.radioGroupValue)
          .get();
        for (const doc of logBuscaRadio.docs) {
          this.valorCancelarCopo = doc.data().valor
          this.valorCopoComanda += doc.data().valor
        }
      },
      async resetCopo() {
        this.valorCopoComanda -= this.valorCancelarCopo
        this.radioGroupValue = 0
        this.valorCancelarCopo = 0
      },
      async buscarClassesAdicionais() {
        this.uid = fb.auth.currentUser.uid;
        this.classesCopoVenda = []
        const logClass = await fb.classeCollection
          .where("uid", "==", this.uid)
          .where("adicional", "==", "sim")
          .get();
        for (const doc of logClass.docs) {
          this.classesCopoVenda.push({
            nome: doc.data().classeSelect,
            id: doc.data().classeID,
          });
        }
  
      },
      async buscarAdicionais() {
        this.uid = fb.auth.currentUser.uid;
        this.adicionais = []
        const logClassAd = await fb.produtosCollection
          .where("uid", "==", this.uid)
          .where("classe", "==", this.classeProdutoAd)
          .get();
        for (const doc of logClassAd.docs) {
          this.adicionais.push({
            classe: doc.data().classe,
            nome: doc.data().produto,
            id: doc.data().produtoID,
            valor: doc.data().valor
          });
        }
      },
      async buscarProdutoClass(classe) {
        this.classeProdutoAd = classe
        this.buscarAdicionais();
      },
      async addAdicionalCopo(classe, nome, valor) {
        this.uid = fb.auth.currentUser.uid;
        const res = await fb.adicionaisCopoCollection.add({
          uid: this.uid,
          nome_adicional_copo: nome,
          classe_adicional_copo: classe,
          valor_adicional_copo: valor,
          ID_copo_comanda: this.idCopoComandaLog,
          ID_comanda_copo: this.idComandaLog,
        });
        const idAdicional = res.id;
        await fb.adicionaisCopoCollection.doc(idAdicional).update({
          ID_adicional_copo: idAdicional,
        });
        this.buscarAdicionaisCopo();
        this.valorCopoComanda += valor
  
      },
      async buscarAdicionaisCopo() {
        this.uid = fb.auth.currentUser.uid;
        this.adicionaisCopo = []
        const logAdCopo = await fb.adicionaisCopoCollection
          .where("uid", "==", this.uid)
          .where("ID_copo_comanda", "==", this.idCopoComandaLog)
          .get();
        for (const doc of logAdCopo.docs) {
          this.adicionaisCopo.push({
            classe: doc.data().classe_adicional_copo,
            nome: doc.data().nome_adicional_copo,
            id: doc.data().ID_adicional_copo,
            valor: doc.data().valor_adicional_copo
          });
        }
      },
      async excluirAdicionalCopo(idAdicional, valor) {
        await deleteDoc(doc(fb.adicionaisCopoCollection, idAdicional));
        this.valorCopoComanda -= valor
        this.buscarAdicionaisCopo();
  
      },
      async excluirCopoComanda() {
        await deleteDoc(doc(fb.coposComandaCollection, this.idCopoComandaLog));
        var deleteItems = fb.adicionaisCopoCollection.where("ID_copo_comanda", "==", this.idCopoComandaLog);
        deleteItems.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
        });
        this.idCopoComandaLog = ""
        this.comandaValidFunction();
      },
      async salvarCopoComanda() {
        this.uid = fb.auth.currentUser.uid;
        const logPr = await fb.produtosCollection
          .where("uid", "==", this.uid)
          .where("produtoID", "==", this.radioGroupValue)
          .get();
        for (const doc of logPr.docs) {
          var nomeCopo = doc.data().produto
        }
        await fb.coposComandaCollection.doc(this.idCopoComandaLog).update({
          nome_copo_comanda: nomeCopo,
          tipo_copo_comanda: this.copoComplemento,
          valor_copo_comanda: this.valorCopoComanda
        });
        this.infos.valorTotal += this.valorCopoComanda
        this.dialogAddCopo = false
        this.valorCopoComanda = 0
        this.buscarCoposComanda();
        this.buscarAdicionaisCopoComanda();
      },
      async buscarCoposComanda() {
        this.uid = fb.auth.currentUser.uid;
        this.copos = []
        const logBsCopo = await fb.coposComandaCollection
          .where("uid", "==", this.uid)
          .where("ID_comanda_copo", "==", this.idComandaLog)
          .get();
        for (const doc of logBsCopo.docs) {
          this.copos.push({
            nome: doc.data().nome_copo_comanda,
            tipo: doc.data().tipo_copo_comanda,
            valor: doc.data().valor_copo_comanda,
            id: doc.data().ID_copo_comanda
          });
        }
      },
      async buscarAdicionaisCopoComanda() {
        this.uid = fb.auth.currentUser.uid;
        this.coposItems = []
        const logBsCopoAd = await fb.adicionaisCopoCollection
          .where("uid", "==", this.uid)
          .where("ID_comanda_copo", "==", this.idComandaLog)
          .get();
        for (const doc of logBsCopoAd.docs) {
          this.coposItems.push({
            classe: doc.data().classe_adicional_copo,
            adicional: doc.data().nome_adicional_copo,
            id: doc.data().ID_copo_comanda
          });
        }
      },
      async excluirCopoComandaQuadro(idCopoQuadro, valor) {
        await deleteDoc(doc(fb.coposComandaCollection, idCopoQuadro));
        var deleteCopoQuadro = fb.adicionaisCopoCollection.where("ID_copo_comanda", "==", idCopoQuadro);
        deleteCopoQuadro.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
        });
        this.buscarCoposComanda();
        this.infos.valorTotal -= valor
      },
      async salvarComanda() {
        this.uid = fb.auth.currentUser.uid;
        const produtoDocs = await fb.produtosComandaCollection
          .where("uid", "==", this.uid)
          .where("ID_comanda_produto", "==", this.idComandaLog)
          .get();
        const tamanhoDocsProdutoComanda = produtoDocs.docs.length
  
        const coposDocs = await fb.coposComandaCollection
          .where("uid", "==", this.uid)
          .where("ID_comanda_copo", "==", this.idComandaLog)
          .get();
        const tamanhoDocsCoposComanda = coposDocs.docs.length
  
        if (tamanhoDocsProdutoComanda == 0 && tamanhoDocsCoposComanda == 0) {
          this.snackbarInvalidVenda = true
        }
        else {
          if (this.nomeComanda == "") {
            this.snackbarInvalidVenda = true
          }
          else {
            this.comandaValid = false
            var numberDesconto = parseFloat(this.valorDesconto)
            if (this.descricaoComanda == "") {
              this.descricaoComanda = "Nenhuma descrição definida"
            }
            this.uid = fb.auth.currentUser.uid;
            await fb.comandasCollection.doc(this.idComandaLog).update({
              uid: this.uid,
              nome_comanda: this.nomeComanda,
              descricao_comanda: this.descricaoComanda,
              valor_comanda: this.infos.valorTotal,
              prioridade: this.comandaPrioridade,
              desconto: numberDesconto,
              estado: "comanda",
            });
            this.dialogVenda = false
            this.buscarComandas();
          }
        }
  
      },
      async buscarComandas() {
        this.uid = fb.auth.currentUser.uid;
        this.comandas = []
        const logComanda = await fb.comandasCollection
          .where("uid", "==", this.uid)
          .where("estado", "==", "comanda")
          .get();
        for (const doc of logComanda.docs) {
          this.comandas.push({
            id: doc.data().ID_comanda,
            nome: doc.data().nome_comanda,
            prioridade: doc.data().prioridade,
            data: doc.data().data,
            hora: doc.data().horario,
          });
        }
      },
      async editarComanda(idcomanda){
        this.uid = fb.auth.currentUser.uid;
        this.texttitle = "Edição da comanda"
        this.editComanda = false
        this.textbtn = "Salvar"
        this.idComandaLog = idcomanda
        this.dialogVenda = true
        this.buscarCoposComanda();
        this.buscarAdicionaisCopoComanda();
        this.buscarProdutoComanda();
        const logComanda = await fb.comandasCollection
          .where("uid", "==", this.uid)
          .where("ID_comanda", "==", idcomanda)
          .get();
        for (const doc of logComanda.docs) {
            this.nomeComanda = doc.data().nome_comanda,
            this.comandaPrioridade = doc.data().prioridade,
            this.descricaoComanda = doc.data().descricao_comanda,
            this.infos.valorTotal = doc.data().valor_comanda
            this.valorDesconto = doc.data().desconto
        }
        this.comandaValid = true
        this.snackbarInvalidVenda = false
        this.snackbarInvalidCopo = false
        this.snackbarDeleteComanda = false
        this.snackbarVenda = false
        this.descontoValid = true
      },
      async concluirVenda(){
        this.uid = fb.auth.currentUser.uid;
        const produtoDocs = await fb.produtosComandaCollection
          .where("uid", "==", this.uid)
          .where("ID_comanda_produto", "==", this.idComandaLog)
          .get();
        const tamanhoDocsProdutoComanda = produtoDocs.docs.length
  
        const coposDocs = await fb.coposComandaCollection
          .where("uid", "==", this.uid)
          .where("ID_comanda_copo", "==", this.idComandaLog)
          .get();
        const tamanhoDocsCoposComanda = coposDocs.docs.length
  
        if (tamanhoDocsProdutoComanda == 0 && tamanhoDocsCoposComanda == 0) {
          this.snackbarInvalidVenda = true
        }
        else {
          if (this.nomeComanda == "") {
            this.snackbarInvalidVenda = true
          }
          else {
            this.comandaValid = false
            var numberDesconto = parseFloat(this.valorDesconto)
            if (this.descricaoComanda == "") {
              this.descricaoComanda = "Nenhuma descrição definida"
            }
            this.uid = fb.auth.currentUser.uid;
            await fb.comandasCollection.doc(this.idComandaLog).update({
              uid: this.uid,
              nome_comanda: this.nomeComanda,
              descricao_comanda: this.descricaoComanda,
              valor_comanda: this.infos.valorTotal,
              prioridade: this.comandaPrioridade,
              desconto: numberDesconto,
              estado: "vendido",
            });
            this.dialogVenda = false
            this.buscarComandas();
            Swal.fire(
              'Venda realizada com sucesso!',
              '',
              'success'
            )
          }
        }
      }
    }
  }
  </script>
  <style>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .9;
    position: absolute;
    width: 100%;
  }
  body {
    font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif; 
  }
  </style>
  