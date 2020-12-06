import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity ,Image,ActivityIndicator,Button} from 'react-native';
import * as Projet from '../JS/Projet.js'


export default class Navigation extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <View style={Projet.styles.entete}>
                <TouchableOpacity style={Projet.styles.navBtn}>
                    <Text style={Projet.styles.loginText} onPress={() => this.props.naviguer("accueil") }>Accueil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Projet.styles.navBtn}>
                    <Text style={Projet.styles.loginText} onPress={() => this.props.naviguer("profil") }>Profil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Projet.styles.navBtn}>
                    <Text style={Projet.styles.loginText} onPress={() => this.props.naviguer("explorer") }>Explorer</Text>
                </TouchableOpacity>
            </View>)
    }
}
