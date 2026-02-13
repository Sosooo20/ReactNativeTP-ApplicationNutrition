import {Text, View, ActivityIndicator, Image, ScrollView, TextInput, Pressable} from "react-native";
import {useUser, useAuth} from "@clerk/clerk-expo";
import {Link} from "expo-router";
import { useState } from "react";
import styles from "../../assets/styles/style";

const Accueil = () => {
    const {user} = useUser();
    const {signOut} = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bonjour {user?.primaryEmailAddress?.emailAddress}</Text>
            <Text >Vous êtes sur la page de votre profil, vous pouvez vous déconnecter, si vous le souhaiter</Text>
            <Pressable style={styles.signOutButton} onPress={() => signOut()}>
                <Text style={styles.signOutText}>Se déconnecter</Text>
            </Pressable>
        </View>

    );
}

export default Accueil