import axios from 'axios';

export async function fetchGPUMetrics() {
  console.log('Starting to fetch GPU metrics...');

  try {
    console.log('Making API requests...');
    const [socResponse, akashResponse, aethirResponse] = await Promise.all([
      axios.get('http://127.0.0.1:8000/fetch_soc'),
      axios.get('http://127.0.0.1:8000/fetch_akash'),
      axios.get('http://127.0.0.1:8000/fetch_aethir'),
    ]);

    console.log('API requests successful.');

    const socData = socResponse.data.soc;
    const akashData = akashResponse.data.akash;
    const aethirData = aethirResponse.data.aethir;

    console.log('SOC Data:', socData);
    console.log('Akash Data:', akashData);
    console.log('Aethir Data:', aethirData);

    // Combine or process the data as needed
    return { socData, akashData, aethirData };
  } catch (error) {
    console.error('Error fetching GPU metrics:', error);
    // Log more detailed error information if available
    if (axios.isAxiosError(error)) {
      console.error('Error details:', error.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    return { socData: [], akashData: [], aethirData: [] };
  }
}