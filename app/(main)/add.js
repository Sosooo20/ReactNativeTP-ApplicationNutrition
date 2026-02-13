import {Text, View, ActivityIndicator, Image, ScrollView, TextInput, Pressable} from "react-native";
import {useUser, useAuth} from "@clerk/clerk-expo";
import {Link} from "expo-router";
import { useState } from "react";
import {Picker} from "@react-native-picker/picker";
import styles from "../../assets/styles/style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Accueil = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [repas, setRepas] = useState(false);
    const [typeRepas, setTypeRepas] = useState("Petit-déjeuner");
    const [currentRepas, setCurrentRepas] = useState([])

    const Recherche = async () => {
        setLoading(true);

        const url = `https://fr.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(search)}&search_simple=1&action=process&json=1&fields=code,product_name,product_name_fr,product_name_en,brands,nutriments,image_url,nutriscore_grade&page_size=10`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.products) {
                setProducts(result.products);
            }
        } catch (error) {
            console.error("Erreur :", error.message);
        } finally {
            setLoading(false);
        }
    };

    const AddIngredientToMeal = (ingredient) => {
        setCurrentRepas(prevState => [...prevState, ingredient])
    }

    const saveMeal = async () => {
        try {
            const storedMeals = await AsyncStorage.getItem("@repas");
            let meals = [];
            if (storedMeals) {
                meals = JSON.parse(storedMeals);
            }
            if (!typeRepas) {
                alert("Choisis un type de repas !");
                return;
            }
            if (!currentRepas.length) {
                alert("Ajoute au moins un produit !");
                return;
            }


            const newMeal = {
                type: typeRepas,
                ingredients: currentRepas.map((p) => ({
                    id: p.code,
                    name: p.product_name,
                    image: p.image_url,
                    nutriscore: p.nutriscore_grade,
                })),
            };


            meals.push(newMeal);

            await AsyncStorage.setItem("@repas", JSON.stringify(meals));

            alert("Repas enregistré !");
            setCurrentRepas([]);
            setTypeRepas("");
            setRepas(false);

        } catch (error) {
            console.log("Erreur AsyncStorage :", error);
        }
    };



    return (
        <ScrollView style={styles.container}>
            {!repas ? (
                <View>
                    <Pressable
                        style={styles.searchButton}
                        onPress={() => setRepas(true)}
                    >
                        <Text style={styles.searchButtonText}>Ajouter un repas</Text>
                    </Pressable>
                </View>
            ) : (
            <View>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={typeRepas}
                        onValueChange={(itemValue) => setTypeRepas(itemValue)}
                    >
                        <Picker.Item label="Petit-déjeuner" value="Petit-déjeuner" />
                        <Picker.Item label="Déjeuner" value="Déjeuner" />
                        <Picker.Item label="Brunch" value="Brunch" />
                        <Picker.Item label="Goûter" value="Goûter" />
                        <Picker.Item label="Dîner" value="Dîner" />
                    </Picker>
                </View>
                <Link style={styles.scanLink} href="/scan">Scanner un produit</Link>
                <TextInput
                    style={styles.input}
                    placeholder="Rechercher un produit (ex: Nutella, Oasis...)"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
                <Pressable style={styles.searchButton} onPress={Recherche}>
                    <Text style={styles.searchButtonText}>Rechercher</Text>
                </Pressable>
                <Pressable onPress={() => setRepas(false)}>
                    <Text style={styles.scanLink}>Retour</Text>
                </Pressable>
                {currentRepas.length ? (
                    <>
                    <Text style={styles.text2}>Repas en cours :</Text>
                    {currentRepas.map(item => (
                        <Pressable key={item.code} style={styles.productBloc} onPress={() => {}}>
                            <Text style={styles.productName}>{item.product_name}</Text>
                            {item.image_url ? (
                                <Image
                                    source={{ uri: item.image_url }}
                                    style={styles.image}
                                />
                            ) : (
                                <View style={styles.noImage}>
                                    <Text style={{ fontSize: 10 }}>Pas d'image</Text>
                                </View>
                            )}
                        </Pressable>
                        ))}


                    <Pressable style={styles.searchButton} onPress={saveMeal}>
                        <Text style={styles.searchButtonText}>Créer le repas</Text>
                    </Pressable>
                    </>
                ) : (
                    <Text>Pas de Repas</Text>
                )}

                <View style={styles.results}>
                    {loading ? (
                        <ActivityIndicator size="large" color="blue" />
                    ) : (
                        products.map((item) => (
                            <Pressable key={item.code} style={styles.productBloc} onPress={() => AddIngredientToMeal(item)}>
                                <Text style={styles.productName}>{item.product_name}</Text>
                                {item.image_url ? (
                                    <Image
                                        source={{ uri: item.image_url }}
                                        style={styles.image}
                                    />
                                ) : (
                                    <View style={styles.noImage}>
                                        <Text style={{ fontSize: 10 }}>Pas d'image</Text>
                                    </View>
                                )}
                            </Pressable>
                        ))
                    )}
                </View>
            </View>
            )}
        </ScrollView>

    );
}

export default Accueil