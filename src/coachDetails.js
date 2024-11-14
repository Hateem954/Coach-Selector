// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import DocumentPicker from 'react-native-document-picker'; // Import Document Picker
// import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
// import axios from 'axios'; // Import Axios

// const CoachDetailsScreen = ({ navigation }) => {
//     const [categories, setCategories] = useState([]); // To store categories from API
//     const [category, setCategory] = useState('');
//     const [certificate, setCertificate] = useState(null); // To store PDF file info
//     const [level, setLevel] = useState('');
//     const [experience, setExperience] = useState('');
//     const [phone, setPhone] = useState('');
//     const [dob, setDob] = useState(new Date()); // To store Date of Birth
//     const [gender, setGender] = useState('');
//     const [location, setLocation] = useState('');
//     const [showDobPicker, setShowDobPicker] = useState(false);

//     // Function to fetch categories from the API
//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get('http://10.0.2.2:8000/api/category/');
//             console.log('Categories response:', response.data); // Log the response
//             // Access categories using response.data.category
//             if (Array.isArray(response.data.category)) {
//                 setCategories(response.data.category); // Use the correct path to access categories
//                 console.log('Fetched categories:', response.data.category); // Log fetched categories
//             } else {
//                 Alert.alert('Error', 'Invalid categories data received.');
//             }
//         } catch (error) {
//             console.error('Error fetching categories:', error.message);
//         }
//     };

//     // Function to select a PDF certificate
//     const selectCertificate = async () => {
//         try {
//             const res = await DocumentPicker.pick({
//                 type: [DocumentPicker.types.pdf], // Only allow PDF files
//             });
//             setCertificate(res[0]); // Store the selected file's info
//         } catch (err) {
//             if (DocumentPicker.isCancel(err)) {
//                 // User canceled the document picker
//                 Alert.alert('Canceled', 'No file was selected');
//             } else {
//                 Alert.alert('Error', 'Something went wrong');
//             }
//         }
//     };

//     // Function to handle the Save button press
//     const handleSave = () => {
//         // Check if any field is empty
//         if (!category || !certificate || !level || !experience || !phone || !dob || !gender || !location) {
//             Alert.alert('Missing Info', 'Please fill in all the fields.');
//             return;
//         }

//         // If all fields are filled, navigate to the dashboard
//         navigation.navigate('Dashboard');
//     };

//     const handleDobChange = (event, selectedDate) => {
//         const currentDate = selectedDate || dob;
//         setShowDobPicker(false);
//         setDob(currentDate);
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <Text style={styles.title}>Coach Details</Text>

//             <Text style={styles.label}>Date of Birth</Text>
//             <TouchableOpacity style={styles.dateInput} onPress={() => setShowDobPicker(true)}>
//                 <Text style={styles.dateText}>{dob.toLocaleDateString()}</Text>
//             </TouchableOpacity>
//             {showDobPicker && (
//                 <DateTimePicker
//                     value={dob}
//                     mode="date"
//                     display="default"
//                     onChange={handleDobChange}
//                 />
//             )}

//             <Text style={styles.label}>Gender</Text>
//             <View style={styles.pickerContainer}>
//                 <Picker
//                     selectedValue={gender}
//                     onValueChange={(itemValue) => setGender(itemValue)}
//                     style={styles.picker}
//                 >
//                     <Picker.Item label="Select Gender" value="" />
//                     <Picker.Item label="Male" value="male" />
//                     <Picker.Item label="Female" value="female" />
//                     <Picker.Item label="Other" value="other" />
//                 </Picker>
//             </View>

//             <Text style={styles.label}>Location</Text>
//             <TextInput
//                 style={styles.input}
//                 value={location}
//                 onChangeText={setLocation}
//                 placeholder="Enter location"
//             />

//             <Text style={styles.label}>Category of Sport</Text>
//             <View style={styles.pickerContainer}>
//                 <Picker
//                     selectedValue={category}
//                     onValueChange={(itemValue) => setCategory(itemValue)}
//                     style={styles.picker}
//                 >
//                     <Picker.Item label="Select Sport Category" value="" />
//                     {categories.map((item) => (
//                         <Picker.Item key={item.id} label={item.name} value={item.name} />
//                     ))}
//                 </Picker>
//             </View>

//             <Text style={styles.label}>Certificate</Text>
//             <TouchableOpacity style={styles.uploadButton} onPress={selectCertificate}>
//                 <Text style={styles.uploadButtonText}>
//                     {certificate ? `Selected: ${certificate.name}` : 'Upload PDF Certificate'}
//                 </Text>
//             </TouchableOpacity>

//             <Text style={styles.label}>Level</Text>
//             <TextInput
//                 style={styles.input}
//                 value={level}
//                 onChangeText={setLevel}
//                 placeholder="Enter level"
//             />

//             <Text style={styles.label}>Experience (Years)</Text>
//             <TextInput
//                 style={styles.input}
//                 value={experience}
//                 onChangeText={setExperience}
//                 placeholder="Enter experience"
//                 keyboardType="numeric"
//             />

//             <Text style={styles.label}>Phone Number</Text>
//             <TextInput
//                 style={styles.input}
//                 value={phone}
//                 onChangeText={setPhone}
//                 placeholder="Enter phone number"
//                 keyboardType="phone-pad"
//             />

//             <TouchableOpacity style={styles.button} onPress={handleSave}>
//                 <Text style={styles.buttonText}>Save</Text>
//             </TouchableOpacity>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     title: {
//         color: 'black',
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     label: {
//         width: '100%',
//         color: '#333',
//         fontSize: 14,
//         fontWeight: '500',
//         marginBottom: 5,
//         textAlign: 'left',
//     },
//     input: {
//         color: 'black',
//         width: '100%',
//         height: 50,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 5,
//         paddingHorizontal: 10,
//         marginBottom: 15,
//     },
//     dateInput: {
//         flexDirection: 'row', // Align items in a row
//         color: 'black',
//         width: '100%',
//         height: 50,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 5,
//         alignItems: 'center', // Center the content vertically
//         marginBottom: 15,
//         paddingHorizontal: 10, // Add some padding
//     },
//     dateText: {
//         color: '#888', // Lighter color for the date
//         fontSize: 14,
//         flex: 1, // Take up available space
//     },
//     pickerContainer: {
//         width: '100%',
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 5,
//         marginBottom: 15,
//     },
//     picker: {
//         height: 50,
//         width: '100%',
//     },
//     uploadButton: {
//         width: '100%',
//         height: 50,
//         backgroundColor: '#D3D3D3',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 5,
//         marginBottom: 15,
//     },
//     uploadButtonText: {
//         color: 'black',
//         fontSize: 16,
//     },
//     button: {
//         width: '100%',
//         height: 50,
//         backgroundColor: '#D3D3D3',
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 5,
//     },
//     buttonText: {
//         color: 'black',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default CoachDetailsScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import DocumentPicker from 'react-native-document-picker'; // Import Document Picker
// import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; // Import Image Picker
// import axios from 'axios'; // Import Axios

// const CoachDetailsScreen = ({ navigation }) => {
//     const [categories, setCategories] = useState([]); // To store categories from API
//     const [category, setCategory] = useState('');
//     const [certificate, setCertificate] = useState(null); // To store PDF file info
//     const [level, setLevel] = useState('');
//     const [experience, setExperience] = useState('');
//     const [phone, setPhone] = useState('');
//     const [name, setName] = useState(''); // For coach name
//     const [dob, setDob] = useState(new Date()); // To store Date of Birth
//     const [gender, setGender] = useState('');
//     const [coachLocation, setCoachLocation] = useState(''); // Updated to match new field
//     const [image, setImage] = useState(null); // For storing the selected image
//     const [showDobPicker, setShowDobPicker] = useState(false);

//     // Function to fetch categories from the API
//     useEffect(() => {
//         fetchCategories();
//     }, []);

//     const fetchCategories = async () => {
//         try {
//             const response = await axios.get('http://10.0.2.2:8000/api/category/');
//             console.log('Categories response:', response.data); // Log the response
//             if (Array.isArray(response.data.category)) {
//                 setCategories(response.data.category); // Use the correct path to access categories
//                 console.log('Fetched categories:', response.data.category); // Log fetched categories
//             } else {
//                 Alert.alert('Error', 'Invalid categories data received.');
//             }
//         } catch (error) {
//             console.error('Error fetching categories:', error.message);
//         }
//     };

//     // Function to select a PDF certificate
//     const selectCertificate = async () => {
//         try {
//             const res = await DocumentPicker.pick({
//                 type: [DocumentPicker.types.pdf], // Only allow PDF files
//             });
//             setCertificate(res[0]); // Store the selected file's info
//         } catch (err) {
//             if (DocumentPicker.isCancel(err)) {
//                 Alert.alert('Canceled', 'No file was selected');
//             } else {
//                 Alert.alert('Error', 'Something went wrong');
//             }
//         }
//     };

//     // Function to select an image
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
//                     onPress: () => launchCamera(options, (response) => {
//                         if (response.didCancel) {
//                             console.log('User cancelled image picker');
//                         } else if (response.error) {
//                             console.error('ImagePicker Error: ', response.error);
//                         } else {
//                             setImage(response.assets[0]);
//                         }
//                     }),
//                 },
//                 {
//                     text: 'Gallery',
//                     onPress: () => launchImageLibrary(options, (response) => {
//                         if (response.didCancel) {
//                             console.log('User cancelled image picker');
//                         } else if (response.error) {
//                             console.error('ImagePicker Error: ', response.error);
//                         } else {
//                             setImage(response.assets[0]);
//                         }
//                     }),
//                 },
//                 { text: 'Cancel', style: 'cancel' },
//             ],
//             { cancelable: false }
//         );
//     };

//     // Function to handle the Save button press
//     const handleSave = async () => {
//         // Check if any field is empty
//         if (!name || !category || !certificate || !level || !experience || !phone || !dob || !gender || !coachLocation || !image) {
//             Alert.alert('Missing Info', 'Please fill in all the fields.');
//             return;
//         }

//         // Prepare the form data for the API
//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('date_of_birth', dob.toISOString().split('T')[0]); // Format the date
//         formData.append('gender', gender);
//         formData.append('location', coachLocation);
//         formData.append('category', category);
//         formData.append('certificate', {
//             uri: certificate.uri,
//             name: certificate.name,
//             type: 'application/pdf',
//         });
//         formData.append('level', level);
//         formData.append('experience', experience);
//         formData.append('phone', phone);
//         formData.append('image', {
//             uri: image.uri,
//             name: image.fileName,
//             type: image.type,
//         });

//         try {
//             // Make the POST request to save the coach details
//             const response = await axios.post('http://127.0.0.1:8000/api/coach/', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             console.log('Response from API:', response.data);
//             Alert.alert('Success', 'Coach details saved successfully!');
//             navigation.navigate('Dashboard'); // Navigate to the dashboard
//         } catch (error) {
//             console.error('Error saving coach details:', error);
//             Alert.alert('Error', 'Could not save coach details. Please try again.');
//         }
//     };

//     const handleDobChange = (event, selectedDate) => {
//         const currentDate = selectedDate || dob;
//         setShowDobPicker(false);
//         setDob(currentDate);
//     };

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <Text style={styles.title}>Coach Details</Text>

//             <Text style={styles.label}>Name</Text>
//             <TextInput
//                 style={styles.input}
//                 value={name}
//                 onChangeText={setName}
//                 placeholder="Enter your name"
//             />

//             <Text style={styles.label}>Date of Birth</Text>
//             <TouchableOpacity style={styles.dateInput} onPress={() => setShowDobPicker(true)}>
//                 <Text style={styles.dateText}>{dob.toLocaleDateString()}</Text>
//             </TouchableOpacity>
//             {showDobPicker && (
//                 <DateTimePicker
//                     value={dob}
//                     mode="date"
//                     display="default"
//                     onChange={handleDobChange}
//                 />
//             )}

//             <Text style={styles.label}>Gender</Text>
//             <View style={styles.pickerContainer}>
//                 <Picker
//                     selectedValue={gender}
//                     onValueChange={(itemValue) => setGender(itemValue)}
//                     style={styles.picker}
//                 >
//                     <Picker.Item label="Select Gender" value="" />
//                     <Picker.Item label="Male" value="male" />
//                     <Picker.Item label="Female" value="female" />
//                     <Picker.Item label="Other" value="other" />
//                 </Picker>
//             </View>

//             <Text style={styles.label}>Coach Location</Text>
//             <TextInput
//                 style={styles.input}
//                 value={coachLocation}
//                 onChangeText={setCoachLocation}
//                 placeholder="Enter coach location"
//             />

//             <Text style={styles.label}>Category of Sport</Text>
//             <View style={styles.pickerContainer}>
//                 <Picker
//                     selectedValue={category}
//                     onValueChange={(itemValue) => setCategory(itemValue)}
//                     style={styles.picker}
//                 >
//                     <Picker.Item label="Select Sport Category" value="" />
//                     {categories.map((item) => (
//                         <Picker.Item key={item.id} label={item.name} value={item.name} />
//                     ))}
//                 </Picker>
//             </View>

//             <Text style={styles.label}>Certificate</Text>
//             <TouchableOpacity style={styles.uploadButton} onPress={selectCertificate}>
//                 <Text style={styles.uploadButtonText}>
//                     {certificate ? `Selected: ${certificate.name}` : 'Upload PDF Certificate'}
//                 </Text>
//             </TouchableOpacity>

//             <Text style={styles.label}>Image</Text>
//             <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
//                 <Text style={styles.uploadButtonText}>
//                     {image ? `Selected: ${image.fileName}` : 'Upload Image'}
//                 </Text>
//             </TouchableOpacity>
//             {image && (
//                 <Image
//                     source={{ uri: image.uri }}
//                     style={styles.imagePreview}
//                 />
//             )}

//             <Text style={styles.label}>Level</Text>
//             <TextInput
//                 style={styles.input}
//                 value={level}
//                 onChangeText={setLevel}
//                 placeholder="Enter level"
//             />

//             <Text style={styles.label}>Experience (Years)</Text>
//             <TextInput
//                 style={styles.input}
//                 value={experience}
//                 onChangeText={setExperience}
//                 placeholder="Enter experience"
//                 keyboardType="numeric"
//             />

//             <Text style={styles.label}>Phone Number</Text>
//             <TextInput
//                 style={styles.input}
//                 value={phone}
//                 onChangeText={setPhone}
//                 placeholder="Enter phone number"
//                 keyboardType="phone-pad"
//             />

//             <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
//                 <Text style={styles.saveButtonText}>Save</Text>
//             </TouchableOpacity>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         backgroundColor: '#fff',
//         flexGrow: 1,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     label: {
//         fontSize: 16,
//         marginVertical: 5,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 15,
//     },
//     pickerContainer: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         marginBottom: 15,
//     },
//     picker: {
//         height: 50,
//     },
//     uploadButton: {
//         backgroundColor: '#007bff',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center',
//         marginBottom: 15,
//     },
//     uploadButtonText: {
//         color: '#fff',
//     },
//     imagePreview: {
//         width: 100,
//         height: 100,
//         resizeMode: 'cover',
//         borderRadius: 5,
//         marginBottom: 15,
//     },
//     saveButton: {
//         backgroundColor: '#28a745',
//         padding: 15,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     saveButtonText: {
//         color: '#fff',
//         fontSize: 16,
//     },
//     dateInput: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 15,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     dateText: {
//         fontSize: 16,
//     },
// });

// export default CoachDetailsScreen;








































import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DocumentPicker from 'react-native-document-picker'; // Import Document Picker
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'; // Import Image Picker
import axios from 'axios'; // Import Axios

const CoachDetailsScreen = ({ navigation }) => {
    const [categories, setCategories] = useState([]); // To store categories from API
    const [categoryId, setCategoryId] = useState(''); // Updated to use category ID
    const [certificate, setCertificate] = useState(null); // To store PDF file info
    const [level, setLevel] = useState('');
    const [experience, setExperience] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState(''); // For coach name
    const [dob, setDob] = useState(new Date()); // To store Date of Birth
    const [gender, setGender] = useState('');
    const [coachLocation, setCoachLocation] = useState(''); // Updated to match new field
    const [image, setImage] = useState(null); // For storing the selected image
    const [showDobPicker, setShowDobPicker] = useState(false);
    const [status, setStatus] = useState('active'); // Default status

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:8000/api/category/');
            if (Array.isArray(response.data.category)) {
                setCategories(response.data.category); // Use the correct path to access categories
            } else {
                Alert.alert('Error', 'Invalid categories data received.');
            }
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    const selectCertificate = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            setCertificate(res[0]);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                Alert.alert('Canceled', 'No file was selected');
            } else {
                Alert.alert('Error', 'Something went wrong');
            }
        }
    };

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
                    onPress: () => launchCamera(options, (response) => {
                        if (response.didCancel) {
                            console.log('User cancelled image picker');
                        } else if (response.error) {
                            console.error('ImagePicker Error: ', response.error);
                        } else {
                            setImage(response.assets[0]);
                        }
                    }),
                },
                {
                    text: 'Gallery',
                    onPress: () => launchImageLibrary(options, (response) => {
                        if (response.didCancel) {
                            console.log('User cancelled image picker');
                        } else if (response.error) {
                            console.error('ImagePicker Error: ', response.error);
                        } else {
                            setImage(response.assets[0]);
                        }
                    }),
                },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: false }
        );
    };

    const handleSave = async () => {
        if (!name || !categoryId || !certificate || !level || !experience || !phone || !dob || !gender || !coachLocation || !image || !status) {
            Alert.alert('Missing Info', 'Please fill in all the required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('date_of_birth', dob.toISOString().split('T')[0]);
        formData.append('gender', gender);
        formData.append('coach_location', coachLocation);
        formData.append('category_id', categoryId);
        formData.append('certificate', {
            uri: certificate.uri,
            name: certificate.name,
            type: 'application/pdf',
        });
        formData.append('level', level);
        formData.append('experience', experience);
        formData.append('phone_number', phone);
        formData.append('status', 'active');
        formData.append('image', {
            uri: image.uri,
            name: image.fileName,
            type: image.type,
        });

        try {
            const response = await axios.post('http://10.0.2.2/api/coach/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Success', 'Coach details saved successfully!');
            navigation.navigate('Dashboard');
        } catch (error) {
            console.error('Error saving coach details:', error);
            Alert.alert('Error', 'Could not save coach details. Please try again.');
        }
    };

    const handleDobChange = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setShowDobPicker(false);
        setDob(currentDate);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Coach Details</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
            />

            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity style={styles.dateInput} onPress={() => setShowDobPicker(true)}>
                <Text style={styles.dateText}>{dob.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDobPicker && (
                <DateTimePicker
                    value={dob}
                    mode="date"
                    display="default"
                    onChange={handleDobChange}
                />
            )}

            <Text style={styles.label}>Gender</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue) => setGender(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
            </View>

            <Text style={styles.label}>Coach Location</Text>
            <TextInput
                style={styles.input}
                value={coachLocation}
                onChangeText={setCoachLocation}
                placeholder="Enter coach location"
            />

            <Text style={styles.label}>Category of Sport</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={categoryId}
                    onValueChange={(itemValue) => setCategoryId(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Sport Category" value="" />
                    {categories.map((item) => (
                        <Picker.Item key={item.id} label={item.name} value={item.id} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Certificate</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={selectCertificate}>
                <Text style={styles.uploadButtonText}>
                    {certificate ? `Selected: ${certificate.name}` : 'Upload PDF Certificate'}
                </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Image</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={selectImage}>
                <Text style={styles.uploadButtonText}>
                    {image ? `Selected: ${image.fileName}` : 'Upload Image'}
                </Text>
            </TouchableOpacity>
            {image && (
                <Image
                    source={{ uri: image.uri }}
                    style={styles.imagePreview}
                />
            )}

            <Text style={styles.label}>Level</Text>
            <TextInput
                style={styles.input}
                value={level}
                onChangeText={setLevel}
                placeholder="Enter level"
            />

            <Text style={styles.label}>Experience (Years)</Text>
            <TextInput
                style={styles.input}
                value={experience}
                onChangeText={setExperience}
                placeholder="Enter experience"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Phone Number</Text>
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        justifyContent: 'center',
    },
    dateText: {
        fontSize: 16,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,
    },
    picker: {
        height: 50,
    },
    uploadButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
    },
    uploadButtonText: {
        color: '#fff',
    },
    imagePreview: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginBottom: 15,
    },
    saveButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default CoachDetailsScreen;
