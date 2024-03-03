import { Platform } from "react-native";
import Colors from "./Colors";
export default {
    medium:{
        ...Platform.select({
            ios: {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.7,
              shadowRadius: 2,
            },
            android: {
              elevation: 5,
            },
          }),
    },
    mediumWhite:{
      ...Platform.select({
          ios: {
            shadowColor: Colors.light,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.7,
            shadowRadius: 2,
          },
          android: {
            shadowColor: Colors.light,
            elevation: 3,
          },
        }),
  }
}