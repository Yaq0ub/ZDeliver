import FilterPicker from "../../components/filterPicker";
import React, { useState } from "react";
import { StyleSheet,  View } from "react-native";

export default function TabOneScreen() {

  return (
    <View style={styles.container}>
      {/* Filter Picker Container */}
      <View style={styles.filterPickerContainer}>
        <FilterPicker />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterPickerContainer: {
    height: '5%', // Make the filter picker occupy 5% of the screen
    width: '100%', // Ensure it spans the full width
    justifyContent: 'center', // Center the filters vertically within the picker
  },
});
