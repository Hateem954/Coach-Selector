import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Modal, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PlayerDetailsModal from './playerSelector';  // Import the new component
import CoachDetailsScreen from './coachDetails';  // Import the CoachDetailsScreen component

const ProfileScreen = ({ route, navigation }) => {
    const role = route?.params?.role || ''; // Get the role from route params
    const [selectedRole, setSelectedRole] = useState(role); // Initialize with role from signup
    const [dob, setDob] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [gender, setGender] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');  // New field for location
    const [showPlayerModal, setShowPlayerModal] = useState(false);
    const [showCoachModal, setShowCoachModal] = useState(false);
    const [sportsCategory, setSportsCategory] = useState('');
    const [trainingType, setTrainingType] = useState('');

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || dob;
        setDob(currentDate);
        setShowDatePicker(false);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const handleRoleChange = (roleValue) => {
        setSelectedRole(roleValue);
    };

    const handleSaveProfile = () => {
        if (selectedRole === 'player') {
            setShowPlayerModal(true); // Show the player-specific modal
        } else if (selectedRole === 'coach') {
            setShowCoachModal(true); // Show the coach details modal
        } else {
            Alert.alert("Please select a valid role.");
        }
    };

    const handleConfirm = () => {
        Alert.alert("Profile Saved", `DOB: ${dob.toDateString()}, Gender: ${gender}, Role: ${selectedRole}, Location: ${currentLocation}`);
    };

    const handlePlayerNext = () => {
        Alert.alert("Player Details", `Sports Category: ${sportsCategory}, Training: ${trainingType}`);
        setShowPlayerModal(false);
    };

    const formattedDate = dob ? dob.toDateString() : '';

    return (
        <View style={styles.container}>
            {/* Role Picker */}
            <Text style={styles.label}>Select Role</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedRole}
                    onValueChange={(itemValue) => handleRoleChange(itemValue)}
                    style={styles.picker}
                    enabled={!role} // Disable picker if role is passed from signup page
                >
                    <Picker.Item label="Select your role" value="" />
                    <Picker.Item label="Player" value="player" />
                    <Picker.Item label="Coach" value="coach" />
                </Picker>
            </View>

            {/* Show fields based on role */}
            {selectedRole === 'coach' && (
                <>
                    <Text style={styles.label}>Date of Birth</Text>
                    <View style={styles.dateContainer}>
                        <Text style={styles.dateInput}>{formattedDate}</Text>
                        <TouchableOpacity onPress={showDatepicker}>
                            <Ionicons name="calendar" size={24} color="gray" />
                        </TouchableOpacity>
                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            value={dob}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}

                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={gender}
                            onValueChange={(itemValue) => setGender(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select your gender" value="" />
                            <Picker.Item label="Male" value="male" />
                            <Picker.Item label="Female" value="female" />
                            <Picker.Item label="Other" value="other" />
                        </Picker>
                    </View>

                    {/* Current Location Field for Coach */}
                    <Text style={styles.label}>Current Location</Text>
                    <TextInput
                        style={styles.input}
                        value={currentLocation}
                        onChangeText={setCurrentLocation}
                        placeholder="Enter your current location"
                    />
                </>
            )}

            {selectedRole === 'player' && (
                <>
                    <Text style={styles.label}>Sports Category</Text>
                    <TextInput
                        style={styles.input}
                        value={sportsCategory}
                        onChangeText={setSportsCategory}
                        placeholder="Enter your sports category"
                    />

                    <Text style={styles.label}>Training Type</Text>
                    <TextInput
                        style={styles.input}
                        value={trainingType}
                        onChangeText={setTrainingType}
                        placeholder="Enter your training type"
                    />
                </>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
                <Text style={styles.buttonText}>Save Profile</Text>
            </TouchableOpacity>

            {/* PlayerDetailsModal */}
            <PlayerDetailsModal
                visible={showPlayerModal}
                onClose={() => setShowPlayerModal(false)}
                sportsCategory={sportsCategory}
                setSportsCategory={setSportsCategory}
                trainingType={trainingType}
                setTrainingType={setTrainingType}
                handlePlayerNext={handlePlayerNext}
            />

            {/* CoachDetailsScreen Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showCoachModal}
                onRequestClose={() => setShowCoachModal(false)}
            >
                <View style={styles.bottomModal}>
                    <View style={styles.modalContent}>
                        <CoachDetailsScreen
                            navigation={{
                                navigate: (screen) => {
                                    if (screen === 'Dashboard') {
                                        setShowCoachModal(false); // Close modal on navigation
                                    }
                                },
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    label: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        marginVertical: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    dateInput: {
        color: 'black',
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginVertical: 10,
    },
    picker: {
        color: 'black',
        height: 50,
        width: '100%',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottomModal: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        padding: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
    },
});

export default ProfileScreen;
