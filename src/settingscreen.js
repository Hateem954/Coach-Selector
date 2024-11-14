import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = ({ route }) => {
    const { toggleTheme, isDarkMode } = route.params; // Destructure toggleTheme and isDarkMode from route.params
    const [selectedTheme, setSelectedTheme] = useState(isDarkMode ? 'dark' : 'light'); // Manage selected theme state
    const navigation = useNavigation(); // Use navigation to navigate if needed

    const handleThemeChange = (theme) => {
        setSelectedTheme(theme);
        toggleTheme(); // Call the toggleTheme function passed from the parent
    };

    return (
        <View style={[styles.container, selectedTheme === 'dark' ? styles.darkContainer : styles.lightContainer]}>
            <View style={styles.settingsContent}>
                <Text style={[styles.title, selectedTheme === 'dark' && styles.darkText]}>Settings</Text>

                <View style={styles.radioContainer}>
                    <Text style={[styles.radioText, selectedTheme === 'dark' && styles.darkText]}>Light Mode</Text>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => handleThemeChange('light')}
                    >
                        <Text style={selectedTheme === 'light' ? styles.selectedRadio : styles.unselectedRadio}>●</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.radioContainer}>
                    <Text style={[styles.radioText, selectedTheme === 'dark' && styles.darkText]}>Dark Mode</Text>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => handleThemeChange('dark')}
                    >
                        <Text style={selectedTheme === 'dark' ? styles.selectedRadio : styles.unselectedRadio}>●</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

// Styles for the Settings screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        justifyContent: 'space-between', // Space between content and button
    },
    lightContainer: {
        backgroundColor: '#f4f4f4', // Light mode background
    },
    darkContainer: {
        backgroundColor: '#333', // Dark mode background
    },
    settingsContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40, // Space for button if it were present
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#000', // Default text color
    },
    darkText: {
        color: '#fff', // Text color for dark mode
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        width: '80%',
        justifyContent: 'space-between',
    },
    radioText: {
        fontSize: 18,
        color: '#000', // Default text color
    },
    radioButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedRadio: {
        color: 'blue', // Color for selected radio button
        fontSize: 24,
    },
    unselectedRadio: {
        color: '#ccc', // Color for unselected radio button
        fontSize: 24,
    },
});

export default SettingsScreen;
