import axios from 'axios';


export const sendMessageToChatBot = async (message) => {
  try {

    const response = await axios.post('http://192.168.1.22:3000/api/chatbot/', { message });
    

    return response.data.reply;  
  } catch (error) {
    console.error("Error in sendMessageToChatBot:", error);
    return 'Sorry, I am unable to process your request at the moment.';
  }
};


