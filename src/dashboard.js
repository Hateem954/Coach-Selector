import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import logo from './assets/home_pic.png';
const DashboardScreen = () => {
    const navigation = useNavigation();
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Function to toggle theme
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };
    const [data,setData] = useState([]);
    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:8000/api/posts');
                setData(response.data.post);
            } catch (error) {
                console.log('Error fetching posts:', error);
            }
        };
        getPost();
    }, []);

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            {/* App Bar at the Top */}
            <View style={[styles.appBar, isDarkMode && styles.darkAppBar]}>
                <Text style={[styles.appBarTitle, isDarkMode && styles.darkAppBarTitle]}>
                    Coach-Selector
                </Text>

                {/* Message Icon with Rotation */}
                <TouchableOpacity
                    style={styles.messageIconContainer}
                    onPress={() => navigation.navigate('Messages')} // Navigate to the Messages page
                >
                    <Icon name="send" size={24} color={isDarkMode ? '#fff' : '#000'} style={styles.rotatedIcon} />
                </TouchableOpacity>
            </View>

            {/* Main Content Area */}
            <View style={[styles.content, isDarkMode && styles.darkContent]}>
                {/* Content or Dashboard Specific Items can go here */}
            </View>

            <ScrollView style={styles.container}>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <View key={index} style={styles.postContainer}>
                            <Text style={styles.postTitle}>{item.post_title}</Text>
                            <Image
                                source={{ uri: `http://10.0.2.2:8000/uploads/coach_posts/${item.post_image}` }}
                            style={styles.postImage}
                                onError={(e) => console.log(`Image failed to load: ${e.nativeEvent.error}`)}
                            />
                            {/* <Text style={styles.postDescription}>{item.post_description}</Text>
                            <Text style={styles.postLocation}>Location: {item.post_location}</Text> */}
                        </View>
                    ))
                ) : (
                    <Text style={styles.noDataText}>No posts available</Text>
                )}
            </ScrollView>



            {/* Bottom Navigation Bar */}
            <View style={[styles.bottomNav, isDarkMode && styles.darkBottomNav]}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
                    <View style={styles.circleIconContainer}>
                        <Icon name="home" size={24} color={isDarkMode ? '#000' : '#000'} />
                    </View>
                    <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('ClickPost')}
                >
                    <View style={styles.circleIconContainer}>
                        <Icon name="add-circle" size={28} color={isDarkMode ? '#000' : '#000'} />
                    </View>
                    <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Add Post</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Settings', { toggleTheme, isDarkMode })}
                >
                    <View style={styles.circleIconContainer}>
                        <Icon name="search" size={24} color={isDarkMode ? '#000' : '#000'} />
                    </View>
                    <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ClickProfile')}>
                    <View style={styles.circleIconContainer}>
                        <Icon name="person" size={24} color={isDarkMode ? '#000' : '#000'} />
                    </View>
                    <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Styles for the Dashboard
const styles = StyleSheet.create({
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    darkContainer: {
        backgroundColor: '#333',
    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Space between title and icon
        alignItems: 'center', // Vertically center the items
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    darkAppBar: {
        backgroundColor: '#444',
    },
    appBarTitle: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    darkAppBarTitle: {
        color: '#fff',
    },
    messageIconContainer: {
        padding: 10, // Adds some padding around the icon
    },
    rotatedIcon: {
        transform: [{ rotate: '-45deg' }], // Rotate the icon by 65 degrees
    },
    content: {
        flex: 1,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    darkContent: {
        backgroundColor: '#333',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    darkBottomNav: {
        backgroundColor: '#444',
    },
    navItem: {
        alignItems: 'center',
    },
    circleIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    navText: {
        fontSize: 12,
        color: '#333',
    },
    darkNavText: {
        color: '#fff',
    },
});

export default DashboardScreen;


