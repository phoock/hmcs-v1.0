import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import { Input, Select,Card , DatePicker, message, Button, Icon } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;
const { RangePicker } = DatePicker;

//导入工具函数
import moment from 'moment';
import HM from 'util/hmcs.js'
let HMutil = new HM()




@withRouter
class ShiGongInfo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      proId : this.props.match.params.proNum,
      dataSource : null,
      canEdit : false,
      comstatus : ''
    }
  }

  componentDidMount(){
    let params = this.state.proId
    //加载基本信息
    this.loadInfo(params)

  }

  loadInfo(proId){
    if(proId){
      axios.get('/api/Project/JsonProjectConstruction',{params: { 'proId': `${proId}` }})
      .then(res=>{
        if(res.status===200&&res.data.Data){
          console.log(res.data.Data);
          //保存数据,记录当前的comstatus
          this.setState({
            dataSource : res.data.Data,
            canEdit : res.data.Data.COMSTATUS === 1,
            comstatus : res.data.Data.COMSTATUS
          })
        }
      }).catch(err=>{
        message.error('err')
      })
    }
  }

  handleInputChange(e,key){
    let obj = this.state.dataSource
    obj[key] = e.target.value
    this.setState({
      dataSource : obj
    })
  }

  handleSelectChange(e,key){

    let obj = this.state.dataSource
    obj[key] = e
    this.setState({
      dataSource : obj
    })
  }

  handleTimeChange(e){
    let beginTime = new Date(e[0]._d)
    let endTime = new Date(e[1]._d)
    let obj = this.state.dataSource
    let handleTimeFormate = (date)=>{
      if(date<10){ return '0'+date}
      else{return date}
    }
    obj.CONSTARTDATE = `${beginTime.getFullYear()}-${handleTimeFormate(beginTime.getMonth()+1)}-${handleTimeFormate(beginTime.getDay())}T${handleTimeFormate(beginTime.getHours())}:${handleTimeFormate(beginTime.getMinutes())}:${handleTimeFormate(beginTime.getSeconds())}`
    obj.CONEND = `${endTime.getFullYear()}-${handleTimeFormate(endTime.getMonth()+1)}-${handleTimeFormate(endTime.getDay())}T${handleTimeFormate(endTime.getHours())}:${handleTimeFormate(endTime.getMinutes())}:${handleTimeFormate(endTime.getSeconds())}`
    this.setState({
      dataSource : obj
    })
  }

  submitForm(){
    //如果status发生了变化,且变化以后的值为2
    if(this.state.comstatus !=this.state.dataSource.COMSTATUS && this.state.dataSource.COMSTATUS==2){
      if(window.confirm('检测到施工状态更改为"进行中",确定以后基本信息将不能修改,确定要修改施工状态吗')){
        this.sendXHRSubmit()
        this.setState({
          canEdit : false
        })
        return
      } else {
        //将this.state.dataSource.COMSTATUS归1
        let objSource = this.state.dataSource
        objSource.COMSTATUS = this.state.comstatus
        this.setState({
          dataSource : objSource
        })
        return
      }
    }
    //若果status发生了变化,且变化以后的值为3
    else if(this.state.comstatus !=this.state.dataSource.COMSTATUS && this.state.dataSource.COMSTATUS==3){
      if(window.confirm('检测到施工状态更改为"已完成",确定以后所有信息都将不能修改,确定要修改吗')){
        this.sendXHRSubmit()
        this.props.changeDisab(false)
        this.setState({
          canEdit : false
        })
        return
      } else {
        //将this.state.dataSource.COMSTATUS归1
        let objSource = this.state.dataSource
        objSource.COMSTATUS = this.state.comstatus
        this.setState({
          dataSource : objSource
        })
        return
      }
    }
    else if(this.state.comstatus == 1 && this.state.dataSource.COMSTATUS==1){
      this.timer = setTimeout(()=>{
        //防止反复点提交出现错误
        if(this.timer){
          clearTimeout(this.timer)
        }
        this.sendXHRSubmit()
      },300)
    }
    else {
      return
    }
    return
  }
  sendXHRSubmit(){
    let v = this.state.dataSource
    let params = {
      ProID : this.state.proId,
      COMLIFT : v.COMLIFT || '',
      COMMONEY : v.COMMONEY || '',
      COMSTATUS : v.COMSTATUS || '',
      CONDEPT : v.CONDEPT || '',
      CONEND : v.CONEND || '',
      CONSTARTDATE : v.CONSTARTDATE || '',
      DESDEPT : v.DESDEPT || '',
      JLDEPT: v.JLDEPT || '',
      KCDEPT: v.KCDEPT || '',
      CONMAN: v.CONMAN || '',
    }
    if(!params.ProID || !params.COMSTATUS || !params.CONSTARTDATE || !params.CONEND){
      message.error('缺少重要参数,请刷新页面试试')
      return
    }

    axios.post('/api/Project/JsonUpdateHmcsConstruction',params)
    .then((res)=>{
      if(res.status === 200 && res.data.isSuccessful) {
        message.success('更新成功')
        this.loadInfo(this.state.proId)
      } else {
        message.error('更新失败,请稍后再试')
      }
    })
  }
  render(){
    const { dataSource } = this.state
    return (
      <div>
      {
        dataSource
        ? <div className="shigong-info-wrap">
          <Card title = "河道排水改造项目施工详情" type = "inner" >
            <div className = 'formInfo'>
              <div className="row">
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectName">项目名称</label></div>
                <div className="col-md-5 col-xs-8"><Input readOnly={!this.state.canEdit} onChange={(e)=>this.handleInputChange(e,'PRONAME')} value={dataSource.PRONAME}/></div>
              </div>
              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectStatus">施工状态</label></div>
                <div className="col-md-5 col-xs-8">
                {
                  this.state.comstatus === 1
                  ?(
                    <Select disabled={this.state.comstatus >= 3} onChange={(e)=>this.handleSelectChange(e,'COMSTATUS')} style={{ width: 160 }} value={dataSource.COMSTATUS}>
                      <Option disabled={this.state.comstatus == 2} value={1}>未动工</Option>
                      <Option value={2}>进行中</Option>
                    </Select>
                  )
                  :(
                    <Select disabled={this.state.comstatus >= 3} onChange={(e)=>this.handleSelectChange(e,'COMSTATUS')} style={{ width: 160 }} value={dataSource.COMSTATUS}>
                      <Option disabled={this.state.comstatus >= 3} value={2}>进行中</Option>
                      <Option value={3}>已完成</Option>
                      <Option disabled={true} value={4}>已竣工</Option>
                    </Select>
                  )

                }

                </div>
              </div>
              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label>项目起始/结束时间</label></div>
                <div className="col-md-5 col-xs-8">
                <RangePicker
                  allowClear={false}
                  disabled={!this.state.canEdit}
                  placeholder={['项目开始时间', '项目结束时间']}
                  onChange = {(e)=>this.handleTimeChange(e)}
                  defaultValue={[moment(HMutil.handleTimeFormate(`${dataSource.CONSTARTDATE}`)), moment(HMutil.handleTimeFormate(`${dataSource.CONEND}`))]}
                />
                </div>
              </div>

              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="checkCompony">勘察单位</label></div>
                <div className="col-md-5 col-xs-8"><Input readOnly={!this.state.canEdit} onChange={(e)=>this.handleInputChange(e,'KCDEPT')} value={dataSource.KCDEPT}/></div>
              </div>

              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="designCompony">设计单位</label></div>
                <div className="col-md-5 col-xs-8"><Input readOnly={!this.state.canEdit}  onChange={(e)=>this.handleInputChange(e,'DESDEPT')} value={dataSource.DESDEPT}/></div>
              </div>

              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="processCompony">施工单位</label></div>
                <div className="col-md-5 col-xs-8"><Input readOnly={!this.state.canEdit} onChange={(e)=>this.handleInputChange(e,'CONDEPT')} value={dataSource.CONDEPT}/></div>
              </div>

              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="processCompony">监理单位</label></div>
                <div className="col-md-5 col-xs-8"><Input readOnly={!this.state.canEdit} onChange={(e)=>this.handleInputChange(e,'JLDEPT')} value={dataSource.JLDEPT}/></div>
              </div>

              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectCompony">施工负责人</label></div>
                <div className="col-md-5 col-xs-8"><Input readOnly={!this.state.canEdit} onChange={(e)=>this.handleInputChange(e,'CONMAN')} value={dataSource.CONMAN}/></div>
              </div>

              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="totalCount">总投资</label></div>
                <div className="col-md-2 col-xs-4"><Input readOnly={!this.state.canEdit} onChange={(e)=>this.handleInputChange(e,'COMMONEY')} value={dataSource.COMMONEY} addonAfter={<div>万元</div>}/></div>
              </div>

              <div className="row" style={{marginTop:16}}>
                <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectDuration">工期</label></div>
                <div className="col-md-2 col-xs-4"><Input readOnly={!this.state.canEdit} onChange={(e)=>this.handleInputChange(e,'COMLIFT')} value={dataSource.COMLIFT} addonAfter={<div>月</div>}/></div>
              </div>

            </div>
          </Card>
          {/**
            <Card title = "项目概况" type="inner" style={{marginTop:16}}>
              <TextArea rows={12} />
            </Card>
          **/}

            <div className="row" style={{marginTop:16}}>
              <Button type="primary" disabled={this.state.comstatus > 3} onClick={()=>{this.submitForm()}} style={{marginRight:16,marginLeft:15}}>提交</Button>
            </div>


        </div>
        : <Icon type="loading"></Icon>
      }
      </div>

    )
  }
}

export default ShiGongInfo;
