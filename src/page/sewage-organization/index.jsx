import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Button } from 'antd';
import map01 from './images/sewage-organization.jpg';

class SewageOrganization extends React.Component{
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="河长单位管理">
        </PageTitle>
        <div className="row hezhang">
          <div className="col-md-12">
            <img src={map01} width="100%" alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default SewageOrganization;
