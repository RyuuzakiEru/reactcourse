import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';
import PropTypes from 'prop-types';

class App extends React.Component {
state = {
    fishes: {},
    order: {}
};

static propTypes = {
    match: PropTypes.object
};

componentDidMount(){
    const {params} = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeid);
    const order = localStorageRef ? JSON.parse(localStorageRef):{};
    console.log(order);
    this.ref = base.syncState(`${params.storeid}/fishes`, {
        context: this,
        state: 'fishes'
    });
    this.setState({
        order: order
    });
    console.log('MOUNTED');
}

componentWillUnmount() {
    console.log('Unmounting');
    base.removeBinding(this.ref);
}


componentDidUpdate(){
    const {params} = this.props.match;
    console.log(this.state.order);
    localStorage.setItem(params.storeid, JSON.stringify(this.state.order) );

}

addFish = fish => {
    //take copy of existing state
    const fishes = {...this.state.fishes};
    //add new fish
    fishes[`fish${Date.now()}`] = fish;
    //Set the objet to state
    this.setState({
        fishes: fishes
    });
};

addToOrder = (key) => {
    const order = {...this.state.order};
    order[key] = order[key] +1 || 1; 
    this.setState({order: order});

};

loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes} );
}

updateFish = (key, updatedFish) => {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState(
        {
            fishes: fishes
        }
    )

}

deleteFish = (key) =>{
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState ({fishes: fishes});

}

deleteOrderLine = (key) => {
    const order = {...this.state.order};
    delete order[key];
    delete this.setState({order: order});
}

render(){
    console.log(this);
    return(
        <div className="catch-of-the-day">
            <div className="menu">
                <Header tagline={this.props.match.params.storeid}/>
                <ul className="fishes">
  
                {Object.keys(this.state.fishes).map( key => 
                <Fish 
                    key={key}
                    index={key} 
                    details={this.state.fishes[key]} 
                    addToOrder={this.addToOrder} 
                />)}
                </ul>
            </div>
            <Order fishes={this.state.fishes} order={this.state.order} deleteOrderLine={this.deleteOrderLine}/>
            <Inventory 
                addFish={this.addFish}
                loadSampleFishes={this.loadSampleFishes} 
                fishes={this.state.fishes}
                updateFish={this.updateFish}
                deleteFish = {this.deleteFish}
            />
        {/*Nextcomponents*/}
        </div>
    );
    
}
}

export default App;