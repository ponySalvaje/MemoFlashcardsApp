import React, {useState} from 'react';

import {Text, TextInput, StyleSheet, View, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomInputText = ({
  control,
  label,
  name,
  placeholder,
  secureTextEntry,
  containerStyle,
  labelStyle,
  onChange,
  onBlur,
  value,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(secureTextEntry || false);

  return (
    <View style={containerStyle}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <View style={styles.inputContainer}>
        <>
          <TextInput
            secureTextEntry={showPassword}
            style={{...styles.inputText}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={placeholder}
            {...props}
          />
          {secureTextEntry && (
            <Pressable
              style={styles.iconContainer}
              onPress={setShowPassword.bind(this, !showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
              />
            </Pressable>
          )}
        </>
      </View>
    </View>
  );
};

export default CustomInputText;

const styles = StyleSheet.create({
  inputText: {
    marginTop: 10,
    padding: 10,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
  },
  inputContainer: {
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
});
