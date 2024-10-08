import axios from 'axios';
import { useState } from 'react';
import Gooolgle from '../assets/images (2).jfif';
 
const Search = () => {

    const [query, setQuery] = useState("");
    const [results,setResults] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();

        setError("");

    if(!query) {
        return;
    }
    
    try{
        setLoading(true);
        const URL = "http://localhost:4000/search";
        const res = await axios.get(URL, {
            params:{
                query:query,
            }
        });
        const data = res.data.organic_results || [];  
        setResults(data)
    }   catch (err) {
        console.error(err);
        setError("Messi disse que tem erro na sua busca!");
    } finally{
        setLoading(false);
    }
    };


    return (
        <div className="App">
            <div className="title">
                <h1>Messi no Coringão pesquisas!</h1>
                <img src={Gooolgle} alt="Messi" />
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Buscar' onChange={(e) => setQuery(e.target.value)} />
                <button type='submit'>Buscar</button>
            </form>
            <div>
                {}
        {error ? (
          <p>{error}</p>
        ) : loading ? (
          <p>Carregando...</p>
        ) : (
          <ul>
         { results.map((results, index) => {
            return (
              <li key={index}>
                <a
                  href={results.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {results.title}
                </a>
                <p>{results.snippet}</p>
              </li>
            );
          })}
          </ul>
        )}
     
    </div>
  </div>
);
};

export default Search;
