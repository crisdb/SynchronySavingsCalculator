import axios from 'axios';

// Define the API endpoint
const QA_ENDPOINT = 'https://api-uat.syf.com/v1/retailBank/products?serviceLevel=0000001';

// Fetch rate data from the API
export const fetchRateData = async () => {
    try {
        const response = await axios.get(QA_ENDPOINT);
        return response.data; // Return raw API data
    } catch (error) {
        console.error('Error fetching rate data:', error);
        throw error;
    }
};
