import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import {Card, Button, Input, Table, Divider, Modal, Upload,Icon, message } from 'antd';
const Search = Input.Search;
import NoData from 'component/noData/index.jsx'


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
//导入组件

class ProjectAcceptance extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          modalVisible : false,
          dataEmpty : false,
          pageInfo:{
            CurrentPage:1,
            PageSize:5
          },
          totalPage:0,
          dataSource:[],
          //上传竣工文件需要的参数
          fileNum: 1,
          PROJECTID:'',
          fileList:[],
          uploadUrl: '/api/Project/OperateRecordFileUpload',
          uploading: false,
        }
    }
    componentDidMount(){
      this.loadData(this.state.pageInfo)
      this.columns = [
          {
              title: '项目编号',
              dataIndex: 'proNum',
              key: 'proNum'
          }, {
              title: '项目名称',
              dataIndex: 'proName',
              key: 'proName'
          }, {
              title: '项目类型',
              dataIndex: 'proType',
              key: 'proType'
          },
          // {
          //     title: '创建时间',
          //     dataIndex: 'createTime',
          //     key: 'createTime'
          // }, {
          //     title: '竣工时间',
          //     dataIndex: 'finishedTime',
          //     key: 'finishedTime'
          // }, {
          //     title: '勘察单位',
          //     dataIndex: 'check',
          //     key: 'check'
          // }, {
          //     title: '设计单位',
          //     dataIndex: 'design',
          //     key: 'design'
          // }, {
          //     title: '施工单位',
          //     dataIndex: 'workCom',
          //     key: 'workCom'
          // }, {
          //     title: '监理单位',
          //     dataIndex: 'jianli',
          //     key: 'jianli'
          // }, {
          //     title: '建设单位',
          //     dataIndex: 'buildCom',
          //     key: 'buildCom'
          // },
          {
              title: '工期',
              dataIndex: 'duration',
              key: 'duration'
          }, {
              title: '总投资(千万)',
              dataIndex: 'totalCount',
              key: 'totalCount'
          }, {
              title: '施工状态',
              dataIndex: 'status',
              key: 'status'
          }, {
              title: '详情',
              render: (text, record, index) => {
                  return (<span>
                      <Link to={`/project-process/operation/${record.proNum}`}>查看</Link>
                      <Divider type="vertical" />
                          <a disabled={record.proStatus !== 3} onClick={()=>{
                            this.showModal(record)
                          }}>上传竣工备案文件</a>

                  </span>)
              }
          }
      ];
    }
    loadData(){
      axios.post('/api/Project/JsonConstructionPage',this.state.pageInfo)
      .then((res)=>{
        if(res.status===200&&res.data.isSuccessful){
          this.handleDataFormat(res.data.Data)
          this.loadPagination(res.data)
        }
        else if(res.status === 200&&!res.data.isSuccessful){
          this.setState({
            dataEmpty : true
          })
        }
        else{
          // this.props.history.push('/login')
        }
      })
    }
    handleDataFormat(data){
      let dataArr = data.map((v,index)=>{
        let project = {
            key: index + 1,
            proNum: v.PROID,
            proName: v.PRONAME,
            flowId: v.FLOWID,
            proType: PROJECT_TYPE[v.FLOWID],
            createTime: (v.CONSTARTDATE && v.CONSTARTDATE.slice(0,10)) || '',
            finishedTime:(v.CONEND && v.CONEND.slice(0,10))||'',
            process: v.CONEND,
            check: v.KCDEPT,
            design: v.DESDEPT,
            workCom: v.CONDEPT,
            jianli: v.JLDEPT,
            buildCom: v.USERNAME,
            duration: v.COMLIFT && v.COMLIFT+'个月' || '',
            totalCount: v.COMMONEY,
            status: STATUS_TYPE[v.COMSTATUS-1],
            proStatus:v.COMSTATUS
        }
        return project
      })
      this.setState({
        dataSource: dataArr
      })
    }
    loadPagination(data){
      this.setState({
        totalPage:data.RowCount
      })
    }
    showModal(info){
      console.log(info);
      this.setState({
        modalVisible : true,
        PROJECTID:info.proNum
      })
    }
    handleModelCancel (e) {
      //关闭modal层并清空数据
      this.setState({
        modalVisible: false,
        PROJECTID:''
      });
    }
    handleUpload(){
      const { fileList } = this.state;
      const formData = new FormData();
      fileList.forEach((file,index) => {
        formData.append(`file_${index+1}`, file);
      });
      formData.append('PROID',this.state.PROJECTID)
      this.setState({
        uploading: true,
      });
      // 使用axios上传
      axios.post(this.state.uploadUrl,formData)
      .then((res)=>{
        if(res.status===200&&res.data.isSuccessful){
          this.setState({
            uploading: false
          },()=>{
            message.success('保存成功')
            this.loadData()
            this.clearFileList()
            this.handleModelCancel()
          })
        }else{
          this.setState({
            uploading: false,
            fileList: []
          })
          message.error('上传失败')
          this.handleModelCancel()
        }
      })
      .catch((err)=>{
        message.error('上传失败')
        this.handleModelCancel()
        this.setState({
          uploading: false,
          fileList: []
        })
      })
    }
    clearFileList(){
      this.setState({
        fileList:[]
      })
    }
    render() {
        let { dataEmpty, modalVisible,PROJECTNAME,uploadUrl,uploading } = this.state
        const props = {
          name: 'file',
          action: uploadUrl,
          headers: {
            authorization: 'authorization-text',
          },
          beforeUpload:function(file,filtTotal){
            return false
          }.bind(this),
          onChange:function(info){
            //如果info.fileList.length>1 则pop()掉一个,并
            let fileArr = this.state.fileList
            if(info.fileList.length>1){
              //删掉一个
              info.fileList = info.fileList.pop()
              //同时在state里删掉最后一个
              let fileState = this.state.fileList
              fileState.pop()
              this.setState({
                fileList : fileState
              },()=>{
                //删除掉最后一个后添加一个新的file
                this.setState(({fileList})=>({
                  fileList : [...fileList,info.file]
                }))
              })
            } else {
              //如果是第一次添加数据
              this.setState(({fileList})=>({
                fileList : [...fileList,info.file]
              }))
            }
          }.bind(this),
          onRemove:function(file){
            return false
          }.bind(this)
        }
        return (<div>

            <div className="row" style={{marginTop:16}}>
                <div className="col-md-12">
                    <Card title="项目列表">
                        <div className="row">
                            <div className="col-md-3 col-xs-6">
                                <Search
                                placeholder="请输入项目名称"
                                onSearch={value => console.log(value)}
                                enterButton="搜索"/>
                            </div>
                        </div>
                        {
                          dataEmpty?
                          <NoData></NoData>:
                          <Table
                          loading = {this.state.dataSource.length>0?false:true}
                          dataSource={this.state.dataSource}
                          columns={this.columns}
                          pagination={{
                            position:'bottom',
                            pageSize:this.state.pageInfo.PageSize,
                            defaultCurrent:1,
                            current:this.state.pageInfo.CurrentPage,
                            total:this.state.totalPage,
                            onChange:(current,size)=>{
                              this.setState({
                                pageInfo:{
                                  CurrentPage:current,
                                  PageSize:size
                                }
                              },()=>{
                                this.loadData()
                              })
                            }
                          }}/>
                        }

                    </Card>
                </div>
            </div>
            <Modal
            width={'55%'}
            visible={modalVisible}
            footer={null}
            onCancel={()=>this.handleModelCancel()}
            >
              <Card title={PROJECTNAME}>
                <div className="row">
                  <div className="col-md-4 col-sm-6">
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> 请上传准予许可决定书
                      </Button>
                    </Upload>
                  </div>
                  <div className="col-md-4 col-sm-6">
                    <Button
                      type="primary"
                      onClick={()=>this.handleUpload()}
                      disabled={this.state.fileList.length !== this.state.fileNum}
                      loading={uploading}
                    >
                      {uploading ? '上传中' : '开始上传' }
                    </Button>
                  </div>
                </div>
              </Card>
            </Modal>
        </div>)
    }
}

export default ProjectAcceptance;
