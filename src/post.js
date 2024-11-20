import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const AddPostScreen = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postName, setPostName] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postLocation, setPostLocation] = useState('');
    const [coachId, setCoachId] = useState('');
    const [postImage, setPostImage] = useState(null);
    const [posts, setPosts] = useState([]);

    // Function to handle image selection
    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        Alert.alert(
            'Select Image',
            'Choose an option',
            [
                {
                    text: 'Camera',
                    onPress: () => {
                        ImagePicker.launchCamera(options, (response) => {
                            if (response.didCancel) {
                                console.log('User cancelled image picker.');
                            } else if (response.error) {
                                console.error('ImagePicker Error: ', response.error);
                            } else {
                                setPostImage(response.assets[0].uri); // Set image URI
                            }
                        });
                    },
                },
                {
                    text: 'Gallery',
                    onPress: () => {
                        ImagePicker.launchImageLibrary(options, (response) => {
                            if (response.didCancel) {
                                console.log('User cancelled image picker.');
                            } else if (response.error) {
                                console.error('ImagePicker Error: ', response.error);
                            } else {
                                setPostImage(response.assets[0].uri); // Set image URI
                            }
                        });
                    },
                },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: false }
        );
    };

    // Function to handle form submission
    const handleAddPost = async () => {
        const currentTime = new Date().toISOString();

        const postData = {
            post_title: postTitle,
            post_name: postName,
            post_description: postDescription,
            post_image: postImage,
            post_time: currentTime, // Automatically set to the current time
            post_status: 'active', // Status is always 'active'
            post_location: postLocation,
            coach_id: coachId,
        };

        try {
            const response = await axios.post('http://10.0.2.2:8000/api/posts/', postData);

            if (response.status === 201 || response.status === 200) {
                Alert.alert('Success', 'Post added successfully!');
                setPosts((prevPosts) => [...prevPosts, postData]);
                resetForm();
            } else {
                console.error('Error saving post:', response.data);
                Alert.alert('Error', 'Failed to add post.');
            }
        } catch (error) {
            // Improved error handling for axios request failure
            console.error('Error adding post:', error);
            if (error.response) {
                Alert.alert('Error', error.response.data.message || 'An error occurred');
            } else if (error.request) {
                Alert.alert('Error', 'No response received from the server');
            } else {
                Alert.alert('Error', 'An error occurred while adding the post');
            }
        }
    };

    // Reset the form fields
    const resetForm = () => {
        setPostTitle('');
        setPostName('');
        setPostDescription('');
        setPostLocation('');
        setCoachId('');
        setPostImage(null);
    };

    // Render a single post item
    const renderPost = ({ item }) => (
        <View style={styles.postItem}>
            <Text style={styles.postTitle}>{item.post_title}</Text>
            <Text style={styles.postDescription}>{item.post_description}</Text>
            {item.post_image && (
                <Image source={{ uri: item.post_image }} style={styles.postImage} />
            )}
            <Text style={styles.postTime}>{item.post_time}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>Create a New Post</Text>

                    {/* Post Title */}
                    <Text style={styles.label}>Post Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Post Title"
                        placeholderTextColor="#000"
                        value={postTitle}
                        onChangeText={setPostTitle}
                    />

                    {/* Post Name */}
                    <Text style={styles.label}>Post Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Post Name"
                        placeholderTextColor="#000"
                        value={postName}
                        onChangeText={setPostName}
                    />

                    {/* Post Description */}
                    <Text style={styles.label}>Post Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Enter Description"
                        placeholderTextColor="#000"
                        value={postDescription}
                        onChangeText={setPostDescription}
                        multiline
                        numberOfLines={4}
                    />

                    {/* Post Location */}
                    <Text style={styles.label}>Post Location</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Location"
                        placeholderTextColor="#000"
                        value={postLocation}
                        onChangeText={setPostLocation}
                    />

                    {/* Coach ID */}
                    <Text style={styles.label}>Coach ID</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Coach ID"
                        placeholderTextColor="#000"
                        value={coachId}
                        onChangeText={setCoachId}
                    />

                    {/* Upload Image */}
                    <Text style={styles.label}>Image</Text>
                    <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
                        <Text style={styles.buttonText}>Upload Image</Text>
                    </TouchableOpacity>

                    {/* Display Selected Image */}
                    {postImage && (
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: postImage }} style={styles.image} />
                        </View>
                    )}

                    {/* Add Post Button */}
                    <TouchableOpacity style={styles.addButtonContainer} onPress={handleAddPost}>
                        <Text style={styles.addButtonText}>Add Post</Text>
                    </TouchableOpacity>

                    {/* List of Posts */}
                    <FlatList
                        data={posts}
                        renderItem={renderPost}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.postList}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
        color: '#000',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        color: '#000',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    uploadButton: {
        backgroundColor: '#4CAF50',
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
        backgroundColor: '#D3D3D3',
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
    postList: {
        marginTop: 20,
    },
    postItem: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        marginBottom: 10,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    postDescription: {
        marginVertical: 5,
        color: '#555',
    },
    postImage: {
        width: '100%',
        height: 150,
        borderRadius: 5,
        marginVertical: 10,
    },
    postTime: {
        fontSize: 12,
        color: '#888',
    },
});

export default AddPostScreen;
