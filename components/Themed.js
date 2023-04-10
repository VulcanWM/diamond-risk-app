// Learn more about Light and Dark modes:
// https://docs.expo.dev/guides/color-schemes/
import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView, 
  TouchableOpacity as DefaultTouchableOpacity,
  TextInput as DefaultTextInput
} from "react-native";

import Colors from "../constants/Colors";

export function useThemeColor(props, colorName) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TouchableOpacity(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultTouchableOpacity style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function TextInput(props) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );
  const color = useThemeColor(
    { light: darkColor, dark: lightColor },
    "placeholderTextColor"
  );
  return <DefaultTextInput placeholderTextColor={color} color={color} style={[{ backgroundColor }, style]} {...otherProps} />;
}