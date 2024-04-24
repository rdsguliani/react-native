import { useLayoutEffect, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewBase,
} from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import SubTitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/list";
import IconButton from "../components/IconButton";

function MealDetailScreen({ route, navigation }) {
  const mealId = route.params.mealId;
  const [meal, setMeal] = useState(null);

  function headerButtonPressHandler() {
    console.log("Pressed !!");
  }

  useLayoutEffect(() => {
    const selectedMeal = MEALS.find((item) => item.id === mealId);
    setMeal(selectedMeal);

    navigation.setOptions({
      title: selectedMeal.title,
      headerRight: () => {
        return (
          <IconButton
            onPress={headerButtonPressHandler}
            icon="star"
            color="white"
          />
        );
        //  <Button title="Tap Me!" onPress={headerButtonPressHandler} />;
      },
    });
  }, [meal, mealId, navigation, headerButtonPressHandler]);

  if (meal === null) return;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: meal.imageUrl }} style={styles.image} />
        <Text style={styles.title}> {meal.title} </Text>
        <MealDetails
          affordability={meal.affordability}
          complexity={meal.complexity}
          duration={meal.duration}
          style={{ color: "white" }}
          textStyle={styles.detailText}
        />

        <View style={{ alignItems: "center" }}>
          <View style={styles.listContainer}>
            <SubTitle>Ingredients</SubTitle>
            <List data={meal.ingredients} />
            <SubTitle>Steps</SubTitle>

            <List data={meal.steps} />
          </View>
        </View>
        {/* <Text style={styles.subtitle}> Ingredients </Text> */}
        <View></View>
        {/* <Text style={styles.subtitle}> Steps </Text> */}
        <View>
          {/* {meal.steps.map((item, index) => {
          return <Text key={index}>{item}</Text>;
        })} */}
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listContainer: {
    width: "80%",
  },
});
