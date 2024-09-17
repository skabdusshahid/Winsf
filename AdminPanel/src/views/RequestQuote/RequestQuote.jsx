import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Http from '../../Http';

const RequestQuote = () => {
  const [quoteRequests, setQuoteRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuoteRequests = async () => {
      try {
        const response = await axios.get(`${Http}/quote-requests`); // Adjust URL as needed
        setQuoteRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch quote requests');
        setLoading(false);
      }
    };

    fetchQuoteRequests();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Quote Requests</h1>
      {quoteRequests.length === 0 ? (
        <p>No quote requests found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Method</th>
            </tr>
          </thead>
          <tbody>
            {quoteRequests.map((request, index) => (
              <tr key={index}>
                <td>{request.name}</td>
                <td>{request.email}</td>
                <td>{request.phoneNumber}</td>
                <td>{request.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RequestQuote;
