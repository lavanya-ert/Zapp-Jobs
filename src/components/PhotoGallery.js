import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image as RNImage,
  Button,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Image} from 'react-native-compressor';
import Icon from 'react-native-vector-icons/Entypo';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Fetch photos from your data source (e.g., API, local storage)
    // and set them in the 'photos' state
  }, []);

  const selectImage = sourceType => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 800,
      quality: 1,
      includeBase64: false,
      saveToPhotos: true,
      cameraType: 'back',
      videoQuality: 'high',
      durationLimit: 10,
      chooseFromLibraryOnly: false,
    };

    if (sourceType === 'camera') {
      launchCamera(options, response => {
        handleImageResponse(response);
      });
    } else if (sourceType === 'gallery') {
      launchImageLibrary(options, response => {
        handleImageResponse(response);
      });
    }
  };

  const handleImageResponse = async response => {
    if (response.didCancel) {
      console.log('Image selection cancelled');
    } else if (response.error) {
      console.log('Image selection error:', response.error);
    } else if (response.assets && response.assets.length > 0) {
      try {
        console.log("Acual image...",response);
        const compressedImage = await Image.compress(response.assets[0].uri);
        console.log("compressedImage....",compressedImage);
        setPhotos([...photos, compressedImage]);
      } catch (error) {
        console.error('Image compression error:', error);
      }
    }
  };

  const deleteImage = index => {
    // Create a copy of the 'photos' array without the image to delete
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
  };

  const renderItem = ({item, index}) => (
    // <View>
    //   <RNImage source={{uri: item}} style={styles.image} />
    //   <TouchableOpacity
    //     onPress={() => deleteImage(index)}
    //     style={styles.deleteButton}>
    //     <Text style={styles.deleteButtonText}>Delete</Text>
    //   </TouchableOpacity>
    // </View>
    <View style={styles.imageContainer}>
      <RNImage source={{uri: item}} style={styles.image} />
      <TouchableOpacity
        onPress={() => deleteImage(index)}
        style={styles.deleteIconContainer}>
        <Icon name="circle-with-cross" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Select Photo from Gallery"
        onPress={() => selectImage('gallery')}
      />
      <Button
        title="Take Photo from Camera"
        onPress={() => selectImage('camera')}
      />
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const {width} = Dimensions.get('window');
const imageWidth = width / 3 - 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    padding: 5,
  },
  // image: {
  //   width: imageWidth,
  //   height: imageWidth,
  //   margin: 5,
  // },
  deleteButton: {
    backgroundColor: 'lightcoral',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 5,
  },
  deleteButtonText: {
    color: 'white',
  },

  imageContainer: {
    position: 'relative',
    width: imageWidth,
    height: imageWidth,
    margin: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 10,
    right: 5,
  },
  deleteIcon: {
    width: 20, // Set the appropriate width for your delete icon
    height: 20, // Set the appropriate height for your delete icon
  },
});

export default PhotoGallery;
