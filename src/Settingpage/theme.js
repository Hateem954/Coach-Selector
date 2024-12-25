import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from './themecontext'; // Import the useTheme hook
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing the Icon component

const ThemeScreen = ({ navigation }) => {
    const { isDarkMode, toggleTheme } = useTheme(); // Get theme and toggle function from context

    const [isEnabled, setIsEnabled] = useState(isDarkMode); // Manage local state for the toggle switch

    // Update local state when isDarkMode changes
    useEffect(() => {
        setIsEnabled(isDarkMode);
    }, [isDarkMode]);

    const handleThemeToggle = () => {
        setIsEnabled((prevState) => !prevState); // Toggle local state
        toggleTheme(); // Toggle the global theme
    };

    const handleGoBack = () => {
        navigation.goBack(); // Call the goBack function to navigate to the previous screen
    };

    return (
        <View style={[styles.modalContainer, isEnabled ? styles.darkContainer : styles.lightContainer]}>
            {/* App Bar */}
            <View style={[styles.appBar, isEnabled ? styles.darkContainer : styles.lightContainer]}>
                <TouchableOpacity onPress={handleGoBack}>
                   <Icon name="arrow-back" size={24} color={isDarkMode ? '#fff' : '#000'} />
                  
                </TouchableOpacity>
                <Text style={[styles.title, isDarkMode ? styles.darkTitle : styles.lightTitle]}>
                                    Theme
                                </Text>
            </View>

            {/* Theme Toggle */}
            <View style={styles.toggleContainer}>
                <Text style={[styles.toggleLabel, isEnabled && styles.darkText]}>
                    {isEnabled ? 'Dark Mode' : 'Light Mode'}
                </Text>
                <Switch
                    trackColor={{ false: '#ccc', true: '#555' }}
                    thumbColor={isEnabled ? '#fff' : '#000'}
                    onValueChange={handleThemeToggle}
                    value={isEnabled}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        alignItems: 'center',
        flex: 1,
    },
    appBar: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    appBarTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    lightTitle: {
        color: '#000', // Title color for light mode
    },
    darkTitle: {
        color: '#fff', // Title color for dark mode
    },
    darkText: {
        color: '#fff',
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '80%',
    },
    toggleLabel: {
        fontSize: 18,
        color: '#000',
    },
    lightContainer: {
        backgroundColor: '#f4f4f4',
    },
    darkContainer: {
        backgroundColor: '#333',
    },
});

export default ThemeScreen;
