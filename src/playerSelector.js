import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert, ScrollView, Image
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const PlayerRegistration = ({ navigation }) => {
    const [currentStep, setCurrentStep] = useState(1);

    // Step 1: Player Details
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [trainingType, setTrainingType] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [dob, setDob] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [playerId, setPlayerId] = useState(null);

    // Step 2: Parent Details
    const [fatherName, setFatherName] = useState('');
    const [fatherPhoneNo, setFatherPhoneNo] = useState('');
    const [fatherCnic, setFatherCnic] = useState('');
    const [parentAddress, setParentAddress] = useState('');
    const [parentLocation, setParentLocation] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:8000/api/category/');
            if (response.data && Array.isArray(response.data.category)) {
                setCategories(response.data.category);
            } else {
                Alert.alert('Error', 'Invalid categories data received.');
            }
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            quality: 1,
        };

        Alert.alert(
            'Select Image',
            'Choose an option',
            [
                { text: 'Camera', onPress: () => launchCamera(options, handleResponse) },
                { text: 'Gallery', onPress: () => launchImageLibrary(options, handleResponse) },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: false }
        );
    };

    const handleResponse = (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.error('ImagePicker Error:', response.error);
        } else if (response.assets && response.assets.length > 0) {
            setProfilePicture(response.assets[0]);
        }
    };

    const onChangeDob = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShowDatePicker(false);
        setDob(currentDate);
    };

    const handlePlayerNext = async () => {
        if (!playerName || !gender || !phoneNo || !dob || !address || !location || !category || !trainingType) {
            Alert.alert('Missing Info', 'Please fill in all fields.');
            return;
        }

        try {
            const formData = new FormData();

            if (profilePicture) {
                formData.append('image', {
                    uri: profilePicture.uri,
                    type: profilePicture.type || 'image/jpeg',
                    name: profilePicture.fileName || 'player_image.jpg',
                });
            }

            formData.append('player_name', playerName);
            formData.append('cat_id', category);
            formData.append('playwith', trainingType);
            formData.append('player_gender', gender);
            formData.append('player_phonenumber', phoneNo);
            formData.append('player_dob', dob.toISOString().split('T')[0]);
            formData.append('player_address', address);
            formData.append('player_location', location);
            formData.append('status', 'active');

            const response = await axios.post('http://10.0.2.2:8000/api/player/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const playerId = response.data.player?.id || response.data.player_id || response.data.id;

            if (!playerId) throw new Error("Player ID is missing in the API response.");
            setPlayerId(playerId);
            Alert.alert("Success", "Player details saved successfully!");
            setCurrentStep(2);
        } catch (error) {
            console.error('Error submitting player data:', error.response?.data || error.message);
            Alert.alert('Error', `Failed to register player. ${error.response?.data?.message || error.message}`);
        }
    };

    const handleParentSubmit = async () => {
        if (!fatherName || !fatherPhoneNo || !fatherCnic || !parentAddress || !parentLocation) {
            Alert.alert("Missing Info", "Please fill in all fields.");
            return;
        }

        try {
            const data = {
                player_id: playerId,
                name: fatherName,
                phone_number: fatherPhoneNo,
                cnic: fatherCnic,
                address: parentAddress,
                location: parentLocation,
                status: 'active',
            };

            const response = await axios.post('http://10.0.2.2:8000/api/player_parent/', data);

            if (response.status === 200 || response.status === 201) {
                Alert.alert("Success", "Parent details saved successfully!");
                navigation.navigate('Dashboard');
            }
        } catch (error) {
            console.error("Error submitting parent details:", error.response?.data || error.message);
            Alert.alert(
                "Error",
                `Failed to save parent details. ${error.response?.data?.message || error.message}`
            );
        }
    };

    return (
        <Modal visible={true} animationType="slide" transparent={true}>
            <ScrollView contentContainerStyle={styles.container}>
                {currentStep === 1 && (
                    <View style={styles.content}>
                        <Text style={styles.title}>Player Registration</Text>

                        <Text style={styles.label}>Enter your full name:</Text>
                        <TextInput style={styles.input} placeholder="Player Name" value={playerName} onChangeText={setPlayerName} />

                        <Text style={styles.label}>Choose your category:</Text>
                        <Picker selectedValue={category} style={styles.picker} onValueChange={(value) => setCategory(value)}>
                            <Picker.Item label="Select Category" value="" />
                            {categories.map((cat) => (
                                <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                            ))}
                        </Picker>

                        <Text style={styles.label}>Choose training type:</Text>
                        <Picker selectedValue={trainingType} style={styles.picker} onValueChange={(value) => setTrainingType(value)}>
                            <Picker.Item label="Select Training Type" value="" />
                            <Picker.Item label="Single" value="Single" />
                            <Picker.Item label="Double" value="Double" />
                        </Picker>

                        <Text style={styles.label}>Select gender:</Text>
                        <Picker selectedValue={gender} style={styles.picker} onValueChange={(value) => setGender(value)}>
                            <Picker.Item label="Select Gender" value="" />
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                        </Picker>

                        <Text style={styles.label}>Enter phone number:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            value={phoneNo}
                            onChangeText={setPhoneNo}
                            keyboardType="phone-pad"
                        />

                        <Text style={styles.label}>Select date of birth:</Text>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                            <TextInput
                                style={styles.input}
                                placeholder="Date of Birth"
                                value={dob.toDateString()}
                                editable={false}
                            />
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                value={dob}
                                mode="date"
                                display="default"
                                onChange={onChangeDob}
                            />
                        )}

                        <Text style={styles.label}>Enter address:</Text>
                        <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />

                        <Text style={styles.label}>Enter location:</Text>
                        <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />

                        <TouchableOpacity style={styles.button} onPress={selectImage}>
                            <Text style={styles.buttonText}>Upload Profile Picture</Text>
                        </TouchableOpacity>

                        {profilePicture && (
                            <Image
                                source={{ uri: profilePicture.uri }}
                                style={styles.image}
                            />
                        )}

                        <TouchableOpacity style={styles.button} onPress={handlePlayerNext}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {currentStep === 2 && (
                    <View style={styles.content}>
                        <Text style={styles.title}>Parent Details</Text>

                        {playerId && (
                            <View style={styles.infoBox}>
                                <Text style={styles.label}>Player Name:</Text>
                                <Text style={styles.value}>{playerName}</Text>
                            </View>
                        )}

                        <Text style={styles.label}>Enter father's full name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Father's Name"
                            value={fatherName}
                            onChangeText={setFatherName}
                        />

                        <Text style={styles.label}>Enter father's phone number:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Father's Phone No."
                            value={fatherPhoneNo}
                            onChangeText={setFatherPhoneNo}
                            keyboardType="phone-pad"
                        />

                        <Text style={styles.label}>Enter father's CNIC:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Father's CNIC"
                            value={fatherCnic}
                            onChangeText={setFatherCnic}
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>Enter parent's address:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={parentAddress}
                            onChangeText={setParentAddress}
                        />

                        <Text style={styles.label}>Enter parent's location:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Location"
                            value={parentLocation}
                            onChangeText={setParentLocation}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleParentSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
    content: { padding: 20, backgroundColor: '#fff', borderRadius: 10 },
    title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    label: { fontSize: 16, marginBottom: 5, color: '#555' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
    picker: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, borderRadius: 5 },
    button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 5, marginTop: 10 },
    buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    infoBox: { marginBottom: 20, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5 },
    value: { fontSize: 16, color: '#333' },
    image: { width: 100, height: 100, marginVertical: 10, borderRadius: 50, alignSelf: 'center' },
});

export default PlayerRegistration;
