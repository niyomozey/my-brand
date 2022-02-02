import app from './app'

const port = process.env.port || 1111;

app.listen(port, ()=>{
    console.log(`Connected on ${port} port`)
})
