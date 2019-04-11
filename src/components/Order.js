import React from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        order: PropTypes.object,
        deleteOrderLine: PropTypes.func
    }

    renderOrder = key => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status==='available';
        if(!isAvailable){
         return null;
        }

        return (
        <CSSTransition 
            classNames="order" 
            key={key} 
            timeout={{enter:500, exit:500 }}>
                <li key={key}>
                
                <TransitionGroup component="span" className="count">
                    <CSSTransition classNames="count" key={count} timeout={{enter:200, exit:200}}>
                        <span>{count}</span>
                    </CSSTransition>
                    <span>lbs {fish.name}</span>
                    <CSSTransition classNames="count" key={count * fish.price} timeout={{enter:200, exit:200}}>
                        <span>{formatPrice(count * fish.price)}</span>
                    </CSSTransition>
                </TransitionGroup>
                
                <button onClick={ () => {this.props.deleteOrderLine(key) }  }>X</button>
                </li>
        </CSSTransition>);
       


    }

    render(){
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
                const fish = this.props.fishes[key];
                const count = this.props.order[key];
                const isAvailable = fish && fish.status ==='available';
                if (isAvailable){
                    return prevTotal + (count * fish.price);
                }
                return prevTotal;

            }, 0);
        return(
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;