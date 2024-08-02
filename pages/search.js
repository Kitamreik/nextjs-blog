import * as React from 'react';
import { useState } from 'react';


export default function Search({ data }) {
  
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
  
    const handleSearch = (event) => {
      const value = event.target.value;
      setQuery(value);
      if (value.length > 2) {
        const filteredResults = data.filter(item => 
          item.name.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filteredResults);
      } else {
        setResults([]);
      }
    };
  
    return (
      <div>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search..."
        />
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result.name}</li>
          ))}
        </ul>
      </div>
    );
  };