import 'react-native-reanimated';

import React, { useState } from 'react';
import { SafeAreaView, StatusBar, Alert, Button } from 'react-native';
import { PhotoFile } from 'react-native-vision-camera';
import { TakePhoto } from './components';

export function App() {
	const [openPhoto, setOpenPhoto] = useState(false);

	function handleTakePhoto() {
		setOpenPhoto(true);
	}

	function handleClosePhoto(photo: PhotoFile) {
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
