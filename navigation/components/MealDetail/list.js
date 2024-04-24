import { StyleSheet, Text, View } from "react-native";

function List({ data }) {
  return data.map((dataPoint, index) => {
    return (
      <View style={styles.listItem}>
        <Text key={index} style={styles.innerText}>
          {dataPoint}
        </Text>
      </View>
    );
  });
}

export default List;

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#e2b497",
  },
  innerText: {
    color: "#351401",
    textAlign: "center",
  },
});
