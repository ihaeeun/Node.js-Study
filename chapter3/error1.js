setInterval(()=>{
    console.log('start');
    try{
        throw new Error('I will crash ther server');
    }catch(err){
        console.error(err);
    }
}, 1000);