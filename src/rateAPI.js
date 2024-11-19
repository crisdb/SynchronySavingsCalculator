import axios from 'axios';

// Define the API endpoint (use environment variables if needed)
const QA_ENDPOINT = 'https://api-uat.syf.com/v1/retailBank/products?serviceLevel=0000001';

export const fetchRateData = async () => {
    try {
        const response = await axios.get(QA_ENDPOINT);
        return response.data; // Return the JSON response
    } catch (error) {
        console.error('Error fetching rate data:', error);
        throw error; // Allow the calling component to handle errors
    }
};
