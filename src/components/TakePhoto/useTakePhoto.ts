import {useRef, useState} from 'react';
import {Camera, useCameraDevices, PhotoFile} from 'react-native-vision-camera';

interface IUseTakeFotoProps {
  onClose: (file: PhotoFile | null) => void;
}

export function useTakeFoto({onClose}: IUseTakeFotoProps) {
  const [photo, setPhoto] = useState<PhotoFile | null>(null);
  const [loading, setLoading] = useState(false);

  const camera = useRef<Camera>(null);

  const devices = useCameraDevices();
  const device = devices.back;

  async function handleTakePhoto() {
    setLoading(true);

    try {
      if (camera.current == null) {
        throw new Error('Camera ref is null!');
      }

      const newPhoto = await camera.current.takePhoto({
        skipMetadata: true,
        enableAutoDistortionCorrection: true,
        enableAutoStabilization: true,
        qualityPrioritization: 'quality',
      });

      setPhoto({...newPhoto, path: `file://${newPhoto?.path}`});
    } catch {
      throw new Error('Failed to take photo!');
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    setPhoto(null);
  }

  async function handleSave() {
    if (!photo) {
      onClose(null);
      return;
    }

    onClose(photo);
  }

  return {
    photo,
    loading,
    device,
    camera,
    handleTakePhoto,
    handleCancel,
    handleSave,
  };
}
