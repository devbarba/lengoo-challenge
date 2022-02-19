db.createUser({
    user: 'harbs',
    pwd: 'harbsLengooChallenge',
    roles: [
      {
        role: 'readWrite',
        db: 'lengoo',
      },
    ],
  })
  
  db.createCollection('users')
  db.createCollection('translations')
  db.createCollection('subtitles')