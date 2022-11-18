<template>
    <v-app class="primary">
        <v-app-bar color="transparent" elevation="0">
            <v-icon large color="white">mdi-account-tie-outline</v-icon><span class="ml-3 text-h5 white--text">Jaison Pereira</span>
            <v-spacer></v-spacer>
            <v-icon class="mr-3" color="white">mdi-email</v-icon>
            <span class="text-h5 white--text">victorhugoagostini777@gmail.com</span>
        </v-app-bar>
        <v-container fill-height fluid text-center >
            <v-container> 
                <v-card class="mx-auto my-12 mt-0" max-width="" elevation="0" color="transparent" v-if="alocarText">
                    <div class="text-h1 white--text">Vamos ao trabalho!</div>
                    <v-row class="mt-5">
                        <v-col></v-col>
                        <v-text-field
                            color="white"
                            class="mt-8 ml-3"
                            label="Insira o código da loja"
                            solo
                        ></v-text-field>
                        <v-col></v-col>
                    </v-row>
                    <v-btn @click="alocarText = !alocarText, test()"  class="ma-auto mt-5" fab x-large>
                        <v-icon color="primary">mdi-play</v-icon>
                    </v-btn>    
                </v-card>
                <v-card class="mx-auto my-12 mt-0" max-width="" elevation="0" color="transparent" v-if="!alocarText">
                    <div class="text-h3 white--text">Aguarde a confirmação da loja.</div>
                </v-card>
            </v-container>
        </v-container>

    </v-app>
</template>
<script>
export default {
    data () {
      return {
        alocarText: true,
      }
    },
    methods: {
        async test(){
            this.$router.push({ name: "Venda" });
        }
    }
}
</script>