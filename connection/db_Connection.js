import mongoose from 'mongoose'
export const dbConnection=()=>{
    mongoose.connect(process.env.DB_URL,{
       
    }).then(()=>{
        console.log('connected properly')
    }).catch(()=>{
        console.log('not connected')
    })
}

