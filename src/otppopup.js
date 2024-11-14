import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const OtpPopupScreen = ({ email, visible, onClose, onSuccess }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        // Start the timer when the modal becomes visible
        if (visible) {
            setTimer(60); // Reset timer to 60 seconds when modal is opened
        }
    }, [visible]);

    useEffect(() => {
        let countdown;
        if (timer > 0) {
            countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(countdown);
        }
        return () => clearInterval(countdown);
    }, [timer]);

    const handleVerifyOtp = async () => {
        if (!otp) {
            Alert.alert('Error', 'Please enter the OTP.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post('http://10.0.2.2:8000/api/verify-otp', {
                email: email,
                otp: otp,
            });

            if (response.status === 200) {
                onSuccess();
            } else {
                Alert.alert('Error', response.data.message || 'Invalid OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error.response ? error.response.data : error);
            Alert.alert('Error', error.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
            setOtp(''); // Clear the OTP input field after verification
        }
    };

    const handleResendOtp = async () => {
        setResendLoading(true);

        try {
            const response = await axios.post('http://10.0.2.2:8000/api/resend-otp', {
                email: email,
            });

            if (response.status === 200) {
                Alert.alert('Success', 'OTP has been resent to your email.');
                setTimer(60); // Reset the timer to 60 seconds after resend
            } else {
                Alert.alert('Error', response.data.message || 'Failed to resend OTP.');
            }
        } catch (error) {
            console.error('Error resending OTP:', error.response ? error.response.data : error);
            Alert.alert('Error', error.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setResendLoading(false);
            setOtp(''); // Clear the OTP input field after resending
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardAvoidingView}
                >
                    <View style={styles.modalView}>
                        {/* Close Icon */}
                        <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                            <Icon name="close" size={24} color="#333" />
                        </TouchableOpacity>

                        <Text style={styles.title}>Enter OTP</Text>
                        <Text style={styles.label}>OTP has been sent to your email: {email}</Text>

                        <TextInput
                            style={styles.input}
                            value={otp}
                            onChangeText={setOtp}
                            placeholder="Enter OTP"
                            keyboardType="numeric"
                        />

                        <TouchableOpacity
                            style={[styles.button, !otp && styles.buttonDisabled]}
                            onPress={handleVerifyOtp}
                            disabled={!otp || loading}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </Text>
                        </TouchableOpacity>

                        {/* Resend OTP Button with Timer */}
                        <TouchableOpacity
                            style={[
                                styles.resendButton,
                                (resendLoading || timer > 0) && styles.buttonDisabled,
                            ]}
                            onPress={handleResendOtp}
                            disabled={resendLoading || timer > 0}
                        >
                            <Text style={styles.resendButtonText}>
                                {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    keyboardAvoidingView: {
        width: '100%',
    },
    modalView: {
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeIcon: {
        position: 'absolute',
        top: 15,
        left: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        width: '100%',
        color: '#333',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 15,
        textAlign: 'left',
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
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonDisabled: {
        backgroundColor: '#A9A9A9',
    },
    resendButton: {
        width: '100%',
        height: 50,
        marginTop: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ADD8E6',
    },
    resendButtonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OtpPopupScreen;
