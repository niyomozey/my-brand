import app from './app'

const port = process.env.PORT || 1110;

app.listen(port, ()=>{
    console.log(`Connected on ${port} port`)
})
