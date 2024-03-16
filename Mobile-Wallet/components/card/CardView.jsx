import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export function CardView() {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg' }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>Shoes!</Text>
        <Text style={styles.cardText}>If a dog chews shoes whose shoes does he choose?</Text>
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 4,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#3182CE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
