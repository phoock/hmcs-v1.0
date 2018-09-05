import React from 'react'
import { Card, Table, messagem, Modal, Input, Select } from 'antd'
import axios from 'axios'

//引入组件
import PageTitle from 'component/page-title/index.jsx'
import NoData from 'component/noData/index.jsx'


//环境中的常量及函数
const usertype = (num)=> {
  if(num === 1) return '超级管理员'
  if(num === 2) return '系统员工'
  if(num === 3) return '建设单位'
}

class UserCenter extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        //加载列表数据state
        dataSource : [],
        dataEmpty : false,
        pageInfo : {
          CurrentPage : 1
        },
        totalPage : 0,

        //modal层state
        visible : false,
        modalData : {
          userid : '',
          usertype : '',
          username : '',
          userdepart : '',
          userTel : '',
          userPhoneNum : '',
          userAddress : ''
        }
      }
    }
    componentDidMount(){
      this.columns = [
          {
              title: '用户账号',
              dataIndex: 'userid',
              render: text => <a href="javascript:;">{text}</a>
          }, {
              title: '用户姓名',
              dataIndex: 'username'
          }, {
              title: '联系电话',
              dataIndex: 'phone'
          }, {
              title: '用户部门',
              dataIndex: 'userdepart'
          }, {
              title: '用户类别',
              dataIndex: 'usertype'
          }, {
              title: "操作",
              render: (record) => {
                return (<span>
                    <a onClick={()=>this.handleEdit(record)}>编辑</a>
                </span>)
              }
          }
      ]
      this.loadData()
    }
    loadData(){
      let params = {
        CurrentPage : this.state.pageInfo.CurrentPage
      }
      axios.post('/api/Account/JsonAccountPage',params)
      .then(res=>{
        if(res.status === 200 && res.data.isSuccessful){
          //正确请求,并且有数据的情况
          this.handleDataFormat(res.data.Data)
          this.setState({
            totalPage : res.data.RowCount
          })
        }
        else if(res.status === 200 && !res.data.isSuccessful){
          //正确请求,但是没有数据的情况
          this.setState({
            dataEmpty : true
          })
        }
      })
      .catch(err=>{
        message.error('出现错误')
      })
    }

    //数据的格式处理
    handleDataFormat(data){
        let dataArr = data.map((v,index)=>{
          let project = {
              key: index,
              userid: v.LOGINNAME,
              username: v.USERNAME,
              phone:v.LINKMOBILE,
              userdepart: v.EMPDEPART.substring(2),
              usertype: usertype(v.USERTYPE),
              userSN : v.USERSN,
          }
          // ${record.name}&
          // ${record.typeNum}&
          // ${record.proType}&
          // ${record.step}&
          // ${record.proId}&
          // ${record.paramType}&
          // ${record.hasFinished}
          return project
      })
      this.setState({
        dataSource:dataArr
      })
    }

    //点击编辑按钮
    handleEdit(record){
      this.setState({
        visible : true
      })
      //数据回填
      let params = {
        USERSN:record.userSN
      }
      axios.post('/api/Account/JsonGetPersonInfo', params)
      .then(res=>{
        if(res.status===200 && res.data.isSuccessful){
          this.handleModelFormat(res.data.Data)
        }
        else if (res.status === 200 && !res.data.isSuccessful){
          console.log('请求JsonGetPersonInfo接口时,isSuccessful返回为false');
        }
        else {
          console.log('请求JsonGetPersonInfo接口时,status不为200');
        }
      })
      .catch(err=>{
        console.log(err);
      })
    }
    //modal层数据回填数据格式处理
    handleModelFormat(data){
      let dataParse = JSON.parse(data)
      console.log(dataParse[0]);
      let v = dataParse[0]
      this.setState({
        modalData : {
          userid : v.LOGINNAME || '',
          usertype : v.USERTYPE || '',
          username : v.USERNAME || '',
          userdepart : v.EMPDEPART.substring(2) || '',
          userTel : v.LINKTEL || '',
          userPhoneNum : v.LINKMOBILE || '',
          userAddress : v.ADDRESS || ''
        }
      })
    }
    handleModelSubmit(){
      this.setState({
        visible: false
      })
    }
    handleModelCancel(){
      this.setState({
        visible: false
      })
    }
    handleModleInputEdit(e,key){
      let value = e.target.value
      console.log(e.target.value);
      //拷贝modalData
      let finValue = Object.assign({},this.state.modalData)
      //修改对应的value值
      finValue[key] = value
      this.setState({
        modalData : finValue
      })
    }
    render() {
        let { modalData } = this.state
        return (<div id="page-wrapper">
            <PageTitle title="用户中心">

            </PageTitle>
            <div className="row project-wrap">
              <Card title="系统账号信息">
                <Table
                  loading = {this.state.dataSource.length>0?false:true}
                  dataSource={this.state.dataSource}
                  columns={this.columns}
                  pagination={{
                    position:'bottom',
                    pageSize:10,
                    defaultCurrent:1,
                    current:this.state.pageInfo.CurrentPage,
                    total:this.state.totalPage,
                    onChange:(current,size)=>{
                      this.setState({
                        pageInfo:{
                          CurrentPage : current
                        }
                      },()=>{
                        this.loadData()
                      })
                  }
                }}
                />
                <Modal
                  title="用户信息维护"
                  visible={this.state.visible}
                  onOk={()=>this.handleModelSubmit()}
                  onCancel={()=>this.handleModelCancel()}
                  okText = {`保存`}
                  cancelText = {`取消`}
                  width = {`600px`}
                >
                  <div className="row">
                    <div className="col-md-2 labels"><label>用户账号</label></div>
                    <div className="col-md-4"><Input value={`${modalData.userid}`} onChange={(e)=>this.handleModleInputEdit(e,'userid')}/></div>
                    <div className="col-md-4">
                      <Select defaultValue="default" style={{ width: 160 }}>
                        <Option value="default">占位符</Option>
                      </Select>
                    </div>
                  </div>
                  <div className="row" style={{marginTop:16}}>
                    <div className="col-md-2 labels"><label>用户姓名</label></div>
                    <div className="col-md-4"><Input value={`${modalData.username}`} onChange={(e)=>this.handleModleInputEdit(e,'username')}/></div>
                  </div>
                  <div className="row" style={{marginTop:16}}>
                    <div className="col-md-2 labels"><label>用户部门</label></div>
                    <div className="col-md-4">
                      <Select defaultValue="default" style={{ width: 160 }}>
                        <Option value="default">占位符</Option>
                      </Select>
                    </div>
                  </div>
                  <div className="row" style={{marginTop:16}}>
                    <div className="col-md-2 labels"><label>手机号</label></div>
                    <div className="col-md-6"><Input value={`${modalData.userPhoneNum}`} onChange={(e)=>this.handleModleInputEdit(e,'userPhoneNum')}/></div>
                  </div>
                  <div className="row" style={{marginTop:16}}>
                    <div className="col-md-2 labels"><label>联系电话</label></div>
                    <div className="col-md-6"><Input value={`${modalData.userTel}`} onChange={(e)=>this.handleModleInputEdit(e,'userTel')}/></div>
                  </div>
                  <div className="row" style={{marginTop:16}}>
                    <div className="col-md-2 labels"><label>联系地址</label></div>
                    <div className="col-md-8"><Input value={`${modalData.userAddress}`} onChange={(e)=>this.handleModleInputEdit(e,'userAddress')}/></div>
                  </div>
                </Modal>
              </Card>
            </div>
        </div>)
    }
}

export default UserCenter
