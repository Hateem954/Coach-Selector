import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const VideoUploader = () => {
    const [videoTitle, setVideoTitle] = useState('');
    const [videoFile, setVideoFile] = useState(null);

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

    const handleUpload = () => {
        if (!videoTitle) {
            Alert.alert('Error', 'Please enter a video title');
            return;
        }
        if (!videoFile) {
            Alert.alert('Error', 'Please select a video file');
            return;
        }

        // Placeholder for upload functionality
        Alert.alert(
            'Upload Successful',
            `Video "${videoTitle}" uploaded: ${videoFile.name}`
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter Video Title:</Text>
            <TextInput
                style={styles.input}
                value={videoTitle}
                onChangeText={setVideoTitle}
                placeholder="Video Title"
            />
            <TouchableOpacity style={styles.button} onPress={pickVideo}>
                <Text style={styles.buttonText}>Select Video</Text>
            </TouchableOpacity>
            {videoFile && (
                <Text style={styles.fileName}>Selected: {videoFile.name}</Text>
            )}
            <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                <Text style={styles.buttonText}>Upload Video</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
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
        color: '#fff',
        fontSize: 16,
    },
    fileName: {
        marginTop: 10,
        fontSize: 14,
        color: '#333',
    },
});

export default VideoUploader;
