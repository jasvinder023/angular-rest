let jwt = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYXN2aW5kZXIiLCJleHAiOjE1Njk3NjkwMDMsImlhdCI6MTU2OTc2ODg4MywiQVVUSE9SSVRZIjpbIkFETUlOIiwiTUFOQUdFUiJdfQ.Ht6aWg0zS3bCiWAI8b9QieJCYULvfprRvX5zmt-lzVYvZmbjx30UTw6OJvWPdo3a9cVbdljPQh1j-I58BJUIKg'

let jwtData = jwt.split('.')[1]
let decodedJwtJsonData = window.atob(jwtData)
# this is rbac 
let decodedJwtData = JSON.parse(decodedJwtJsonData)

let rolesList= decodedJwtData.AUTHORITY


console.log('jwtData: ' + jwtData)
console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
console.log('decodedJwtData: ' + decodedJwtData)
console.log('Roles: ' + rolesList);