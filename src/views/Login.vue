<template>
  <v-app style="background-color: #f4b6c2">
      <v-container fill-height fluid text-center >
        <v-container>  
          <!-- Login 
          --
          --
          --
          --
          --
          -->     
          <v-card dark class="mx-auto my-12" max-width="500" elevation="24"  v-if="loginValid" color="#550953">
          <v-img src="../assets/logoSite.png" height="250"></v-img>
          <v-divider></v-divider>
          <v-progress-linear color="success" :active="loadingLogin" :indeterminate="loadingLogin"></v-progress-linear>
          <div>
          <v-col
              class="text-center text-h2 success--text mt-15"
            >Login
          </v-col>
          </div>
          <v-row class="pa-5">
          <v-col>
            <v-form >
              <v-text-field outlined label="Email" v-model="user.email" color="success"></v-text-field>
              <v-text-field 
              color="success"
              outlined
              label="Senha"
              v-model="user.password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              ></v-text-field>
            <v-alert
              transition="scale-transition"
              v-model="validUser"
              color="warning"
              dismissible
              outlined
              type="warning"
            >Esta conta não existe, crie uma em <span class="text-decoration-underline success--text">registrar.</span></v-alert>
            <v-alert
              transition="scale-transition"
              v-model="validUserAuth"
              color="warning"
              dismissible
              outlined
              type="warning"
            >Usuário ou senha inválidos.</v-alert>
            <v-btn class="ma-2" outlined color="white" @click="reset">Cancelar</v-btn>
            <v-btn outlined color="primary" @click="login()" >Login</v-btn><br>
            <v-btn text color="success" class="text-decoration-underline" @click="registerValid = true, loginValid = false">Registrar</v-btn><br>
            <v-btn text color="primaryy" class="text-decoration-underline" @click="dialogRecSenha = true">Recuperar senha</v-btn>
            </v-form>
          </v-col>
          </v-row>
          </v-card>
          <!-- Register 
          --
          --
          --
          --
          --
          -->
          <v-card dark class="mx-auto my-12" max-width="500" v-if="registerValid" elevation="24" color="#550953">
          <v-img src="../assets/logoSite.png" height="250"></v-img>
          <v-divider></v-divider>
          <v-progress-linear color="success" :active="loadingLogin" :indeterminate="loadingLogin"></v-progress-linear>
          <v-col
              class="text-center text-h2 success--text mt-15"
            >Registrar
          </v-col>
          <v-row class="pa-5">
          <v-col>
            <v-form>
              <v-text-field outlined color="success" label="Nome da loja" v-model="user.nome"></v-text-field>
              <v-text-field outlined color="success" label="Email" v-model="user.email"></v-text-field>
              <v-text-field outlined color="success" label="CNPJ" v-model="user.cnpj"></v-text-field>
              <v-text-field 
              color="success"
              outlined
              label="Senha"
              v-model="user.password"
              :type="show ? 'text' : 'password'"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show = !show"
              ></v-text-field>
            <v-alert
              transition="scale-transition"
              v-model="userExiste"
              color="warning"
              dismissible
              outlined
              type="warning"
            >Este email já está em uso.</v-alert>
            <v-alert
              transition="scale-transition"
              v-model="alertInvalidInfo"
              color="warning"
              dismissible
              outlined
              type="warning"
            >Preencha todos os campos.</v-alert>
            <v-btn outlined class="ma-2" color="white" @click="reset">Cancelar</v-btn>
            <v-btn outlined color="green" @click="criarNovaConta()" style="color:white">Registrar</v-btn><br>
            <v-btn text color="info" class="ml-2 text-decoration-underline" @click="registerValid = false, loginValid = true">Login</v-btn>
            </v-form>
          </v-col>
          </v-row>
          </v-card>
        </v-container>
      </v-container>
      <v-dialog v-model="dialogRecSenha" max-width="500">
        <v-card v-for="email in infos" :key="email.id">
          <v-card-title>Digite o e-mail da sua conta:</v-card-title>
          <v-card-text>
            <v-text-field
              color="success"
              v-model="email.emailRec"
              label="E-mail"
            ></v-text-field>
            <v-alert type="warning"
            v-model="alertEmailRecError"
            dismissible
            transition="scale-transition"
            >
              Digite um e-mail válido.
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="dialogRecSenha = false, email.emailRec = '' ">Cancelar</v-btn>
            <v-btn class="success" @click="sendEmaiLRec(email.emailRec)">Enviar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-alert
        max-width="500"
        v-model="alertEmailRec"
        transition="scale-transition"
        dismissible
        class="mt-5 ml-5"
        type="success"
        >
          E-mail enviado com sucesso!
      </v-alert>
  </v-app>
</template>

<script>
import * as fb from '@/plugins/firebase'
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
export default {
  data(){
    return{
      alertEmailRecError: false,
      alertInvalidInfo: false,
      invalidInfo:false,
      loadingLogin: false,
      userExiste:false,
      validUserAuth:false,
      validUser:false,
      loginValid:true,
      registerValid:false,
      show: false,
      dialogRecSenha: false,
      alertEmailRec: false,
      infos:[{email:null}],
      user:{email:'victoragostini2019@gmail.com',cnpj:null,nome:null,password:'minhacasa2'},
    }
  },
  watch: {
      loadingLogin (val) {
        if (!val) return
        setTimeout(() => (this.loadingLogin = false), 10000)
      },
  },
  methods:{
    reset() {
      this.user = {};
    },
    async login() {
      try {
        await fb.auth.signInWithEmailAndPassword(
          this.user.email,
          this.user.password
        );
        this.loadingLogin = true
        this.$router.push({ name: "Home" });
      } catch (error) {
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/wrong-password":
            this.validUserAuth = true;
            this.user = {};
            break;
          case "auth/invalid-email":
            this.validUserAuth = true;
            this.user = {};
            break;
          case "auth/user-not-found":
            this.validUser = true;
            this.user = {};
            break;
          default:
            this.errorLogin = true;
            break;
        }
      }
    },
    async criarNovaConta() {
    try{
      if(this.user.nome == null || this.user.nome == '' || this.user.email == null || this.user.email == '' || this.user.cnpj == null || this.user.cnpj == '' || this.user.password == null || this.user.password == ''){
        this.invalidInfo = false
        this.alertInvalidInfo = true
      }
      else{
        this.invalidInfo = true
      }
      if(this.invalidInfo == true){
      await fb.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      this.loadingLogin = true
      this.login();
      this.registrarPerfil()
      }
      else{
        this.alertInvalidInfo = true
      }
      }catch (error){
        const errorCode = error.code;
        switch (errorCode) {
          case "auth/invalid-email":
            this.emailInvalid = true;
            this.user = {};
            break;
          case "auth/email-already-in-use":
            this.userExiste = true;
            this.user = {};
            break;
          default:
            this.userExiste = true;
            break;
        }
      }
    },
    async registrarPerfil(){
      this.uid = fb.auth.currentUser.uid;
      const res = await fb.perfilCollection.add({            
        owner: this.uid,
        nomeEmpresa: this.user.nome,
        CNPJ: this.user.cnpj,
        MetaDia: 30,
        MetaMes: 500,
        MetaAno: 6000,
        });
        const idPerfil = res.id
        await fb.perfilCollection.doc(idPerfil).update({
          idPerfil: idPerfil,
      });
        this.user = {}
    },
    async sendEmaiLRec(emailrec){
        if(emailrec == null || emailrec == ''){
          this.alertEmailRecError = true
        }
        else{
        const auth = getAuth();
        sendPasswordResetEmail(auth, emailrec)
        .then(() => {
          this.alertEmailRec = true;
        })
        .catch(() => {
          alert("Erro ao enviar o e-mail.")
        });
        this.dialogRecSenha = false          
        }
    }
  }
}
</script>

<style>
</style>
