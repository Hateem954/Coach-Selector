import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing the Icon component
import { useTheme } from './Settingpage/themecontext'; // Correct the import path if necessary

const SettingScreen = ({ navigation }) => {
    const { isDarkMode, toggleTheme } = useTheme();

    const menuItems = [
        { id: '1', title: 'Theme', route: 'theme' },
    ];

    const handleItemPress = (route) => {
        navigation.navigate(route, { isDarkMode, toggleTheme });
    };

    return (
        <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeIconContainer}>
                    <Icon name="close" size={24} color={isDarkMode ? '#fff' : '#000'} />
                </TouchableOpacity>
                <Text style={[styles.title, isDarkMode ? styles.darkTitle : styles.lightTitle]}>
                    Settings
                </Text>
            </View>

            <FlatList
                data={menuItems}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => handleItemPress(item.route)}
                    >
                        <Text style={[styles.itemText, isDarkMode && styles.darkText]}>
                            {item.title}
                        </Text>
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
    },
    darkContainer: {
        backgroundColor: '#333',
    },
    lightContainer: {
        backgroundColor: '#f4f4f4',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    closeIconContainer: {
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: [{ translateY: -12 }],
        zIndex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    darkTitle: {
        color: '#fff', // Title color for dark mode
    },
    lightTitle: {
        color: '#000', // Title color for light mode
    },
    item: {
        padding: 15,
        fontWeight: 'bold',
        marginBottom: 10,
        borderRadius: 5,
    },
    itemText: {
        fontSize: 18,
        color: '#000',
    },
    darkText: {
        color: '#fff', // Text color for dark mode
    },
});

export default SettingScreen;
