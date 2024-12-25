import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can use any other icon library
import { useTheme } from './Settingpage/themecontext'; // Correct the import path if necessary

const MessagesScreen = () => {
    const navigation = useNavigation();
    const { isDarkMode } = useTheme(); // Get the current theme

    // Function to handle back button press
    const handleBackPress = () => {
        navigation.goBack(); // This will navigate to the previous screen
    };

    return (
        <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
            {/* Close Icon and Title */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.closeIconContainer}>
                    <Icon name="arrow-back" size={24} color={isDarkMode ? '#fff' : '#000'} />
                </TouchableOpacity>
                <Text style={[styles.title, isDarkMode ? styles.darkTitle : styles.lightTitle]}>
                    Messages
                </Text>
            </View>

            {/* Message Content */}
            <View style={styles.content}>
                <Text style={[styles.messageText, isDarkMode && styles.darkText]}>Here are your messages!</Text>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    darkContainer: {
        backgroundColor: '#333', // Dark background
    },
    lightContainer: {
        backgroundColor: '#fff', // Light background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    closeIconContainer: {
        paddingRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    darkTitle: {
        color: '#fff', // White title for dark mode
    },
    lightTitle: {
        color: '#000', // Black title for light mode
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    messageText: {
        fontSize: 18,
        color: '#333', // Default text color
    },
    darkText: {
        color: '#fff', // White text for dark mode
    },
});

export default MessagesScreen;
