import admin from 'firebase-admin'

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(
    {"projectId": process.env.FIREBASE_PROJECT_ID,
      "privateKey": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      "clientEmail": process.env.FIREBASE_CLIENT_EMAIL,
    }
                                   ),
  storageBucket:  "eat-with-friend.appspot.com"
})
// Cloud storage
const bucket = admin.storage().bucket()

export default bucket
