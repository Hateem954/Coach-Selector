// import React from 'react';
// import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// const UserProfile = () => {
//     // Sample user data
//     const user = {
//         username: 'hateem__nisar',
//         avatar: 'https://via.placeholder.com/100', // Replace with user's image
//         bio: "Life's too short for boring conversations.\nLet's make some memories! 📚🎉\nSnapchat: hateemn2020",
//         posts: 8,
//         followers: 99,
//         following: 65,
//     };

//     // Sample grid posts
//     const posts = [
//         { id: '1', image: 'https://via.placeholder.com/100' },
//         { id: '2', image: 'https://via.placeholder.com/100' },
//         { id: '3', image: 'https://via.placeholder.com/100' },
//         { id: '4', image: 'https://via.placeholder.com/100' },
//         { id: '5', image: 'https://via.placeholder.com/100' },
//         { id: '6', image: 'https://via.placeholder.com/100' },
//     ];

//     return (
//         <View style={styles.container}>
//             {/* Profile Header */}
//             <View style={styles.header}>
//                 <Icon name="lock-outline" size={20} color="#000" />
//                 <Text style={styles.username}>{user.username}</Text>
//                 <Icon name="chevron-down" size={20} color="#000" />
//             </View>

//             {/* Profile Info */}
//             <View style={styles.profileInfo}>
//                 <Image source={{ uri: user.avatar }} style={styles.avatar} />
//                 <TouchableOpacity style={styles.addIcon}>
//                     <Icon name="plus" size={18} color="#fff" />
//                 </TouchableOpacity>
//                 <View style={styles.stats}>
//                     <Text style={styles.statNumber}>{user.posts}</Text>
//                     <Text style={styles.statLabel}>Posts</Text>
//                 </View>
//                 <View style={styles.stats}>
//                     <Text style={styles.statNumber}>{user.followers}</Text>
//                     <Text style={styles.statLabel}>Followers</Text>
//                 </View>
//                 <View style={styles.stats}>
//                     <Text style={styles.statNumber}>{user.following}</Text>
//                     <Text style={styles.statLabel}>Following</Text>
//                 </View>
//             </View>

//             {/* Bio */}
//             <Text style={styles.bio}>{user.bio}</Text>

//             {/* Action Buttons */}
//             <View style={styles.actionButtons}>
//                 <TouchableOpacity style={styles.editButton}>
//                     <Text style={styles.buttonText}>Edit Profile</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.shareButton}>
//                     <Text style={styles.buttonText}>Share Profile</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.addButton}>
//                     <Icon name="account-plus" size={20} color="#fff" />
//                 </TouchableOpacity>
//             </View>

//             {/* Post Grid */}
//             <FlatList
//                 data={posts}
//                 numColumns={3}
//                 renderItem={({ item }) => (
//                     <Image source={{ uri: item.image }} style={styles.postImage} />
//                 )}
//                 keyExtractor={(item) => item.id}
//                 style={styles.grid}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff', // Changed background color to white
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: 10,
//     },
//     username: {
//         color: '#000', // Changed text color to black
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginHorizontal: 5,
//     },
//     profileInfo: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         paddingVertical: 20,
//     },
//     avatar: {
//         width: 80,
//         height: 80,
//         borderRadius: 40,
//         borderWidth: 2,
//         borderColor: '#000', // Changed border color to black
//     },
//     addIcon: {
//         position: 'absolute',
//         bottom: 10,
//         right: 120,
//         backgroundColor: '#0095f6',
//         borderRadius: 20,
//         padding: 2,
//     },
//     stats: {
//         alignItems: 'center',
//     },
//     statNumber: {
//         color: '#000', // Changed text color to black
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     statLabel: {
//         color: '#888',
//         fontSize: 14,
//     },
//     bio: {
//         color: '#000', // Changed text color to black
//         textAlign: 'center',
//         marginHorizontal: 20,
//         marginBottom: 10,
//     },
//     actionButtons: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginVertical: 10,
//     },
//     editButton: {
//         backgroundColor: '#e0e0e0', // Changed button color for visibility
//         paddingVertical: 5,
//         paddingHorizontal: 15,
//         borderRadius: 5,
//     },
//     shareButton: {
//         backgroundColor: '#e0e0e0', // Changed button color for visibility
//         paddingVertical: 5,
//         paddingHorizontal: 15,
//         borderRadius: 5,
//     },
//     addButton: {
//         backgroundColor: '#0095f6',
//         padding: 10,
//         borderRadius: 20,
//     },
//     buttonText: {
//         color: '#000', // Changed text color to black
//         fontSize: 14,
//     },
//     grid: {
//         flex: 1,
//     },
//     postImage: {
//         width: '33.33%',
//         aspectRatio: 1,
//     },
// });

// export default UserProfile;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false); // State for image error

  useEffect(() => {
    // Function to fetch profile data for user with ID 52
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:8000/api/player/'); // Fetch user with ID 52
        setProfileData(response.data); // Set the profile data
        setLoading(false); // Stop loading once data is fetched
      } catch (error) {
        console.error('Error fetching profile data:', error);
        Alert.alert('Error', 'Unable to fetch profile data');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Fallback image if the profile image is not loaded correctly
  const handleImageError = () => {
    setImageError(true); // Mark image as error
  };

  if (loading) {
    return <Text>Loading...</Text>; // You can replace this with a loading spinner if needed
  }

  // Check if profile data is available
  if (!profileData) {
    return <Text>No Profile Data Available</Text>;
  }

  // Extract the profile picture URL from the response
  const profilePicture = profileData.profile_picture;

  // If the profile_picture URL is invalid or missing, fallback to a default image
  const imageUrl = profilePicture && profilePicture !== 'null' ? profilePicture : null;

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.profileText}>PROFILE</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Image
            style={styles.icon}
            source={{ uri: 'https://via.placeholder.com/24' }} // Replace with settings icon
          />
        </TouchableOpacity>
      </View>

      {/* Profile Picture and Info */}
      <View style={styles.profileInfo}>
        <Image
          style={styles.profileImage}
          source={{
            uri: imageError || !imageUrl ? 'https://via.placeholder.com/120' : imageUrl, // Use fallback if image fails to load or no URL
          }}
          onError={handleImageError} // Handle image error
        />
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>674</Text>
          <Text style={styles.statLabel}>MY WORKS</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>15K</Text>
          <Text style={styles.statLabel}>FOLLOWERS</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>23K</Text>
          <Text style={styles.statLabel}>FOLLOWING</Text>
        </View>
      </View>

      {/* My Works Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Posts </Text>
        <View style={styles.workGrid}>
          <TouchableOpacity style={styles.workItem}>
            <Image
              style={styles.workImage}
              source={{ uri: 'https://via.placeholder.com/120' }} // Replace with work 1 image
            />
            <Text style={styles.workLabel}>Nature</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.workItem}>
            <Image
              style={styles.workImage}
              source={{ uri: 'https://via.placeholder.com/120' }} // Replace with work 2 image
            />
            <Text style={styles.workLabel}>My Art</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.workItem}>
            <Image
              style={styles.workImage}
              source={{ uri: 'https://via.placeholder.com/120' }} // Replace with work 3 image
            />
            <Text style={styles.workLabel}>People</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#66A5AD',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerIcon: {
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  profileInfo: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileTitle: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  profileDescription: {
    textAlign: 'center',
    paddingHorizontal: 40,
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  followButton: {
    backgroundColor: '#ff8a65',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  messageButton: {
    backgroundColor: '#ffa726',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
  },
  section: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  workGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workItem: {
    alignItems: 'center',
    width: '30%',
  },
  workImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  workLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  viewAll: {
    color: '#ff8a65',
    textAlign: 'center',
    marginTop: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  socialText: {
    fontSize: 14,
    color: '#ff8a65',
  },
});

export default ProfileScreen;
