# SnapSmart

## Empower your images with intelligent analysis and text extraction

### Introduction
SnapSmart is a cutting-edge React Native application designed to revolutionize the way you interact with images. It offers secure user authentication, intelligent image labeling, and precise image-to-text conversion. Leveraging the power of Firebase Authentication and Google Vision API, SnapSmart provides a seamless and intuitive user experience.

### Features
- **User Authentication**
  - Secure login and signup using Firebase Authentication, ensuring user data is protected.
- **Image Analyzer**
  - Upload an image and receive detailed labels identifying objects, scenes, and other elements using Google Vision API.
- **Image to Text Converter**
  - Convert images containing text into editable and searchable text using OCR powered by Google Vision API.
- **User-Friendly Interface**
  - An intuitive, responsive design that makes navigation and usage effortless.

### Technical Stack
- **Frontend**: React Native
- **Authentication**: Firebase Authentication
- **Backend Services**: Firebase
- **APIs**: Google Vision API

### Getting Started

#### Prerequisites
- Node.js
- npm
- Firebase project setup
- Google Cloud project with Vision API enabled

#### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/snap-smart.git
    cd snap-smart
    ```

2. **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up Firebase**
   - Go to the Firebase Console and create a new project.
   - Enable Firebase Authentication and set up the authentication methods you want to use (e.g., Email/Password).
   - Get your Firebase config object from the Firebase Console and add it to your project.

4. **Set up Google Vision API**
   - Go to the Google Cloud Console and create a new project.
   - Enable the Vision API for your project.
   - Create an API key and add it to your project.

5. **Configure Firebase and Google Vision API in your project**
    - Create a `firebaseConfig.js` file in the root of your project and add your Firebase configuration:
      ```javascript
      import firebase from '@react-native-firebase/app';

      const firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_PROJECT_ID.appspot.com",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID",
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }

      export default firebase;
      ```

6. **Run the application**
    ```bash
    npm run start
    ```

### Technical Implementation

#### Firebase Authentication

```javascript
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
```

#### Google Vision API Integration

- **Image Labeling**:
    ```javascript
    import { useState } from 'react';
    import { Vision } from 'react-native-google-vision-api';

    const getLabelsFromImage = async (imageUri) => {
      try {
        const response = await Vision.labelDetection(imageUri);
        setLabels(response.responses[0].labelAnnotations);
      } catch (error) {
        console.error(error);
      }
    };
    ```

- **OCR (Image to Text)**:
    ```javascript
    const getTextFromImage = async (imageUri) => {
      try {
        const response = await Vision.textDetection(imageUri);
        setText(response.responses[0].fullTextAnnotation.text);
      } catch (error) {
        console.error(error);
      }
    };
    ```

### User Interface

- **Screens**:
  - **Login/Signup Screen**: Secure user authentication.
  - **Home Screen**: Options to analyze image or convert image to text.
  - **Image Analyzer Screen**: Upload image and view labels.
  - **Text Converter Screen**: Upload image and view extracted text.


### Conclusion

SnapSmart addresses the growing need for intelligent image analysis and text extraction, enhancing user productivity and interaction with digital content. Future plans include additional features such as batch image processing, multilingual OCR support, and enhanced image editing capabilities.

---

Feel free to fork this repository and contribute to the project. For any issues or feature requests, please open an issue or submit a pull request.
