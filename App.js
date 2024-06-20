import { NavigationContainer } from "@react-navigation/native";
import AuthProvider from "./src/context";
import NavigationMenu from "./src/NavigationMenu";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
      <NavigationMenu  />
      </NavigationContainer>
     </AuthProvider>
  );
}

