import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import {Button, Card, List, Avatar} from 'antd';
import axios from 'axios'


const PROJECT_TYPE = [
  '划拔类',
  '出让类'
]
const STATUS_TYPE = [
  '未施工',
  '施工中',
  '已验收',
  '已竣工'
]

const paramsOnelist = {
  "objProjectFlow": {
    "STEPTTYPE": 0,
    "MODULEID": 1001,
  	"ISOVER": 0
    },
    "CurrentPage": 1,
    "PageSize": 10
}
const paramsTwolist = {
  "objProjectFlow": {
    "STEPTTYPE": 0,
    "MODULEID": 1002,
  	"ISOVER": 0
    },
    "CurrentPage": 1,
    "PageSize": 10
}
const paramsThreelist = {"CurrentPage":1,"PageSize":10}
const paramsfourlist = {
  "objProjectFlow": {
    "STEPTTYPE": 0,
    "MODULEID": 1001,
  	"ISOVER": -1
    },
    "CurrentPage": 1,
    "PageSize": 10
}
class Project extends React.Component {
    constructor(props){
      super(props)
      this.state={
        dataListone : [],
        dataListtwo : [],
        dataListthree : [],
        dataListfour : []
      }
    }
    componentDidMount(){
      this.loadData('/api/Project/JsonProInfoPage',paramsOnelist,'dataListone')
      this.loadData('/api/Project/JsonProInfoPage',paramsTwolist,'dataListtwo')
      this.loadData('/api/Project/JsonConstructionPage',paramsThreelist,'dataListthree')
      this.loadData('/api/Project/JsonConstructionPage',paramsfourlist,'dataListfour')
    }

    loadData(url,params,dataName){
      axios.post('/api/Project/JsonProInfoPage',params)
      .then((res)=>{
        if(res.status===200&&res.data.isSuccessful){
          let dataSource = this.handleDataFormat(res.data.Data)
          this.setState({
            [dataName] : dataSource
          })

        }else{
          console.log('有错误');
        }
      })
    }

    handleDataFormat(data){
      let dataArr = []
      dataArr = data.map(v=>{
        let item = {
          projectName : v.PRONAME,
          projectType : PROJECT_TYPE[v.FLOWID],
          stepName : v.STEPNAME,
          nowdept : v.nowdept,
        }
        return item
      })
      return dataArr
    }
    render() {
        return (<div id="page-wrapper">
            <PageTitle title="项目总览">

            </PageTitle>
            <div className="row project-wrap">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <div className="panel panel-primary text-center no-boder bg-color-green green">
                                <div className="panel-left pull-left green">
                                    <i className="fa fa-bar-chart-o fa-5x"></i>

                                </div>
                                <div className="panel-right pull-right">
                                    <h3>120</h3>
                                    <strong>
                                        规划类项目</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <div className="panel panel-primary text-center no-boder bg-color-blue blue">
                                <div className="panel-left pull-left blue">
                                    <i className="fa fa-shopping-cart fa-5x"></i>
                                </div>

                                <div className="panel-right pull-right">
                                    <h3>160
                                    </h3>
                                    <strong>
                                        待处理项目数</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <div className="panel panel-primary text-center no-boder bg-color-brown brown">
                                <div className="panel-left pull-left brown">
                                    <i className="fa fa fa-comments fa-5x"></i>

                                </div>
                                <div className="panel-right pull-right">
                                    <h3>15,823
                                    </h3>
                                    <strong>
                                        让出类项目数
                                    </strong>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-xs-12">
                        <Card title="规划管理控制新消息" extra={<i className="fa fa-angle-down"></i>} bordered={true} style={{background:'#fff'}} >
                          <List
                            itemLayout="horizontal"
                            loading={this.state.dataListone.length?false:true}
                            dataSource={this.state.dataListone}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<i className="fa fa-user"></i>}
                                  title={<span>{item.projectName}</span>}
                                  description={`${item.projectType}项目,目前在${item.stepName}阶段`}
                                />
                              </List.Item>
                            )}
                          />
                        </Card>
                      </div>
                      <div className="col-md-6 col-xs-12">
                        <Card title="规划管理控制新消息" extra={<i className="fa fa-angle-down"></i>} bordered={true} style={{background:'#fff'}} >
                          <List
                            itemLayout="horizontal"
                            loading={this.state.dataListtwo.length?false:true}
                            dataSource={this.state.dataListtwo}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<i className="fa fa-user"></i>}
                                  title={<span>{item.projectName}</span>}
                                  description={`${item.projectType}项目,目前在${item.stepName}阶段`}
                                />
                              </List.Item>
                            )}
                          />
                        </Card>
                      </div>

                    </div>
                    <div className="row" style={{marginTop:16}}>
                      <div className="col-md-6 col-xs-12">
                        <Card title="规划管理控制新消息" extra={<i className="fa fa-angle-down"></i>} bordered={true} style={{background:'#fff'}} >
                          <List
                            itemLayout="horizontal"
                            loading={this.state.dataListthree.length?false:true}
                            dataSource={this.state.dataListthree}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<i className="fa fa-user"></i>}
                                  title={<span>{item.projectName}</span>}
                                  description={`${item.projectType}项目,目前在${item.stepName}阶段`}
                                />
                              </List.Item>
                            )}
                          />
                        </Card>
                      </div>
                      <div className="col-md-6 col-xs-12">
                        <Card title="规划管理控制新消息" extra={<i className="fa fa-angle-down"></i>} bordered={true} style={{background:'#fff'}} >
                          <List
                            itemLayout="horizontal"
                            loading={this.state.dataListfour.length?false:true}
                            dataSource={this.state.dataListfour}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<i className="fa fa-user"></i>}
                                  title={<span>{item.projectName}</span>}
                                  description={`${item.projectType}项目,目前在${item.stepName}阶段`}
                                />
                              </List.Item>
                            )}
                          />
                        </Card>
                      </div>

                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Project;
