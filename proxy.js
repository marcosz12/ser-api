import express from 'express';
import cors from 'cors';
import axios from 'axios';

const PORT = 4000;
const apiKey = "57f5e7735c439ec1c684e4bb3df9212bdb531a76c7ff288baf87111286df736d";
const  app = express();

app.use(cors());

app.get('/search', async (req, res) => {
    
    
    const {query} = req.query;

    const URL = 'https://serpapi.com/search.json';
    try
    {const response = await axios.get(URL, {
        params:{
            q:query,
            api_key:apiKey,
            num:10,
            engine:"google",
            google_domain:"google.com.br",
            hl:"pt-br",
            gl:"br"
        }
    });
    res.json(response.data)
}catch {
    res.status(500).json({error : "Ocorreu um erro ao fazer a requisição à API"});
}
})




app.listen(PORT, () => {
    console.log(`O proxy está rodando na porta ${PORT}`)
});





