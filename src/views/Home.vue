/* eslint-disable */
<template>
  <div class="container-fluid">
    <div class="container">
      <div class="logo pt-3">
        <img
          src="@/assets/img/logo.png"
          alt=""
        />
        <br />
        <h5>Stores Location</h5>
      </div>
      <div class="content">
        <div class="card">
          <div class="card-content row">
            <md-button
              class="md-fab md-success"
              title="Add New Store"
              data-toggle="modal"
              data-target="#createStoreModal"
            >
              <md-icon>add</md-icon>
            </md-button>

            <ul class="col-9 row ml-2 outlets">
              <li
                id="mks"
                class="btn btn-warning col-3 store-tab "
                @click="getOutlet('MKS')"
              >
                Market Square
              </li>
              <li
                id="kj"
                class="btn btn-info col-3 store-tab"
                @click="getOutlet('KJ')"
              >
                Kilimanjaro
              </li>
              <li
                id="pj"
                class="btn btn-danger col-3 store-tab"
                @click="getOutlet('PJ')"
              >
                Pizza Jungle
              </li>
            </ul>
          </div>
        </div>
        <div style="margin-top: 20px;">
          <div class="card">
            <div class="table-responsive">
              <input
                type="text"
                class="form-control"
                v-model="table_filter"
                placeholder="Search..."
              />
              <datatable
                :columns="table_columns"
                :data="stores"
                :filter-by="table_filter"
                name="table_table"
              >
                <template scope="{ row }">
                  <tr>
                    <td>{{ stores.indexOf(row) + 1 }}</td>
                    <td>{{ row.store_name }}</td>
                    <td>{{ row.address }}</td>
                    <td>{{ row.location }}</td>
                    <td>{{ row.email }}</td>
                    <td>{{ row.manager_name }}</td>
                    <td>{{ row.manager_email }}</td>
                    <td>
                      <button
                        class="btn btn-small btn-warning"
                        data-toggle="modal"
                        data-target="#editStoreModal"
                        @click.prevent="getStoreByID(row.id)"
                      >
                        <md-icon class="text-white action">edit</md-icon>
                      </button>

                      <button
                        class="btn btn-small btn-danger"
                        @click="deleteStore(row.id)"
                      >
                        <md-icon class="text-white action">delete_forever</md-icon>
                      </button>
                    </td>
                  </tr>
                </template>
              </datatable>
              <div
                class=""
                style="text-align: center;"
              >
                <datatable-pager
                  v-model="page"
                  type="long"
                  :per-page="per_page"
                  table="table_table"
                ></datatable-pager>
              </div>
            </div>
          </div>
        </div>
        <!-- end row -->
      </div>

      <footer class="footer">
        <div class="container-fluid">
          <p class="copyright ">
            &copy; 2019 Waje Smart Solutions
          </p>
        </div>
      </footer>
    </div>

    <!-- 
create store -->
    <div
      class="modal fade"
      id="createStoreModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="createStoreModal"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="createStoreModal"
            >Add New Store</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createStore">
              <md-field>
                <select
                  class="md-input"
                  v-model="new_store.store_name"
                  required="required"
                >
                  <option value="">Select outlet</option>
                  <option value="MARKETSQUARE">Marketsquare</option>
                  <option value="KILIMANJARO">Kilimanjaro</option>
                  <option value="PIZZA JUNGLE">Pizza Jungle</option>
                </select>
              </md-field>

              <md-field>
                <label for="store_name">Address</label>
                <md-input
                  name="address"
                  v-model="new_store.address"
                />
              </md-field>

              <md-field>
                <label for="id">Branch ID</label>
                <md-input
                  type="number"
                  id="id"
                  name="id"
                  v-model="new_store.branch_id"
                />
              </md-field>
              <md-field>
                <label for="location">Location</label>
                <md-input
                  name="location"
                  v-model="new_store.location"
                />
              </md-field>
              <md-field>
                <select
                  class="md-input"
                  v-model="new_store.region"
                  required="required"
                >
                  <option
                    value=""
                    hidden
                    selected
                  >Select Region</option>
                  <option>PH</option>
                  <option>North-Region</option>
                  <option>South-South</option>
                  <option>South-East-1</option>
                  <option>South-East-2</option>
                  <option>South-West</option>
                </select>
              </md-field>

              <md-field>
                <label for="email">Store Email</label>
                <md-input
                  name="email"
                  type="email"
                  v-model="new_store.email"
                />
              </md-field>
              <md-field>
                <label for="manager_name">Manager Name</label>
                <md-input
                  name="manager_name"
                  v-model="new_store.manager_name"
                />
              </md-field>
              <md-field>
                <label for="manager_email">Manager Email</label>
                <md-input
                  name="manager_email"
                  v-model="new_store.manager_email"
                />
              </md-field>

              <button class="md-button md-raised md-warning btn btn-warning">
                <div class="md-ripple">
                  <div class="md-button-content ">
                    Submit
                  </div>
                </div>
              </button>

              <!-- <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar> -->
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- edit store -->
    <div
      class="modal fade"
      id="editStoreModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editStoreModal"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="EditStoreModal"
            >Update Store</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editStore(edit_store.id)">
              <md-field>
                <select
                  class="md-input"
                  v-model="edit_store.store_name"
                  required="required"
                  value="edit_store.store_name"
                >
                  <option value="MARKETSQUARE">Marketsquare</option>
                  <option value="KILIMANJARO">Kilimanjaro</option>
                  <option value="PIZZA JUNGLE">Pizza Jungle</option>
                </select>
              </md-field>

              <md-field>
                <label for="address">Address</label>
                <md-input
                  name="address"
                  v-model="edit_store.address"
                  required="required"
                  value="edit_store.address"
                />
              </md-field>

              <md-field>
                <label for="id">Branch ID</label>
                <md-input
                  type="number"
                  id="id"
                  name="id"
                  placeholder="Branch ID"
                  v-model="edit_store.branch_id"
                  value="edit_store.branch_id"
                />
              </md-field>
              <md-field>
                <label for="location">Location</label>
                <md-input
                  name="location"
                  placeholder="Location"
                  v-model="edit_store.location"
                  required="required"
                  value="edit_store.location"
                />
              </md-field>
              <md-field>
                <select
                  class="md-input"
                  v-model="edit_store.region"
                  required="required"
                  value="edit_store.region"
                >
                  <option>PH</option>
                  <option>North-Region</option>
                  <option>South-South</option>
                  <option>South-East-1</option>
                  <option>South-East-2</option>
                  <option>South-West</option>
                </select>
              </md-field>
              <md-field>
                <label for="email">Email</label>
                <md-input
                  name="email"
                  placeholder="Email Address"
                  v-model="edit_store.email"
                  value="edit_store.email"
                />
              </md-field>
              <md-field>
                <label for="manager_name">Manager Name</label>
                <md-input
                  name="manager_name"
                  v-model="edit_store.manager_name"
                />
              </md-field>
              <md-field>
                <label for="manager_email">Manager Email</label>
                <md-input
                  name="manager_email"
                  v-model="edit_store.manager_email"
                />
              </md-field>
              <button class="md-button md-raised md-warning btn btn-warning">
                <div class="md-ripple">
                  <div class="md-button-content ">
                    Submit
                  </div>
                </div>
              </button>

              <!-- <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar> -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stores",
  data: () => ({
    table_filter: "",
    page: 1,
    per_page: 10,
    table_columns: [
      { label: "ID", field: "id", sortable: true, filterable: false },
      { label: "Name", field: "store_name", sortable: true, filterable: true },
      { label: "Address", field: "address", sortable: true, filterable: true },
      {
        label: "Location",
        field: "location",
        sortable: true,
        filterable: true
      },
      { label: "email", field: "email", sortable: true, filterable: true },
      { label: "Manager Name", field: "manager_name", sortable: true, filterable: true },
      { label: "Manager Email", field: "manager_email", sortable: true, filterable: true },
      { label: "Action", field: "action", sortable: false, interpolate: true }
    ],

    stores: [
      {
        id: "Loading...",
        store_name: "Loading...",
        address: "Loading...",
        location: "Loading...",
        email: "Loading...",
        manager_name: "Loading...",
        manager_email: "Loading..."
      }
    ],
    new_store: {
      id: "",
      store_name: "",
      address: "",
      branch_id: "",
      location: "",
      region: "",
      email: "",
      store_code: "",
      manager_name: "",
      manager_email: ""
    },
    edit_store: {
      id: "",
      store_name: "",
      address: "",
      branch_id: "",
      location: "",
      region: "",
      email: "",
      store_code: "",
      manager_name: "",
      manager_email: ""
    }
  }),

  methods: {
    searchOnTable () {
      this.searched = searchByName(this.stores, this.search);
    },

    getStores: function () {
      var req = {
        what: "stores"
      };

      this.$request
        .makeRequest("GET", req)
        .then(response => {
          if (response.type == req.what) {
            this.stores = response.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    createStore: function () {
      if (this.new_store.store_name == "MARKETSQUARE") {
        this.new_store.store_code = "MKS";
      } else if (this.new_store.store_name == "KILIMANJARO") {
        this.new_store.store_code = "KJ";
      } else if (this.new_store.store_name == "PIZZA JUNGLE") {
        this.new_store.store_code = "PJ";
      }

      var cf = {
        what: "store",
        data: this.new_store
      };

      this.$request
        .makeRequest("POST", cf)
        .then(response => {
          if (response.type == "store") {
            this.getStores();
            this.$toast.success("New store created successfully", {
              // optional options Object
            });
            this.new_store.id = "";
            this.new_store.store_name = "";
            this.new_store.address = "";
            this.new_store.branch_id = "";
            this.new_store.location = "";
            this.new_store.region = "";
            this.new_store.email = "";
            this.new_store.store_code = "";
            this.new_store.manager_name = "";
            this.new_store.manager_email = "";
          }
        })
        .catch(error => {
          this.$toast.error("Error creating new store, Please Try Again", {
            // optional options Object
          });
        });
    },
    getOutlet: function (code) {
      let outlet;
      if (code == "KJ") {
        outlet = "Kilimanjaro";
        document.getElementById("mks").classList.remove("active");
        document.getElementById("pj").classList.remove("active");
        document.getElementById("kj").classList.add("active");
      } else if (code == "PJ") {
        outlet = "Pizza Jungle";
        document.getElementById("mks").classList.remove("active");
        document.getElementById("kj").classList.remove("active");
        document.getElementById("pj").classList.add("active");
      } else if (code == "MKS") {
        outlet = "Marketsquare";
        document.getElementById("mks").classList.remove("active");
        document.getElementById("kj").classList.remove("active");
        document.getElementById("mks").classList.add("active");
      }

      var req = {
        what: "stores",
        code: code
      };

      this.$request
        .makeRequest("GET", req)
        .then(response => {
          if (response.type == req.what) {
            this.stores = response.data.data;
          }
        })
        .catch(error => {
        });
    },
    editStore: function (id) {
      if (this.edit_store.store_name == "MARKETSQUARE") {
        this.edit_store.store_code = "MKS";
      } else if (this.edit_store.store_name == "KILIMANJARO") {
        this.edit_store.store_code = "KJ";
      } else if (this.edit_store.store_name == "PIZZA JUNGLE") {
        this.edit_store.store_code = "PJ";
      }

      var es = {
        what: "update",
        id: id,
        data: this.edit_store
      };
      this.$request
        .makeRequest("PUT", es)
        .then(response => {
          if (response.type == "update") {
            this.getStores();
            this.$toast.success("Store Updated Successfully", {
              // optional options Object
            });
          }
        })
        .catch(error => {
          this.$toast.error("Update Error!!! Please Try Again", {
            // optional options Object
          });
        });
    },
    getStoreByID: function (id, vm = this) {
      this.stores.forEach(function (item, index) {
        if (item.id == id) {
          vm.edit_store = item;
        }
      });

      this.edit_store = vm.edit_store;
    },
    deleteStore: function (id) {
      var cf = {
        what: "delete",
        data: id
      };

      this.$request
        .makeRequest("DELETE", cf)
        .then(response => {
          if (response.type == "delete") {
            this.$toast.success("Store Deleted Successfully", {
              // optional options Object
            });
            window.location.reload();
          }
        })
        .catch(error => {
          this.$toast.error("Error!!!, Please Try Again", {
            // optional options Object
          });
        });
    }
  },
  created () {
    this.getStores();
    this.searched = this.stores;
  }
};
</script>
<style>
body {
  font-size: 1.1em !important;
}

.md-field {
  max-width: 300px;
}

.close {
  padding: 10px !important;
}

.outlets li {
  margin-top: 17px;
  padding: 6px 7px !important;
}
[data-background-color="orange"] {
  background: linear-gradient(60deg, #ffa726, #fb8c00);
  -webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
    0 7px 10px -5px rgba(255, 152, 0, 0.4);
  box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
    0 7px 10px -5px rgba(255, 152, 0, 0.4);
}
.md-toolbar.md-header {
  width: 60% !important;
  color: #fff !important;
}
.md-title {
  font-size: 18px !important;
}
.md-title,
.md-title i {
  color: #fff !important;
}
.md-toolbar-section-start {
  margin-top: -15px !important;
}
.md-button.md-mini {
  width: 33px !important;
  height: 33px !important;
}
.md-button .md-icon {
  font-size: 15px !important;
}
table th {
  font-size: 0.85em !important;
}
table td {
  font-size: 0.72em !important;
}
.md-field {
  max-width: 100% !important;
}
.btn-small {
  padding: 0 !important;
}
.md-icon.action {
  /* color: #00bcd4 !important; */
  font-size: 1.4em !important;
}
.pagination > .active > a,
.pagination > .active > a:focus,
.pagination > .active > a:hover,
.pagination > .active > span,
.pagination > .active > span:focus,
.pagination > .active > span:hover {
  background-color: #ff9800 !important;
  border-color: #ff9800 !important;
  color: #ffffff !important;
  -webkit-box-shadow: 0 4px 5px 0 rgba(156, 39, 176, 0.14),
    0 1px 10px 0 rgba(156, 39, 176, 0.12),
    0 2px 4px -1px rgba(156, 39, 176, 0.2);
  box-shadow: 0 4px 5px 0 rgba(156, 39, 176, 0.14),
    0 1px 10px 0 rgba(156, 39, 176, 0.12),
    0 2px 4px -1px rgba(156, 39, 176, 0.2) !important;
}
.store-tab:hover,
.store-tab:focus,
.store-tab.active {
  background: grey !important;
}
</style>
