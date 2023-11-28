import http from 'k6/http';
import { check } from 'k6';

export default function () {
  // Define the target API endpoint
  const url = 'http://localhost:5001/health'; // Replace with your API endpoint

  // Make an HTTP GET request to the API
  const response = http.get(url);

  // Validate the response
  check(response, {
    'API is healthy': (res) => res.status === 200,
  });

  // Print a message to the console
  console.log(`Response status for ${url}: ${response.status}`);
}
