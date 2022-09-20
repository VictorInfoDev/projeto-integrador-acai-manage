<template>
  <v-app>
    <div class="root"><img class="background" ref="background" src="../assets/tree.png"/></div>
    <div class="pa-10">
      <v-row>
        <v-col>
          <v-card class="pa-5" elevation="5" height="570px">
            <v-card-title>Nome da empresa<v-spacer></v-spacer>
              <v-btn @click="verificar()">verificar</v-btn>
            </v-card-title>
            <v-card-subtitle>empresaemail@gmail.com</v-card-subtitle>
            <v-card-text><b>CNPJ:</b>12345678901</v-card-text>
            <v-divider></v-divider>
            <v-card class="text-center" color="white" outlined>
              <v-card-text>
                <div class="text-h4 black--text">
                  Últimas vendas
                </div>
              </v-card-text>
              <v-card-text>
                <v-sheet color="white" rounded>
                  <v-sparkline :value="value" color="black" height="100" padding="24" stroke-linecap="round" smooth>
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
          <v-card class="pa-5" elevation="5" height="570px">
            <v-card-title>Últimas vendas</v-card-title>
            <v-simple-table fixed-header height="425px">
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
                  <tr v-for="item in desserts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.calories }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <!--Funcionários-->
          <v-card class="pa-5" elevation="5">
            <v-card-title class="indigo white--text text-h5">
              Tabela de Funcionários
            </v-card-title>
            <v-row class="pa-4" justify="space-between">
              <v-col cols="5">
                <v-treeview :active.sync="active" :items="items" :load-children="fetchUsers" :open.sync="open"
                  activatable color="warning" open-on-click transition>
                  <template v-slot:prepend="{ item }">
                    <v-icon v-if="!item.children">
                      mdi-account
                    </v-icon>
                  </template>
                </v-treeview>
              </v-col>

              <v-divider vertical></v-divider>

              <v-col class="d-flex text-center">
                <v-scroll-y-transition mode="out-in">
                  <div v-if="!selected" class="text-h6 grey--text text--lighten-1 font-weight-light"
                    style="align-self: center;">
                    Selecione um funcionário
                  </div>
                  <v-card v-else :key="selected.id" class="pt-6 mx-auto" flat max-width="400">
                    <v-card-text>
                      <v-avatar v-if="avatar" size="88">
                        <v-img :src="`https://avataaars.io/${avatar}`" class="mb-6"></v-img>
                      </v-avatar>
                      <h3 class="text-h5 mb-2">
                        {{ selected.name }}
                      </h3>
                      <div class="blue--text mb-2">
                        {{ selected.email }}
                      </div>
                      <div class="blue--text subheading font-weight-bold">
                        {{ selected.username }}
                      </div>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-row class="text-left" tag="v-card-text">
                      <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                        Company:
                      </v-col>
                      <v-col>{{ selected.company.name }}</v-col>
                      <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                        Website:
                      </v-col>
                      <v-col>
                        <a :href="`//${selected.website}`" target="_blank">{{ selected.website }}</a>
                      </v-col>
                      <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                        Phone:
                      </v-col>
                      <v-col>{{ selected.phone }}</v-col>
                    </v-row>
                  </v-card>
                </v-scroll-y-transition>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>


    </div>
    <img class="foreground" ref="foreground" src="../assets/tree.png"/>
  </v-app>
</template>

<script>
import * as fb from '@/plugins/firebase'
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

const avatars = [
  '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
  '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
  '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
  '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
  '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly',
]

const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

export default {
  data() {
    return {
      active: [],
      avatar: null,
      open: [],
      users: [],
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

  computed: {
    items() {
      return [
        {
          name: 'Pessoas',
          children: this.users,
        },
      ]
    },
    selected() {
      if (!this.active.length) return undefined

      const id = this.active[0]

      return this.users.find(user => user.id === id)
    },
  },

  watch: {
    selected: 'randomAvatar',
  },

  methods: {
    async verificar() {
      const auth = getAuth();
      const user = fb.auth.currentUser;
      const email = user.email;
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert('sim')
        })
        .catch(() => {
          alert('nao')
        });
    },
    async fetchUsers(item) {
      await pause(1500)

      return fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(json => (item.children.push(...json)))
        .catch(err => console.warn(err))
    },
    randomAvatar() {
      this.avatar = avatars[Math.floor(Math.random() * avatars.length)]
    },
  },
}
</script>

<style>
img.background,
img.foreground {
  /* Fill background */
  min-height: 100%;
  min-width: 1024px;

  /* Scale proportionately */
  width: 100%;
  height: auto;
}

img.background {
  /* Positioning */
  position: fixed;
  top: 0;
  left: 0;
}

</style>