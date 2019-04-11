import React, {Fragment} from 'react';
import Webcam from 'react-webcam';

class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      tab: 0
    };
  }
  handleClick = () => {
    const screenshot = this.webcam.getScreenshot();
    this.setState({ screenshot });
  }

  render() {
    return (
      <Fragment>
      <Webcam audio={false} ref={node => this.webcam = node} />
        <div className='webcams'>
          <Webcam audio={false} width='212' height='160' />
            <div className='screenshots'>
            <div className='controls'>
              <button onClick={this.handleClick}>capture</button>
            </div>
            {this.state.screenshot ? <img src={this.state.screenshot} /> : null}
          </div>
        </div>
        </Fragment>
);            

  }
}

export default Camera;