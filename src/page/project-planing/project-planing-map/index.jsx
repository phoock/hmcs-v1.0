import React from 'react'
import { Icon } from 'antd'
import ReactDOM from 'react-dom'
import './index.scss'
import map01 from '../images/map.jpg'

class PlaningMap extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      iFrameHeight: '0px',
      loading:true
    }
  }
  ceshi(){
    console.log('this.container----------------',this.container);
    console.log('this.container.contentWindow-----------------',this.container.contentWindow);
  }
  render() {
    return (
      <div>
      {
        this.state.loading?
        <Icon type='loading'></Icon>
        :null
      }

        <iframe
        style={{width:'100%', height:this.state.iFrameHeight, overflow:'visible', border: 'none'}}
        onLoad={() => {
            const obj = ReactDOM.findDOMNode(this);
            const heightIframe = (document.body.scrollHeight);
            this.setState({
                iFrameHeight:  heightIframe + 'px',
                loading: false

            });
        }}
        ref={(e)=>{this.container = e}}
        src="http://192.168.1.3/hmcsmap/BlackRiver/RiverLengthUnitManage"
        />
        <button onClick = {() => this.ceshi()}>
          Next
        </button>
      </div>
    )
  }
}

export default PlaningMap;
