import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

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
            <Text style={styles.title}>Dashboard</Text>

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
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    item: {
        backgroundColor: '#fff',
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
        color: '#333',
    },
});

export default DashboardScreen;
