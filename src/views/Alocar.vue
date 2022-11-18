<template>
    <v-app class="primary">
        <v-container fill-height fluid text-center >
            <v-container> 
                <v-card class="mx-auto my-12 mt-0" max-width="" elevation="0" color="transparent" v-if="alocarText">
                    <div class="text-h1 white--text">Vamos ao trabalho!</div>
                    <v-row class="mt-5">
                        <v-col></v-col>
                        <v-text-field
                            v-model="codLoja"
                            color="white"
                            class="mt-8 ml-3"
                            label="Insira o código da loja"
                            solo
                        ></v-text-field>
                        <v-col></v-col>
                    </v-row>
                    <v-btn @click="test()"  class="ma-auto mt-5" fab x-large>
                        <v-icon color="primary">mdi-play</v-icon>
                    </v-btn>    
                </v-card>
                <v-card class="mx-auto my-12 mt-0" max-width="" elevation="0" color="transparent" v-if="!alocarText">
                    <div class="text-h3 white--text">Aguarde a confirmação da loja.</div>
                </v-card>
                <v-snackbar class="ma-auto mb-10" v-model="snackbarNotCod">
                    Este código não existe!
                    <v-spacer></v-spacer>
                    <template v-slot:action="{ attrs }">
                    <v-btn color="primary" text v-bind="attrs" @click="snackbarNotCod = false">
                        OK
                    </v-btn>
                    </template>
                </v-snackbar>
            </v-container>
        </v-container>

    </v-app>
</template>
<script>
  import * as fb from '@/plugins/firebase'
export default {
    data () {
      return {
        codLoja: "",
        alocarText: true,
        snackbarNotCod: false,
      }
    },

    methods: {
        async test(){
        const countDocs = await fb.perfilCollection
          .where("owner", "==", this.codLoja)
          .get();
        const tamanhoID = countDocs.docs.length

        if(this.codLoja == "" || tamanhoID == 0){
            this.snackbarNotCod = true
        }
        else{
            this.uid = fb.auth.currentUser.uid;
            const logIDPerfil = await fb.perfilCollection
            .where("owner", "==", this.uid)
            .get();
            for (const doc of logIDPerfil.docs) {
            this.idPerfilFunc = doc.data().idPerfil
            }
            await fb.perfilCollection.doc(this.idPerfilFunc).update({
                conviteLoja: this.codLoja,
            });
            this.alocarText = false
        }
        }
    }
}
</script>