import React from 'react'
import './index.scss'
import { Link} from 'react-router-dom'
import {Button, Card, Table, Divider, Progress } from 'antd';




class tem extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      columns : [
          {
              title: '项目名称',
              dataIndex: 'name',
              render: text => <a href="javascript:;">{text}</a>
          }, {
              title: '项目类型',
              dataIndex: 'type'
          }, {
              title: '时间',
              dataIndex: 'time'
          }, {
              title: '发起部门',
              dataIndex: 'unitBegin'
          }, {
              title: '当前审批部门',
              dataIndex: 'unitCurrent'
          }, {
              title: '当前操作',
              dataIndex: 'editCurrent'
          }, {
              title: "操作",
              render: (record) => {
                return (<span>
                    <a onClick={()=>this.handleProcess(record)}>查看进度</a>
                    <Divider type="vertical"/>
                    <Link to={`/project-planing/edit/${record.key}`}>项目处理</Link>
                </span>)
              }
          }
      ],
      data : [
          {
              key: 1,
              name: '武汉汉口火车站海边城市项目',
              type: '出让类项目',
              time: '2017-01-01至2017-11-01',
              unitBegin: '规划局',
              editCurrent: '规划局',
              unitCurrent: '住建局'
          },
          {
              key: 2,
              name: '镇江市广场海绵城市项目',
              type: '划拔类项目',
              time: '2017-01-01至2017-11-01',
              unitBegin: '指挥部',
              editCurrent: '规划局',
              unitCurrent: '住建局'
          },
          {
              key: 3,
              name: '镇江市广场海绵城市项目03',
              type: '划拔类项目',
              time: '2017-01-01至2017-11-01',
              unitBegin: '指挥部',
              editCurrent: '规划局',
              unitCurrent: '住建局'
          },
      ],
      processData : []
    }
  }
  handleProcess(data){
    this.setState({
      processData:[
        {
          step:1,
          text:'规划基本信息录入',
          hasDone:true
        },
        {
          step:2,
          text:'规划条件信息录入',
          hasDone:true
        },
        {
          step:3,
          text:'项目审批信息填报',
          hasDone:true
        },
        {
          step:4,
          text:'用地许可审核',
          hasDone:true
        },
        {
          step:5,
          text:'方案审查审核',
          hasDone:false
        },
        {
          step:6,
          text:'方案审查',
          hasDone:false
        },
        {
          step:7,
          text:'审核材料填报',
          hasDone:false
        },
        {
          step:8,
          text:'工程许可审核',
          hasDone:false
        }
      ],
      processTitle:data.name
    })
  }

  render(){
    const processWrap = this.state.processData.map((item, index)=>{
      return (
        <div className={item.hasDone?'col-md-1 item has-done':'col-md-1 item not-done'} key={index}>
          <span className="hid label label-success">已完成</span>
          <span className="hidd label label-success">未完成</span>
          <p>{item.step}</p>
          <p>{item.text}</p>
        </div>
      )
    });
    const processBarWrap = (<Progress percent={50} status="active" style={{marginBottom:16}}/>)
    return (
      <div className="planing-table-wrap">
        <Button>添加新项目<i className="fa fa-plus"></i></Button>
        {
          this.state.processData.length > 0
          ?<Card
            type="inner"
            title={this.state.processTitle}
          >
            <div className="row process-wrap">{processWrap}</div>
            <div className="row process-bar-wrap">{processBarWrap}</div>
          </Card>
          :''
        }


        <Table columns={this.state.columns} dataSource={this.state.data} />
      </div>
    )
  }
}

export default tem;
