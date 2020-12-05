import React from 'react'
import Login from './Components/LayoutLogin/Login'
import Accueil from './Components/LayoutAccueil/Accueil'
import Profil from './Components/LayoutProfil/Profil'
import Explorer from './Components/LayoutExplorer/Explorer'
import AppContext from './Components/JS/Projet'
import * as Projet from './Components/JS/Projet.js'


export default class PetitsGazouillis extends React.Component {
    constructor(props){
        super(props);
        this.state = {jeton:"vide", utilisateur:"vide",layout:"login"}

        this.setStateParent = Projet.setStateParent.bind(this);
        this.afficherStateParent = Projet.afficherStateParent.bind(this)
        this.quitterSession = Projet.quitterSession.bind(this)
        this.naviguer = Projet.naviguer.bind(this)
    }
    componentDidMount(){

    }
    componentDidUpdate(){

    }
    render(){
        switch(this.state.layout){
            case "accueil":
                return(
                    <Accueil utilisateur={this.state.utilisateur} jeton={this.state.jeton} quitterSession={this.quitterSession} naviguer={this.naviguer}/>
                )
                break;
            case "profil":
                return(
                    <Profil naviguer={this.naviguer}/>
                )
                break;
            case "explorer":
                return(
                    <Explorer naviguer={this.naviguer} />
                )
                break;
            default:
                return(
                    <Login setStateParent={this.setStateParent} afficherStateParent={this.afficherStateParent} />
                )

                break;
        }
    }
}