import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const ChatBotScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { 
      text: message, 
      sender: 'user', 
      timestamp: new Date().getTime(), //timestamp
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setMessage('');
    setLoading(true);

    const typingMessage = { 
      text: 'Typing...', 
      sender: 'chatbot', 
      id: 'typing',
      timestamp: new Date().getTime(),
    };
    setMessages(prevMessages => [...prevMessages, typingMessage]);

    try {
      const response = await axios.post('http://192.168.1.22:3000/api/chatbot/', { message });
      const chatbotMessage = { 
        text: response.data.response.kwargs.content,
        sender: 'chatbot',
        id: Date.now().toString(),
        timestamp: new Date().getTime(),
      };
  
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== 'typing').concat(chatbotMessage));
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== 'typing'));
    } finally {
      setLoading(false);
    }
  };

  // descending order sort of messages
  const sortedMessages = [...messages].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <ImageBackground source={require('../assets/doodle 2.jpg')} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.chatContainer}>
            <FlatList
              data={sortedMessages} 
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={[styles.message, item.sender === 'chatbot' ? styles.chatbotMessage : styles.userMessage]}>
                  <Text style={styles.messageText}>{item.text}</Text>
                  <Text style={styles.timestampText}>
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </Text>
                </View>
              )}
              inverted
              keyboardShouldPersistTaps="handled"
              style={styles.messageList}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message..."
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity onPress={handleSendMessage} disabled={loading} style={styles.sendButton}>
                <Ionicons name="send" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
    paddingBottom: 70, 
  },
  messageList: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 15,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#ECEFF1',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginVertical: 5,
    padding: 12,
    borderRadius: 15,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#d1e7fd',
    borderColor: '#a2c8f5',
    borderWidth: 1,
  },
  chatbotMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0f7e3',
    borderColor: '#a8f1c7',
    borderWidth: 1,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  timestampText: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },
});

export default ChatBotScreen;

// what is sigiriya?

// import React, { useState } from 'react';
// import { View, TextInput, Button, FlatList, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
// import axios from 'axios';
// import { Ionicons } from '@expo/vector-icons';

// const ChatBotScreen = () => {
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSendMessage = async () => {
//     if (!message.trim()) return;

//     const userMessage = { text: message, sender: 'user' };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setMessage('');
//     setLoading(true);

//     const typingMessage = { text: 'Typing...', sender: 'chatbot', id: 'typing' };
//     setMessages(prevMessages => [...prevMessages, typingMessage]);

//     try {
//       const response = await axios.post('http://192.168.1.37:3000/api/chatbot/', { message });
//       const chatbotMessage = { 
//         text: response.data.response.kwargs.content,
//         sender: 'chatbot',
//         id: Date.now().toString()
//       };
  
//       setMessages(prevMessages => prevMessages.filter(msg => msg.id !== 'typing').concat(chatbotMessage));
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setMessages(prevMessages => prevMessages.filter(msg => msg.id !== 'typing'));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ImageBackground source={require('../assets/doodle 2.jpg')} style={styles.container}>
//             <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.container}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90}
//       >
//         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//           <View style={styles.chatContainer}>
//             <FlatList
//               data={messages}
//               keyExtractor={(item, index) => index.toString()}
//               renderItem={({ item }) => (
//                 <View style={[styles.message, item.sender === 'chatbot' ? styles.chatbotMessage : styles.userMessage]}>
//                   <Text style={styles.messageText}>{item.text}</Text>
//                 </View>
//               )}
//               inverted
//               keyboardShouldPersistTaps="handled"
//               style={styles.messageList}
//             />
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 value={message}
//                 onChangeText={setMessage}
//                 placeholder="Type a message..."
//                 placeholderTextColor="#aaa"
//               />
//               <TouchableOpacity onPress={handleSendMessage} disabled={loading} style={styles.sendButton}>
//                 <Ionicons name="send" size={24} color="white" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </KeyboardAvoidingView>
//     </ImageBackground>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
// backgroundColor: 'rgba(255, 255, 255, 0.9)'
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   chatContainer: {
//     flex: 1,
//     padding: 10,
//     paddingBottom: 70, 
//   },
//   messageList: {
//     flex: 1,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 5,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 1 },
//     elevation: 15,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     backgroundColor: '#ECEFF1',
//     borderRadius: 20,
//     paddingHorizontal: 15,
//     marginRight: 10,
//     borderColor: '#ddd',
//     borderWidth: 1,
//   },
//   sendButton: {
//     backgroundColor: '#007AFF',
//     borderRadius: 50,
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   message: {
//     marginVertical: 5,
//     padding: 12,
//     borderRadius: 15,
//     maxWidth: '75%',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 1 },
//     elevation: 2,
//   },
//   userMessage: {
//     alignSelf: 'flex-end',
//     alignSelf: 'flex-end',
//     backgroundColor: '#d1e7fd',
//     borderColor: '#a2c8f5',
//     borderWidth: 1,
//   },
//   chatbotMessage: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#e0f7e3',
//     borderColor: '#a8f1c7',
//     borderWidth: 1,
//   },
//   messageText: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default ChatBotScreen;

