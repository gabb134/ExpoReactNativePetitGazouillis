import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity ,Image,ActivityIndicator,Button} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  nom:yup
  .string()
  .required("Veuillez entrer votre nom.")
  .label('Nom'),
  mdp: yup
  .string()
  .required('Veuillez entrer votre mot de passe.')
  .label('Nom'),
});

async function getJson(url,obj,thisRef,message,etat) {
    try{
      thisRef.setState({enChargement : true})
      thisRef.setState({flash : ""})
      thisRef.setState({[etat] : ""})
      let reponse = await fetch(url, obj);
      let reponseJSon = await reponse.json()
      thisRef.setState({enChargement :false})

      if(typeof reponseJSon.erreur === 'undefined'){
        thisRef.setState({[etat] :reponseJSon[etat]})
        thisRef.setState({flash :message})
      }else
        thisRef.setState({flash :reponseJSon.erreur})
        return(reponseJSon); 
    }catch(erreur){
      console.error(erreur);
    }
}

async function chargerUtilisateur(thisRef) {
  
  if( thisRef.state.jeton != ""){
    alert("charger utilisateur")

    var url = "http://127.0.0.1:5000/api/jeton_user/" + thisRef.state.jeton

    var obj = {
      method: 'GET',
      headers:{
        Accept: 'applications/json',
        'Content-Type': 'application/json',
        'Authorization' : 'Bearer ' + thisRef.state.jeton,
      },
    };

    var reponse = getJson(url, obj,thisRef,"Utilisateur chargé.","utilisateur")
  }
}


export default class App extends React.Component {

  
  constructor(props){
    super(props);
   this.state={flash: "", jeton:"", utilisateur:"", enChargement:false, anonyme:true}
  }

 

  componentDidMount(){
 
  }

  componentDidUpdate(){
   if(this.state.anonyme && this.state.jeton != ""){
      this.setState({anonyme: false})
      chargerUtilisateur(this)
   }
  }

  chargerJeton(valeurs, thisRef){

      var nom_mdp = valeurs["nom"] + ":" + valeurs["mdp"];
      var nom_mdp_base64 = btoa(nom_mdp);

      var url = "http://127.0.0.1:5000/api/jeton"
      var obj = {
        method: 'GET',
        headers:{
          Accept: 'applications/json',
          'Content-Type': 'application/json',
          'Authorization' : 'Basic ' + nom_mdp_base64,
        },
      };
      alert(nom_mdp)

      var reponse = getJson(url, obj,thisRef,"Utilisateur et mot de passe valide,","jeton")
  }

  quitterSession(thisRef){
    alert("quitter session")
    thisRef.setState({anonyme:true})
    thisRef.setState({jeton:""})
    thisRef.setState({utilisateur:""})
    thisRef.setState({flash:""})
  }
  
render()
{
    if(this.state.anonyme || typeof this.state.utilisateur === 'undefined'){
     
      return(
        <View style={styles.container}>
       
        <Text styles={styles.flash}> Flash:{this.state.flash} </Text> <br />
        
        <Formik
          initialValues={{nom: '', mdp: ''}}

          onSubmit={(values, actions) => {
            this.chargerJeton(values,this)
          }}

          validationSchema={validationSchema}>

            {formikProps => (
              <React.Fragment>
                <View style={styles.inputView}>
                <TextInput  

                  style={styles.inputText}
                  placeholder="Utilisateurs..." 
                  placeholderTextColor="#bbbbbb"
                  onChangeText={formikProps.handleChange('nom')}/>
                   </View>
                 <Text style={styles.erreur}>{formikProps.errors.nom}</Text>
                   <View style={styles.inputView}>

                <TextInput  
                 secureTextEntry={true}
                  style={styles.inputText}
                  placeholder="mot de passe..." 
                  placeholderTextColor="#bbbbbb"
                  onChangeText={formikProps.handleChange('mdp')}/>
                   </View>
                   <Text style={styles.erreur}>{formikProps.errors.nom}</Text>

                   <TouchableOpacity>
                     <Text style={styles.nouvelUtilisateur}>Nouvel utilisateur</Text>
                     </TouchableOpacity>
                     {this.state.enChargement ? (<ActivityIndicator/>) :(

                      <TouchableOpacity style={styles.loginBtn}>
                      <Text style={styles.loginText} onPress={formikProps.handleSubmit}>Établir une session</Text>
                      </TouchableOpacity>
                     )}
                   </React.Fragment>
            )}
     </Formik>
   </View>)
}else{
  alert(this.state.utilisateur.nom)
  return( 
    
    <View style={styles.container}>
      <Image source={this.state.utilisateur.avatar} style={styles.avatar} />
      <Text style={styles.flash}>Flash: {this.state.flash}</Text> <br />
      <Text style={styles.flash}>Utilisateur: {this.state.utilisateur.nom}</Text> 
      <Text style={styles.jeton}>Jeton: {this.state.jeton}</Text> 
      <TouchableOpacity>
          <Text style={styles.loginText} onPress={() => this.quitterSession(this)}>Quitter la session</Text>
      </TouchableOpacity>
    </View>)
}
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
    width:600,
    height:1920
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  avatar:{
    width:256,
    height:256,
    margin:50
  },
  inputView:{
    width:"60%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});


