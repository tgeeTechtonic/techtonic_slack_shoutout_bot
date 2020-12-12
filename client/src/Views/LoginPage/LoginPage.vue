<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Admin Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email"
                  required
                  v-model="email"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password"
                  type="password"
                  required
                  v-model="password"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = 'cancel'">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = 'login'">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.showLogin;
      },
      set(input) {
        this.$router.go(-1);
        if (input === 'cancel') this.$store.dispatch('toggleLogin');
        else {
          const { email, password } = this;
          this.$store.dispatch('loginAdmin', { email, password });
        }
      },
    },
  },
};
</script>

<style></style>
