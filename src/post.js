import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const AddPostScreen = () => {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    // Function to handle image selection
    const pickImage = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets[0]?.uri) {
                const uri = response.assets[0].uri;
                setImage(uri);
            }
        });
    };

    // Function to handle form submission
    const handleAddPost = () => {
        const postData = {
            subject,
            description,
            image
        };
        console.log('Post Data:', postData);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create a New Post</Text>

            {/* Subject Label and Input */}
            <Text style={styles.label}>Subject</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Subject"
                placeholderTextColor="#000" // Black placeholder text
                value={subject}
                onChangeText={setSubject}
            />

            {/* Description Label and Input */}
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter Description"
                placeholderTextColor="#000" // Black placeholder text
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
            />

            {/* Upload Image Button */}
            <Text style={styles.label}>Image</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                <Text style={styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>

            {/* Display Selected Image */}
            {image && (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                </View>
            )}

            {/* Add Post Button */}
            <TouchableOpacity style={styles.addButtonContainer} onPress={handleAddPost}>
                <Text style={styles.addButtonText}>Add Post</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'black',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000', // Black label text color
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        color: '#000', // Black input text color
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    uploadButton: {
        backgroundColor: '#4CAF50', // Green button color
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 15,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 5,
        marginTop: 10,
    },
    addButtonContainer: {
        backgroundColor: '#D3D3D3', // Orange button color
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AddPostScreen;
