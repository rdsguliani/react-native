import { Dimensions, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/color";

function Title({ children }) {
  return <Text style={styles.title}> {children} </Text>;
}

export default Title;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: deviceWidth < 380 ? 16 : 24,
    color: "white",
    textAlign: "center",
    borderWidth: 2,
    padding: deviceWidth < 380 ? 8 : 16,
    borderColor: "white",
    maxWidth: "80%",
    // width: 300,
  },
});
