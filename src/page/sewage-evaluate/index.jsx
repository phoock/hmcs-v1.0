import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Button } from 'antd';
import map01 from './images/sewage-evaluate.jpg';
class SewageEvalute extends React.Component{
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="水质监控评估管理">
        </PageTitle>
        <div className="row evalute">
          <div className="col-md-12">
            <img src={map01} width="100%" alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default SewageEvalute;
