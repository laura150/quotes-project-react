import React, {useState, useEffect} from 'react';
import {
    getAuthors,
    getQuoteById,
    getQuotesByAuthor,
    getRandomQuote
  } from './Quoteapi'
  

function App() {
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [authorName, setAuthorName] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [quote, setQuote] = useState({text:"",author:""});
  const [author, setAuthor] = useState({name:"",uuid:""});

  useEffect(() => {
    randomQuote();
  }, [language]);

const randomQuote = () => {
    getRandomQuote(language)
      .then((response) => response.json())
      .then((json) => {
          setQuote(json)
          setLoading(false)
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('random quote called'));
  };

  const searchAuthor = () => {
    getAuthors(authorName)
      .then((response) => response.json())
      .then((json) => {
          setAuthors(json)
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('search author called'));
  };

  const quotesByAuthor = (anAuthor) => {
    setAuthor(anAuthor)
    getQuotesByAuthor(anAuthor.uuid)
      .then((response) => response.json())
      .then((json) => {
          setQuotes(json)
      })
      .catch((error) => console.log(error))
      .finally(() => console.log('search author called'));
  };
   
  

  const mainview = () => {
    return (
        <main>
        <section className="Home">
            <div>
                <h1>Random Quotes</h1>
                <label>
              Pick your language:
              <select value={language} onChange={(event)=>setLanguage(event.target.value)}>
                <option value="en">English</option>
                <option value="ru">Russia</option>
              </select>
            </label>
                <p>Author: {quote.author}</p>
                <p>{quote.text}</p>
                <button onClick={randomQuote} className='btn'>
                    Get Random Quote
                </button>
            </div>
            <br/>
            <hr/>
            <br/>
            <div>
                <label>
                Author Name Search:
                <input type="text" value={authorName} onChange={(e)=>setAuthorName(e.target.value)} />
                </label>
                <button onClick={searchAuthor} className='btn'>
                    Search Author
                </button>
            </div>
            <div>
                <ul>
                    <h2>Available Authors</h2>
                    {authors.map((anAuthor) => {
                        return (
                        <li key={anAuthor.uuid} className='list'>
                            <span className='repo-text'>{anAuthor.name} </span>
                            <button onClick={()=>quotesByAuthor(anAuthor)} className='btn'>
                                Get Quotes
                            </button>
                        </li>
                        );
                    })}
                </ul>
            </div>
            <div>
                <ul>
                    <h2>Author {author.name}'s Quotes</h2>
                    {quotes.map((aQuote) => {
                        return (
                        <li key={aQuote.uuid} className='list'>
                            <span className='repo-text'>{aQuote.text} </span>
                        </li>
                        );
                    })}
                </ul>
            </div>
        </section>
        </main>
      );
  }

  return ((loading)? "Loading":mainview())
  
}



export default App;
