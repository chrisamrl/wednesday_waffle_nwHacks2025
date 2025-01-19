import {
  StyleSheet,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

function RecipeBoxBigSkeleton() {
  return (
    <View
      style={{
        width: 350,
        height: 500,
        borderRadius: 16,
        margin: 5,
        backgroundColor: "white",
      }}
    />
  );
}



export default function TabOneScreen() {
  const handleSomething = () => {
    console.log("pressed!");
  }
  return (
    <View style={styles.container}>
      <View style={{ width: 75, height: 75, backgroundColor: "transparent" }}>
        <TouchableOpacity onPress={handleSomething}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../../assets/images/Waffle_icon.png")}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={[1, 2, 3, 4]}
        renderItem={() => <RecipeBoxBigSkeleton />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
