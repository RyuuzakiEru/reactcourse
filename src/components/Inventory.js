import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './editFishForm';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { firebaseApp } from '../base';



class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        loadSampleFishes: PropTypes.func,
        updatedFish: PropTypes.func,
        deleteFish: PropTypes.func
    };
    
    authHandler = async (authData) => {
        console.log(authData);

    }


    authenticate = provider => {
        const authProvider = new firebase.auth.EmailAuthProvider();
        firebaseApp.auth().signInWithEmailAndPassword(authProvider).then(this.authHandler);
    }



    render(){
        return(
            <div className="inventory">
                <h2>Inventory</h2> 
                {Object.keys(this.props.fishes).map(key => <EditFishForm index={key} key={key} fish={this.props.fishes[key]} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish}/>)}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>Load Samples</button>
            </div>
        );
    }
}

export default Inventory;