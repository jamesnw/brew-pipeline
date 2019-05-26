<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="name" label="Name" required></v-text-field>
    <v-text-field v-model="abv" label="ABV" :rules="[rules.percent]"></v-text-field>
    <v-text-field v-model="description" label="Description" required></v-text-field>
    <v-text-field v-model="empty" label="empty"></v-text-field>
    <v-text-field v-model="kegged" label="kegged"></v-text-field>
    <v-select v-model="status" :items="statusOptions" label="Status"></v-select>
    <v-text-field v-model="style" label="style" required></v-text-field>
    <v-select v-model="tap" :items="tapOptions" label="tap"></v-select>
    <v-text-field v-model="untappd" label="untappd"></v-text-field>
    <v-btn color="success" @click="save" :loading="saving" :disabled="saving">Save</v-btn>
    <v-btn color="warning" @click="reset">Reset</v-btn>
    <v-dialog v-model="showDelete" persistent width="500" v-show="name">
      <template v-slot:activator="{on}">
        <v-btn color="red lighten-2" dark v-on="on">Delete</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline grey lighten-1" primary-title>Delete</v-card-title>

        <v-card-text>
          Are you sure you want to delete
          <strong>{{name}}</strong>?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="showDelete = false">Cancel</v-btn>
          <v-btn color="red lighten-1" dark @click="deleteKeg">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script>
export default {
  data: function() {
    return {
      id: undefined,
      name: undefined,
      abv: undefined,
      description: undefined,
      empty: undefined,
      kegged: undefined,
      status: undefined,
      style: undefined,
      tap: undefined,
      untappd: undefined,
      saving: false,
      showSuccess: false,
      showDelete: false,
      valid: true,
      beer: {},
      tapOptions: [
        { text: 'Off', value: null },
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 },
        { text: '6', value: 6 }
      ],
      statusOptions: [
        { text: 'On tap', value: 'ontap' },
        { text: 'Kicked', value: 'kicked' },
        { text: 'Fermenting', value: 'fermenting' },
        { text: 'Planned', value: 'planned' },
        { text: 'Kegged', value: 'kegged' }
      ],
      rules: {
        percent: value => !value || !value.includes('%') || 'Remove % sign'
      }
    };
  },
  props: ['kegData'],
  watch: {
    kegData: function(beer) {
      this.setKeg(beer);
    }
  },
  created: function() {
    this.setKeg(this.kegData);
  },
  methods: {
    save: function() {
      var keg_data = {
        name: this.name,
        abv: this.abv,
        description: this.description,
        empty: this.empty,
        kegged: this.kegged,
        status: this.status,
        style: this.style,
        tap: this.tap,
        untappd: this.untappd
      };
      this.$emit('save', keg_data);
    },
    reset: function() {
      this.setKeg(this.kegData);
    },
    deleteKeg: function() {
      this.showDelete = false;
      this.$emit('delete');
    },
    setKeg: function(beer) {
      this.name = beer.name;
      this.abv = beer.abv;
      this.description = beer.description;
      this.empty = beer.empty;
      this.kegged = beer.kegged;
      this.status = beer.status;
      this.style = beer.style;
      this.tap = beer.tap;
      this.untappd = beer.untappd;
    }
  }
};</script>

<style>
</style>
