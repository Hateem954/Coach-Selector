import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';

const HomeScreen = ({ navigation }) => {
    // State to track button press for Login and Sign-up buttons
    const [isLoginPressed, setIsLoginPressed] = useState(false);
    const [isSignUpPressed, setIsSignUpPressed] = useState(false);

    // Function to handle button press for login navigation
    const handleLoginPress = () => {
        navigation.navigate('Login'); // Navigate to Login screen
    };

    // Function to handle sign-up button press and navigate to the sign-up screen
    const handleSignUpPress = () => {
        navigation.navigate('Signup'); // Navigate to SignUp screen
    };

    return (
        <View style={styles.container}>
            {/* Adding an image */}
            <Image
                source={require('./assets/coach_club_pic.png')} // Ensure image path is correct
                style={styles.logo} // Style for the image
            />

            <Text style={styles.welcomeText}>Welcome to the Coach Club!</Text>
            <Text style={styles.descriptionText}>
                At the Coach Club, we are dedicated to helping you reach your fullest potential.
                Join us for engaging sessions, personalized coaching, and a supportive community.
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        isLoginPressed ? styles.buttonPressed : styles.buttonBlue,
                    ]}
                    onPressIn={() => setIsLoginPressed(true)} // Change color on press
                    onPressOut={() => {
                        setIsLoginPressed(false);
                        handleLoginPress(); // Navigate after press
                    }}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.button,
                        isSignUpPressed ? styles.buttonPressed : styles.buttonGreen,
                    ]}
                    onPressIn={() => setIsSignUpPressed(true)} // Change color on press
                    onPressOut={() => {
                        setIsSignUpPressed(false);
                        handleSignUpPress(); // Navigate to SignUp screen after press
                    }}
                >
                    <Text style={styles.buttonText}>Sign-up</Text>
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
        backgroundColor: '#FFF', // Light background color
    },
    logo: {
        width: 150, // Set the width of the logo
        height: 150, // Set the height of the logo
        marginBottom: 20, // Add some margin below the image
        resizeMode: 'contain', // Resize the image to fit within the bounds
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black', // Set text color to black
    },
    descriptionText: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        color: 'black', // Set text color to black
        marginBottom: 20, // Add some margin below the description
    },
    buttonContainer: {
        flexDirection: 'row', // Align buttons in a row
        justifyContent: 'space-between', // Space them out evenly
        width: '100%', // Use full width
    },
    button: {
        flex: 1, // Make buttons take equal space
        padding: 15, // Button padding
        borderRadius: 5, // Rounded corners
        marginHorizontal: 5, // Margin between buttons
    },
    buttonBlue: {
        backgroundColor: '#D3D3D3', // Light gray button color
    },
    buttonGreen: {
        backgroundColor: '#D3D3D3', // Light gray button color
    },
    buttonPressed: {
        backgroundColor: '#D3D3D3', // Change to light gray when pressed
    },
    buttonText: {
        color: 'black', // Text color for buttons
        textAlign: 'center', // Center the text
        fontSize: 18,
        fontWeight: 'bold', // Bold text
    },
});

export default HomeScreen;
