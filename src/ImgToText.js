import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system";

export const DetectObject = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const [labels, setLabels] = useState([]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1
      });
      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
      console.log(result);
    } catch (error) {
      console.log("Error while picking image: " + error);
    }
  };

  const analyzeImage = async () => {
    try {
      if (!imageUri) {
        alert("Please set an image first!");
        return;
      }

      const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
      const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

      const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64
      });

      const requestData = {
        requests: [
          {
            image: { content: base64ImageData },
            features: [{ type: "TEXT_DETECTION", maxResults: 10000}]
          }
        ]
      };

      console.log(JSON.stringify(requestData)); 

      const apiResponse = await axios.post(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // console.log(apiResponse.data); // Debug: Log API response
      // console.log('API Response:', JSON.stringify(apiResponse.data, null, 2));
      setLabels(apiResponse.data.responses[0].textAnnotations || []);
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Error analyzing image: ", error.response.data);
        alert(`Error analyzing image: ${error.response.data.error.message}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error analyzing image: No response from server");
        alert("Error analyzing image: No response from server");
      } else {
        // Something else happened
        console.error("Error analyzing image: ", error.message);
        alert(`Error analyzing image: ${error.message}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Image Analyzer</Text> */}
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 300, height: 300 }}
        />
      )}
      <View style={styles.horiz}>

      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.text}>Choose an image...</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={analyzeImage} style={styles.button}>
        <Text style={styles.buttonText}>Get Text</Text>
      </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
      <Text style={styles.label}>Text:</Text>
      {labels.length > 0 && (
        <View>
          {labels.map((label, index) => (
            <Text key={label.mid} style={styles.outputText}>
             {label.description}
            </Text>
          ))}
        </View>
      )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
  },
  horiz: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    justifyContent: "space-between"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
    padding: 10,
  },
  text: {
    fontWeight: "bold",
    padding: 10,
    borderColor: "black",
    borderWidth: 1
  },
  button: {
    backgroundColor: "#333",
    padding: 11,
    marginBottom: 10,
    marginTop: 10,
    borderColor: "white",
    borderWidth: 3
  },
  buttonText: {
    color: 'white'
  },
  label: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 0,
    paddingBottom: 10
  },
  outputText: {
    fontSize: 14,
    marginBottom: 10
  },
  scrollView: {
    padding: 20,
  }
});

export default DetectObject;
