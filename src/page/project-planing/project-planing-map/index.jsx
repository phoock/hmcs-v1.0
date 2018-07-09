import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import map01 from '../images/map.jpg'

class PlaningMap extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      iFrameHeight: '0px'
    }
  }
  render() {
    return (
      <div>
        <div>123</div>
        <iframe
        style={{width:'100%', height:this.state.iFrameHeight, overflow:'visible', border: 'none'}}
        onLoad={() => {
            const obj = ReactDOM.findDOMNode(this);
            const heightIframe = (document.body.scrollHeight);
            this.setState({
                "iFrameHeight":  heightIframe + 'px'
            });
        }}
        ref="iframe"
        src="http://218.104.108.86:8001/BlackRiver/RiverLengthUnitManage"
        />
      </div>
    )
  }
}

export default PlaningMap;
