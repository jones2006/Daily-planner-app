import { ImageSourcePropType } from "react-native";

type img = {
  [key: string]: ImageSourcePropType;
};

const img = {
  illustrate: require("@/assets/project-img/illustration.png"),
  line: require("@/assets/project-img/Container.png"),
};

export default img;
