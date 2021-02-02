export default function (instance) {
  return {
    getAllProducts(){
      return instance.get('/products')
    },
    getSomeProduct(id){
      return instance.get(`/products/${id}`)
    },
    getCount(){
      return instance.get('/products/count')
    },
    addNewProduct(payload){
      return instance.post('/products', payload)
    }
  }
}
