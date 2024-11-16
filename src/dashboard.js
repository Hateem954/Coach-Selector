import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DashboardScreen = () => {
    const navigation = useNavigation();
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Function to toggle theme
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    return (
        <View style={[styles.container, isDarkMode && styles.darkContainer]}>
            {/* App Bar at the Top */}
            <View style={[styles.appBar, isDarkMode && styles.darkAppBar]}>
                <Text style={[styles.appBarTitle, isDarkMode && styles.darkAppBarTitle]}>
                    Dashboard
                </Text>
            </View>

            {/* Main Content Area */}
            <View style={[styles.content, isDarkMode && styles.darkContent]}>
                {/* Content or Dashboard Specific Items can go here */}
            </View>

            {/* Bottom Navigation Bar */}
            <View style={[styles.bottomNav, isDarkMode && styles.darkBottomNav]}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
                    <View style={styles.circleIconContainer}>
                        <Icon name="home" size={24} color={isDarkMode ? '#000' : '#000'} />
                    </View>
                    <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('PostsScreen')}
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
                        <Icon name="settings" size={24} color={isDarkMode ? '#000' : '#000'} />
                    </View>
                    <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
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
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    darkContainer: {
        backgroundColor: '#333',
    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'center', // Center aligns the text horizontally
        alignItems: 'center', // Vertically center the text
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
        fontSize: 25,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    darkAppBarTitle: {
        color: '#fff',
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



// import React, { useState } from 'react';
// import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import Carousel from 'react-native-snap-carousel'; // Import the carousel component

// const DashboardScreen = () => {
//     const navigation = useNavigation();
//     const [isDarkMode, setIsDarkMode] = useState(false);

//     // List of images for the slider (can be URLs or local images)
//     const imageData = [
//         { id: '1', src: 'https://via.placeholder.com/350x150/FF5733/ffffff?text=Image+1' },
//         { id: '2', src: 'https://via.placeholder.com/350x150/33FF57/ffffff?text=Image+2' },
//         { id: '3', src: 'https://via.placeholder.com/350x150/3357FF/ffffff?text=Image+3' },
//     ];

//     // Function to toggle theme
//     const toggleTheme = () => {
//         setIsDarkMode((prevMode) => !prevMode);
//     };

//     // Render function for carousel items
//     const renderItem = ({ item }) => (
//         <View style={styles.carouselItem}>
//             <Image source={{ uri: item.src }} style={styles.carouselImage} />
//         </View>
//     );

//     return (
//         <View style={[styles.container, isDarkMode && styles.darkContainer]}>
//             {/* App Bar at the Top */}
//             <View style={[styles.appBar, isDarkMode && styles.darkAppBar]}>
//                 <Text style={[styles.appBarTitle, isDarkMode && styles.darkAppBarTitle]}>
//                     Dashboard
//                 </Text>
//             </View>

//             {/* Image Carousel */}
//             <View style={styles.carouselContainer}>
//                 <Carousel
//                     data={imageData}
//                     renderItem={renderItem}
//                     sliderWidth={350} // Set the width of the carousel slider
//                     itemWidth={300} // Set the width of each item
//                     inactiveSlideScale={0.9} // Scale effect when the item is not active
//                     inactiveSlideOpacity={0.7} // Opacity effect for inactive slides
//                 />
//             </View>

//             {/* Bottom Navigation Bar */}
//             <View style={[styles.bottomNav, isDarkMode && styles.darkBottomNav]}>
//                 <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Home')}>
//                     <View style={styles.circleIconContainer}>
//                         <Icon name="home" size={24} color={isDarkMode ? '#000' : '#000'} />
//                     </View>
//                     <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Home</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.navItem}
//                     onPress={() => navigation.navigate('PostsScreen')}
//                 >
//                     <View style={styles.circleIconContainer}>
//                         <Icon name="add-circle" size={28} color={isDarkMode ? '#000' : '#000'} />
//                     </View>
//                     <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Add Post</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.navItem}
//                     onPress={() => navigation.navigate('Settings', { toggleTheme, isDarkMode })}
//                 >
//                     <View style={styles.circleIconContainer}>
//                         <Icon name="settings" size={24} color={isDarkMode ? '#000' : '#000'} />
//                     </View>
//                     <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Settings</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
//                     <View style={styles.circleIconContainer}>
//                         <Icon name="person" size={24} color={isDarkMode ? '#000' : '#000'} />
//                     </View>
//                     <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Profile</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// // Styles for the Dashboard
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f4f4f4',
//     },
//     darkContainer: {
//         backgroundColor: '#333',
//     },
//     appBar: {
//         flexDirection: 'row',
//         justifyContent: 'center', // Center aligns the text horizontally
//         alignItems: 'center', // Vertically center the text
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
//         backgroundColor: '#444',
//     },
//     appBarTitle: {
//         fontSize: 25,
//         color: '#333',
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     darkAppBarTitle: {
//         color: '#fff',
//     },
//     carouselContainer: {
//         marginTop: 80, // Push the carousel down so it's not covered by the app bar
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: 250, // Set a height for the carousel
//     },
//     carouselItem: {
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         height: 200,
//         overflow: 'hidden',
//     },
//     carouselImage: {
//         width: '100%',
//         height: '100%',
//         resizeMode: 'cover',
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
//         backgroundColor: '#444',
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
