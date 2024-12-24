// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import axios from 'axios';

// const DashboardScreen = () => {
//     const navigation = useNavigation();
//     const [isDarkMode, setIsDarkMode] = useState(false);

//     // Function to toggle theme
//     const toggleTheme = () => {
//         setIsDarkMode((prevMode) => !prevMode);
//     };

//     const [data, setData] = useState([]);
//     const [expandedPostIndex, setExpandedPostIndex] = useState(null);

//     useEffect(() => {
//         const getPost = async () => {
//             try {
//                 const response = await axios.get('http://10.0.2.2:8000/api/posts');
//                 setData(response.data.post);
//             } catch (error) {
//                 console.log('Error fetching posts:', error);
//             }
//         };
//         getPost();
//     }, []);

//     const toggleDescription = (index) => {
//         setExpandedPostIndex((prevIndex) => (prevIndex === index ? null : index));
//     };

//     return (
//         <View style={[styles.container, isDarkMode && styles.darkContainer]}>
//             {/* App Bar */}
//             <View style={[styles.appBar, isDarkMode && styles.darkAppBar]}>
//                 <Text style={[styles.appBarTitle, isDarkMode && styles.darkAppBarTitle]}>
//                     Coach-Selector
//                 </Text>
//                 <TouchableOpacity
//                     style={styles.messageIconContainer}
//                     onPress={() => navigation.navigate('Messages')}
//                 >
//                     <Icon name="send" size={24} color={isDarkMode ? '#fff' : '#000'} style={styles.rotatedIcon} />
//                 </TouchableOpacity>
//             </View>

//             {/* ScrollView for Posts */}
//             <ScrollView style={styles.postsContainer}>
//                 {data.length > 0 ? (
//                     data.map((item, index) => (
//                         <View
//                             key={index}
//                             style={[styles.postContainer, isDarkMode && styles.darkPostContainer]}
//                         >
//                             <Text
//                                 style={[
//                                     styles.postLocation,
//                                     isDarkMode && styles.darkPostText,
//                                 ]}
//                             >
//                                 {item.post_location}
//                             </Text>

//                             <Image
//                                 source={{ uri: `http://10.0.2.2:8000/uploads/coach_posts/${item.post_image}` }}
//                                 style={styles.postImage}
//                                 onError={(e) =>
//                                     console.log(`Image failed to load: ${e.nativeEvent.error}`)
//                                 }
//                             />

//                             <Text
//                                 style={[
//                                     styles.postTitle,
//                                     isDarkMode && styles.darkPostText,
//                                 ]}
//                             >
//                                 {item.post_title}
//                             </Text>

//                             {expandedPostIndex === index && (
//                                 <Text
//                                     style={[
//                                         styles.postDescription,
//                                         isDarkMode && styles.darkPostText,
//                                     ]}
//                                 >
//                                     {item.post_description}
//                                 </Text>
//                             )}

//                             <TouchableOpacity onPress={() => toggleDescription(index)}>
//                                 <Text
//                                     style={[
//                                         styles.showMoreButton,
//                                         isDarkMode && styles.darkShowMoreButton,
//                                     ]}
//                                 >
//                                     {expandedPostIndex === index ? 'less' : 'more'}
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     ))
//                 ) : (
//                     <Text
//                         style={[styles.noDataText, isDarkMode && styles.darkNoDataText]}
//                     >
//                         No posts available
//                     </Text>
//                 )}
//             </ScrollView>

//             {/* Bottom Navigation */}
//             <View style={[styles.bottomNav, isDarkMode && styles.darkBottomNav]}>
//                 <TouchableOpacity
//                     style={styles.navItem}
//                     onPress={() => navigation.navigate('Dashboard')}
//                 >
//                     <View style={styles.circleIconContainer}>
//                         <Icon name="home" size={24} color={isDarkMode ? '#000' : '#000'} />
//                     </View>
//                     <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>
//                         Home
//                     </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.navItem}
//                     onPress={() => navigation.navigate('ClickPost')}
//                 >
//                     <View style={styles.circleIconContainer}>
//                         <Icon name="add-circle" size={28} color={isDarkMode ? '#000' : '#000'} />
//                     </View>
//                     <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>
//                         Add Post
//                     </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.navItem}
//                     onPress={() => navigation.navigate('Settings', { toggleTheme, isDarkMode })}
//                 >
//                     <View style={styles.circleIconContainer}>
//                         <Icon name="search" size={24} color={isDarkMode ? '#000' : '#000'} />
//                     </View>
//                     <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>
//                         Search
//                     </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.navItem}
//                     onPress={() => navigation.navigate('ClickProfile')}
//                 >
//                     <View style={styles.circleIconContainer}>
//                         <Icon name="person" size={24} color={isDarkMode ? '#000' : '#000'} />
//                     </View>
//                     <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>
//                         Profile
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// // Styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f4f4f4',
//     },
//     darkContainer: {
//         backgroundColor: '#000',
//     },
//     appBar: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: 15,
//         paddingVertical: 10,
//         backgroundColor: '#fff',
//         borderBottomWidth: 1,
//         borderBottomColor: '#e0e0e0',
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 1,
//     },
//     darkAppBar: {
//         backgroundColor: '#333',
//     },
//     appBarTitle: {
//         fontSize: 20,
//         color: '#000',
//         fontWeight: 'bold',
//         fontStyle: 'italic',
//     },
//     darkAppBarTitle: {
//         color: '#fff',
//     },
//     messageIconContainer: {
//         padding: 10,
//     },
//     rotatedIcon: {
//         transform: [{ rotate: '-45deg' }],
//     },
//     postsContainer: {
//         flex: 1,
//         marginTop: 60,
//         paddingHorizontal: 15,
//         paddingTop: 10,
//     },
//     postContainer: {
//         backgroundColor: '#fff',
//         borderRadius: 8,
//         padding: 10,
//         marginBottom: 20,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
//     darkPostContainer: {
//         backgroundColor: '#222',
//     },
//     postImage: {
//         width: '100%',
//         height: 200,
//         borderRadius: 8,
//         marginVertical: 10,
//     },
//     postTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#000',
//     },
//     darkPostText: {
//         color: '#fff',
//     },
//     postLocation: {
//         fontSize: 14,
//         color: '#555',
//     },
//     postDescription: {
//         fontSize: 14,
//         color: '#555',
//         marginTop: 10,
//     },
//     showMoreButton: {
//         fontSize: 14,
//         color: '#007bff',
//         marginTop: 5,
//     },
//     darkShowMoreButton: {
//         color: '#80bfff',
//     },
//     noDataText: {
//         textAlign: 'center',
//         fontSize: 16,
//         marginTop: 20,
//         color: '#555',
//     },
//     darkNoDataText: {
//         color: '#fff',
//     },
//     bottomNav: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         backgroundColor: '#fff',
//         paddingVertical: 15,
//         borderTopWidth: 1,
//         borderTopColor: '#e0e0e0',
//     },
//     darkBottomNav: {
//         backgroundColor: '#222',
//     },
//     navItem: {
//         alignItems: 'center',
//     },
//     circleIconContainer: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         backgroundColor: '#e0e0e0',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 5,
//     },
//     navText: {
//         fontSize: 12,
//         color: '#333',
//     },
//     darkNavText: {
//         color: '#fff',
//     },
// });

// export default DashboardScreen;



import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const DashboardScreen = () => {
    const navigation = useNavigation();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [data, setData] = useState([]);
    const [expandedPostIndex, setExpandedPostIndex] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    // Function to toggle theme
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    // Function to fetch posts from the API
    const getPost = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:8000/api/posts');
            setData(response.data.post);
        } catch (error) {
            console.log('Error fetching posts:', error);
        }
    };

    // Fetch posts when screen is focused
    useFocusEffect(
        useCallback(() => {
            getPost();
        }, [])
    );

    // Handle refresh functionality
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Fetch new data when refreshing
        getPost().finally(() => {
            setRefreshing(false);  // Stop the refresh spinner after data is fetched
        });
    }, []);

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            {/* App Bar */}
            <View style={[styles.appBar, isDarkMode && styles.darkAppBar]}>
                <Text style={[styles.appBarTitle, isDarkMode && styles.darkAppBarTitle]}>
                    Coach-Selector
                </Text>
                <TouchableOpacity
                    style={styles.messageIconContainer}
                    onPress={() => navigation.navigate('Messages')}
                >
                    <Icon name="send" size={24} color={isDarkMode ? '#fff' : '#000'} style={styles.rotatedIcon} />
                </TouchableOpacity>
            </View>

            {/* ScrollView for Posts */}
            <ScrollView
                style={styles.postsContainer}
                contentContainerStyle={styles.scrollView}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <View key={index} style={[styles.postContainer, isDarkMode && styles.darkPostContainer]}>
                            <Text style={[styles.postLocation, isDarkMode && styles.darkPostText]}>
                                {item.post_location}
                            </Text>

                            <Image
                                source={{ uri: `http://10.0.2.2:8000/uploads/coach_posts/${item.post_image}` }}
                                style={styles.postImage}
                                onError={(e) => console.log(`Image failed to load: ${e.nativeEvent.error}`)}
                            />

                            <Text style={[styles.postTitle, isDarkMode && styles.darkPostText]}>
                                {item.post_title}
                            </Text>

                            {expandedPostIndex === index && (
                                <Text style={[styles.postDescription, isDarkMode && styles.darkPostText]}>
                                    {item.post_description}
                                </Text>
                            )}

                            <TouchableOpacity onPress={() => setExpandedPostIndex(expandedPostIndex === index ? null : index)}>
                                <Text style={[styles.showMoreButton, isDarkMode && styles.darkShowMoreButton]}>
                                    {expandedPostIndex === index ? 'less' : 'more'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={[styles.noDataText, isDarkMode && styles.darkNoDataText]}>
                        No posts available
                    </Text>
                )}
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={[styles.bottomNav, isDarkMode && styles.darkBottomNav]}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Dashboard')}>
                    <View style={styles.circleIconContainer}>
                        <Icon name="home" size={24} color={isDarkMode ? '#000' : '#000'} />
                    </View>
                    <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('ClickPost')}>
                    <View style={styles.circleIconContainer}>
                        <Icon name="add-circle" size={28} color={isDarkMode ? '#000' : '#000'} />
                    </View>
                    <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Add Post</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Settings', { toggleTheme, isDarkMode })}>
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

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    darkContainer: {
        backgroundColor: '#000',
    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        backgroundColor: '#333',
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
        padding: 10,
    },
    rotatedIcon: {
        transform: [{ rotate: '-45deg' }],
    },
    postsContainer: {
        flex: 1,
        marginTop: 60,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    postContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    darkPostContainer: {
        backgroundColor: '#222',
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginVertical: 10,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    darkPostText: {
        color: '#fff',
    },
    postLocation: {
        fontSize: 14,
        color: '#555',
    },
    postDescription: {
        fontSize: 14,
        color: '#555',
        marginTop: 10,
    },
    showMoreButton: {
        fontSize: 14,
        color: '#007bff',
        marginTop: 5,
    },
    darkShowMoreButton: {
        color: '#80bfff',
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        color: '#555',
    },
    darkNoDataText: {
        color: '#fff',
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
        backgroundColor: '#222',
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
