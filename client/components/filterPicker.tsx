import React, { useState } from "react";
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from "react-native";

const FILTER_OPTIONS = ["All", "Popular", "Recent", "Favorites","One", "Two","Three"];

export default function FilterPicker() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleSelectFilter = (filter: React.SetStateAction<string>) => {
    setSelectedFilter(filter);
  };

  return (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {FILTER_OPTIONS.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterField,
                filter === selectedFilter && styles.selectedFilter,
              ]}
              onPress={() => handleSelectFilter(filter)}
            >
              <Text style={styles.filterText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
  );
}

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
    paddingVertical: 8,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedFilter: {
    backgroundColor: "#007bff",
  },
  filterText: {
    color: "#000",
  },
});
