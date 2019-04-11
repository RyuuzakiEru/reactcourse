import React from "react";
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();
  
  static propTypes = {
    addFish: PropTypes.func
  };

  createFish = (event) => {
      event.preventDefault();
      const fish = {
        name: this.nameRef.current.value,
        price: parseFloat(this.priceRef.current.value),
        status: this.statusRef.current.value,
        desc: this.descRef.current.value,
        image: this.imageRef.current.value    
      }
      this.props.addFish(fish);
      //refresh form
      event.currentTarget.reset();

  }
  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input type="text" ref={this.nameRef} name="name" placeholder="Name" />
        <input type="text" ref={this.priceRef} name="price" placeholder="Price" />
        <select name="status" ref={this.statusRef}>
            <option value="available">Fresh</option>
            <option value="unavailable">sold Out</option>        
        </select>
        <textarea type="text" name="desc"ref={this.descRef} placeholder="Desc" />
        <input type="text" name="image" ref={this.imageRef} placeholder="Image" />
        
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
