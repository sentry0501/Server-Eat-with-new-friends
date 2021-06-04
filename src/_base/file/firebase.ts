import admin from 'firebase-admin'

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert("../eat-with-friend-firebase-adminsdk-snsz2-ec89410aa3.json"),
  storageBucket:  "eat-with-friend.appspot.com"
})
// Cloud storage
const bucket = admin.storage().bucket()

export default bucket
