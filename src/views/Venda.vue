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

        <!--Quadro de comandas-->
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
      <!--Botão do dialog venda-->
      <v-btn
        color="success"
        fixed
        fab
        large
        dark
        bottom
        right
        class="ma-5"
        @click="criarComanda(),buscarProdutosVenda(), dialogVenda = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <!-- Dialog Venda-->
      <v-dialog
        v-model="dialogVenda"
        persistent
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar
            dark
            color="success"
            tile
          >
            <v-btn
              icon
              dark
              @click="excluirComandaLog(),dialogVenda = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Criação da comanda</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-checkbox
              v-model="comandaPrioridade"
              label="Prioridade"
              color="orange"
              value="sim"
              hide-details
              class="mr-5"
            ></v-checkbox>
            <v-toolbar-items>
              <v-btn
                dark
                text
                @click="dialogVenda = false"
              >
                Criar
                <v-icon small>mdi-plus</v-icon>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <!--area de trabalho comandas-->
          <v-row>
            <v-col cols="12" sm="6">
              <v-card elevation="0" class="ma-5">
                <div><h2>Informações</h2></div>
                <v-text-field
                  v-model="nomeComanda"
                  label="Nome da comanda"
                  color="success"
                  maxlength="25"
                  counter
                ></v-text-field>
                <v-textarea
                  v-model="descricaoComanda"
                  class="mt-3"
                  solo
                  name="input-7-4"
                  label="Descrição do pedido"
                  maxlength="250"
                  counter
                ></v-textarea>
                <div><h2>Produtos</h2></div>
                <v-simple-table
                  fixed-header
                  height="300px"
                >
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
                    <tr
                      v-for="produtoVenda in produtosVenda"
                      :key="produtoVenda.id"
                    >
                      <td>{{ produtoVenda.nome }}</td>
                      <td>R$ {{ produtoVenda.preco }}</td>
                      <td>
                        <v-icon 
                        class="" 
                        color="success" 
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
              <div class="ma-5"><h2>Copos</h2></div>
              <v-card outlined class="ma-5 pa-3">
                <v-row>
                  <v-col cols="12" sm="4">
                    <v-card @click="test()">
                      <v-card-title class="success white--text"><v-icon color="white" class="mr-2">mdi-plus</v-icon>Adicionar copo</v-card-title>
                    </v-card>
                  </v-col>
                  <v-col cols="12" sm="4" v-for="copo in copos" :key="copo.id">
                    <v-card>
                      <v-card-title class="purple darken-3 white--text">
                        <v-icon class="mr-2" color="white">mdi-cup-outline</v-icon>
                        {{ copo.nome }}
                      </v-card-title>
                        <v-list-item v-for="copoItem in coposItems" :key="copoItem.id">
                          <v-list-item-content>
                            <v-list-item-title><b>{{ copoItem.classe }}</b> - {{ copoItems.adicional }}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
              <div class="ma-5 mb-0"><h2>Produtos adicionados</h2></div>
              <v-list class="">
                <v-list-item-group
                  color="primary"
                >
                  <v-list-item
                    v-for="produtoComanda in produtosComandas"
                    :key="produtoComanda.id"
                    color="success"
                  >
                    <v-list-item-icon>
                      <v-icon @click="deletarProdutoComanda(produtoComanda.id, produtoComanda.preco)">mdi-close</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ produtoComanda.nome }}: <span class="success--text">R$ {{ produtoComanda.preco }}</span></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-divider class="ma-5 mt-10"></v-divider>
              <div class="ml-5"><h1>Valor total</h1></div>
              <div class="ml-5"><span class="success--text"><h2>R$ {{ infos.valorTotal.toFixed(2) }}</h2></span></div>
              <v-text-field
                v-model="valorDesconto"
                class="ma-5 mt-2 mb-0"
                type="number"
                prefix="R$"
                color="warning"
                outlined
                label="Desconto"
                append-icon="mdi-send"
                @click:append="descontoValorComanda()"
              ></v-text-field>
              <v-btn
                outlined
                class="ml-5 warning white--text"
                @click="resetarDesconto()"
              >Resetar desconto</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
  </v-app>
</template>

<script>
//import { db, doc, setDoc } from "firebase/firestore";
import { doc, deleteDoc } from "firebase/firestore";
import * as fb from '@/plugins/firebase'
export default {
    data(){
        return{
          valorDesconto: 0,
          infos:{valorTotal: 0},
          idComandaLog: "",
          comandaPrioridade: "nao",
          dialogVenda: false,
          produtosVenda: [],
          produtosComandas: [],
          copos: [ {nome: "Copo (500ml)"}, {nome: "Copo (400ml)"}],
          comandas:[
            {nome: 'Mesa 01', data: '10/10/2022', hora: '21:37', prioridade: 'mdi-star'},
            {nome: 'Mesa 02', data: '10/10/2022', hora: '21:37', prioridade: ''}
          ]
        }
    },
    mounted() {
    this.buscarProdutosVenda();
    },   
    methods: {
      test(id){
        alert(id)
        var dataAtual = new Date();
        var horas = dataAtual.getHours();
        var minutos = dataAtual.getMinutes();
        var dia = dataAtual.getDate();
        var mes = (dataAtual.getMonth() + 1);
        var ano = dataAtual.getFullYear();
        alert(horas + ":" + minutos)
        alert(dia + "/" + mes + "/" + ano)
      },
      
      async buscarProdutosVenda(){
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
      async criarComanda(){
        this.uid = fb.auth.currentUser.uid;
        const res = await fb.comandasCollection.add({
          uid: this.uid,
        });
        const idComanda = res.id;
        await fb.comandasCollection.doc(idComanda).update({
          ID_comanda: idComanda,
        });
        this.idComandaLog = idComanda
      },
      async excluirComandaLog(){
        await deleteDoc(doc(fb.comandasCollection, this.idComandaLog));
        var deleteItems = fb.produtosComandaCollection.where("ID_comanda_produto","==",this.idComandaLog);
        deleteItems.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            doc.ref.delete();
          });
        });
      },
      async addProdutoPedido(nome, preco){
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
      },
      async buscarProdutoComanda(){
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
      async deletarProdutoComanda(idDeleteProduto, preco){
        await deleteDoc(doc(fb.produtosComandaCollection, idDeleteProduto));
        this.buscarProdutoComanda();
        if(this.infos.valorTotal - preco < 0){
        this.infos.valorTotal = 0
        }
        else
        {
        this.infos.valorTotal -= preco
        }
      },
      async descontoValorComanda(){
        if(this.infos.valorTotal - this.valorDesconto < 0){
        this.infos.valorTotal = 0
        }
        else
        {
        this.infos.valorTotal -= this.valorDesconto
        }
      },
      async resetarDesconto(){
        
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