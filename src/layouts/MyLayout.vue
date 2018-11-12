<template>
<q-layout view="lHh Lpr lFf">
  <q-modal v-model="opened" maximized no-backdrop-dismiss>
    <div class="row justify-center">
      <p class="text-light" align="center">Press `ESC` to go back or click
        <q-btn flat @click.native="closeModal" label="back" />
      </p>
    </div>
    <span class="text-light" align="center">Posting in {{this.wheretoPost.replace('/','')}}
    </span>
    <div class="row">
      <div class="col-12">
        <q-input type="text" :maxlength="90" inverted color="secondary" no-shadow :error="error_title" v-model="title" float-label="Add Title *" clearable />
      </div>
      <br>
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
    <div style="padding: 10px" class="row justify-around" color="black">
      <div class="col-md-5">
        <q-uploader :url="uploader_url" @add="thumbnailAdded" @remove:cancel="thumbnailRemoved" @remove:done="thumbnailRemoved" @remove:abort="thumbnailRemoved" hide-upload-button :name='thumbnail' float-label="Upload Thumbnail" extensions=".jpeg, .jpg, .png, .gif"
          :error="error_thumbnail" />
        <!-- <q-input type="url" readonly :error="error_thumbnail" v-model="thumbnail" float-label="Add Thumbnail *" clearable />
          <q-btn flat dense icon="file_upload" class="float-right" css="position: absolute;"/> -->
      </div>

      <div class="col-md-5">
        <q-uploader :url="uploader_url" @add="ppadded" @remove:cancel="ppRemoved" @remove:done="ppRemoved" @remove:abort="ppRemoved" hide-upload-button :name="profile_pic" float-label="Upload Profile Picture" extensions=".jpeg, .jpg, .png, .gif"
          :error="error_profilepic" />
        <!-- <q-input type="url" readonly :error="error_profilepic" v-model="profile_pic" float-label="Add Profile Pic *" clearable />
          <q-btn flat dense icon="file_upload" class="float-right"/> -->
      </div>
    </div>
    <div class="row justify-center">
      <!-- Instead of input add a button here -->
      <div class="col-7 q-pr-sm">
        <q-input type="tel" :readonly="readonly_code" :error="error_auth_code" v-model="auth_text" required float-label="AUTH Code *" clearable :maxlength="10" :decimals="0" placeholder="Enter AUTH Code" />
      </div>
      <div class="col-7 q-pr-sm">
        <q-input type="tel" :error="error_mobile" v-model="text" required prefix="+91" float-label="Mobile number *" clearable :maxlength="10" :decimals="0" placeholder="Enter 10 digit mobile number" />
      </div>
      <div class="col-6 q-pl-sm">
        <q-input type="tel" :error="error_verification" v-model="code" :disable="disable" float-label="Verification Code *" clearable :maxlength="6" :decimals="0" />
      </div>
      <div class="col-8 q-pl-sm">
        <p class="text-light" align="center">You will receive SMS message with a code and standard rates will apply.</p>
      </div>
    </div>
    <div class="row q-pa-sm justify-center">
      <q-btn :label="send" id="sendSms" @click.native="sendsms" />
      <q-btn :hidden="hidden" label="Confirm" color="primary" @click.native="publishPost" class="q-ml-sm" />
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
      <q-tabs underline-color="secondary" swipeable color="black" align="justify" v-model="selectedTab">
        <q-tab label="Admin Board" slot="title" name="tab-1" icon="dashboard" @select="openAdminBoard" />
        <q-tab label="Student board" slot="title" name="tab-2" icon="developer_board" @select="openStudentBoard" />
      </q-tabs>
      <!-- // random string generator for urls https://helloacm.com/api/random/?n=128 -->
      <div class="row justify-center">
        <q-card class="q-ma-sm" inline style="width: 400px; height:auto;" v-for='book in books.slice().reverse()' v-if='book.null === "false"' :key='book.Random_Seed'>
          <q-item>
            <q-item-side :avatar="book.Profile_Pic" />
            <q-item-main>
              <router-link :to="'post/' + wheretoPost + book.Random_Seed + '/' + book.post_id" style="color: #000000; text-decoration: none">
                <q-item-tile label>{{book.Title}}</q-item-tile>
                <q-item-tile sublabel>{{book.DateTime}}</q-item-tile>
              </router-link>
            </q-item-main>
          </q-item>
          <q-card-media>
            <!-- <img v-bind:src="book.Image" style="width: 400px; height:250px;"/> -->
            <div class="wrap" style="overflow: hidden;">
              <object width="400px" height="250px" style="object-fit:cover" v-bind:data="book.Image" frameborder="0"></object>
            </div>
          </q-card-media>
          <q-card-main>
            <!-- <a href="#" style="color: #000000; text-decoration: none;"> Upcoming feature for sorting posts based on mobile numbers-->
              <p class="text-faded">{{book.Mobile}}</p>
            <!-- </a> -->
          </q-card-main>
        </q-card>
      </div>
    </q-page>
  </q-page-container>
</q-layout>
</template>

<script>
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      books: [],
      opened: false,
      selectedTab: 'tab-1',
      text: '',
      title: '',
      code: '',
      disable: true,
      hidden: true,
      send: 'Send',
      model: '<h3>Header 3</h3><div>Normal text; <b>bold</b>; <i>italic</i>; <strike>strike-trough</strike>; <u style="font-weight: bold; font-style: italic;">bold, italic and underline</u>;</div><div><u>A <i style="font-weight: bold;">mo</i>re <i style="font-weight: bold;">com</i>plica</u>ted example.</div><div><br></div><div>Link to <a href="http://quasar-framework.org">Quasar Documentation</a></div><div><font face="Courier New">Using "Courier New" font.</font></div><div><ul><li>Vue</li><li>Webpack</li></ul><ol><li>Website</li><li>App</li><ol><li>Mobile (Cordova)</li><li>Electron</li></ol></ol><div style="text-align: center;">Center aligned text</div></div><div style="text-align: right;">Right aligned</div>',
      disable_editor: false,
      readonly: false,
      thumbnail: '',
      error_mobile: false,
      error_verification: false,
      error_thumbnail: false,
      error_title: false,
      error_profilepic: false,
      profile_pic: '',
      uploader_url: '', // Add server url to handle upload
      timestamp: null,
      pp_files: [],
      thumbnail_files: [],
      pp_fileURL: null,
      thumbnail_fileURL: null,
      wheretoPost: 'admin/',
      auth_text: '',
      error_auth_code: false,
      admin_keys: [],
      student_keys: [],
      canPostInAdmin: false,
      canPostInStudent: false,
      readonly_code: false
    }
  },
  methods: {
    ppadded (files) {
      // console.log(files[0])
      this.pp_files = files
      this.profile_pic = files[0].name
    },
    thumbnailAdded (files) {
      // console.log(files[0])
      this.thumbnail_files = files
      this.thumbnail = files[0].name
    },
    ppRemoved (file) {
      this.profile_pic = ''
      this.pp_files = []
    },
    thumbnailRemoved (file) {
      this.thumbnail_files = []
      this.thumbnail = ''
    },
    openStudentBoard () {
      this.$q.loading.show()
      // this.$router.push('/student')
      this.wheretoPost = 'student/'
      // console.log('opening S board')
      this.books = []
      this.$studentref.once('value', (snapshoti) => {
        // console.log(snapshoti.val())
        this.$q.loading.hide()
        this.books = snapshoti.val()
        // console.log(this.books)
        // console.log(this.books)
      }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code)
      })
    },
    sendsms () {
      this.$q.loading.show({message: 'Please Wait...'})
      if (this.$v.text.$invalid) {
        this.$q.notify('10 Digit Mobile number is required.')
        this.error_mobile = true
        this.$q.loading.hide()
      } else if (this.$v.thumbnail.$invalid) {
        this.$q.notify('A Thumbnail image or video is required')
        this.error_thumbnail = true
        this.error_mobile = false
        this.$q.loading.hide()
      } else if (this.$v.title.$invalid) {
        this.$q.notify('Enter a valid title with a length of 8 characters or more but less than 90.')
        this.error_thumbnail = false
        this.error_mobile = false
        this.error_title = true
        this.$q.loading.hide()
      } else if (this.$v.profile_pic.$invalid) {
        this.$q.notify('Enter a valid title with a length of 8 characters or more but less than 90.')
        this.error_thumbnail = false
        this.error_mobile = false
        this.error_title = false
        this.error_profilepic = true
        this.$q.loading.hide()
      } else if (this.$v.auth_text.$invalid) {
        this.$q.notify('Enter a valid AUTH code')
        this.error_thumbnail = false
        this.error_mobile = false
        this.error_title = false
        this.error_profilepic = false
        this.error_auth_code = true
        this.$q.loading.hide()
      } else {
        this.error_mobile = false
        this.error_thumbnail = false
        this.error_title = false
        this.error_profilepic = false
        this.error_auth_code = false
        let mobileNo = '+91' + this.text
        // console.log(mobileNo)
        if (this.wheretoPost === 'student/') {
          this.canPostInStudent = false
          this.canPostInAdmin = false // These lines here and in below block ensure that after posting on student the user cannot post in admin.
          for (var i = 0; i < this.student_keys.length; i++) {
            if (this.student_keys[i].Key.toString() === this.auth_text && this.student_keys[i].Can_Use === 'true') {
              this.canPostInStudent = true
              this.canPostInAdmin = false
              this.readonly_code = true
            }
          }
          if (this.canPostInStudent === false) {
            this.$q.notify('Your code is not correct or your code is disabled.')
            this.$q.loading.hide()
          }
        } else if (this.wheretoPost === 'admin/') {
          this.canPostInStudent = false
          this.canPostInAdmin = false
          for (var ia = 0; ia < this.admin_keys.length; ia++) {
            if (this.admin_keys[ia].Key.toString() === this.auth_text && this.admin_keys[ia].Can_Use === 'true') {
              this.canPostInStudent = false
              this.canPostInAdmin = true
              this.readonly_code = true
            }
          }
          if (this.canPostInAdmin === false) {
            this.$q.notify('Your code is not correct or your code is disabled.')
            this.$q.loading.hide()
          }
        }
        if (this.canPostInAdmin === true || this.canPostInStudent === true) {
          try {
            this.$firebase.auth().signInWithPhoneNumber(mobileNo, window.recaptchaVerifier).then((confirmationResult) => {
              window.confirmationResult = confirmationResult
              this.$q.loading.hide()
              this.disable = false
              this.hidden = false
              this.send = 'Resend'
              this.$q.notify({
                message: 'Sent!',
                color: 'primary'
              })
              // console.log(confirmationResult)
            }).catch((err) => {
              this.$q.loading.hide()
              this.disable = true
              this.hidden = true
              this.send = 'Send'
              this.$q.notify(err.message)
            })
          } catch (err) {
            this.$q.notify(err)
            this.$q.loading.hide()
          }
        }
      }
    },
    openAdminBoard () {
      this.$q.loading.show()
      // console.log('opening A board')
      this.books = []
      this.wheretoPost = 'admin/'
      this.$bookref.once('value', (snapshot) => {
        // console.log(snapshot.val())
        this.books = snapshot.val()
        this.$q.loading.hide()
        // console.log(this.books[1]['Random Seed'])
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
    },
    async publishPost () { // First checks all validation -> Upload Profile Pic -> Uplaod Thumbnail -> post on firebase
      this.$q.loading.show({message: 'Please Wait...'})
      await this.setTimeStamp() // Updating time here everytime before posting.
      if (this.$v.text.$invalid) {
        this.$q.notify('10 Digit Mobile number is required.')
        this.error_mobile = true
        this.$q.loading.hide()
      } else if (this.$v.thumbnail.$invalid) {
        this.$q.notify('A Thumbnail image or video is required')
        this.error_mobile = false
        this.error_thumbnail = true
        this.$q.loading.hide()
      } else if (this.$v.title.$invalid) {
        this.$q.notify('Enter a valid title with a length of 8 or more but less than 90.')
        this.error_thumbnail = false
        this.error_mobile = false
        this.error_title = true
        this.$q.loading.hide()
      } else if (this.$v.code.$invalid) {
        this.error_mobile = false
        this.error_thumbnail = false
        this.error_title = false
        this.error_verification = true
        this.$q.loading.hide()
        this.$q.notify('Please enter correct 6 digit verification code')
      } else if (this.$v.profile_pic.$invalid) {
        this.$q.notify('Enter a valid title with a length of 8 characters or more but less than 90.')
        this.error_thumbnail = false
        this.error_mobile = false
        this.error_title = false
        this.error_profilepic = true
        this.$q.loading.hide()
      } else if (this.$v.auth_text.$invalid) {
        this.$q.notify('Enter a valid AUTH code')
        this.error_thumbnail = false
        this.error_mobile = false
        this.error_title = false
        this.error_profilepic = false
        this.error_auth_code = true
      } else {
        this.error_mobile = false
        this.error_thumbnail = false
        this.error_verification = false
        this.error_title = false
        this.error_profilepic = false
        this.error_auth_code = false
        window.confirmationResult.confirm(this.code).then(() => {
          this.opened = false
          let formDatap = new FormData()
          console.log(this.pp_files[0])
          formDatap.append('file', this.pp_files[0])
          formDatap.append('tags', `gndu, board, notice`)
          formDatap.append('upload_preset', 'myldschl') // Replace the preset name with your own
          formDatap.append('api_key', '985345875982584') // Replace API key with your own Cloudinary key
          formDatap.append('timestamp', (this.timestamp / 1000) | 0)
          this.$axios.post('https://api.cloudinary.com/v1_1/dpnrocxf9/image/upload', formDatap, {
            headers: {
              'X-Requested-With': 'XMLHttpRequest'
            }
          }).then((responsep) => {
            let datap = responsep.data
            this.pp_fileURL = datap.secure_url // You should store this URL for future references in your app
            // console.log(data)
            console.log(this.pp_fileURL)
            // Thumbnail upload...
            let formData2 = new FormData()
            formData2.append('file', this.thumbnail_files[0])
            formData2.append('tags', `gndu, board, notice`)
            formData2.append('upload_preset', 'myldschl') // Replace the preset name with your own
            formData2.append('api_key', '985345875982584') // Replace API key with your own Cloudinary key
            formData2.append('timestamp', (this.timestamp / 1000) | 0)
            this.$axios.post('https://api.cloudinary.com/v1_1/dpnrocxf9/image/upload', formData2, {
              headers: {
                'X-Requested-With': 'XMLHttpRequest'
              }
            }).then((responset) => {
              let datat = responset.data
              this.thumbnail_fileURL = datat.secure_url
              // console.log(data)
              console.log(this.thumbnail_fileURL)
              this.$axios.get('https://helloacm.com/api/random/?n=128').then((response) => {
                this.$firebase.database().ref(this.wheretoPost + this.books.length).set({
                  Body: this.model,
                  Comments: 'later',
                  Image: this.thumbnail_fileURL,
                  Mobile: this.text,
                  Random_Seed: response.data,
                  Recent_Post: this.books.length - 1,
                  Title: this.title,
                  Upvotes: '0',
                  DateTime: this.timestamp.toString(),
                  Profile_Pic: this.pp_fileURL,
                  Updated_On: this.timestamp.toString(),
                  null: 'false',
                  code_used: this.auth_text,
                  post_id: this.books.length // for routing purposes
                }).then(() => {
                  this.$q.notify({
                    message: 'Post Published! Refresh your page.',
                    color: 'green'
                  })
                  this.$q.loading.hide()
                  this.readonly_code = false
                  this.opened = false
                  this.hidden = true
                }).catch((err) => {
                  this.$q.notify(err.message)
                  this.$q.loading.hide()
                })
              }).catch((err) => {
                this.$q.notify(err)
                this.$q.loading.hide()
              })
            }).catch((err) => {
              this.$q.notify(err)
              this.$q.loading.hide()
            })
          }).catch((err) => {
            this.$q.notify(err)
            this.$q.loading.hide()
          })
        }).catch((err) => {
          this.$q.notify(err)
          this.$q.loading.hide()
        })
      }
    },
    async setTimeStamp () {
      await this.$axios.get('http://worldclockapi.com/api/json/utc/now').then((res) => {
        this.timestamp = new Date(res.data.currentDateTime)
        // console.log(this.timestamp / 1000 + 'OK')
      }).catch((err) => {
        this.$q.notify(err)
      })
    }
  },
  mounted () {
    // let book = null
    this.books = []
    this.$q.loading.show()
    this.setTimeStamp()
    this.$firebase.auth().useDeviceLanguage()
    this.$bookref.once('value', (snapshot) => {
      // console.log(snapshot.val())
      this.books = snapshot.val()
      this.$q.loading.hide()
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
    this.$adminKeys.on('value', (snapshot) => {
      // console.log(snapshot.val())
      this.admin_keys = snapshot.val()
      this.$q.loading.hide()
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
    this.$studentKeys.on('value', (snapshot) => {
      // console.log(snapshot.val())
      this.student_keys = snapshot.val()
      this.$q.loading.hide()
    }, function (errorObject) {
      console.log('The read failed: ' + errorObject.code)
    })
    window.recaptchaVerifier = new this.$firebase.auth.RecaptchaVerifier('sendSms', {
      'size': 'invisible',
      'callback': function (response) {}
    })
    //  console.log(this.books[1])
  },
  validations: {
    text: {
      required,
      minLength: minLength(10)
    },
    thumbnail: {
      required
    },
    code: {
      required,
      minLength: minLength(6)
    },
    title: {
      required,
      minLength: minLength(8),
      maxlength: maxLength(90)
    },
    profile_pic: {
      required
    },
    auth_text: {
      required,
      minLength: minLength(9),
      maxlength: maxLength(10)
    }
  }
}
</script>

<style>
</style>
