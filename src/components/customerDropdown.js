import React from 'react';

import {Text, StyleSheet, View, Pressable} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const CustomDropdown = ({
  label,
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  searchable,
  placeholder,
  ...props
}) => {
  return (
    <View>
      {label && <Text style={{fontFamily: 'Raleway'}}>{label}</Text>}
      <View>
        <>
          <DropDownPicker
            style={styles.dropdownContainer}
            textStyle={{fontFamily: 'Raleway'}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            searchable={searchable}
            placeholder={placeholder}
            {...props}
          />
        </>
      </View>
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  dropdownContainer: {
    fontFamily: 'Raleway',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    minHeight: 40,
  },
});
