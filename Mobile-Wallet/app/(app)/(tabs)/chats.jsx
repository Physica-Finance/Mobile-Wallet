import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { matrixClient } from '../../../utils/matrixClient';

export default function ChatPage() {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState('!abcdefg:matrix.org'); // Example room ID

  useEffect(() => {
    const onEvent = (event) => {
      if (event.getType() === "m.room.message" && event.getRoomId() === selectedRoomId) {
        setMessages(prevMessages => [...prevMessages, event.getContent().body]);
      }
    };

    matrixClient.on("Room.timeline", onEvent);

    return () => {
      matrixClient.removeListener("Room.timeline", onEvent);
    };
  }, [selectedRoomId]);

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      matrixClient.sendEvent(selectedRoomId, "m.room.message", {
        body: inputMessage,
        msgtype: "m.text"
      }, "", (err, res) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Message sent", res);
        }
      });
      setInputMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item}</Text>
          </View>
        )}
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
