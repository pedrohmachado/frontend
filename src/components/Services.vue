<template>
  <div>
    Services
    <div class="container">
      <v-data-table :items="allServices" :headers="headers">
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
          <td class="text-xs-right">{{ props.item.cost }}</td>
          <td class="text-xs-left">{{ props.item.duration }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
      </v-data-table>
    </div>
    <div>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn class="mb-2" v-on="on">New service</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Service name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-textarea v-model="editedItem.description" label="Description"></v-textarea>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.cost" label="Cost (R$)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <!-- <v-text-field
                    v-model="editedItem.duration"
                    mask="time-with-seconds"
                    label="Duration"
                  ></v-text-field> -->
                  <v-text-field
                    v-model="editedItem.duration"
                    type="time"
                    label="Duration"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import moment from 'moment'

export default {
  data: () => {
    return {
      dialog: false,
      headers: [
        { text: "Name", align: "left", sortable: true, value: "name" },
        {
          text: "Description",
          align: "left",
          sortable: false,
          value: "description"
        },
        { text: "Cost", align: "right", sortable: true, value: "cost" },
        { text: "Duration", align: "left", sortable: true, value: "duration" },
        { text: "Actions", sortable: false, value: "name" }
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        description: "",
        cost: 0.00,
        duration: "00:00"
      },
      defaultItem: {
        name: "",
        description: "",
        cost: 0.00,
        duration: "00:00"
      }
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  methods: {
    ...mapActions(["getServices", "addService", "deleteService", "updateService"]),
    editItem(item) {
      this.editedIndex = this.allServices.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.allServices.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.allServices.splice(index, 1);
        this.deleteService(item);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.allServices[this.editedIndex], this.editedItem);
        moment(this.editedItem.duration).format("")
        this.updateService(this.editedItem)
      } else {
        this.addService(this.editedItem);
      }
      this.close();
    }
  },
  computed: {
    ...mapGetters(["allServices"]),
    ...mapState(["services"]),
    formTitle() {
      return this.editedIndex === -1 ? "New service" : "Edit service";
    }
  },
  created() {
    this.getServices();
  }
};
</script>

<style>
</style>
