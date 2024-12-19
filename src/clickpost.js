import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing the Icon component

const DashboardScreen = ({ navigation }) => {
    // Data for the list
    const menuItems = [
        { id: '1', title: 'Add Post', route: 'AddPost' },
        { id: '2', title: 'Upload Video', route: 'UploadVideo' }
    ];

    // Function to handle item click
    const handleItemPress = (route) => {
        navigation.navigate(route); // Navigate to the corresponding screen
    };

    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeIconContainer}>
                    <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>New Addition</Text>
            </View>

            {/* List of options */}
            <FlatList
                data={menuItems}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => handleItemPress(item.route)}
                    >
                        <Text style={styles.itemText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'lightgrey',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    closeIconContainer: {
        position: 'absolute',
        left: 10, // Adjust position to place the close button on the left side
        top: '50%',
        transform: [{ translateY: -12 }], // Vertically center the button
        zIndex: 1, // Ensure the close button is above other elements
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1, // Ensures the title takes the remaining space
    },
    item: {
        backgroundColor: '#fff', // Corrected the color here to ensure it's valid
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    itemText: {
        fontSize: 18,
        color: '#000',
    },
});

export default DashboardScreen;