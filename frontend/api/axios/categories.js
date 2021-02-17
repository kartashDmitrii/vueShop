export default function (instance) {
  return {
    getAll(){
      return instance.get('/categories')
    },
    getSome(param){
      return instance.get(`/categories/${param}`)
    },
    getCount(){
      return instance.get('/categories/count')
    },
    addNew(payload,access){
      return instance.post('/categories', payload, access)
    },
    delete(id, access){
      return instance.delete(`/categories/${id}`, access)
    }
  }
}
