import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from "@/firebase.config";
console.info(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);

const app = createApp(App);
app.use(createPinia());
app.use(router);

app.mount("#app");
