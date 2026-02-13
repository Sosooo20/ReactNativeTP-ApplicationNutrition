import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        marginVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "#f9f9f9",
        flex:1,
    },
    text: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 10,
        color: "#333",
    },
    text2: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 10,
        color: "#333",
    },
    signOutButton: {
        marginVertical: 10,
        backgroundColor: "#ff4d4d",
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: "center",
        width:130,
    },
    signOutText:{
        color: "#fff",
        fontWeight: "600"
    },
    scanLink: {
        fontSize: 16,
        color: "#007bff",
        marginVertical: 10,
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        marginVertical: 15,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    searchButton: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 20,
    },
    searchButtonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    results: {
        marginTop: 20,
    },
    productBloc: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productName: {
        fontSize: 16,
        fontWeight: "500",
        color: "#333",
    },
    image:{
        width: 120,
        height: 120,
    },
    camera:{
        flex: 1,
    },
    productOverlay: {
        position: "absolute",
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: "white",
        borderRadius: 22,
        padding: 18,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 8,
    },

    productTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111",
        marginBottom: 6,
        marginTop:10,
    },

    productBrand: {
        fontSize: 15,
        color: "#666",
        marginBottom: 12,
    },

    productNutriScore: {
        alignSelf: "flex-start",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 999,
        backgroundColor: "#f2f2f2",
        marginBottom: 14,
    },

    productNutriScoreText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111",
    },

    resetButton: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        borderRadius: 14,
        alignItems: "center",
    },

    resetButtonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    imageCamera:{
        width: 300,
        height: 300,
    },
    noImage:{
        width: 120,
        height: 120,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pickerContainer: {
        width: "100%",
        borderColor: "#919191",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        overflow: "hidden",
    },
    text3: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitle:{
        marginBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    type:{
        fontWeight: 'bold',
        color: 'blue',
    }
});