<template>
  <v-app>
    <div class="pa-5">
      <div style="
          border-left-style: solid;
          border-left-color: #1976d2;
          border-left-width: 8px;
          padding-left: 10px;
        " class="text-h4 my-8">
        Cadastre seus produtos aqui!
      </div>
      <div style="color: gray" class="h5 mt-2 mb-4">
        <v-alert outlined type="info">
          Primeiramente crie suas classificações em
          <v-icon color="primary">mdi-bookmark-plus</v-icon> para deixar seus
          produtos organizados por classificação.
        </v-alert>
      </div>
      <v-card class="mt-8" outlined>
        <div class="text-h2 primary--text pa-5">
        Produtos
        </div>
        <v-divider></v-divider>
        <v-card-title>
          <div style="background-color: #bbdefb; border-radius: 15px" align="center">
          <v-tooltip top color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ma-4" fab dark color="primary" @click.stop="dialogProduto = !dialogProduto" v-bind="attrs" v-on="on">
                <v-icon dark>mdi-basket-plus</v-icon>
              </v-btn>
            </template>
            <span>Adicionar produto</span>
          </v-tooltip>
          
          <v-tooltip top color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ma-4" fab dark color="primary" @click.stop="dialogClass = !dialogClass" v-bind="attrs" v-on="on">
                <v-icon dark>mdi-bookmark-plus</v-icon>
              </v-btn>
            </template>
            <span>Adicionar classificação</span>
          </v-tooltip>

          <v-tooltip top color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="ma-4" fab dark color="primary" @click.stop="buscarClassTabela()" v-bind="attrs" v-on="on">
                <v-icon dark>mdi-bookmark-minus</v-icon>
              </v-btn>
            </template>
            <span>Deletar classificação</span>
          </v-tooltip>

          <v-tooltip top color="primary">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-for="iconLog in iconsLogs" :key="iconLog.id" class="ma-4" fab dark color="primary" @click="configOpcaoValid()" v-bind="attrs" v-on="on">
                <v-icon>{{ iconLog.icon }}</v-icon>
              </v-btn>
            </template>
            <span>{{ spanTextEdit }}</span>
          </v-tooltip>
          </div>
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Procurar" single-line hide-details
            class="mr-5"></v-text-field>
          <div class="">
            <v-select class="mt-6" append-icon="mdi-bookmark" v-model="search" :items="items" item-text="classeProduto"
              clearable label="Classificações"></v-select>
          </div>
        </v-card-title>
        <v-data-table :headers="headers" :items="desserts" :search="search">
          <template v-slot:item.idproduto="{ item }">
            <v-chip v-model="item.idproduto" color="primary">
              {{ item.idproduto }}
            </v-chip>
          </template>
          <template v-slot:item.iconTable="{ item }">
            <v-chip class="warning ml-3" :disabled="configOpcao" @click="logProduto(item.idproduto, dialogEditar)">
              <v-icon v-model="item.iconTableEdit"> mdi-pencil </v-icon>
            </v-chip>
            <v-chip :disabled="configOpcao" class="error ml-3" @click="deletarProduto(item.idproduto, desserts)">
              <v-icon v-model="item.iconTableExluir"> mdi-delete </v-icon>
            </v-chip>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <!-- DialogClassDelete
      --
      --
      --
      --
      --
      --
      -->
    <v-dialog v-model="dialogClassDelete" max-width="500px">
      <v-card>
        <v-card-title class="primary white--text">
          <v-icon class="mr-2" color="white">mdi-bookmark-minus</v-icon><span class="text-h6">Deletar
            classificação</span>
          <v-spacer></v-spacer>
          <v-icon @click="dialogClassDelete = false" color="white">mdi-close</v-icon>
        </v-card-title>

        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Classificação</th>
                  <th class="text-right"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="classText of classTexts" :key="classText.id">
                  <td>{{ classText.name }}</td>
                  <td class="text-right">
                    <v-icon @click="deletarClasse(classText.id)" color="error">mdi-close</v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- DialogEdit
      --
      --
      --
      --
      --
      --
      -->
    <v-dialog v-model="dialogEditar" persistent max-width="700px">
      <v-card v-for="itemEdit in Edits" :key="itemEdit.id">
        <v-card-title class="warning white--text">
          <v-icon class="mr-2" color="white">mdi-pencil</v-icon><span class="text-h5">Editar produto</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-form ref="formEditar" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="8">
                  <v-text-field :rules="[
                    () => !!itemEdit.nomeProdutoEdit || 'Campo obrigatório',
                  ]" :error-messages="errorMessages" append-icon="mdi-basket" label="Nome do produto, adicional ou copo" required
                    v-model="itemEdit.nomeProdutoEdit">
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field :rules="[
                    () => !!itemEdit.valorProdutoEdit || 'Campo obrigatório',
                  ]" append-icon="mdi-cash" label="Valor do produto" type="number"
                    v-model.number="itemEdit.valorProdutoEdit" required prefix="R$">
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-select :rules="[(v) => !!v || 'Campo obrigatório']" append-icon="mdi-bookmark"
                    v-model="itemEdit.tipoProdutoEdit" :items="items" item-text="classeProduto" clearable
                    label="Classificações" required>
                  </v-select>
                </v-col>
            </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialogEditar = !dialogEditar" elevation="2">
            Fechar
          </v-btn>
          <v-btn @click="
            salvarEditProdutos(
              itemEdit.nomeProdutoEdit,
              itemEdit.valorProdutoEdit,
              itemEdit.quantProdutoEdit,
              itemEdit.tipoProdutoEdit
            )
          " color="warning" elevation="2">
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- DialogSalvar
      --
      --
      --
      --
      --
      --
      -->
    <v-dialog v-model="dialogProduto" persistent max-width="700px">
      <v-card>
        <v-card-title class="primary white--text">
          <v-icon class="mr-2" color="white">mdi-basket-plus</v-icon><span class="text-h5">Adicionar produto</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="12" sm="8">
                  <v-text-field :rules="[() => !!nomeProduto || 'Campo obrigatório']" :error-messages="errorMessages"
                    append-icon="mdi-basket" label="Nome do produto, adicional ou copo" required v-model="nomeProduto"></v-text-field>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field :rules="[() => !!valorProduto || 'Campo obrigatório']" append-icon="mdi-cash"
                    label="Valor do produto" type="number" v-model.number="valorProduto" required prefix="R$">
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-select :rules="[(v) => !!v || 'Campo obrigatório']" append-icon="mdi-bookmark"
                    v-model="tipoProduto" :items="items" item-text="classeProduto" clearable label="Classificações"
                    required>
                  </v-select>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <v-alert v-model="alertInputProdutos" transition="scale-transition" dismissible text type="warning">Todos os
            campos devem ser preenchidos.</v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="" elevation="2" @click="reset(nomeProduto, tipoProduto, valorProduto, quantProduto)">
            fechar
          </v-btn>
          <v-btn :disabled="!valid" color="primary" elevation="2" @click="
            salvarFirebase(
              nomeProduto,
              valorProduto,
              tipoProduto,
              dialogProduto,
              quantProduto
            )
          ">
            salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Dialog Classes
      --
      --
      --
      --
      -- 
      -->
    <v-dialog v-model="dialogClass" persistent max-width="500px">
      <v-card>
        <v-card-title class="primary white--text">
          <v-icon class="mr-2" color="white">mdi-bookmark-plus</v-icon>
          Adicionar classificação
        </v-card-title>
        <v-divider></v-divider>
        <v-alert v-model="alertInputProdutosClass" transition="scale-transition" dismissible text type="warning"
          class="ma-5">Preencha o campo.
        </v-alert>
        <v-card-text>
          <v-form ref="formClass">
            <v-text-field label="Nome da classificação" required v-model="nameClass" append-icon="mdi-bookmark">
            </v-text-field>
            <v-checkbox v-model="classAd" label="classificação de adicionais do copo" color="primary" value="sim"
              hide-details></v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="resetClass()"> fechar </v-btn>
          <v-btn @click="addClass()" class="primary"> Salvar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="text-center ma-2">
      <v-snackbar class="mb-10" dark v-model="snackbarAlertClass">
        Você não tem nenhuma classificação registrada!
        <v-spacer></v-spacer>
        <template v-slot:action="{ attrs }">
          <v-btn color="primary" text v-bind="attrs" @click="snackbarAlertClass = false">
            OK
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>
import * as fb from "@/plugins/firebase";
import { doc, deleteDoc } from "firebase/firestore";
export default {
  data() {
    return {
      spanTextEdit: "",
      snackbarAlertClass: false,
      uid: "",
      classAd: "nao",
      configOpcao: false,
      dialogClassDelete: false,
      dialogEditar: false,
      dialogClass: false,
      dialogProduto: false,
      alertInputProdutosClass: false,
      alertInputProdutos: false,
      editValid: null,
      valid: true,
      exemplo: null,
      multiLine: true,
      snackbar: false,
      search: "",
      iconsLogs: [],
      items: [],
      classTexts: [],
      Edits: [],
      headers: [
        {
          text: "Produto",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Valor (R$)", value: "valor" },
        { text: "Classificação", value: "classf", sortable: false },
        { text: "ID", value: "idproduto", sortable: false },
        { text: "", value: "iconTable", sortable: false },
      ],
      desserts: [],
    };
  },
  mounted() {
    this.buscarProdutos();
    this.buscarClass();
    this.configOpcaoValid();
  },
  methods: {
    //methods produtos salvar*******************************************************************************************
    async salvarFirebase() {
      //validate
      this.$refs.form.validate();
      if (
        this.nomeProduto == null ||
        this.tipoProduto == null ||
        this.valorProduto == null
      ) {
        this.alertInputProdutos = true;
        this.dialogProduto = true;
      }
      //firebase
      else {
        if(this.tipoProduto == "Copos"){
          this.tipoClasseProduto = "sim"
        }
        else{
        this.uid = fb.auth.currentUser.uid;
        const logTasksAdd = await fb.classeCollection
        .where("uid", "==", this.uid)
        .where("classeSelect", "==", this.tipoProduto)
        .get();
        for (const doc of logTasksAdd.docs) {
          this.tipoClasseProduto = doc.data().adicional
        }
        }
        const res = await fb.produtosCollection.add({
          uid: this.uid,
          produto: this.nomeProduto,
          valor: this.valorProduto,
          classe: this.tipoProduto,
          tipo: this.tipoClasseProduto
        });
        const idprodutoAdd = res.id;
        await fb.produtosCollection.doc(idprodutoAdd).update({
          produtoID: idprodutoAdd,
        });
        this.buscarProdutos();
        this.dialogProduto = false;
        this.configOpcao = true;
      }
      //reset form
      this.nomeProduto = null;
      this.tipoProduto = null;
      this.valorProduto = 0;
      this.$refs.form.resetValidation();
    },
    reset() {
      this.nomeProduto = null;
      this.tipoProduto = null;
      this.valorProduto = 0;
      this.dialogProduto = false;
      this.$refs.form.resetValidation();
    },
    //methods produtos buscar*******************************************************************************************
    async buscarProdutos() {
      this.uid = fb.auth.currentUser.uid;
      this.desserts = [];
      const logTasks = await fb.produtosCollection
        .where("uid", "==", this.uid)
        .get();
      for (const doc of logTasks.docs) {
        this.desserts.push({
          idproduto: doc.data().produtoID,
          name: doc.data().produto,
          valor: doc.data().valor,
          classf: doc.data().classe,
        });
      }
    },
    //methods produtos deletar******************************************************************************************
    async deletarProduto(idproduto) {
      await deleteDoc(doc(fb.produtosCollection, idproduto));
      this.buscarProdutos();
    },
    //methods produtos editar*******************************************************************************************
    async logProduto(idproduto) {
      this.dialogEditar = true;
      this.Edits = [];
      this.idEditar = idproduto;
      this.editValid = idproduto;
      const logTasks = await fb.produtosCollection
        .where("produtoID", "==", this.idEditar)
        .get();
      for (const doc of logTasks.docs) {
        this.Edits.push({
          nomeProdutoEdit: doc.data().produto,
          valorProdutoEdit: doc.data().valor,
          tipoProdutoEdit: doc.data().classe,
        });
      }
    },
    async salvarEditProdutos(
      nomeProdutoEdit,
      valorProdutoEdit,
      quantProdutoEdit,
      tipoProdutoEdit
    ) {
      await fb.produtosCollection.doc(this.editValid).update({
        produto: nomeProdutoEdit,
        valor: valorProdutoEdit,
        classe: tipoProdutoEdit,
      });
      this.dialogEditar = false;
      this.buscarProdutos();
    },
    //methods classse salvar********************************************************************************************
    async addClass() {
      if (this.nameClass == "" || this.nameClass == null) {
        this.alertInputProdutosClass = true;
      } else {
        this.uid = fb.auth.currentUser.uid;
        const res = await fb.classeCollection.add({
          uid: this.uid,
          classeSelect: this.nameClass,
          adicional: this.classAd
        });
        const idclasseAdd = res.id;
        await fb.classeCollection.doc(idclasseAdd).update({
          classeID: idclasseAdd,
        });
        this.buscarClass();
        this.$refs.formClass.reset();
        this.dialogClass = false;
      }
    },
    resetClass() {
      this.$refs.formClass.reset();
      this.dialogClass = false;
    },
    //methods classse buscar********************************************************************************************
    async buscarClass() {
      this.uid = fb.auth.currentUser.uid;
      this.items = ["Copos"];
      const logTasks = await fb.classeCollection
        .where("uid", "==", this.uid)
        .get();
      for (const doc of logTasks.docs) {
        this.items.push({
          classeProduto: doc.data().classeSelect,
        });
      }
    },
    async buscarClassTabela() {
      this.dialogClassDelete = false
      this.uid = fb.auth.currentUser.uid;
      const classDocs = await fb.classeCollection
        .where("uid", "==", this.uid)
        .get();
      const tamanhoDocsClass = classDocs.docs.length
      if (tamanhoDocsClass == 0) {
        this.snackbarAlertClass = true
      }
      else {
        this.classTexts = [];
        const logTasks = await fb.classeCollection
          .where("uid", "==", this.uid)
          .get();
        for (const doc of logTasks.docs) {
          this.classTexts.push({
            name: doc.data().classeSelect,
            id: doc.data().classeID,
          });
        }
        this.dialogClassDelete = true
      }
    },
    //methods classse deletar***********************************************************************************************
    async deletarClasse(idClasse) {
      await deleteDoc(doc(fb.classeCollection, idClasse));
      this.buscarClassTabela();
      this.buscarClass();
    },
    //methods valid edit****************************************************************************************************
    configOpcaoValid() {
      this.iconsLogs = [];
      if (this.configOpcao == false) {
        this.iconsLogs.push({
          icon: "mdi-pencil",
        });
        this.configOpcao = true;
        this.spanTextEdit = "Habilitar edição"
      } else {
        this.iconsLogs.push({
          icon: "mdi-pencil-off",
        });
        this.configOpcao = false;
        this.spanTextEdit = "Desabilitar edição"
      }
    },
  },
};
</script>

<style>

</style>
