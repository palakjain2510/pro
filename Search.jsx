import React, { useState, useEffect } from 'react';

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);

  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    fetch(url)
      .then((resp) => resp.json())
      .then((data1) => {
        setData(data1);
      });
  }, []);
  function searchHandler(e) {
    setSearchTerm(e.target.value);

    // Filter the choices based on the current user input
    setFilteredOptions(
      data.filter((option) =>
        option.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '400px',
      }}
    >
      <h3>Search Options</h3>

      {/* Search Input Box */}
      <input
        type="text"
        placeholder="Search (e.g., todos)..."
        value={searchTerm}
        onChange={searchHandler}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      {/* Dynamic Results Display */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredOptions.map((option, index) => {
          // Rule: Turn green ONLY if the string is exactly "todos"
          const isExactMatch = option.title.toLowerCase() === searchTerm;

          return (
            <li
              key={index}
              style={{
                padding: '10px',
                marginBottom: '5px',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
                border: '1px solid #eee',
              }}
            >
              <span
                style={{
                  backgroundColor: isExactMatch ? '#2ecc71' : '#e74c3c',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  margin: '5px',
                }}
              >
                {option.title}
              </span>

              {/* Conditional Indicator Badge */}
              <span
                style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  color: '#fff',

                  backgroundColor: isExactMatch ? '#2ecc71' : '#e74c3c', // Green if true, Red if false
                }}
              >
                {isExactMatch ? 'Exact Match' : 'No Match'}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
