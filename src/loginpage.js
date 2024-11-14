import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Alert, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import SignUpScreen from './signup';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to handle login button press
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
            return;
        }

        setLoading(true); // Set loading to true while making the API call

        try {
            // Make a POST request with email and password in the body
            const response = await axios.post('http://10.0.2.2:8000/api/login/', {
                email: email,
                password: password
            });

            // Handle successful response from the server
            if (response.status === 200 && response.data.success) {
                // Assuming the server sends back a success key with valid credentials
                navigation.navigate('Dashboard'); // Navigate to Dashboard screen
            } else {
                Alert.alert('Login Error', response.data.message || 'Invalid email or password.');
            }
        } catch (error) {
            // Handle any errors from the API request
            if (error.response) {
                // Server responded with a status other than the 200 range
                Alert.alert('Login Error', error.response.data.message || 'Something went wrong.');
            } else if (error.request) {
                // Request was made but no response received
                Alert.alert('Login Error', 'No response from server. Please check your API endpoint.');
            } else {
                // Other errors like setting up the request
                Alert.alert('Login Error', 'An error occurred during login.');
            }
        } finally {
            setLoading(false); // Stop the loading state
        }
    };

    return (
        <View style={styles.container}>
            <Icon name="lock" size={50} color="black" style={styles.icon} />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>

            {/* Sign Up Prompt */}
            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Do you have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    icon: {
        marginBottom: 20,
    },
    label: {
        alignSelf: 'flex-start',
        marginBottom: 5,
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#D3D3D3',
        padding: 15,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 15,
    },
    signupText: {
        fontSize: 16,
        color: '#333',
    },
    signupLink: {
        fontSize: 16,
        color: 'blue',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
