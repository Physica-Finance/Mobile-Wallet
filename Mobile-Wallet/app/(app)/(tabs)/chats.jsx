import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, AsyncStorage, ScrollView } from 'react-native';
import io from 'socket.io-client';

const socket = io('http://194.163.150.181:4000');

export default function ChatPage() {
  const [inputMessage, setInputMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [chatSessions, setChatSessions] = useState({}); // Object to store chat sessions

  useEffect(() => {
    // Fetch contacts from the server
    fetchContacts();
  }, []);

  useEffect(() => {
    if (selectedContact) {
      // Load chat sessions for the selected contact
      loadChatSession(selectedContact.id);
    }
  }, [selectedContact]);

  useEffect(() => {
    // Listen for incoming messages from the server
    socket.on('chat message', ({ nickname, message, contactId }) => {
      // Update the chat session for the appropriate contact
      if (selectedContact && selectedContact.id === contactId) {
        const updatedMessages = [...(chatSessions[selectedContact.id] || []), { nickname, message }];
        setChatSessions(prevSessions => ({
          ...prevSessions,
          [selectedContact.id]: updatedMessages,
        }));
      }
    });
  }, [selectedContact, chatSessions]);

  const fetchContacts = () => {
    // Example API call to fetch contacts
    // Replace this with your actual API call
    const dummyContacts = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    setContacts(dummyContacts);
  };

  const loadChatSession = async (contactId) => {
    try {
      const response = await fetch(`http://194.163.150.181:3000/chatSessions/${contactId}`);
      if (response.ok) {
        const chatSession = await response.json();
        setChatSessions(prevSessions => ({
          ...prevSessions,
          [contactId]: chatSession,
        }));
      }
    } catch (error) {
      console.error('Error loading chat session:', error);
    }
  };

  const sendMessage = () => {
    if (inputMessage.trim() !== '' && selectedContact) {
      socket.emit('chat message', { nickname, message: inputMessage, contactId: selectedContact.id });
      setInputMessage('');
      const updatedMessages = [...(chatSessions[selectedContact.id] || []), { nickname, message: inputMessage }];
      setChatSessions(prevSessions => ({
        ...prevSessions,
        [selectedContact.id]: updatedMessages,
      }));
    }
  };

  const renderChatSession = () => {
    if (!selectedContact) {
      return (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>Select a contact to start chatting</Text>
        </View>
      );
    }
    const sessionMessages = chatSessions[selectedContact.id] || [];
    return (
      <View style={styles.chatContainer}>
        <FlatList
          data={sessionMessages}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>{`${item.nickname}: ${item.message}`}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.messageList}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="Type your message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!selectedContact && (
        <ScrollView style={styles.sidebar}>
          <FlatList
            data={contacts}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.contactItem} onPress={() => setSelectedContact(item)}>
                <Text style={styles.contactName}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </ScrollView>
      )}
      {renderChatSession()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  sidebar: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  contactItem: {
    paddingVertical: 10,
  },
  contactName: {
    fontSize: 16,
  },
  chatContainer: {
    flex: 3,
  },
  messageContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    maxWidth: '80%',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: 'blue',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
  },
});
