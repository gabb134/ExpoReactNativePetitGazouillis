import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Image,PixelRatio ,TextInput,TouchableOpacity ,StyleSheet, Text, View } from 'react-native';
import logo from './assets/logoGG.png'; 


export default class exFormix extends React.Component{
  constructor(props){
    super(props);

    this.state = {flash:"",jeton:"",utilisateur:"",motdepasse:"",enChargement:"",anonyme:true}
  }
  componentDidMount(){}

  componentDidUpdate(){
    if(this.state.anonyme && this.state.jeton!=""){

      this.state({anonyme:false})
      chargerUtilisateur(this)
    }
  }
  demarrerSession(valeurs,thisRef){
    var nom_mdp = valeurs["nom"]+":"+valeurs["mdp"];
    var nom_mdp_base64 = btoa(nom_mdp);

    var url = "http://127:0.0.1:5000/api/jeton"
    var obj = {
      method : 'GET',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'Basic '+ nom_mdp_base64,
      },
    };
    alert("Nom: "+nom_mdp)

    var reponse  = getJson(url,obj,thisRef,"utilisateur et mod de passe valide.","jeton");
  }

  quitterSession(thisRef){
    alert("Quitter session")
    thisRef.setState({anonyme:true})
    thisRef.setState({jeton:""})
    thisRef.setState({utilisateur:""})
    thisRef.setState({flash:""})
  
  }

  render(){
    if(this.state.anonyme || typeof this.state.utilisateur === 'undefined'){

    }
    return( 
      <View style = { styles.container}>
        <Image source={logo} style={styles.logo}/>
        <Image source={anonyme} style={styles.avatar}/>
        <Text style={styles.titre}>Petit Gazouillis </Text>
        <Text style={styles.titre2}>Par Gabriel et Mohamed  </Text>
       
        <Formik
          initialValues={{nom:'',mdp:''}}

          onSubmit = {(values,actions)=>{
            this.demarrerSession(values,this)
          }}
          validationSchema={validationSchema}
        >
          {formikProps=>(
            <React.Fragment>
            <View style={styles.inputView}>
               <TextInput 
                  style={styles.inputText}
                  placeholder="Utilisateur..."
                  placeholderTextColor = "#bbbbbb"
                  onChangeText = {formikProps.handleChange('nom')}/>
            </View>
              <Text style={styles.erreur}>{formikProps.errors.nom}</Text>
              <View style={styles.inputView}>
                <TextInput 
                  style={styles.inputText}
                  placeholder="Mot de passe..."
                  placeholderTextColor = "#bbbbbb"
                  onChangeText = {formikProps.handleChange('mdp')}/>

              </View>
                <Text style = { styles.erreur}>{formikProps.errors.mdp}</Text>
                <TouchableOpacity>
                  <Text style={styles.nouvelUtilisateur}>Nouvel utilisateur </Text>
                </TouchableOpacity>
                  rendu ici -> Établir session - PARTIE 3 minute 7:39
                <TouchableOpacity style={styles.loginBtn}>
                  <Text style={styles.loginText}>Établir une session </Text>
                </TouchableOpacity>


            </React.Fragment>
          )}
 

        </Formik>
        </View> 




    )

  }

 
}

const styles = StyleSheet.create({
  container:{
    justifyContent:"center",
    alignItems: "center",
    backgroundColor:'#666666',
    margin: 10,
    width:1080,
    height:1920
  },
  logo:{
    width:200,
    height:200,
    margin: 20
  },
  inputView:{
    width:"80%",
    backgroundColor:"#00a0d3",
    borderRadius:25,
    height:80,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white",
    fontSize:50
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#00a0d3",
    borderRadius:25,
    height:80,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    fontSize:50
  },
  nouvelUtilisateur:{
    fontSize:50,
    color:"white"
  },
  titre:{
    fontSize:50,
    color:"white",
    fontWeight: "bold",
    marginBottom:7
  },  
  titre2:{
    fontSize:50,
    color:"white",
    marginBottom:60
  }  
});
