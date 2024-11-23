import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can use any other icon library

const MessagesScreen = () => {
    const navigation = useNavigation();

    // Function to handle back button press
    const handleBackPress = () => {
        navigation.goBack(); // This will navigate to the previous screen
    };

    return (
        <View style={styles.container}>
            {/* App Bar with Back Arrow */}
            <View style={styles.appBar}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Icon name="arrow-back" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.appBarTitle}>Messages</Text>
            </View>

            {/* Message Content */}
            <View style={styles.content}>
                <Text style={styles.messageText}>Here are your messages!</Text>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    appBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        elevation: 4, // Adds shadow for Android devices
    },
    appBarTitle: {
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 100,  // Increased marginLeft to provide more space between the icon and text
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    messageText: {
        fontSize: 18,
        color: '#333',
    },
});

export default MessagesScreen;
