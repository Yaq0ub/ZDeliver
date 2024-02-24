import { Platform } from "react-native";

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
    }
}