import React from 'react';
import {
    View,
    Text,
    FlatList
} from 'react-native';
import * as Projet from '../JS/Projet.js'

export default class ListeUtilisateurs extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <FlatList
                style={{marginTop:12,flex:1}}
                data={this.props.utilisateurs.items}
                renderItem={({item}) => <View>
                    <Image source={item.avatar} style={Projet.styles.miniAvatar}/>
                    <Text style={Projet.styles.flash}> Corps: {item.corps}</Text> <br/>
                </View>}
            />
        )
    }
}