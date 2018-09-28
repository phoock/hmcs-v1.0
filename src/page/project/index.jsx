import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import {Button, Card, List, Avatar, Icon} from 'antd';
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
    // "STEPTTYPE": 0,
    "MODULEID": 1001,
  	"ISOVER": -1
    },
    "CurrentPage": 1,
    "PageSize": 10
}
const paramsTwolist = {
  "objProjectFlow": {
    // "STEPTTYPE": 0,
    "MODULEID": 1001,
  	"ISOVER": 0
    },
    "CurrentPage": 1,
    "PageSize": 10
}
// const paramsThreelist = {"CurrentPage":1,"PageSize":10}
const paramsThreelist = {
  "objProjectFlow": {
    // "STEPTTYPE": 0,
    "MODULEID": 1002,
  	"ISOVER": 0
    },
    "CurrentPage": 1,
    "PageSize": 10
}
const paramsfourlist = {
    "CurrentPage": 1,
    "PageSize": 10
}

class Project extends React.Component {
    constructor(props){
      super(props)
      this.state={
        dataListoneModuleId : [],
        dataListone : [],
        dataListoneFin : false,
        ListOne : [],
        dataListtwo : [],
        dataListtwoFin : false,
        dataListthree : [],
        dataListthreeFin : false,
        dataListfour : [],
        dataListfourFin : false,
        totalCount : 0,
        guihuaCount : 0,
        designCount : 0,
        shigongCount : 0,

      }
    }
    componentDidMount(){
      //dataListoneCorrect
      axios.post('/api/Project/JsonGetProjectPageIndex',{"CurrentPage":1,"objProjectFlow":{"MODULEID":1001,"ISOVER":-1},"PageSize":10})
      .then(res=>{
        if(res.status===200&&res.data.isSuccessful){

          let handleDataArr = []
          handleDataArr = res.data.Data.map((v)=>{
            if(v.overone==0) return {moduleIdReal:1001,PROID:v.PROID,nowStepNew:v.nowsteptwo||v.nowstepone,isOverR:0}
            if(v.overtwo==0) return {moduleIdReal:1002,PROID:v.PROID,nowStepNew:v.nowsteptwo||v.nowstepone,isOverR:0}
            if(v.overtwo==1) return {moduleIdReal:1003,PROID:v.PROID,nowStepNew:v.nowsteptwo||v.nowstepone,isOverR:1}
          })
          this.setState({
            dataListoneModuleId : handleDataArr
          })
        }
      })
      //加载3个列表
      this.loadData('/api/Project/JsonProInfoPage',paramsOnelist,'dataListone','totalCount','dataListoneFin')
      this.loadData('/api/Project/JsonProInfoPage',paramsTwolist,'dataListtwo','guihuaCount','dataListtwoFin')
      this.loadData('/api/Project/JsonProInfoPage',paramsThreelist,'dataListthree','designCount','dataListthreeFin')
      this.loadData('/api/Project/JsonConstructionPage',paramsfourlist,'dataListfour','shigongCount','dataListfourFin')

    }


    //第1,2,3,4列表的数据处理
    loadData(url,params,dataName,countName,dataListFin){
      axios.post(url,params)
      .then((res)=>{
        if(res.status===200&&res.data.isSuccessful){
          let dataSource = this.handleDataFormat(res.data.Data)

          this.setState({
            [dataListFin] : true,
            [dataName] : dataSource,
            [countName] : res.data.RowCount
          })

        }else{
          this.setState({
            [dataListFin] : true,
          })
          console.log(`${countName}无数据或者接口出错`);
        }
      })
    }

    handleDataFormat(data){
      let dataArr = []
      dataArr = data.map(v=>{
        let item = {
          projectName : v.PRONAME,
          projectType : PROJECT_TYPE[v.FLOWID] || '无类型',
          stepName : v.STEPNAME,
          nowdept : v.nowdept,
          FLOWID : v.FLOWID,
          MODULEID : v.MODULEID,
          nowstep : v.nowstep,
          PROID : v.PROID,
          isover : v.isover === 1?1 : 0
        }
        return item
      })
      return dataArr
    }
    handleListAne(arr1,arr2){
      let arrResult = []
      arrResult = arr1.map(item=>{
        let urlResult,descResult,projectName;
        let dataArr = arr2.filter(v=>v.PROID===item.PROID)
        if(dataArr[0]&&item.moduleIdReal === 1001){
          urlResult = `/project-planing/edit/${dataArr[0].projectName}&${dataArr[0].FLOWID}&${item.moduleIdReal}&${item.nowStepNew}&${dataArr[0].PROID}&${dataArr[0].FLOWID}&${item.isOverR}`
          descResult = `${dataArr[0].projectType}项目,目前在${dataArr[0].stepName}阶段`
          projectName = `${dataArr[0].projectName}`
        }
        if(dataArr[0]&&item.moduleIdReal === 1002){
          urlResult = `/project-design/edit/${dataArr[0].projectName}&${dataArr[0].FLOWID}&${item.moduleIdReal}&${item.nowStepNew}&${dataArr[0].PROID}&${dataArr[0].FLOWID}&${item.isOverR}`
          descResult = `${dataArr[0].projectType}项目,目前在${dataArr[0].stepName}阶段`
          projectName = `${dataArr[0].projectName}`
        }
        if(dataArr[0]&&item.moduleIdReal === 1003){
          urlResult = `/project-process/operation/${item.PROID}`
          descResult = `${dataArr[0].projectType}项目,目前在${dataArr[0].stepName}阶段`
          projectName = `${dataArr[0].projectName}`
        }

        return {
          url:urlResult,
          desc:descResult,
          projectName:projectName
        }
      })

      return arrResult
    }
    render() {
        const iconStyle = {
          fontSize: '6em',
          color : 'rgba(255,255,255,0.45)',
          padding : '40px 0',
          marginLeft : '10px',
          marginBottom: '30px'
        }
        const {totalCount,guihuaCount,designCount,shigongCount,dataListoneModuleId,dataListone,ListOne} = this.state
        let listOneData
        if(dataListoneModuleId.length>0&&dataListone.length>0){
          listOneData = this.handleListAne(dataListoneModuleId,dataListone)
        }
        // <i className="fa fa-bar-chart-o fa-5x"></i>
        return (<div id="page-wrapper">
            <PageTitle title="项目总览">

            </PageTitle>
            <div className="row project-wrap">
                <div className="col-md-12">
                    <div className="row">

                        <div className="col-md-3 col-sm-4 col-xs-8">
                            <div className="panel panel-primary text-center no-boder bg-color-green green">
                                <div className="panel-left pull-left green">
                                <Icon type="appstore" style={iconStyle} />


                                </div>
                                <div className="panel-right pull-right">
                                    <h3>{totalCount}</h3>
                                    <strong>
                                        项目总数</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-4 col-xs-8">
                            <div className="panel panel-primary text-center no-boder bg-color-red red">
                                <div className="panel-left pull-left red">
                                <Icon type="bar-chart" style={iconStyle} />

                                </div>
                                <div className="panel-right pull-right">
                                    <h3>{guihuaCount}</h3>
                                    <strong>
                                        规划项目总数</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-4 col-xs-8">
                            <div className="panel panel-primary text-center no-boder bg-color-blue blue">
                                <div className="panel-left pull-left blue">
                                <Icon type="bars" style={iconStyle} />
                                </div>

                                <div className="panel-right pull-right">
                                    <h3>{designCount}
                                    </h3>
                                    <strong>
                                        设计阶段项目总数</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-4 col-xs-8">
                            <div className="panel panel-primary text-center no-boder bg-color-brown brown">
                                <div className="panel-left pull-left brown">
                                <Icon type="calendar" style={iconStyle} />
                                </div>
                                <div className="panel-right pull-right">
                                    <h3>{shigongCount}
                                    </h3>
                                    <strong>
                                        施工阶段项目总数
                                    </strong>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3 col-xs-6 listone">
                        <Card title="项目总览" extra={<i className="fa fa-angle-right"></i>} bordered={true} style={{background:'#fff'}} >

                         {
                           listOneData?
                           <List
                            itemLayout="horizontal"
                            loading={listOneData.length?false:true}
                            dataSource={listOneData}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<i className="fa fa-user"></i>}
                                  title={<Link to={`${item.url}`}><span>{item.projectName}</span></Link>}
                                  description={`${item.desc}`}
                                />
                              </List.Item>
                            )}
                          />
                          : <div><Icon type='loading' />正在计算项目总览,或无数据</div>
                        }



                        </Card>
                      </div>


                      <div className="col-md-3 col-xs-6 listtwo">
                        <Card title="规划管控项目" extra={<Link to='/project-planing/map' style={{color:'#fff'}}>更多<i className="fa fa-angle-right"></i></Link>} bordered={true} style={{background:'#fff'}} >
                        {
                          this.state.dataListtwo.length > 0?
                          <List
                            itemLayout="horizontal"
                            loading={this.state.dataListtwo.length?false:true}
                            dataSource={this.state.dataListtwo}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<i className="fa fa-user"></i>}
                                  title={<Link to={`/project-planing/edit/${item.projectName}&${item.FLOWID}&${item.MODULEID}&${item.nowstep}&${item.PROID}&${item.FLOWID}&${item.isover}`}><span>{item.projectName}</span></Link>}
                                  description={`${item.projectType}项目,目前在${item.stepName}阶段`}
                                />
                              </List.Item>
                            )}
                          />
                          : (<div>
                            {
                              this.state.dataListtwoFin?
                              <div>暂无数据</div>
                              :
                              <Icon type='loading'/>
                            }
                          </div>)
                        }

                        </Card>
                      </div>



                      <div className="col-md-3 col-xs-6 listthree">
                        <Card title="设计管控项目" extra={<Link to='/project-design/map' style={{color:'#fff'}}>更多<i className="fa fa-angle-right"></i></Link>} bordered={true} style={{background:'#fff'}} >
                          {
                            this.state.dataListthree.length>0?
                            <List
                              itemLayout="horizontal"
                              loading={this.state.dataListthree.length?false:true}
                              dataSource={this.state.dataListthree}
                              renderItem={item => (
                                <List.Item>
                                  <List.Item.Meta
                                    avatar={<i className="fa fa-user"></i>}
                                    title={<Link to={`/project-design/edit/${item.projectName}&${item.FLOWID}&${item.MODULEID}&${item.nowstep}&${item.PROID}&${item.FLOWID}&${item.isover}`}><span>{item.projectName}</span></Link>}
                                    description={`${item.projectType}项目,目前在${item.stepName}阶段`}
                                  />
                                </List.Item>
                              )}
                            />
                            :
                            (<div>
                              {
                                this.state.dataListthreeFin?
                                <div>暂无数据</div>
                                :
                                <Icon type='loading'/>
                              }
                            </div>)
                          }

                        </Card>
                      </div>


                      <div className="col-md-3 col-xs-6 listfour">
                        <Card title="施工管控项目" extra={<Link to='/project-process/map' style={{color:'#fff'}}>更多<i className="fa fa-angle-right"></i></Link>} bordered={true} style={{background:'#fff'}} >
                        {
                          this.state.dataListfour.length>0?
                          <List
                            itemLayout="horizontal"
                            dataSource={this.state.dataListfour}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<i className="fa fa-user"></i>}
                                  title={<Link to={`/project-process/operation/${item.PROID}`}><span>{item.projectName}</span></Link>}
                                    description={`${item.projectType}项目`}
                                />
                              </List.Item>
                            )}
                          />
                          :
                          (<div>
                            {
                              this.state.dataListfourFin?
                              <div>暂无数据</div>
                              :
                              <Icon type='loading'/>
                            }
                          </div>)
                        }

                        </Card>
                      </div>
                    </div>

                </div>
            </div>
        </div>)
    }
}

export default Project;
