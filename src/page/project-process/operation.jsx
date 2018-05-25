import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import {Card, Button, Tabs } from 'antd';
const TabPane = Tabs.TabPane;

//导入组件
import ShiGongInfo from './shigong-info/index.jsx';
import JianLiInfo from './jianli-info/index.jsx';
import BianGengInfo from './biangeng-info/index.jsx';
import JieDuanInfo from './jieduan-info/index.jsx';
import GuoChengInfo from './guocheng-info/index.jsx';

class ProjectProcess  extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="施工管理">
        </PageTitle>
        <div className="row">
          <div className="col-md-12">
          <Card title="河道排水改造项目施工详情">
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="项目施工信息" key="1"><ShiGongInfo /></TabPane>
              <TabPane tab="项目监理信息" key="2"><JianLiInfo /></TabPane>
              <TabPane tab="项目变更信息" key="3"><BianGengInfo /></TabPane>
              <TabPane tab="项目阶段信息" key="4"><JieDuanInfo /></TabPane>
              <TabPane tab="项目过程信息" key="5"><GuoChengInfo /></TabPane>
            </Tabs>
          </Card>
          </div>
        </div>
      </div>
    )
  }
}

export default ProjectProcess ;
