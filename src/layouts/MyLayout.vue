<template>
<q-layout view="lHh Lpr lFf">
  <q-layout-header>
    <q-toolbar color="primary" :inverted="$q.theme === 'ios'">
      <q-toolbar-title align="center">
        Guru Nanak Dev University
        <div slot="subtitle">GNDU notifications</div>
      </q-toolbar-title>
    </q-toolbar>
  </q-layout-header>
  <q-page-container>
    <q-page>
      <q-tabs swipeable color="black" align="justify">
        <q-tab label="Admin Board" default slot="title" name="tab-1" icon="dashboard"/>
        <q-tab label="Student board" slot="title" name="tab-2" icon="developer_board"/>
      </q-tabs>
      <div class="row justify-center">
        <q-card class="q-ma-sm" inline style="width: 400px;">
          <q-card-media>
            <img style="width: 400px; height: 250px; object-fit:cover" src="https://preview.redd.it/spo5q1n66gg11.jpg?width=640&crop=smart&auto=webp&s=b06647b00048ec8d32aa22f50ed7a825db9d6717">
          </q-card-media>
          <q-card-title>
            Cafe Basilico
            <div slot="right" class="row items-center">
              <q-icon name="place" /> 250 ft
            </div>
          </q-card-title>
          <q-card-main>
            <p>$・Italian, Cafe</p>
            <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p>
          </q-card-main>
          <q-card-separator />
          <q-card-actions>
            <q-btn flat round dense icon="event" />
            <q-btn flat label="5:30PM" />
            <q-btn flat label="7:30PM" />
            <q-btn flat label="9:00PM" />
            <q-btn flat color="primary" label="Reserve" />
          </q-card-actions>
        </q-card>
        <q-card class="q-ma-sm" inline style="width: 400px;">
          <q-card-media>
            <img style="width: 400px; height: 250px; object-fit:cover" src="https://preview.redd.it/spo5q1n66gg11.jpg?width=640&crop=smart&auto=webp&s=b06647b00048ec8d32aa22f50ed7a825db9d6717">
          </q-card-media>
          <q-card-title>
            Cafe Basilico
            <div slot="right" class="row items-center">
              <q-icon name="place" /> 250 ft
            </div>
          </q-card-title>
          <q-card-main>
            <p>$・Italian, Cafe</p>
            <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p>
          </q-card-main>
          <q-card-separator />
          <q-card-actions>
            <q-btn flat round dense icon="event" />
            <q-btn flat label="5:30PM" />
            <q-btn flat label="7:30PM" />
            <q-btn flat label="9:00PM" />
            <q-btn flat color="primary" label="Reserve" />
          </q-card-actions>
        </q-card>
        <q-card class="q-ma-sm" inline style="width: 400px;">
          <q-card-media>
            <img style="width: 400px; height: 250px; object-fit:cover" src="https://preview.redd.it/spo5q1n66gg11.jpg?width=640&crop=smart&auto=webp&s=b06647b00048ec8d32aa22f50ed7a825db9d6717">
          </q-card-media>
          <q-card-title>
            Cafe Basilico
            <div slot="right" class="row items-center">
              <q-icon name="place" /> 250 ft
            </div>
          </q-card-title>
          <q-card-main>
            <p>$・Italian, Cafe</p>
            <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p>
          </q-card-main>
          <q-card-separator />
          <q-card-actions>
            <q-btn flat round dense icon="event" />
            <q-btn flat label="5:30PM" />
            <q-btn flat label="7:30PM" />
            <q-btn flat label="9:00PM" />
            <q-btn flat color="primary" label="Reserve" />
          </q-card-actions>
        </q-card>
        <q-card class="q-ma-sm" inline style="width: 400px;">
          <q-card-media>
            <img style="width: 400px; height: 250px; object-fit:cover" src="https://preview.redd.it/spo5q1n66gg11.jpg?width=640&crop=smart&auto=webp&s=b06647b00048ec8d32aa22f50ed7a825db9d6717">
          </q-card-media>
          <q-card-title>
            Cafe Basilico
            <div slot="right" class="row items-center">
              <q-icon name="place" /> 250 ft
            </div>
          </q-card-title>
          <q-card-main>
            <p>$・Italian, Cafe</p>
            <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p>
          </q-card-main>
          <q-card-separator />
          <q-card-actions>
            <q-btn flat round dense icon="event" />
            <q-btn flat label="5:30PM" />
            <q-btn flat label="7:30PM" />
            <q-btn flat label="9:00PM" />
            <q-btn flat color="primary" label="Reserve" />
          </q-card-actions>
        </q-card>
        <q-card class="q-ma-sm" inline style="width: 400px;">
          <q-card-media>
            <img style="width: 400px; height: 250px; object-fit:cover" src="https://preview.redd.it/spo5q1n66gg11.jpg?width=640&crop=smart&auto=webp&s=b06647b00048ec8d32aa22f50ed7a825db9d6717">
          </q-card-media>
          <q-card-title>
            Cafe Basilico
            <div slot="right" class="row items-center">
              <q-icon name="place" /> 250 ft
            </div>
          </q-card-title>
          <q-card-main>
            <p>$・Italian, Cafe</p>
            <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p>
          </q-card-main>
          <q-card-separator />
          <q-card-actions>
            <q-btn flat round dense icon="event" />
            <q-btn flat label="5:30PM" />
            <q-btn flat label="7:30PM" />
            <q-btn flat label="9:00PM" />
            <q-btn flat color="primary" label="Reserve" />
          </q-card-actions>
        </q-card>
      </div>
    </q-page>
  </q-page-container>
</q-layout>
</template>

<script>
import {
  openURL
} from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      books: this.$bookref
    }
  },
  methods: {
    openURL
  },
  mounted () {
    // let book = null
    this.$bookref.on('value', function (snapshot) {
      console.log(snapshot.val()[1])
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
    //  console.log(this.books[1])
  }
}
</script>

<style>
</style>
