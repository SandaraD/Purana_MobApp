import axios from 'axios';

// Function to send a message to the chatbot backend
export const sendMessageToChatBot = async (message) => {
  try {
    // Make a POST request to the chatbot backend
    const response = await axios.post('http://192.168.1.22:3000/api/chatbot/', { message });
    
    // Return the reply from the chatbot
    return response.data.reply;  // Assuming the backend returns the chatbot's reply under `data.reply`
  } catch (error) {
    console.error("Error in sendMessageToChatBot:", error);
    return 'Sorry, I am unable to process your request at the moment.'; // Error message to display if something goes wrong
  }
};


