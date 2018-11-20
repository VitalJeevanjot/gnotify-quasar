// import something here
import Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
let config = {
  apiKey: 'AIzaSyBuMrGyuh5z3yr6bSNZxCo2eU2zxudV47c',
  authDomain: 'webnoticeboard.firebaseapp.com',
  databaseURL: 'https://webnoticeboard.firebaseio.com',
  projectId: 'webnoticeboard',
  storageBucket: 'webnoticeboard.appspot.com',
  messagingSenderId: '919374125152'
}
let app = Firebase.initializeApp(config)
let db = app.database()
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.prototype.$firebase = Firebase
  Vue.prototype.$bookref = db.ref('byteball_admin')
  Vue.prototype.$byteball_communityref = db.ref('byteball_community')
  Vue.prototype.$byteball_adminKeys = db.ref('byteball_admin_keys')
  Vue.prototype.$byteball_communityKeys = db.ref('byteball_community_keys')
  Vue.prototype.$specialKeys = db.ref('Special_Key')
}
