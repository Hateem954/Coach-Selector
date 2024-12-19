import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import OtpPopupScreen from './otppopup';
import CoachDetailsScreen from './coachDetails'; // Import Coach Details Screen
import PlayerSelectorScreen from './playerSelector'; // Import Player Selector Screen

const SignUpScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOtpVisible, setOtpVisible] = useState(false);

    const handleSignUp = async () => {
        // Validation checks
        if (!email.includes('@')) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Password Mismatch', 'Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Weak Password', 'Password must be at least 6 characters long.');
            return;
        }
        if (!role) {
            Alert.alert('Select Role', 'Please select a role (Coach or Player).');
            return;
        }

        const signUpData = {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
            role: role,
        };

        setLoading(true);

        try {
            const response = await axios.post('http://10.0.2.2:8000/api/signup/', signUpData);

            console.log('Response:', response.data);

            if (response.status === 200) {
                ;
                setOtpVisible(true); // Show OTP popup on successful sign-up
            } else {
                Alert.alert('Error', response.data.message || 'Failed to sign up');
            }
        } catch (error) {
            console.error('Error signing up:', error.response ? error.response.data : error);
            Alert.alert('Error', error.response?.data?.message || 'Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = () => {
        return name && email && password && confirmPassword && role;
    };

    const handleOtpSuccess = () => {
        setOtpVisible(false); // Close the OTP popup
        // Navigate to the appropriate page based on the selected role
        if (role === 'coach') {
            navigation.navigate('CoachDetails'); // Navigate to Coach Details Screen
        } else {
            navigation.navigate('PlayerSelector'); // Navigate to Player Selector Screen
        }
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Sign Up</Text> */}
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Enter your email"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter your password"
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholder="Confirm your password"
            />

            <Text style={styles.label}>Select Role</Text>
            <RNPickerSelect
                onValueChange={(value) => setRole(value)}
                items={[
                    { label: 'Coach', value: 'coach' },
                    { label: 'Player', value: 'player' },
                ]}
                placeholder={{ label: 'Select your role...', value: null }}
                style={pickerSelectStyles}
            />

            <TouchableOpacity
                style={[styles.button, !isFormValid() && styles.buttonDisabled]}
                onPress={handleSignUp}
                disabled={!isFormValid() || loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </Text>
            </TouchableOpacity>

            <OtpPopupScreen
                visible={isOtpVisible}
                email={email}
                onClose={() => setOtpVisible(false)}
                onSuccess={handleOtpSuccess}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    // title: {
    //     fontSize: 24,
    //     fontWeight: 'bold',
    //     marginBottom: 20,
    //     color:'#000',
    // },
    label: {
        width: '100%',
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        textAlign: 'left',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonDisabled: {
        backgroundColor: '#A9A9A9',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30,
        marginBottom: 15,
        width: '100%',
    },
});

export default SignUpScreen;
