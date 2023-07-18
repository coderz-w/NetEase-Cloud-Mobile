class myStorage {
    serStorage(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    }
    getStorage(key,value){
        const res=localStorage.getItem(key)
        if(res){
            return JSON.parse(res)
        }
    }
    removeStorage(key){
        localStorage.removeItem(key)
    }
    clearStorage(){
        localStorage.clear()
    }
}
let Storage=new myStorage()
export default Storage