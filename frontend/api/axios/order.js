export default function (instance) {
  return {
    checkout(payload){
      return instance.post('/orders', payload)
    }
  }
}
