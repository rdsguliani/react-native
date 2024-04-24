import { FlatList, StyleSheet, Text, View } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
// import MealItem from "../components/ui/MealItem";
import { useEffect, useLayoutEffect } from "react";
import MealItem from "../components/MealItem";

function MealsOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((item) => {
    return item.categoryIds.includes(catId);
  });

  useLayoutEffect(() => {
    const CategoryTitle = CATEGORIES.find(
      (category) => category.id === catId
    ).title;

    navigation.setOptions({
      title: CategoryTitle,
    });
  }, [catId, navigation]);

  function renderMealItem(itemData) {
    const item = itemData.item;
    const { id, title, imageUrl, affordability, complexity, duration } = item;

    const mealItemProps = {
      id,
      title,
      imageUrl,
      affordability,
      complexity,
      duration,
    };

    function pressHandler() {
      console.log(item.id);
      navigation.navigate("MealDetails", { mealId: item.id });
    }

    return <MealItem {...mealItemProps} onPress={pressHandler} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  cnotainer: {
    flex: 1,
    padding: 16,
  },
});
