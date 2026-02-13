import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack, Tabs} from "expo-router";

export default function AuthRoutesLayout() {
    const { isSignedIn } = useAuth();
    if (!isSignedIn) {
        return <Redirect href={"/sign-in"} />
    }
    return (
        <Tabs>
            <Tabs.Screen name="home" options={{title: "Profil"}}/>
            <Tabs.Screen name="add" options={{title: "Ajouter un repas"}} />
            <Tabs.Screen name="scan" options={{title: "scan", href: null}} />
            <Tabs.Screen name="list" options={{title: "Repas"}} />
        </Tabs>

        )
}