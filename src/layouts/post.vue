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
          @click="$router.push('/')"
        />
                  <!-- On click change the page to home -->
        <q-item>
          <q-item-side :avatar="this.profile_pic" />
        </q-item>
        <q-toolbar-title>
          {{this.title}}
          <span slot="subtitle">{{this.mobile_no}} - {{this.datetime}}</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
<!-- Post avatar here show big in circle image and then view to post starts -->
    <q-page-container>
      <q-page>
        <div class="row justify-center">
          <a :href="this.image">
            <img :src="this.image" class="responsive q-pt-sm" style="object-fit: cover;">
          </a>
        </div>
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
      model: '',
      title: '',
      datetime: '',
      profile_pic: '',
      mobile_no: '',
      books: [],
      image: ''
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
          this.mobile_no = this.books[i].Mobile
          this.title = this.books[i].Title
          this.datetime = this.books[i].DateTime
          this.profile_pic = this.books[i].Profile_Pic
          this.image = this.books[i].Image
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
          this.mobile_no = this.books[i].Mobile
          this.title = this.books[i].Title
          this.datetime = this.books[i].DateTime
          this.profile_pic = this.books[i].Profile_Pic
          this.image = this.books[i].Image
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
