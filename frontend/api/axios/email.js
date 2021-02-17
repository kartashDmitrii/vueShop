export default function (instance) {
  return {
    sendTest(payload){
      return instance.post('/emails', payload)
    },
  }
}
