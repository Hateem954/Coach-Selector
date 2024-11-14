import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Import the hook

const Form = () => {
    const [formData, setFormData] = useState({
        cnic: '',
        name: '',
        address: '',
        phone_number: '',
        location: '',
        status: 'active',
    });

    const [errors, setErrors] = useState({});
    const navigation = useNavigation(); // Use navigation hook

    // Handle form input changes
    const handleInputChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };

    // Submit form data
    const handleSubmit = async () => {
        setErrors({}); // Clear previous errors

        // Validation logic before sending the data
        let validationErrors = {};

        if (!formData.cnic) validationErrors.cnic = 'CNIC is required';
        if (!formData.name) validationErrors.name = 'Name is required';
        if (!formData.address) validationErrors.address = 'Address is required';
        if (!formData.phone_number) validationErrors.phone_number = 'Phone number is required';
        if (!formData.location) validationErrors.location = 'Location is required';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // Don't submit if there are validation errors
        }

        try {
            const response = await axios.post('http://10.0.2.2:8000/api/player_parent/', formData);
            // Handle success (response from the server)
            console.log('Form submitted successfully:', response.data);
            navigation.navigate('Dashboard'); // Now navigation works
        } catch (error) {
            // Handle errors (e.g., validation error from backend)
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors || {});
            } else {
                console.error('Error submitting form:', error);
            }
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Form Inputs */}
                <TextInput
                    style={styles.input}
                    placeholder="CNIC"
                    value={formData.cnic}
                    onChangeText={(value) => handleInputChange('cnic', value)}
                />
                {errors.cnic && <Text style={styles.errorText}>{errors.cnic}</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={formData.name}
                    onChangeText={(value) => handleInputChange('name', value)}
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    value={formData.address}
                    onChangeText={(value) => handleInputChange('address', value)}
                />
                {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    value={formData.phone_number}
                    onChangeText={(value) => handleInputChange('phone_number', value)}
                />
                {errors.phone_number && <Text style={styles.errorText}>{errors.phone_number}</Text>}

                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    value={formData.location}
                    onChangeText={(value) => handleInputChange('location', value)}
                />
                {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
            </ScrollView>

            {/* Submit Button */}
            <View style={styles.buttonContainer}>
                <Button title="Submit" onPress={handleSubmit} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingBottom: 30, // Provide padding to prevent input overlap
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
    buttonContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
});

export default Form;
