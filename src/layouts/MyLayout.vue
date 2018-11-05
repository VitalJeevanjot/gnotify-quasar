<template>
<q-layout view="lHh Lpr lFf">
  <q-layout-header>
    <q-toolbar color="primary" :inverted="$q.theme === 'ios'">
      <q-toolbar-title align="center">
        G
        <div slot="subtitle">G</div>
      </q-toolbar-title>
    </q-toolbar>
  </q-layout-header>
  <q-page-container>
    <q-page>
      <q-tabs swipeable color="black" align="justify" v-model="selectedTab">
        <q-tab label="Admin Board" slot="title" name="tab-1" icon="dashboard"  @select="openAdminBoard"/>
        <q-tab label="Student board" slot="title" name="tab-2" icon="developer_board" @select="openStudentBoard"/>
      </q-tabs>
      <!-- // random string generator for urls https://helloacm.com/api/random/?n=128 -->
      <div class="row justify-center">
        <q-card class="q-ma-sm" inline style="width: 400px; height:auto;" v-for='book in books' :key='book.Title'>
          <q-card-media>
            <!-- <img v-bind:src="book.Image" style="width: 400px; height:250px;"/> -->
            <div class="wrap" style="overflow: hidden;">
            <object width="400px" height="250px" style="object-fit:cover" v-bind:data="book.Image" frameborder="0"></object>
          </div>
          </q-card-media>
          <q-card-title>
            <a href="#" style="color: #000000; text-decoration: none;">{{book.Title}}</a>
          </q-card-title>
          <q-card-main>
            <a href="#" style="color: #000000; text-decoration: none;">
              <p class="text-faded">{{book.Description}}</p>
            </a>
          </q-card-main>
        </q-card>
      </div>
    </q-page>
  </q-page-container>
</q-layout>
</template>

<script>
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      books: [],
      selectedTab: 'tab-1'
    }
  },
  methods: {
    openStudentBoard () {
      console.log('opening S board')
      this.books = []
      this.$studentref.on('value', (snapshoti) => {
        console.log(snapshoti.val())
        this.books = snapshoti.val()
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code)
      })
    },
    openAdminBoard () {
      console.log('opening A board')
      this.books = []
      this.$bookref.on('value', (snapshot) => {
        console.log(snapshot.val())
        this.books = snapshot.val()
        console.log(this.books[1]['Random Seed'])
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code)
      })
    }
  },
  mounted () {
    // let book = null
    this.$bookref.on('value', (snapshot) => {
      console.log(snapshot.val())
      this.books = snapshot.val()
      console.log(this.books[1]['Random Seed'])
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
    //  console.log(this.books[1])
  }
}
</script>

<style>
</style>
