export default function (instance) {
  return {
    getAll(){
      return instance.get('/properties')
    },
    getSome(param){
      return instance.get(`/properties/${param}`)
    },
    getCount(){
      return instance.get('/properties/count')
    },
    addNew(payload,access){
      return instance.post('/properties', payload, access)
    },
    delete(id, access){
      return instance.delete(`/properties/${id}`, access)
    }
  }
}
