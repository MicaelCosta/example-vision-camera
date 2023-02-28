import 'react-native-reanimated';

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, Alert, Button, Platform, PermissionsAndroid } from 'react-native';
import { PhotoFile, Camera } from 'react-native-vision-camera';
import { TakePhoto } from './components';

export function App() {
	const [openPhoto, setOpenPhoto] = useState(false);

	useEffect(() => {
		(async () => {
			const cameraPermission = await Camera.getCameraPermissionStatus();
			const microphonePermission = await Camera.getMicrophonePermissionStatus();

			if (cameraPermission === 'denied' || microphonePermission === 'denied') {
				if (Platform.OS === 'android') {
					await PermissionsAndroid.requestMultiple([
						PermissionsAndroid.PERMISSIONS.CAMERA,
						PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
					]);
				}
			}
		})();
	}, []);

	function handleTakePhoto() {
		setOpenPhoto(true);
	}

	function handleClosePhoto(photo: PhotoFile | null) {
		setOpenPhoto(false);
		Alert.alert('Take Photo', JSON.stringify(photo));
	}

	return (
		<SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<StatusBar barStyle="light-content" backgroundColor="#000" />

			{openPhoto && <TakePhoto onClose={handleClosePhoto} />}

			<Button title="Take Photo" onPress={handleTakePhoto} />
		</SafeAreaView>
	);
}
