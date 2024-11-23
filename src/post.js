import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Modal,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AddPostScreen = ({ visible, onClose }) => {
    const [postTitle, setPostTitle] = useState('');
    const [postName, setPostName] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postLocation, setPostLocation] = useState('');
    const [coachId, setCoachId] = useState('');
    const [postImage, setPostImage] = useState(null);

    const navigation = useNavigation();  // Hook to access navigation

    const selectImage = () => {
        const options = { mediaType: 'photo', quality: 1 };

        Alert.alert(
            'Select Image',
            'Choose an option',
            [
                {
                    text: 'Camera',
                    onPress: () => {
                        ImagePicker.launchCamera(options, (response) => {
                            if (response.assets) setPostImage(response.assets[0]);
                        });
                    },
                },
                {
                    text: 'Gallery',
                    onPress: () => {
                        ImagePicker.launchImageLibrary(options, (response) => {
                            if (response.assets) setPostImage(response.assets[0]);
                        });
                    },
                },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    const handleAddPost = async () => {
        const currentTime = new Date().toISOString();

        const formData = new FormData();
        formData.append('post_title', postTitle.trim());
        formData.append('post_name', postName.trim());
        formData.append('post_description', postDescription || null);
        formData.append('post_time', currentTime);
        formData.append('post_status', 'active');
        formData.append('post_location', postLocation || null);
        formData.append('coach_id', coachId || null);

        if (postImage) {
            formData.append('post_image', {
                uri: postImage.uri,
                name: postImage.fileName || 'photo.jpg',
                type: postImage.type || 'image/jpeg',
            });
        }

        try {
            const response = await axios.post('http://10.0.2.2:8000/api/posts/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 201 || response.status === 200) {
                Alert.alert('Success', 'Post added successfully!');
                resetForm();
                onClose(); // Close the modal after success
                navigation.goBack(); // Navigate back to the previous screen after success
            } else {
                Alert.alert('Error', 'Failed to add post.');
            }
        } catch (error) {
            console.error('Error adding post:', error);
            Alert.alert('Error', error.response?.data?.message || 'An error occurred');
        }
    };

    const resetForm = () => {
        setPostTitle('');
        setPostName('');
        setPostDescription('');
        setPostLocation('');
        setCoachId('');
        setPostImage(null);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
                behavior={Platform.OS === 'android' ? 'padding' : 'height'}
            >
                <View style={styles.popupContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                            <Ionicons name="close" size={28} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Create a New Post</Text>
                    </View>

                    <Text style={styles.label}>Post Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Post Title"
                        value={postTitle}
                        onChangeText={setPostTitle}
                    />

                    <Text style={styles.label}>Post Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Post Name"
                        value={postName}
                        onChangeText={setPostName}
                    />

                    <Text style={styles.label}>Post Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Enter Description"
                        value={postDescription}
                        onChangeText={setPostDescription}
                        multiline
                    />

                    <Text style={styles.label}>Post Location</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Location"
                        value={postLocation}
                        onChangeText={setPostLocation}
                    />

                    <Text style={styles.label}>Coach ID</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Coach ID"
                        value={coachId}
                        onChangeText={setCoachId}
                    />

                    <Text style={styles.label}>Image</Text>
                    <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
                        <Text style={styles.buttonText}>Upload Image</Text>
                    </TouchableOpacity>

                    {postImage && (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: postImage.uri }} style={styles.image} />
                        </View>
                    )}

                    <TouchableOpacity style={styles.addButtonContainer} onPress={handleAddPost}>
                        <Text style={styles.addButtonText}>Add Post</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    popupContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    closeButton: {
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
        marginTop: 10,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#000',
    },
    textArea: {
        height: 100,
    },
    uploadButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    imageContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginTop: 10,
    },
    addButtonContainer: {
        backgroundColor: '#28a745',
        padding: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddPostScreen;
