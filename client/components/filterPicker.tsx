// FilterPicker.tsx
import React from "react";
import { StyleSheet, ScrollView, TouchableOpacity, Text } from "react-native";
import Colors from "../constants/Colors";

interface FilterPickerProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void; // Adjust type if necessary
  filterOptions: string[]

}

const FilterPicker: React.FC<FilterPickerProps> = ({ selectedFilter, setSelectedFilter, filterOptions }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterContainer}
    >
      {filterOptions.map((filter, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.filterField,
            filter === selectedFilter && styles.selectedFilter,
          ]}
          onPress={() => setSelectedFilter(filter)}
        >
          <Text style={styles.filterText}>{filter}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// Styles remain unchanged

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    alignItems: 'center', // Align items in the center vertically
    paddingHorizontal: 10,
  },
  filterField: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedFilter: {
    backgroundColor: Colors.lightBlue,
  },
  filterText: {
    color: "#000",
    fontSize: 12
  },
});

export default FilterPicker