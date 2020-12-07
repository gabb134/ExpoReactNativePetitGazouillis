import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity ,Image,ActivityIndicator,Button} from 'react-native';
import Navigation from '../Generales/Navigation'
import ListeUtilisateurs from '../Generales/ListeUtilisateurs'
import ListePublications from '../Generales/ListePublications'
import * as Projet from '../JS/Projet.js'
import logo from '../../assets/logoGG.png'


export default class Accueil extends React.Component {
    constructor(props){
        super(props);
        this.state ={ premierefois:true,flash:"",utilisateurs:null, publications:null,jeton:"TEST"}

        this.chargerTousLesUtilisateurs = Projet.chargerTousLesUtilisateurs.bind(this)
        this.chargerTousLesUtilisateurs()
        this.chargerTousLesPublications = Projet.chargerTousLesPublications.bind(this)
        this.chargerTousLesPublications()
        var jeton = "testtt"
        this.jeton = jeton

    }

    componentDidUpdate(){

    }
    render(){
        return(
            <View style={Projet.styles.container}>


                <Navigation naviguer={this.props.naviguer} />
                <View style={Projet.styles.corps}>
                    <Text style={Projet.styles.flash}>Accueil </Text><br/>
                    <Image source={logo} style={Projet.styles.logo} />
                    <Image source={this.props.utilisateur.avatar} style={Projet.styles.avatar} />
                    <Text style={Projet.styles.flash}>Flash:{this.state.flash}</Text><br/>
                    <Text style={Projet.styles.flash}>Utilisateur:{this.props.utilisateur.nom}</Text>
                    <Text style={Projet.styles.flash} jeton={this.props.jeton}>Jeton:{this.props.jeton}</Text>
                    
                    <ScrollView style={Projet.styles.scrollView}>
                        <Text style={Projet.styles.texteScrollView}>
                            {this.state.utilisateurs === null ? (<ActivityIndicator/>):(
                                <ListeUtilisateurs utilisateurs={this.state.utilisateurs} jeton={this.props.jeton}/>)
                            }
                            {this.state.publications === null ? (<ActivityIndicator/>):(
                                <ListePublications publications={this.state.publications}/>)
                            }
                        
                        </Text>

                    </ScrollView>
                    <TouchableOpacity style={Projet.styles.loginBtn}>
                        <Text style={Projet.styles.loginText} onPress={() => this.props.quitterSession(this)}>Quitter session </Text>
                    </TouchableOpacity>
                </View>
            </View>)
    }
}

