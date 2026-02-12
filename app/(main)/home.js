import {Text, Button, View, ActivityIndicator, Image, ScrollView, TextInput, StyleSheet, Pressable} from "react-native";
import {useUser, useAuth} from "@clerk/clerk-expo";
import {Link} from "expo-router";
import { useState, useEffect } from "react";
import styles from "../../assets/styles/style";

export default function Home() {
    const {user} = useUser();
    const {signOut} = useAuth();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");
    const OnNext = async () => {
        if (!search.trim()) return;

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

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.greeting}>Bonjour {user?.primaryEmailAddress?.emailAddress}</Text>
            <Pressable style={styles.signOutButton} onPress={() => signOut()}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>Se déconnecter</Text>
            </Pressable>
            <Link style={styles.scanLink} href="/scan">Scanner un produit</Link>
            <TextInput
                style={styles.input}
                placeholder="Rechercher un produit (ex: Nutella, Oasis...)"
                value={search}
                onChangeText={(text) => setSearch(text)}
            />
            <Pressable style={styles.searchButton} onPress={OnNext}>
                <Text style={styles.searchButtonText}>Rechercher</Text>
            </Pressable>
            <View style={styles.resultsContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="red" />
                ) : (
                    products.map((item) => (
                        <View key={item.code} style={styles.productCard}>
                            <Text style={styles.productName}>{item.product_name}</Text>
                            {item.image_url ? (
                                <Image
                                    source={{ uri: item.image_url }}
                                    style={styles.image}
                                />
                            ) : (
                                <View style={{ width: 120, height: 120, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 10 }}>Pas d'image</Text>
                                </View>
                            )}
                        </View>
                    ))
                )}
            </View>
        </ScrollView>

    );
}

