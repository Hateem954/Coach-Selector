import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Modal,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const VideoUploaderPopup = ({ isVisible }) => {
    const [videoTitle, setVideoTitle] = useState('');
    const [videoFile, setVideoFile] = useState(null);

    const navigation = useNavigation();

    const pickVideo = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.video],
            });
            setVideoFile(result[0]);
            Alert.alert('Video Selected', result[0].name);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Alert.alert('Canceled', 'Video selection was canceled');
            } else {
                console.error(err);
                Alert.alert('Error', 'An error occurred while selecting the video');
            }
        }
    };

    const handleUpload = async () => {
        if (!videoTitle) {
            Alert.alert('Error', 'Please enter a video title');
            return;
        }
        if (!videoFile) {
            Alert.alert('Error', 'Please select a video file');
            return;
        }

        const formData = new FormData();
        formData.append('vedio_title', videoTitle);
        formData.append('vedio', {
            uri: videoFile.uri,
            name: videoFile.name,
            type: videoFile.type,
        });
        formData.append('status', 'active');

        try {
            const response = await axios.post('http://10.0.2.2:8000/api/vedio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201 || response.status === 200) {
                Alert.alert('Success', 'Video uploaded successfully!');
                setVideoTitle('');
                setVideoFile(null);
                navigation.goBack();
            } else {
                Alert.alert('Error', 'Failed to upload video');
            }
        } catch (error) {
            console.error('Error uploading video:', error);
            Alert.alert(
                'Error',
                error.response?.data?.message || 'An error occurred during upload'
            );
        }
    };

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => navigation.goBack()}
        >
            <View style={styles.overlay}>
                <View style={styles.popupContainer}>
                    {/* Header with close icon and title */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name="close" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Upload Short Video</Text>
                    </View>

                    {/* Input for video title */}
                    <Text style={styles.label}>Enter Video Title:</Text>
                    <TextInput
                        style={styles.input}
                        value={videoTitle}
                        onChangeText={setVideoTitle}
                        placeholder="Video Title"
                        placeholderTextColor="#666"
                    />

                    {/* Button to pick video */}
                    <TouchableOpacity style={styles.button} onPress={pickVideo}>
                        <Text style={styles.buttonText}>Select Video</Text>
                    </TouchableOpacity>
                    {videoFile && (
                        <Text style={styles.fileName}>Selected: {videoFile.name}</Text>
                    )}

                    {/* Button to upload video */}
                    <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                        <Text style={styles.buttonText}>Upload Video</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        left: 10, // Adjust position to place the close button on the left side
        top: '50%',
        transform: [{ translateY: -12 }], // Vertically center the button
        zIndex: 1, // Ensure the close button is above other elements
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        flex: 1,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        color: '#000',
    },
    button: {
        backgroundColor: '#D3D3D3',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    uploadButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
    },
    fileName: {
        marginTop: 10,
        fontSize: 14,
        color: '#000',
    },
});

export default VideoUploaderPopup;
