import { View, StyleSheet, Modal, useWindowDimensions } from 'react-native';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  animationType?: 'none' | 'slide' | 'fade';
}

export default function TemplateModal(props: Props) {
  const { width, height } = useWindowDimensions();
  const { children, open, onClose, animationType } = props;
  return (
    <Modal
      animationType={animationType || 'slide'}
      transparent={true}
      visible={open}
      onRequestClose={() => {
        onClose();
      }}
    >
      <View
        style={[
          styles.centeredView,
          {
            height: height,

            width: width,
          },
        ]}
      >
        {children}
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    position: 'relative',
  },
});
