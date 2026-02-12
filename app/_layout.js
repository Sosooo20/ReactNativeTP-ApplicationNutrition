import {Slot} from "expo-router";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {ClerkProvider} from "@clerk/clerk-expo";
import { tokenCache } from '@clerk/clerk-expo/token-cache'

const RootLayout = () => {
    return  <ClerkProvider tokenCache={tokenCache}>
                <Slot />
            </ClerkProvider>
};

export default RootLayout;