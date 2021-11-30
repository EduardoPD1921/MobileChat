import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay
} from 'react-native-reanimated';

import api from '../../../../api';

import { deleteAlertStyles } from './styles';

function DeleteAlert({ isAlertOpen, toggleAlertOpen, selectedContact, clearSelectedContact, updateUserContacts }) {
  const backdropOpacity = useSharedValue(0);
  const alertOpacity = useSharedValue(0);
  const verticalPosition = useSharedValue('40%');

  function openAlert() {
    backdropOpacity.value = withTiming(0.3, { duration: 300 });
    alertOpacity.value = withTiming(1, { duration: 200 });
    verticalPosition.value = withTiming('35%', { duration: 250 });
  };

  function closeAlert() {
    backdropOpacity.value = withTiming(0, { duration: 300 });
    alertOpacity.value = withTiming(0, { duration: 200 });
    verticalPosition.value = withDelay(300, withTiming('40%', { duration: 0 }));
  };

  function deleteContact() {
    api.put('/user/deleteContact', { contactId: selectedContact })
      .then(resp => updateUserContacts(resp.data.contacts))
      .catch(error => console.log(error.response.data));

    clearSelectedContact();
    toggleAlertOpen();
  };

  const alertContainerAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: alertOpacity.value,
      top: verticalPosition.value
    }
  });

  const backdropAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: backdropOpacity.value
    }
  });

  return (
    <>
      <TouchableWithoutFeedback onPress={toggleAlertOpen}>
        <Animated.View style={[deleteAlertStyles.backdropContainer, backdropAnimationStyle, { zIndex: isAlertOpen ? 1 : 0 }]} />
      </TouchableWithoutFeedback>
      <Animated.View style={[deleteAlertStyles.alertContainer, alertContainerAnimationStyle, { zIndex: isAlertOpen ? 1: 0 }]}>
        <Text style={deleteAlertStyles.alertTitle}>Deseja apagar este contato?</Text>
        <Text style={deleteAlertStyles.alertDesc}>Este contato será removido da sua lista de amigos, deseja continuar?</Text>
        <View style={deleteAlertStyles.actionContainer}>
          <TouchableWithoutFeedback onPress={toggleAlertOpen}>
            <Text style={deleteAlertStyles.cancelAction}>Cancelar</Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={deleteContact}>
            <Text style={deleteAlertStyles.deleteAction}>Apagar contato</Text>
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>
      {isAlertOpen ? openAlert() : closeAlert()}
    </>
  );
};

export default DeleteAlert;