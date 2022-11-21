<template>
    <v-app>
        <v-app-bar app color="primary" elevation="0" v-for="info in infos" :key="info.id">
            <v-icon large color="white">mdi-account-tie-outline</v-icon><span class="ml-3 text-h5 white--text">{{ info.nome }}</span>
            <v-spacer></v-spacer>
            <v-icon class="mr-3" color="white">mdi-email</v-icon>
            <span class="text-h5 white--text">{{ info.email }}</span>
            <v-btn to="/login" icon class="ml-2" color="white"><v-icon large>mdi-exit-to-app</v-icon></v-btn>
        </v-app-bar>
        <v-main>
            <router-view></router-view>
        </v-main> 
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
        snackbarCodEnviado: false,
        snackbarCodCancelado: false,
        idPerfilFunc: "",
        infos: []
      }
    },
    mounted() {
        this.buscarInfoFunc();
    },
    methods: {
        async buscarInfoFunc(){
            this.uid = fb.auth.currentUser.uid;
            this.infos = []
            const logInfos = await fb.perfilCollection
            .where("owner","==",this.uid)
            .get();
            for (const doc of logInfos.docs) {
            this.infos.push({
                email: doc.data().email,
                nome: doc.data().nome
            })
            }
        }
    }
}
</script>
