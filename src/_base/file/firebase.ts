import admin from 'firebase-admin'

// Initialize firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert(
    { "projectId": "eatint-1677e",
      "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCjUNJA1Vy/343u\nZyt5aRYa0lGdeI/lZSPDLOZ9WSjgdxm0f5W0oFfwEVjl7xeJqnsmHX7hdr31xDih\nFk7ffvKVeTTE11luKUzIqugH8vcfzg/W4tlSSCy6LoyiiK+QU3Md6I0HdPKGoF34\nN0WCKQpp94PCZXEG/0tgpk2kNSmDKBrmaAbQ+u6ss4pDIACYAFuEMihFo/fwd9tv\nWFf6x37cUwl+gh9g7yEEnChI7WmeBCM/wpScXTdKEjE+JWRbg90pt1WClDwb+TFk\naflqJNZgtkekBFgEFTqFFoApufEcwg8X0wbU2tj3uK2o7wF/7lIh3nulNTAIy0kf\naDrn7rtRAgMBAAECgf9a/pbBAobbB93QDcvU3Q7KT8UJm2yrJt8pY15JGRRqSYt/\nXL1psEboi8HS22FrlhsBJNrWsY8sQ4twTzp2OTup7Ntp9+yFywOG1/+dIWxvwon9\njaE1WnsRTj5gxEFahb4hbyELUC3ETpxzYHIDqiCs48WWDc9PU488GqAuWsopnzM0\nwEAq7Bn1YTkkouuUfuLvcyjpZTjNesDlGZMzJf3Yuwnq7PY2SnBiVn2Q+/v5TIaL\nfpQRKeckJiYwyEd5zedgXXppcArnPby3dNh80tXap+CwAYQpB8JfdPHns2cNyLNW\nWvqvPt3dSw11puf2RY2+MjXYVHCKm1Vgpr+IMWECgYEA5HryL+VgFwE9yrMYA+BQ\nMcL7MpJRqmE3xePbn44B0qowMpvlR8xYiOR3k96x+w584c7cLWwGSwPqFrzX4FaS\n0ZxqO0jg9FkaPN6oEmVkXH6P3T7NVbCsBrfGOsNni8PLgIec+A1h67aRylzQnj+k\nKAG6n1l9sdxuBXKUDvuL9GECgYEAtvyQl4JpyfOwHFsAUCTwI5jP8wKSveo9/JlH\nPuXU4FH0BcEAn20wUD7f9AuxjGJJIreCo9TA9Rq+Eqv2JIvB8mSA8LfMcZ4nAmr7\nbMLlAMyyNxPI3xMY8Qf+6gCtx8Jib761DVbIxNq+RIvB1vcxb5+uNUlsdGBIwmQO\nV8pNLPECgYBHTSbvU4GdLEIAU8uWyhW8scB6k7bwmM4y71zGeiaPe5T29jejJF4s\nuj+m4cRhOLA4N7n2YtPD7UDMP7qOw/WlfE6ama+6EWRiwolo1ENxqf1zafniV/QX\nVJqEFB7oOv3y6l9N+b8pNBxjLnvcJrgv0/pNaDwVmVisUolp845FgQKBgELTjgKm\n7/d+9WwFl+Gs+74kSp1W7TxKVYTwfWJtEQczJskLKS0P9Tr5G1THCHpaUpdJKX6n\nbiiVMaEkB+pk19mr9qLynMlJlrl9VIDt1DAskVEn+o3tLYipAOF4if6P8N8aaIiM\njxnFQQNLfukAsZ8wU7DGNcNyfl/vpoVNLk4hAoGBAJjRYnB9XWHnDHexXYbngPc1\n0L7YJ83m2szPLko6q7EJe1f2kyR8D7tIdawWI10FiCypZIrZQDyTWP5A6JQ6nwNC\nr1cqudSsa/9R5j3SKCVVul5HV5kLC+LCu3vFMFEvYwQSh9QBXqnCJYn7/prWTNjH\njGwC5lScmhtyidWuZjfm\n-----END PRIVATE KEY-----\n",
      "clientEmail": "firebase-adminsdk-5h6mm@eatint-1677e.iam.gserviceaccount.com",
    }
                                   ),
  storageBucket:  "eatint-1677e.appspot.com"
})
// Cloud storage
const bucket = admin.storage().bucket()

export default bucket
