import {
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import mime from 'mime';


import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";



function RecipeBoxBigSkeleton() {
  return (
    <View
      style={{
        width: 350,
        height: 500,
        borderRadius: 16,
        margin: 5,
        backgroundColor: "white",
      }}
    />
  );
}

export default function TabOneScreen() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleSomething = async () => {
    console.log("pressed!");

    // Request permission to access the gallery
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      // Open the gallery to pick a video
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos, // Only allow video selection
        quality: 1, // Choose the highest quality
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedVideoUri = result.assets[0].uri; // Access the URI of the selected video
        setSelectedVideo(selectedVideoUri); // Save the selected video's URI
        uploadVideo(selectedVideoUri); // Call the function to upload the video
      }
    } else {
      console.log("Permission denied");
    }
  };

  const uploadVideo = async (uri: string) => {
    const formData = new FormData();
    const fileUri = uri;

    // You need to get the file name and file type
    const fileName = fileUri.split('/').pop();
    const fileType = fileUri.split('.').pop();


    const newImageUri =  "file:///" + uri.split("file:/").join("");
    
    // this shows error but actually this is how it should be!
    // idk why typescript is throwing error
    formData.append('video', {
     uri : uri,
     type: mime.getType(newImageUri),
     name: uri.split("/").pop()
    });


    try {
      // Send the video file to the backend

    const x = await axios.get('http://206.12.47.27:4000');
      
    const response = await axios.post('http://206.12.47.27:4000/upload', formData, {        
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

      
      console.log('Video uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: 75, height: 75, backgroundColor: "transparent" }}>
        <TouchableOpacity onPress={handleSomething}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../../assets/images/Waffle_icon.png")}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={[1, 2, 3, 4]}
        renderItem={() => <RecipeBoxBigSkeleton />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

