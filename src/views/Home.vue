<script setup lang="ts">
import { reactive } from "vue";
import {
  getAuth,
  signInWithPopup,
  TwitterAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  onSnapshot
} from "firebase/firestore";

const state = reactive({
  records: [] as { id: string; name: string }[]
});

const auth = getAuth();

const login = () => {
  const provider = new TwitterAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      if (user) {
        console.info(user);
      } else {
        alert("有効なアカウントではない");
      }
    })
    .catch((error) => {
      console.info(error);
    });
};

const create = (id: string, name: string) => {
  const db = getFirestore();
  const docRef = addDoc(collection(db, "records"), {
    id,
    name
  });
  console.info(docRef);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    const db = getFirestore();
    const q = query(collection(db, "records"), where("id", "==", "111"));
    onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          state.records.push({
            id: change.doc.data().id as string,
            name: change.doc.data().name as string
          });
        }
      });
    });
  }
});
</script>

<template>
  <main>
    <div class="login" @click="login">Twitter Login</div>
    <div class="create" @click="create('111', 'tsuki')">Create</div>
    <div v-for="item in state.records" :key="item.id">{{ item.name }}</div>
  </main>
</template>

<style scoped lang="scss">
.login {
  width: 120px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  background: plum;
  cursor: pointer;
}
.create {
  width: 120px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0;
  background: purple;
  cursor: pointer;
}
</style>
