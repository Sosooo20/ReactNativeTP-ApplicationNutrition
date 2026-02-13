import {Text, View, ScrollView, Pressable} from "react-native";
import {useUser, useAuth} from "@clerk/clerk-expo";
import { useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../assets/styles/style";

const List = () => {
    const {user} = useUser();
    const [history, setHistory] = useState([]);

    const loadMeals = async () => {
        try {
            const storedMeals = await AsyncStorage.getItem("@repas");
            if (storedMeals !== null) {
                const parsedMeals = JSON.parse(storedMeals);
                setHistory(parsedMeals);
            } else {
                setHistory([]);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des repas :", error);
            alert("Impossible de charger l'historique.");
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadMeals();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Repas enregistré</Text>
            {history.length > 0 && (
                <ScrollView>
                    <Text style={styles.text3}>Historique des repas :</Text>
                    {history.map((repas, index) => (
                        <View key={index} style={styles.subtitle}>
                            <Text style={styles.type}>{repas.type}</Text>
                            {repas.ingredients.map((ing, i) => (
                                <Text key={i}>- {ing.name}</Text>
                            ))}
                        </View>
                    ))}

                    <Pressable
                        onPress={async () => {
                            await AsyncStorage.removeItem("@repas");
                            setHistory([]);
                        }}
                        style={{ backgroundColor: 'red', padding: 10, marginTop: 10 }}
                    >
                        <Text style={{ color: 'white', textAlign: 'center' }}>Supprimer tous les repas</Text>
                    </Pressable>
                </ScrollView>
            )}
        </View>

    );
}

export default List