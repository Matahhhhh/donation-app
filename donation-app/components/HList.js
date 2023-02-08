import { SafeAreaView, Text, View, StyleSheet, FlatList } from "react-native";
import React from "react";
import colors from "../colors";
import Slide from "./Slide";

const HList = ({ title, data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 30 }}
        ItemSeparatorComponent={<View style={{ width: 20 }} />}
        renderItem={({ item }) => (
          <Slide
            posterPath={item.poster_path || ""} // URL to default image if none
            originalTitle={item.original_title ?? item.original_name}
            fullData={item}
          />
        )}
      />
    </View>
  );
};

export default HList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 30,
    marginBottom: 20,
  },
});