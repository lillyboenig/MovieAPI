import express, { urlencoded } from 'express';

var app = express();

app.use(express.urlencoded({extended: true}));


app.listen(3001, () => {
    console.log('The server is running!!');
});

app.get('/', (req, res) => {
    res.send('You just called endpoint');
})

app.get('/customer', (req, res) => {
    res.send('Getting user information');
})

