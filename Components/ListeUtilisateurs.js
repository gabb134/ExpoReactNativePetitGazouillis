import React from 'react';
import {Image, Stylesheet, Text, View } from 'react-native';

class ListeUtilisateurs extends React.Component{

    render(){

        return (
            <View style={{margin:50}}>
                <Image style={styles.image} source={{ uri : ''}} /> 
                <Text style={styles.text}>Harry Potter</Text>
                <Image style={styles.image} source={{ uri : ''}} /> 
                <Text style={styles.text}>Hermione</Text>
                <Image style={styles.image} source={{ uri : ''}} /> 

                <Text style={{margin: 5, height: 30, padding:5}}>Ron</Text>
                
          </View>
        )
    }
}

const styles = StyleSheet.create ({
    text:
    {
        margin : 5,
        height: 30,
        padding: 5
    },
    image:
    {
        width:100,
        height:100
    }
})

export default ListeUtilisateurs




