import React from 'react';
import { ActivityIndicator, SafeAreaView, View, Modal, StyleSheet } from 'react-native';
import { Camera, PhotoFile } from 'react-native-vision-camera';

import { useTakeFoto } from './useTakePhoto';

import { BackButton, CaptureButton, Photo, Content, ButtonConfirm, Text } from './styles';

interface ITakeFotoProps {
	onClose: (file: PhotoFile | null) => void;
}

export function TakePhoto({ onClose }: ITakeFotoProps) {
	const { photo, loading, device, camera, handleTakePhoto, handleCancel, handleSave } = useTakeFoto({ onClose });

	return (
		<Modal style={{ flex: 1 }} visible>
			<SafeAreaView style={{ flex: 1 }}>
				<View style={{ flex: 1 }}>
					{!device && <ActivityIndicator />}

					{!!device && !photo && (
						<>
							<Camera ref={camera} device={device} isActive style={StyleSheet.absoluteFill} photo />

							<BackButton name="arrow-back" onPress={() => onClose(null)} loading={loading}>
								<Text>{' < '}</Text>
							</BackButton>

							<CaptureButton name="circle" onPress={handleTakePhoto} loading={loading} />
						</>
					)}

					{!!photo && (
						<Photo source={{ uri: photo.path }}>
							<Content>
								<ButtonConfirm onPress={handleCancel}>
									<Text>Repetir</Text>
								</ButtonConfirm>

								<ButtonConfirm onPress={handleSave}>
									<Text>OK</Text>
								</ButtonConfirm>
							</Content>
						</Photo>
					)}
				</View>
			</SafeAreaView>
		</Modal>
	);
}
