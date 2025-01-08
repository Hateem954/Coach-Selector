import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    Image,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';

const AcademyForm = ({ navigation }) => {
    const [academyName, setAcademyName] = useState('');
    const [academyLocation, setAcademyLocation] = useState('');
    const [status, setStatus] = useState('');
    const [address, setAddress] = useState('');
    const [academyPhoneNumber, setAcademyPhoneNumber] = useState('');
    const [academyCertificate, setAcademyCertificate] = useState(null);

    const selectCertificate = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            setAcademyCertificate(res[0]);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Alert.alert('Canceled', 'No file was selected.');
            } else {
                Alert.alert('Error', 'Something went wrong.');
            }
        }
    };

    const handleSubmit = async () => {
        if (
            !academyName ||
            !academyLocation ||
            !address ||
            !academyPhoneNumber ||
            !academyCertificate
        ) {
            Alert.alert('Validation Error', 'All fields are required.');
            return;
        }

        const formData = new FormData();
        formData.append('academy_name', academyName);
        formData.append('academy_location', academyLocation);
        formData.append('status', "active");
        formData.append('address', address);
        formData.append('academy_phonenumber', academyPhoneNumber);
        formData.append('academy_certificate', {
            uri: academyCertificate.uri,
            name: academyCertificate.name || 'certificate.jpg',
            type: academyCertificate.type || 'image/jpeg',
        });

        try {
            const response = await axios.post('http://10.0.2.2:8000/api/academy', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // Alert.alert('Success', 'Academy details submitted successfully!');
            
            Alert.alert('Alert', 'Your request will be submitted to the admin plz wait for conformation');
            navigation.navigate('Login'); // Navigate to Dashboard screen
        } catch (error) {
            console.error('Error submitting form:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to submit the form. Please try again.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Academy Details</Text>

            <Text style={styles.label}>Academy Name</Text>
            <TextInput
                style={styles.input}
                value={academyName}
                onChangeText={setAcademyName}
                placeholder="Enter academy name"
            />

            <Text style={styles.label}>Academy Location</Text>
            <TextInput
                style={styles.input}
                value={academyLocation}
                onChangeText={setAcademyLocation}
                placeholder="Enter academy location"
            />

            <Text style={styles.label}>Address</Text>
            <TextInput
                style={styles.input}
                value={address}
                onChangeText={setAddress}
                placeholder="Enter address"
            />

            <Text style={styles.label}>Academy Phone Number</Text>
            <TextInput
                style={styles.input}
                value={academyPhoneNumber}
                onChangeText={setAcademyPhoneNumber}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Academy Certificate</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={selectCertificate}>
                <Text style={styles.uploadButtonText}>
                    {academyCertificate
                        ? `Selected: ${academyCertificate.name}`
                        : 'Upload Certificate'}
                </Text>
            </TouchableOpacity>

            {academyCertificate && (
                <Image
                    source={{ uri: academyCertificate.uri }}
                    style={styles.imagePreview}
                />
            )}

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    uploadButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
    },
    uploadButtonText: {
        color: '#fff',
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginBottom: 15,
    },
    submitButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default AcademyForm;
