import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const CoachDetailsScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [certificate, setCertificate] = useState(null);
    const [level, setLevel] = useState('');
    const [experience, setExperience] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [coachLocation, setCoachLocation] = useState('');
    const [image, setImage] = useState(null);
    const [status, setStatus] = useState('active');
    const [academy, setAcademy] = useState(''); // Academy field

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:8000/api/category/');
            if (Array.isArray(response.data.category)) {
                setCategories(response.data.category);
            } else {
                Alert.alert('Error', 'Invalid categories data received.');
            }
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    const selectCertificate = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            setCertificate(res[0]);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Alert.alert('Canceled', 'No file was selected.');
            } else {
                Alert.alert('Error', 'Something went wrong.');
            }
        }
    };

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
                    onPress: () => launchCamera(options, (response) => {
                        if (response.didCancel) {
                            console.log('User cancelled image picker.');
                        } else if (response.error) {
                            console.error('ImagePicker Error: ', response.error);
                        } else {
                            setImage(response.assets[0]);
                        }
                    }),
                },
                {
                    text: 'Gallery',
                    onPress: () => launchImageLibrary(options, (response) => {
                        if (response.didCancel) {
                            console.log('User cancelled image picker.');
                        } else if (response.error) {
                            console.error('ImagePicker Error: ', response.error);
                        } else {
                            setImage(response.assets[0]);
                        }
                    }),
                },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: false }
        );
    };

    const handleSave = async () => {
        if (!name || !categoryId || !certificate || !level || !experience || !phone || !coachLocation || !image || !status || !academy) {
            Alert.alert('Missing Info', 'Please fill in all the required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('coach_location', coachLocation);
        formData.append('category_id', categoryId);
        formData.append('level', level);
        formData.append('experience', experience);
        formData.append('phone_number', phone);
        formData.append('status', 'active');
        formData.append('hasAccademy', academy);

        if (certificate) {
            formData.append('certificate', {
                uri: certificate.uri,
                name: certificate.name || 'certificate.pdf',
                type: 'application/pdf',
            });
        }

        if (image) {
            formData.append('image', {
                uri: image.uri,
                name: image.fileName || 'image.jpg',
                type: image.type || 'image/jpeg',
            });
        }

        try {
            const response = await axios.post('http://10.0.2.2:8000/api/coach/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Alert.alert('Success', 'Coach details saved successfully!');

            if (academy === 'Yes') {
                // Navigate to the HasAcademy page with all the data
                navigation.navigate('hasAccademy', {
                    coachData: {
                        name,
                        coachLocation,
                        categoryId,
                        level,
                        experience,
                        phone,
                        status,
                        academy,
                        certificate: certificate ? certificate.name : null,
                        image: image ? image.fileName : null,
                    },
                });
            } else {
                navigation.navigate('Dashboard'); // Navigate to the Dashboard
            }
        } catch (error) {
            console.error('Error saving coach details:', error.message);
            Alert.alert('Error', error.response?.data?.message || error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Coach Details</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
            />

            <Text style={styles.label}>Coach Location</Text>
            <TextInput
                style={styles.input}
                value={coachLocation}
                onChangeText={setCoachLocation}
                placeholder="Enter coach location"
            />

            <Text style={styles.label}>Category of Sport</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={categoryId}
                    onValueChange={(itemValue) => setCategoryId(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Sport Category" value="" />
                    {categories.map((item) => (
                        <Picker.Item key={item.id} label={item.name} value={item.id} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Certificate</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={selectCertificate}>
                <Text style={styles.uploadButtonText}>
                    {certificate ? `Selected: ${certificate.name}` : 'Upload PDF Certificate'}
                </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Image</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
                <Text style={styles.uploadButtonText}>
                    {image ? `Selected: ${image.fileName}` : 'Upload Image'}
                </Text>
            </TouchableOpacity>
            {image && (
                <Image
                    source={{ uri: image.uri }}
                    style={styles.imagePreview}
                />
            )}

            <Text style={styles.label}>Level</Text>
            <TextInput
                style={styles.input}
                value={level}
                onChangeText={setLevel}
                placeholder="Enter level"
            />

            <Text style={styles.label}>Experience (Years)</Text>
            <TextInput
                style={styles.input}
                value={experience}
                onChangeText={setExperience}
                placeholder="Enter experience"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>Academy</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={academy}
                    onValueChange={(itemValue) => setAcademy(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Academy" value="" />
                    <Picker.Item label="Yes" value="Yes" />
                    <Picker.Item label="No" value="No" />
                </Picker>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f9f9f9',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    picker: {
        height: 50,
        color: '#333',
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
        fontSize: 16,
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    saveButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default CoachDetailsScreen;
