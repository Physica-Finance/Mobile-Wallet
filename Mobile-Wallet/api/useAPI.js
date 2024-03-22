import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function fetch({ API_URL, rawLines }) {
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get(API_URL);
        setTokens(response.data[rawLines]);
      } catch (error) {
        console.error('Error fetching token data:', error);
      }
    };

    fetchTokens();
  }, [API_URL, rawLines]); // Make sure to include API_URL and rawLines in the dependency array

  return tokens;
}
