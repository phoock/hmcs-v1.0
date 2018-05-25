import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Button } from 'antd';

class CommandContingency  extends React.Component{
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="应急指挥">

        </PageTitle>
        <div className="row">
          <div className="col-md-12">
            应急指挥内容
          </div>
        </div>
      </div>
    )
  }
}

export default CommandContingency ;
