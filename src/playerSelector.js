// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal, Alert, StyleSheet } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

// const PlayerDetailsModal = ({ navigation }) => {
//     const [categories, setCategories] = useState([]);
//     const [category, setCategory] = useState('');
//     const [trainingType, setTrainingType] = useState('');
//     const [modalVisible, setModalVisible] = useState(true);
//     const [playerName, setPlayerName] = useState('');
//     const [gender, setGender] = useState('');
//     const [phoneNo, setPhoneNo] = useState('');
//     const [dob, setDob] = useState(new Date());
//     const [showDatePicker, setShowDatePicker] = useState(false);
//     const [address, setAddress] = useState('');
//     const [location, setLocation] = useState('');
//     const [profilePicture, setProfilePicture] = useState(null);
//     const [status, setStatus] = useState('');
//     const [uploadedImageUrl, setUploadedImageUrl] = useState('');

//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get('http://10.0.2.2:8000/api/category/');
//             if (Array.isArray(response.data.category)) {
//                 setCategories(response.data.category);
//             } else {
//                 Alert.alert('Error', 'Invalid categories data received.');
//             }
//         } catch (error) {
//             console.error('Error fetching categories:', error.message);
//         }
//     };

//     // Removed POST logic from here, now it only selects and stores the image
//     const selectImage = () => {
//         const options = {
//             mediaType: 'photo',
//             includeBase64: false,
//             quality: 1,
//         };

//         Alert.alert(
//             'Select Image',
//             'Choose an option',
//             [
//                 {
//                     text: 'Camera',
//                     onPress: () => launchCamera(options, handleResponse),
//                 },
//                 {
//                     text: 'Gallery',
//                     onPress: () => launchImageLibrary(options, handleResponse),
//                 },
//                 { text: 'Cancel', style: 'cancel' },
//             ],
//             { cancelable: false }
//         );
//     };

//     const handleResponse = (response) => {
//         if (response.didCancel) {
//             console.log('User cancelled image picker');
//         } else if (response.error) {
//             console.error('ImagePicker Error: ', response.error);
//         } else if (response.assets && response.assets.length > 0) {
//             const selectedImage = response.assets[0];
//             setProfilePicture(selectedImage);
//             // Removed image upload logic here
//         }
//     };

//     const handlePlayerNext = async () => {
//         if (!playerName || !gender || !phoneNo || !dob || !address || !location || !category || !trainingType) {
//             Alert.alert('Missing Info', 'Please fill in all fields.');
//             return;
//         }

//         let imageUrl = uploadedImageUrl;
//         if (profilePicture && !uploadedImageUrl) {
//             // Upload the image if not already uploaded, else pass the existing image URL
//             imageUrl = await uploadImage(profilePicture);
//             if (!imageUrl) return;
//         }

//         const playerData = {
//             player_name: playerName,
//             player_gender: gender,
//             player_phonenumber: phoneNo,
//             player_dob: dob.toISOString().split('T')[0],
//             player_address: address,
//             player_location: location,
//             cat_id: category,
//             playwith: trainingType,
//             image: imageUrl,
//             status: status,
//         };

//         try {
//             const response = await axios.post('http://10.0.2.2:8000/api/player/', playerData);
//             if (response.status === 201 || response.status === 200 && response.data.success) {
//                 Alert.alert('Data Saved Successfully!');
//                 navigation.navigate('Dashboard');

//             } else {
//                 throw new Error('Unexpected response status');
//             }
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || 'Error submitting player details.';
//             console.error('Error submitting player data:', error.message);
//             Alert.alert('Error', errorMessage);
//         }
//     };

//     const uploadImage = async (playerImage) => {
//         const formData = new FormData();
//         formData.append('image', {
//             uri: playerImage.uri,
//             type: playerImage.type || 'image/jpeg',
//             name: playerImage.fileName || 'player_image.jpg',
//         });

//         // Append other player data here
//         formData.append('player_name', playerName);
//         formData.append('player_gender', gender);
//         formData.append('player_phonenumber', phoneNo);
//         formData.append('player_dob', dob.toISOString().split('T')[0]);
//         formData.append('player_address', address);
//         formData.append('player_location', location);
//         formData.append('cat_id', category);
//         formData.append('playwith', trainingType);
//         formData.append('status', status);

//         try {
//             const response = await axios.post('http://10.0.2.2:8000/api/player/', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             if (response.status === 200 || response.status === 201) {
//                 console.log('Image uploaded successfully:', response.data);
//                 Alert.alert('Data Saved Successfully!');
//                 navigation.navigate('playerParent');
//             } else {
//                 throw new Error('Unexpected response status: ' + response.status);
//             }
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             Alert.alert('Upload Error', 'Failed to upload image. Please try again.');
//         }
//     };

//     const onChangeDob = (event, selectedDate) => {
//         const currentDate = selectedDate || dob;
//         setShowDatePicker(false);
//         setDob(currentDate);
//     };

//     const showDatepicker = () => {
//         setShowDatePicker(true);
//     };

//     const renderInput = ({ item }) => {
//         switch (item.type) {
//             case 'textInput':
//                 return (
//                     <View style={styles.inputContainer}>
//                         <Text style={styles.label}>{item.label}</Text>
//                         <TextInput
//                             style={styles.input}
//                             value={item.value}
//                             onChangeText={item.onChange}
//                             placeholder={item.placeholder}
//                             keyboardType={item.keyboardType}
//                         />
//                     </View>
//                 );
//             case 'picker':
//                 return (
//                     <View style={styles.inputContainer}>
//                         <Text style={styles.label}>{item.label}</Text>
//                         <View style={styles.pickerContainer}>
//                             <Picker
//                                 selectedValue={item.value}
//                                 onValueChange={item.onChange}
//                                 style={styles.picker}
//                             >
//                                 <Picker.Item label={item.placeholder} value="" />
//                                 {item.options.map((option) => (
//                                     <Picker.Item key={option.id} label={option.name} value={option.id} />
//                                 ))}
//                             </Picker>
//                         </View>
//                     </View>
//                 );
//             case 'dateInput':
//                 return (
//                     <View style={styles.inputContainer}>
//                         <Text style={styles.label}>{item.label}</Text>
//                         <TouchableOpacity style={styles.input} onPress={showDatepicker}>
//                             <Text>{dob.toLocaleDateString()}</Text>
//                         </TouchableOpacity>
//                         {showDatePicker && (
//                             <DateTimePicker
//                                 testID="dateTimePicker"
//                                 value={dob}
//                                 mode="date"
//                                 is24Hour={true}
//                                 display="default"
//                                 onChange={onChangeDob}
//                             />
//                         )}
//                     </View>
//                 );
//             case 'imagePicker':
//                 return (
//                     <View style={styles.inputContainer}>
//                         <Text style={styles.label}>Profile Picture</Text>
//                         <TouchableOpacity style={styles.imagePickerButton} onPress={selectImage}>
//                             <Text style={styles.imagePickerText}>
//                                 {profilePicture ? `Selected: ${profilePicture.fileName}` : 'Upload Image'}
//                             </Text>
//                         </TouchableOpacity>
//                         {profilePicture && (
//                             <Image source={{ uri: profilePicture.uri }} style={styles.profileImage} />
//                         )}
//                     </View>
//                 );
//             default:
//                 return null;
//         }
//     };

//     const inputFields = [
//         {
//             type: 'textInput',
//             label: 'Player Name',
//             value: playerName,
//             onChange: setPlayerName,
//             placeholder: 'Enter Player Name',
//         },
//         {
//             type: 'picker',
//             label: 'Gender',
//             value: gender,
//             onChange: setGender,
//             placeholder: 'Select Gender',
//             options: [
//                 { id: 'male', name: 'Male' },
//                 { id: 'female', name: 'Female' },
//             ],
//         },
//         {
//             type: 'textInput',
//             label: 'Phone Number',
//             value: phoneNo,
//             onChange: setPhoneNo,
//             placeholder: 'Enter Phone Number',
//             keyboardType: 'phone-pad',
//         },
//         {
//             type: 'dateInput',
//             label: 'Date of Birth',
//             value: dob,
//             onChange: setDob,
//             placeholder: 'Select Date of Birth',
//         },
//         {
//             type: 'textInput',
//             label: 'Address',
//             value: address,
//             onChange: setAddress,
//             placeholder: 'Enter Address',
//         },
//         {
//             type: 'textInput',
//             label: 'Location',
//             value: location,
//             onChange: setLocation,
//             placeholder: 'Enter Location',
//         },
//         {
//             type: 'picker',
//             label: 'Category',
//             value: category,
//             onChange: setCategory,
//             placeholder: 'Select Category',
//             options: categories,
//         },
//         {
//             type: 'picker',
//             label: 'Training Type',
//             value: trainingType,
//             onChange: setTrainingType,
//             placeholder: 'Select Training Type',
//             options: [
//                 { id: 'individual', name: 'Individual' },
//                 { id: 'group', name: 'Group' },
//             ],
//         },
//         // {
//         //     type: 'picker',
//         //     label: 'Status',
//         //     value: status,
//         //     onChange: setStatus,
//         //     placeholder: 'Select Status',
//         //     options: [
//         //         { id: 'active', name: 'Active' },
//         //         { id: 'inactive', name: 'Inactive' },
//         //     ],
//         // },
//         {
//             type: 'imagePicker',
//         },
//     ];

//     return (
//         <Modal visible={modalVisible} animationType="slide" transparent={true}>
//             <View style={styles.modalContainer}>
//                 <View style={styles.modalContent}>
//                     <FlatList
//                         data={inputFields}
//                         renderItem={renderInput}
//                         keyExtractor={(item, index) => index.toString()}
//                     />
//                     <TouchableOpacity style={styles.nextButton} onPress={handlePlayerNext}>
//                         <Text style={styles.nextButtonText}>Next</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContent: {
//         backgroundColor: 'white',
//         padding: 20,
//         width: '80%',
//         borderRadius: 10,
//     },
//     inputContainer: {
//         marginBottom: 15,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         borderRadius: 5,
//         paddingHorizontal: 10,
//     },
//     pickerContainer: {
//         borderWidth: 1,
//         borderColor: 'gray',
//         borderRadius: 5,
//     },
//     picker: {
//         height: 40,
//         width: '100%',
//     },
//     imagePickerButton: {
//         backgroundColor: '#2196F3',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     imagePickerText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
//     profileImage: {
//         width: 100,
//         height: 100,
//         marginTop: 10,
//     },
//     nextButton: {
//         backgroundColor: '#2196F3',
//         padding: 15,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     nextButtonText: {
//         color: 'white',
//         fontWeight: 'bold',
//     },
// });

// export default PlayerDetailsModal;





import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const PlayerDetailsModal = ({ navigation }) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [trainingType, setTrainingType] = useState('');
    const [modalVisible, setModalVisible] = useState(true);
    const [playerName, setPlayerName] = useState('');
    const [gender, setGender] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [dob, setDob] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [status, setStatus] = useState('');
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:8000/api/category/');
            if (Array.isArray(response.data.category)) {
                setCategories(response.data.category);
            } else {
                Alert.alert('Error', 'Invalid categories data received.');
            }
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    // Removed POST logic from here, now it only selects and stores the image
    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            quality: 1,
        };

        Alert.alert(
            'Select Image',
            'Choose an option',
            [
                {
                    text: 'Camera',
                    onPress: () => launchCamera(options, handleResponse),
                },
                {
                    text: 'Gallery',
                    onPress: () => launchImageLibrary(options, handleResponse),
                },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: false }
        );
    };

    const handleResponse = (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.error('ImagePicker Error: ', response.error);
        } else if (response.assets && response.assets.length > 0) {
            const selectedImage = response.assets[0];
            setProfilePicture(selectedImage);
            // Removed image upload logic here
        }
    };

    const handlePlayerNext = async () => {
        if (!playerName || !gender || !phoneNo || !dob || !address || !location || !category || !trainingType ) {
            Alert.alert('Missing Info', 'Please fill in all fields.');
            return;
        }

        let imageUrl = uploadedImageUrl;
        if (profilePicture && !uploadedImageUrl) {
            // Upload the image if not already uploaded, else pass the existing image URL
            imageUrl = await uploadImage(profilePicture);
            if (!imageUrl) return;
        }

        const playerData = {
            player_name: playerName,
            player_gender: gender,
            player_phonenumber: phoneNo,
            player_dob: dob.toISOString().split('T')[0],
            player_address: address,
            player_location: location,
            cat_id: category,
            playwith: trainingType,
            image: imageUrl,
            status: 'active',
        };

        try {
            const response = await axios.post('http://10.0.2.2:8000/api/player/', playerData);
            if (response.status === 201 || response.status === 200) {
                console.log('Player data submitted successfully:', response.data);
                navigation.navigate('NextScreen', { playerData });
            } else {
                throw new Error('Unexpected response status');
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error submitting player details.';
            console.error('Error submitting player data:', error.message);
            Alert.alert('Error', errorMessage);
        }
    };

    const uploadImage = async (playerImage) => {
        const formData = new FormData();
        formData.append('image', {
            uri: playerImage.uri,
            type: playerImage.type || 'image/jpeg',
            name: playerImage.fileName || 'player_image.jpg',
        });

        // Append other player data here
        formData.append('player_name', playerName);
        formData.append('player_gender', gender);
        formData.append('player_phonenumber', phoneNo);
        formData.append('player_dob', dob.toISOString().split('T')[0]);
        formData.append('player_address', address);
        formData.append('player_location', location);
        formData.append('cat_id', category);
        formData.append('playwith', trainingType);
        formData.append('status', status);

        try {
            const response = await axios.post('http://10.0.2.2:8000/api/player/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200 || response.status === 201) {
                console.log('Image uploaded successfully:', response.data);
                setUploadedImageUrl(response.data.imageUrl);
                navigation.navigate('playerParent');
            } else {
                throw new Error('Unexpected response status: ' + response.status);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Upload Error', 'Failed to upload image. Please try again.');
        }
    };

    const onChangeDob = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShowDatePicker(false);
        setDob(currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const renderInput = ({ item }) => {
        switch (item.type) {
            case 'textInput':
                return (
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{item.label}</Text>
                        <TextInput
                            style={styles.input}
                            value={item.value}
                            onChangeText={item.onChange}
                            placeholder={item.placeholder}
                            keyboardType={item.keyboardType}
                        />
                    </View>
                );
            case 'picker':
                return (
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{item.label}</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={item.value}
                                onValueChange={item.onChange}
                                style={styles.picker}
                            >
                                <Picker.Item label={item.placeholder} value="" />
                                {item.options.map((option) => (
                                    <Picker.Item key={option.id} label={option.name} value={option.id} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                );
            case 'dateInput':
                return (
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>{item.label}</Text>
                        <TouchableOpacity style={styles.input} onPress={showDatepicker}>
                            <Text>{dob.toLocaleDateString()}</Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={dob}
                                mode="date"
                                is24Hour={true}
                                display="default"
                                onChange={onChangeDob}
                            />
                        )}
                    </View>
                );
            case 'imagePicker':
                return (
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Profile Picture</Text>
                        <TouchableOpacity style={styles.imagePickerButton} onPress={selectImage}>
                            <Text style={styles.imagePickerText}>
                                {profilePicture ? `Selected: ${profilePicture.fileName}` : 'Upload Image'}
                            </Text>
                        </TouchableOpacity>
                        {profilePicture && (
                            <Image source={{ uri: profilePicture.uri }} style={styles.profileImage} />
                        )}
                    </View>
                );
            default:
                return null;
        }
    };

    const inputFields = [
        {
            type: 'textInput',
            label: 'Player Name',
            value: playerName,
            onChange: setPlayerName,
            placeholder: 'Enter Player Name',
        },
        {
            type: 'picker',
            label: 'Gender',
            value: gender,
            onChange: setGender,
            placeholder: 'Select Gender',
            options: [
                { id: 'male', name: 'Male' },
                { id: 'female', name: 'Female' },
            ],
        },
        {
            type: 'textInput',
            label: 'Phone Number',
            value: phoneNo,
            onChange: setPhoneNo,
            placeholder: 'Enter Phone Number',
            keyboardType: 'phone-pad',
        },
        {
            type: 'dateInput',
            label: 'Date of Birth',
            value: dob,
            onChange: setDob,
            placeholder: 'Select Date of Birth',
        },
        {
            type: 'textInput',
            label: 'Address',
            value: address,
            onChange: setAddress,
            placeholder: 'Enter Address',
        },
        {
            type: 'textInput',
            label: 'Location',
            value: location,
            onChange: setLocation,
            placeholder: 'Enter Location',
        },
        {
            type: 'picker',
            label: 'Category',
            value: category,
            onChange: setCategory,
            placeholder: 'Select Category',
            options: categories,
        },
        {
            type: 'picker',
            label: 'Training Type',
            value: trainingType,
            onChange: setTrainingType,
            placeholder: 'Select Training Type',
            options: [
                { id: 'individual', name: 'Individual' },
                { id: 'group', name: 'Group' },
            ],
        },
        
        {
            type: 'imagePicker',
        },
    ];

    return (
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <FlatList
                        data={inputFields}
                        renderItem={renderInput}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <TouchableOpacity style={styles.nextButton} onPress={handlePlayerNext}>
                        <Text style={styles.nextButtonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        width: '80%',
        borderRadius: 10,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    picker: {
        height: 40,
        width: '100%',
    },
    imagePickerButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    imagePickerText: {
        color: 'white',
        fontWeight: 'bold',
    },
    profileImage: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
    nextButton: {
        backgroundColor: '#2196F3',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    nextButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default PlayerDetailsModal;
