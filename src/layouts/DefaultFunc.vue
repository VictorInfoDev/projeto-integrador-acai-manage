<template>
    <v-app>
        <v-app-bar app color="primary" elevation="0">
            <v-icon large color="white">mdi-account-tie-outline</v-icon><span class="ml-3 text-h5 white--text">Jaison Pereira</span>
            <v-spacer></v-spacer>
            <v-icon class="mr-3" color="white">mdi-email</v-icon>
            <span class="text-h5 white--text">victorhugoagostini777@gmail.com</span>
            <v-btn to="/login" icon class="ml-2" color="white"><v-icon large>mdi-exit-to-app</v-icon></v-btn>
        </v-app-bar>
        <v-main>
            <router-view></router-view>
        </v-main> 
    </v-app>
</template>