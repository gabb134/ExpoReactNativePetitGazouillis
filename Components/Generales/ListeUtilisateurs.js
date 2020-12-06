import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import * as Projet from '../JS/Projet.js'

export default class ListeUtilisateurs extends React.Component{
    constructor(props){
        super(props);
        this.state={}
       // this.suivre = Projet.suivre.bind(this)
        //this.suivre()
    }
    render(){
        return(
            <FlatList
                style={{marginTop:12,flex:1}}
                data={this.props.utilisateurs.items}
                renderItem={({item}) => <View>
                    <Image source={item.avatar} style={Projet.styles.miniAvatar}/>
                    <TouchableOpacity style={Projet.styles.navBtn}>
                        <Text style={Projet.styles.loginText} onPress={() => Projet.suivre(this) }>Suivre</Text>
                    </TouchableOpacity>
                    <Text style={Projet.styles.flash}> Nom: {item.nom}</Text> <br/>
                </View>}
            />
        )
    }
}