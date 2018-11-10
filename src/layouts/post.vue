<template>
  <q-layout> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-layout-header>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="arrow_back"
          @click="null"
        />
                  <!-- On click change the page to home -->
        <q-item>
          <q-item-side avatar="https://pbs.twimg.com/profile_images/1057899591708753921/PSpUS-Hp_400x400.jpg" style="width: 100% !important; height: 100% !important" />
        </q-item>
        <q-toolbar-title>
          Post Title
          <span slot="subtitle">Mobile no and date</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
<!-- Post avatar here show big in circle image and then view to post starts -->
    <q-page-container>
      <!-- This is where pages get injected -->
      <q-page>
        <div class="row justify-center">
          <q-editor v-model="model" :toolbar="[]" readonly style="width: 100%;"/>
        </div>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<style>
</style>
<script>

export default {
  // name: 'LayoutName',
  data () {
    return {
      leftDrawer: true,
      model: '',
      posts: []
    }
  },
  mounted () {
    this.$q.loading.show()
    console.log(this.$route.params.pn)
    this.$bookref.on('value', (snapshot) => {
      this.books = []
      this.books = snapshot.val()
      for (var i = 0; i < this.books.length; i++) {
        if (this.books[i].Random_Seed === this.$route.params.id) {
          this.model = this.books[i].Body
          this.$q.loading.hide()
        }
      }
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
    this.$studentref.on('value', (snapshoti) => {
      // console.log(snapshoti.val())
      this.books = []
      this.books = snapshoti.val()
      console.log(this.books)
      for (var i = 0; i < this.books.length; i++) {
        if (this.books[i].Random_Seed === this.$route.params.id) {
          this.model = this.books[i].Body
          this.$q.loading.hide()
        }
      }
      console.log(this.books)
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
  }
}
</script>
