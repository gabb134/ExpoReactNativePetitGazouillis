import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity ,Image,ActivityIndicator,Button} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';





export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#666666',
        margin: 10,
        width: 1080,
        height: 1980
    },
    entete:{
        width: 1080,
        height: 100,
        flex:1,
        flexDirection:"row",
        alignItems:'flex-end',
        justifyContent:'space-between',
        paddingHorizontal:30,
        paddingBottom:10,
    },
    corps:{
        width: 1080,
        height: 980,
        flex:10,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:10,
        paddingBottom:50,
    },
    navBtn:{
        width:300,
        backgroundColor:"white",
        borderRadius:25,
        height:80,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    }
    ,
    logo: {
        width: 200,
        height: 200,
        margin: 20
    },
    avatar: {
        width: 200,
        height: 200,
        margin: 20
    },
    inputView: {
        width: "80%",
        backgroundColor: "#00a0d3",
        borderRadius: 25,
        height: 80,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white",
        fontSize: 50
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#00a0d3",
        borderRadius: 25,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    loginText: {
        fontSize: 50,
        color: "black"
    },
    nouvelUtilisateur: {
        fontSize: 50,
        color: "white"
    },
    erreur: {
        fontSize: 50,
        color: "red"
    },
    flash: {
        fontSize: 50,
        color: "black"
    },
    jeton: {
        fontSize: 30,
        color: "black"
    },
    texteScrollView:{
        fontSize:40,
        color:"white",
        backgroundColor:"#00a0d3",
        margin:50,
        padding:50,
        borderRadius:25,
    },
    scrollView:{
        fontSize:50,
        color:"black"
    }
    ,
    titre: {
        fontSize: 50, 
        color: "white",
        fontWeight: "bold",
        marginBottom: 7
    },
    titre2: {
        fontSize: 50,
        color: "white",
        marginBottom: 60
    },
    miniAvatar:{
        width:128,
        height:128,
        margin:50
    },
});

export const validationSchema = yup.object().shape({
    nom: yup
        .string()
        .required("Veuillez entrer votre nom.")
        .label('Nom'),
    mdp: yup
        .string()
        .required("Veuillez entrer votre mot de passe.")
        .label('Nom'),
});

export function quitterSession(){
    alert("Quitter session")
    this.setState({"layout":"login"})
}
export async function suivre(jeton,nom,thisRef){

    var personneSuivi = nom["nom"]

      
    
        if(jeton!=""){

            var url = "http://127.0.0.1:5000/api/suivre/"+nom 
            alert("Dans requete\nJeton : "+jeton + "\nNom: "+ nom)
            var obj = {
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + jeton,
                },
                body:JSON.stringify({
                    jeton:jeton,
                    nom:personneSuivi
                })
            };
            var reponse = getJson(url, obj, thisRef, "Je suis "+nom, "dans suivre")
            
        }

}
export function nePlusSuivre(){
    alert("Je ne suis plus cette personne")
}
export function naviguer(destination){
    this.setState({"layout":destination})
}

export async function getJson(url, obj, thisRef, message, etat) {
    try {
        thisRef.setState({ enChargement: true })
        thisRef.setState({ flash: "" })
        thisRef.setState({ [etat]: "" })
        let reponse = await fetch(url, obj);
        let reponseJson = await reponse.json();
        thisRef.setState({ enChargement: false })

        if(typeof reponseJson.erreur === 'undefined') {
            thisRef.setState({ [etat]: reponseJson[etat] })
            thisRef.setState({ flash: message })
        }
        else
            thisRef.setState({ flash: reponseJson.erreur })
        return (reponseJson);

    } catch(erreur) {
        console.error(erreur);
    }
}
export async function chargerutilisateur(thisRef) {//Un utilisateur

    if(thisRef.state.jeton != ""){
        alert("charger utilisateur, on est pu anonyme/n jeton : " + thisRef.state.jeton)

        var url = "http://127.0.0.1:5000/api/jeton_user/" + thisRef.state.jeton

        var obj = {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + thisRef.state.jeton,
            },
        };
        var reponse = getJson(url, obj, thisRef, "Utilisateur chargé", "utilisateur")

    }
    else
    this.setState({flash:"Impossible de charger un utilisateur. Pas de jeton"})
} 
export async function chargerTousLesUtilisateurs(){ //Tous les utilisateurs
    if(this.props.jeton!=""){
        alert("Charger les utilisateurs "+this.props.jeton)

        var url = "http://127.0.0.1:5000/api/utilisateurs"

        var obj = {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.jeton,
            },
        };
        var reponse = getJson(url, obj, this, "utilisateurs chargés", "utilisateurs")
    }
    else
    this.setState({flash:"Impossible de charger la liste des utilisateurs. Pas de jeton"})
}

export async function chargerTousLesPublications(){//Toutes les publications
    if(this.props.jeton!=""){
        alert("Charger les publications")

        var url = "http://127.0.0.1:5000/api/publications"

        var obj = {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.jeton,
            },
        };
        var reponse = getJson(url, obj, this, "Publications chargés", "publications")
    }
    else
    this.setState({flash:"Impossible de charger la liste des publications. Pas de jeton"})
}

export async function chargerJeton(valeurs, thisRef) { 
var nom_mdp = valeurs["nom"] + ":" + valeurs["mdp"];
var nom_mdp_base64 = btoa(nom_mdp);

var url = "http://127.0.0.1:5000/api/jeton"
var obj = {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + nom_mdp_base64,
    },
};
alert("Nom:: " + nom_mdp)

var reponse = getJson(url, obj, thisRef, "utilisateur et mod de passe valide.", "jeton");
}

export function afficherStateParent(etat){
    alert("Afficher parent etat: "+etat+" valeur: "+this.state[etat])
}
export function setStateParent(etat,valeur){
    this.setState({[etat]:valeur})
}