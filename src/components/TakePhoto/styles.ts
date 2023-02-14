import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const BackButton = styled.TouchableOpacity`
  width: 30;
  height: 30;
  position: absolute;
  top: 20px;
  left: 10px;
  background: #00000066;
  color: #fff;
`;

export const CaptureButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  align-self: center;
  width: 78;
  height: 78;
  background: #fff;
  border: solid 5px #000;
`;

export const Photo = styled.ImageBackground`
  height: ${height}px;
  width: ${width}px;
`;

export const Content = styled.View`
  position: absolute;
  bottom: 0px;
  width: 100%;
  background: #00000066;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const ButtonConfirm = styled.TouchableOpacity`
  flex: 1;
  padding: 15px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-size: 22px;
`;
