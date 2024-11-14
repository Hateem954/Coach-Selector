import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const DashboardScreen = () => {
    const navigation = useNavigation();
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Function to toggle theme
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
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
                        <Icon name="home" size={24} color={isDarkMode ? '#fff' : '#000'} />
                    </View>
                    <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('PostsScreen')}
                >
                    <View style={styles.circleIconContainer}>
                        <Icon name="add-circle" size={28} color={isDarkMode ? '#fff' : '#000'} />
                    </View>
                    <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Add Post</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('Settings', { toggleTheme, isDarkMode })}
                >
                    <View style={styles.circleIconContainer}>
                        <Icon name="settings" size={24} color={isDarkMode ? '#fff' : '#000'} />
                    </View>
                    <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
                    <View style={styles.circleIconContainer}>
                        <Icon name="person" size={24} color={isDarkMode ? '#fff' : '#000'} />
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
        backgroundColor: '#444',
    },
    appBarTitle: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
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
// import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { useNavigation, DrawerActions } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const DashboardScreen = () => {
//     const navigation = useNavigation();
//     const [isDarkMode, setIsDarkMode] = useState(false);

//     // Function to toggle theme
//     const toggleTheme = () => {
//         setIsDarkMode(prevMode => !prevMode);
//     };

//     return (
//         <View style={[styles.container, isDarkMode && styles.darkContainer]}>
//             {/* App Bar at the Top */}
//             <View style={[styles.appBar, isDarkMode && styles.darkAppBar]}>
//                 <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
//                     <Icon name="menu" size={28} color={isDarkMode ? '#fff' : '#000'} />
//                 </TouchableOpacity>

//                 {/* Centered Text */}
//                 <Text style={[styles.appBarTitle, isDarkMode && styles.darkAppBarText]}>Dashboard</Text>

//                 {/* Optionally, you can add another icon/button on the right side */}
//                 {/* <TouchableOpacity onPress={() => {}} >
//                     <Icon name="notifications" size={28} color={isDarkMode ? '#fff' : '#000'} />
//                 </TouchableOpacity> */}
//             </View>

//             {/* Main Content Area */}
//             <View style={[styles.content, isDarkMode && styles.darkContent]}>
//                 {/* Content or Dashboard Specific Items */}
//                 <Text style={styles.dashboardText}>Welcome to the Dashboard</Text>
//             </View>

//             {/* Bottom Navigation Bar */}
//             <View style={[styles.bottomNav, isDarkMode && styles.darkBottomNav]}>
//                 <TouchableOpacity
//                     style={styles.navItem}
//                     onPress={() => navigation.navigate('Dashboard')} // Ensuring it stays active as the home page
//                 >
//                     <View style={styles.circleIconContainer}>
//                         <Icon name="home" size={24} color={isDarkMode ? '#fff' : '#000'} />
//                     </View>
//                     <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Home</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('')}>
//                     <View style={styles.circleIconContainer}>
//                         <Icon name="search" size={24} color={isDarkMode ? '#fff' : '#000'} />
//                     </View>
//                     <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>search</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={styles.navItem}
//                     onPress={() => navigation.navigate('Settings', { toggleTheme, isDarkMode })}
//                 >
//                     <View style={styles.circleIconContainer}>
//                         <Icon name="settings" size={24} color={isDarkMode ? '#fff' : '#000'} />
//                     </View>
//                     <Text style={[styles.navText, isDarkMode && styles.darkNavText]}>Settings</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('Profile')}>
//                     <View style={styles.circleIconContainer}>
//                         <Icon name="person" size={24} color={isDarkMode ? '#fff' : '#000'} />
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
//         alignItems: 'center',
//         paddingHorizontal: 15,
//         paddingVertical: 10,
//         backgroundColor: '#fff',
//         borderBottomWidth: 1,
//         borderBottomColor: '#e0e0e0',
//         position: 'absolute',
//         top: 0,  // Ensures the app bar is at the top
//         left: 0,
//         right: 0,
//         zIndex: 1, // Ensures the app bar stays above other content
//         justifyContent: 'space-between',
//     },
//     darkAppBar: {
//         backgroundColor: '#444',
//     },
//     appBarTitle: {
//         flex: 1,
//         textAlign: 'center',
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     darkAppBarText: {
//         color: '#fff',
//     },
//     content: {
//         flex: 1,
//         marginTop: 60, // Ensures the content doesn't overlap with the app bar
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     darkContent: {
//         backgroundColor: '#333',
//     },
//     dashboardText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     darkNavText: {
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
// });

// export default DashboardScreen;
