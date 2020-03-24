// global.x = 12
let x =12
if(1){
    setTimeout(()=>{
        // global.x = 13
        x = 13
        console.log(`set x`)
    },2000)
}
if(1){
    setTimeout(()=>{
        // console.log(global.x)
        console.log(x)
    },3000)
   
}
