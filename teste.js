const Instagram = require('instagram-web-api')
const  username =  'negojeff123'; 
const  password = 'popo8010'
 
const client = new Instagram({ username, password })
 
 
;(async () => {
  const response = await client.login()
  console.log(response)
  // const profile = await client.getProfile()
 
  // console.log(profile)

  // const teste = await client.follow({ userId: '3636495139' })
  // console.log(teste)

  console.log(await client.getUserByUsername({ username: 'Dc544060' }))
  // console.log( await client.getProfile({ username: 'jefersonalvessz' }))


//   await client.logout()

})()

// negojeff123
// Dc544060