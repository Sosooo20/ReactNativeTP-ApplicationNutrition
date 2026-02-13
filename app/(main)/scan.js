import { useEffect, useState,  } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import {View, Text, Pressable, Image} from "react-native";
import styles from "../../assets/styles/style"

const Camera = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [product, setProduct] = useState(null);


    useEffect(() => {
        if (permission && !permission?.granted && permission?.canAskAgain){
            requestPermission();
        }
    }, [permission]);

    const Scan = async ({ data }) => {
        setScanned(true);

        const url = `https://fr.openfoodfacts.org/api/v2/product/${data}?fields=product_name,brands,image_url,nutriscore_grade`;

        try {
            const response = await fetch(url);
            const result = await response.json();

            if (result.product) {
                setProduct(result.product);
            } else {
                alert(`Produit inconnu : ${data}`);
                setScanned(false);
            }
        } catch (error) {
            console.error("Erreur scan:", error.message);
            setScanned(false);
        }
    };

    if (!permission?.granted) {
        return <View />
    }
    return <View style={styles.container}>
    <CameraView style={styles.camera}
                onBarcodeScanned={scanned ? undefined : Scan}
                barcodeScannerSettings={{
                barcodeTypes: ["ean13", "ean8"],
                       }}
    />
        {product ? (
            <View style={styles.productOverlay}>
                {product.image_url ? (
                    <Image
                        source={{ uri: product.image_url }}
                        style={styles.imageCamera}
                    />
                ) : (
                    <View style={styles.noImage}>
                        <Text style={{ fontSize: 10 }}>Pas d'image</Text>
                    </View>
                )}
                <Text style={styles.productTitle}>
                    {product.product_name || "Nom inconnu"}
                </Text>

                <Text style={styles.productBrand}>
                    {product.brands || "Marque inconnue"}
                </Text>

                <View style={styles.productNutriScore}>
                    <Text style={styles.productNutriScoreText}>
                        Nutri-Score : {(product.nutriscore_grade || "?").toUpperCase()}
                    </Text>
                </View>

                <Pressable
                    style={styles.resetButton}
                    onPress={() => {
                        setProduct(null);
                        setScanned(false);
                    }}
                >
                    <Text style={styles.resetButtonText}>Scanner un autre produit</Text>
                </Pressable>
            </View>
        ) : (
            <View style={{ position: "absolute", top: 50, alignSelf: "center" }}>
                <Text style={{ color: "white" }}>En attente de scan...</Text>
            </View>
        )}
    </View>
}

export default Camera;