import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import * as sdk from "matrix-js-sdk";
import * as SecureStore from 'expo-secure-store';

export default function ChatPage() {
  const [inputMessage, setInputMessage] = useState('');
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const credentialsJSON = await SecureStore.getItemAsync('userCredentials');
        if (!credentialsJSON) {
          console.error('User credentials not found, please log in.');
          return;
        }
        const { userId, accessToken } = JSON.parse(credentialsJSON);

        // Here we reinitialize the client with the stored credentials
        const matrixClient = sdk.createClient({
          baseUrl: "http://194.163.150.181:8008",
          accessToken: accessToken,
          userId: userId
        });

        matrixClient.startClient();

        matrixClient.once('sync', state => {
          if (state === 'PREPARED') {
            setRooms(matrixClient.getRooms());
          }
        });
      } catch (error) {
        console.error('Sync failed:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handler = event => {
      if (event.getType() === 'm.room.message' && event.getRoomId() === selectedRoom?.roomId) {
        setMessages(prevMessages => [...prevMessages, event]);
      }
    };

    matrixClient.on("Room.timeline", handler);
    return () => {
      matrixClient.removeListener("Room.timeline", handler);
    };
  }, [selectedRoom]);

  const sendMessage = async () => {
    if (inputMessage.trim() !== '' && selectedRoom) {
      try {
        await matrixClient.sendEvent(selectedRoom.roomId, "m.room.message", {
          body: inputMessage,
          msgtype: "m.text"
        });
        setInputMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.sidebar}>
        {rooms.map(room => (
          <TouchableOpacity key={room.roomId} style={styles.roomItem} onPress={() => setSelectedRoom(room)}>
            <Text style={styles.roomName}>{room.name || "Unnamed Room"}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>{item.content.body}</Text>
            </View>
          )}
          keyExtractor={item => item.event_id}
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
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 18,
  },
});
