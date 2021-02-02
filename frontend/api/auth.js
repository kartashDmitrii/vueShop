export default function (instance) {
  return {
    signIn(){
      // return instance.post('', payload)
      console.log('signIn');
    },
    signUp(payload){
      return instance.post('/auth/local', payload);
      // console.log('signUp');
    },
    // logout(){
    //   // return instance.delete('/auth/logout')
    // },
  }
}
