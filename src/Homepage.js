
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; // Ensure this package is installed

const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('Login'); // Navigate to Login after 5 seconds
        }, 5000);

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, [navigation]);

    return (
  <LinearGradient
            colors={['#C4DFE6', '#66A5AD']}
    style={styles.container}
>


            <Image
                source={require('./assets/Logo.png')}
                style={styles.logo}
            />
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome to the Coach Club!</Text>
                <Text style={styles.descriptionText}>
                    At the Coach Club, we are dedicated to helping you reach your fullest potential.
                    Join us for engaging sessions, personalized coaching, and a supportive community.
                </Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 350, // Larger width for the image
        height: 350, // Larger height for the image
        marginBottom: 20, // Spacing below the image
        resizeMode: 'contain',
    },
    textContainer: {
        width: '90%', // Make text occupy 90% of the screen width
        alignItems: 'flex-start', // Align text to the left
    },
    welcomeText: {
        fontSize: 24, // Smaller font size for the welcome text
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    descriptionText: {
        fontSize: 12, // Smaller font size for the description
        lineHeight: 20,
        color: '#000',
    },
});

export default HomeScreen;
