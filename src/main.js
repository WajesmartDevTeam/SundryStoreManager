import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import axios from "axios";
import VueAxios from "vue-axios";
import Request from "./Request";
import swal from "sweetalert2";
import "bootstrap";
import "jquery";
import Popper from "popper.js";
global.Popper = Popper;
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// stylesheet
import "../src/assets/css/style.css";
import "../src/assets/css/material-dashboard98f3.css";
import DatatableFactory from 'vuejs-datatable/dist/vuejs-datatable.esm.js';
Vue.use(DatatableFactory);

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';

Vue.use(VueToast, {
    // One of options
    position: 'top-right',
    duration: 5000
})


import {
    MdButton,
    MdIcon,
    MdContent,
    MdTabs,
    MdTable,
    MdCard,
    MdField,
    MdRipple,
    MdToolbar,
    MdMenu,
    MdList
} from "vue-material/dist/components";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdIcon);
Vue.use(MdTable);
Vue.use(MdCard);
Vue.use(MdMenu);
Vue.use(MdList);
Vue.use(MdField);
Vue.use(MdRipple);
Vue.use(MdToolbar);
//scripts
// import "../src/assets/js/material.min.js";
// import "../src/assets/js/material-dashboard98f3.js";

Vue.use(VueAxios, axios);
Vue.prototype.$request = Request;
Vue.prototype.$swal = swal;

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");