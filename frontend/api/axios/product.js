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
    addNewProduct(payload,access){
      return instance.post('/products', payload, access)
    },
    deleteProduct(id, access){
      return instance.delete(`/products/${id}`, access)
    }
  }
}
