<template>
<q-layout view="lHh Lpr lFf">
  <q-modal v-model="opened" maximized no-backdrop-dismiss>
    <div class="row justify-center">
      <p class="text-light" align="center">Press `ESC` to go
        <q-btn flat @click.native="closeModal" label="back" />
      </p>
    </div>
    <div class="row">
      <div class="col-12">
        <q-editor v-model="model" :readonly="readonly" :disable="disable_editor" :toolbar="[
     ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
     ['token', 'hr', 'link', 'custom_btn'],
     ['print', 'fullscreen'],
     [
       {
         label: $q.i18n.editor.formatting,
         icon: $q.icon.editor.formatting,
         list: 'no-icons',
         options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
       },
       {
         label: $q.i18n.editor.fontSize,
         icon: $q.icon.editor.fontSize,
         fixedLabel: true,
         fixedIcon: true,
         list: 'no-icons',
         options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
       },
       {
         label: $q.i18n.editor.defaultFont,
         icon: $q.icon.editor.font,
         fixedIcon: true,
         list: 'no-icons',
         options: ['default_font', 'arial', 'arial_black', 'comic_sans', 'courier_new', 'impact', 'lucida_grande', 'times_new_roman', 'verdana']
       },
       'removeFormat'
     ],
     ['quote', 'unordered', 'ordered'],
     [
       {
         label: $q.i18n.editor.align,
         icon: $q.icon.editor.align,
         fixedLabel: true,
         options: ['left', 'center', 'right', 'justify']
       }
     ],
     ['undo', 'redo']
   ]"
          :fonts="{
     arial: 'Arial',
     arial_black: 'Arial Black',
     comic_sans: 'Comic Sans MS',
     courier_new: 'Courier New',
     impact: 'Impact',
     lucida_grande: 'Lucida Grande',
     times_new_roman: 'Times New Roman',
     verdana: 'Verdana'
   }" />

        <!-- <q-editor v-model="model" :toolbar="[]" readonly /> -->

      </div>
    </div>
    <br>
    <div style="padding: 10px" class="row justify-center" color="black">
      <div class="col-8">
        <q-input type="url" v-model="thumbnail" float-label="Add Thumbnail URL" />
        <q-input v-model="text" required prefix="+91" float-label="Mobile number *" placeholder="Enter 10 digit mobile number" />
        <q-input type="number" v-model="code" :disable="disable" float-label="Verification Code" />
      </div>
      <p class="text-light">You will receive SMS message with a code and standard rates will apply.</p>
    </div>
    <div class="row q-pa-sm justify-center">
      <q-btn :label="send" id="loginbtn" @click.native="sendsms" />
      <q-btn :hidden="hidden" label="Confirm" color="primary" id="loginbtn" @click.native="sendsms" class="q-ml-sm" />
    </div>
  </q-modal>
  <q-layout-header>
    <q-toolbar color="primary" :inverted="$q.theme === 'ios'">
      <q-toolbar-title align="center">
        G
        <div slot="subtitle">G</div>
      </q-toolbar-title>
      <q-btn icon="create" round flat id="postbtn" @click.native="openModal" />
    </q-toolbar>
  </q-layout-header>
  <q-page-container>
    <q-page>
      <q-tabs swipeable color="black" align="justify" v-model="selectedTab">
        <q-tab label="Admin Board" slot="title" name="tab-1" icon="dashboard" @select="openAdminBoard" />
        <q-tab label="Student board" slot="title" name="tab-2" icon="developer_board" @select="openStudentBoard" />
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
      opened: false,
      selectedTab: 'tab-1',
      text: '',
      code: '',
      disable: true,
      hidden: true,
      send: 'Send',
      model: '<h3>Header 3</h3><div>Normal text; <b>bold</b>; <i>italic</i>; <strike>strike-trough</strike>; <u style="font-weight: bold; font-style: italic;">bold, italic and underline</u>;</div><div><u>A <i style="font-weight: bold;">mo</i>re <i style="font-weight: bold;">com</i>plica</u>ted example.</div><div><br></div><div>Link to <a href="http://quasar-framework.org">Quasar Documentation</a></div><div><font face="Courier New">Using "Courier New" font.</font></div><div><ul><li>Vue</li><li>Webpack</li></ul><ol><li>Website</li><li>App</li><ol><li>Mobile (Cordova)</li><li>Electron</li></ol></ol><div style="text-align: center;">Center aligned text</div></div><div style="text-align: right;">Right aligned</div>',
      disable_editor: false,
      readonly: false,
      thumbnail: ''
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
    sendsms () {
      let mobileNo = '+91' + this.text
      console.log(mobileNo)
      try {
        this.$firebase.auth().signInWithPhoneNumber(mobileNo, window.recaptchaVerifier).then((confirmationResult) => {
          window.confirmationResult = confirmationResult
          this.disable = false
          this.hidden = false
          this.send = 'Resend'
          this.$q.notify({
            message: 'Sent!',
            color: 'primary'
          })
          console.log(confirmationResult)
        }).catch((err) => {
          this.disable = true
          this.hidden = true
          this.send = 'Send'
          this.$q.notify(err.message)
          console.log(err)
        })
      } catch (err) {
        this.$q.notify(err)
      }
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
    },
    onCreate () {
      console.log('creating post')
    },
    openModal () {
      this.opened = true
    },
    closeModal () {
      this.opened = false
    }
  },
  mounted () {
    // let book = null
    this.$firebase.auth().useDeviceLanguage()
    this.$bookref.on('value', (snapshot) => {
      console.log(snapshot.val())
      this.books = snapshot.val()
      console.log(this.books[1]['Random Seed'])
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
    window.recaptchaVerifier = new this.$firebase.auth.RecaptchaVerifier('loginbtn', {
      'size': 'invisible',
      'callback': function (response) {
        this.onCreate()
      }
    })
    //  console.log(this.books[1])
  }
}
</script>

<style>
</style>
