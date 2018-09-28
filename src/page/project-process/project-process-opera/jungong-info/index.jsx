import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'


import { Card, Button, Input, Table, Modal, message, Upload, Icon } from 'antd';
const Search = Input.Search;

//导入工具函数
import HM from 'util/hmcs.js'
let HMutil = new HM()

//导入文件组件
import ShowFile from 'component/show-file/index.jsx'
import NoData from 'component/noData/index.jsx'



@withRouter
class JunGong extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      previewVisible : false,
      CurrentPage : 1,
      totalPage : 1,
      PageSize : 5,
      fileType : 6,
      proId:1,
      proName:'',
      fileNum: 1,
      //table列表数据
      dataSource : [],
      //上传文件数据
      fileList: [],
      //modal层图片数据
      modalImgArr : [],
      uploading: false,
      uploadUrl: '/api/Project/OperateConstucFileUpload',
      hasData : this.props.fileJunG !== ''

    }
  }
  componentDidMount(){
    // this.loadData()
    console.log(123);
  }
  loadData(){
    let proId = this.props.match.params.proNum
    let params = {
      PROJECTID : proId,
      FILETYPE : this.state.fileType,
      CurrentPage : this.state.CurrentPage,
      PageSize : this.state.PageSize,
      PageHtml : "HMCSCONFILEVIDEOPAGE",
      PageList : ""
    }
    axios.post('/api/Project/JsonGetHmcsConstructionFilePage', params)
    .then(res=>{
      if(res.status === 200 && res.data.Data){
        let newDataSource = this.handleDataFormat(res.data.Data)
        this.setState({
          totalPage : res.data.RowCount,
          dataSource : newDataSource,
          hasData : true
        })
      } else {
        this.setState({
          hasData : false
        })
      }
    })
    .catch((error)=>{
      console.log('error');
      message.error('error')
    })
  }
  handleDataFormat(dataArr){
    return dataArr.map((v,index)=>{
      let createTime = HMutil.handleTimeFormate(v.FILEDATE)
      let img = HMutil.handleImgUrl(v.FILEURL,v.FILETYPE,this.props.proInfo.proId)
      return {
          key: index + 1,
          fileName: v.FILENAME,
          bumen: v.FILEDEPT,
          admin: v.FILEOP,
          createTime: createTime,
          status: v.ISCHECK === 1?'已审核':'未审核',
          img:img
      }
    })
  }
  showModal(imgArr){
    this.setState({
      previewVisible : true,
      modalImgArr : imgArr
    })
  }
  handleOk(e) {
    this.setState({
      previewVisible: false,
    });
  }
  handleModelCancel (e) {
    this.setState({
      previewVisible: false,
    });
  }
  handleUpload(){
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file,index) => {
      formData.append(`file_${index+1}`, file);
    });
    formData.append('PROJECTID',this.props.proInfo.proId)
    formData.append('FILETYPE',this.state.fileType)
    formData.append('PROJECTNAME',this.props.proInfo.proName)
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
        })
      }else{
        this.setState({
          uploading: false,
          fileList: []
        })
        message.error('上传失败')
      }
    })
    .catch((err)=>{
      message.error('上传失败')
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

  render(){
    const { uploadUrl, uploading, modalImgArr, previewVisible, hasData } = this.state
    const columns = [
        {
            title: '变更文件名称',
            dataIndex: 'fileName',
            key: 'fileName'
        }, {
            title: '上传部门',
            dataIndex: 'bumen',
            key: 'bumen'
        }, {
            title: '上传人',
            dataIndex: 'admin',
            key: 'admin'
        }, {
            title: '上传时间',
            dataIndex: 'createTime',
            key: 'createTime'
        }, {
            title: '审核状态',
            dataIndex: 'status',
            key: 'status'
        }, {
            title: '详情',
            render: (record) => {
                return (<span key={record.key}>
                    <Button onClick={()=>this.showModal(record.img)}>查看</Button>
                </span>)
            }
        }
    ]


    return (
      <div className="jianli-info-wrap">
          <div className="row">
            <div className="col-md-12">
            {
              hasData
              ?
              <div>

                <ShowFile url={`http://file.vt9999.cn/productimg/FlowWorkFiles/${this.props.proInfo.proId}/${this.props.fileJunG}`}></ShowFile>
              </div>

              :
              <NoData></NoData>
            }

            </div>
          </div>

          <Modal width={'55%'} visible={previewVisible} footer={null} onCancel={()=>this.handleModelCancel()}>
          {
            modalImgArr.length>0?
            (
              <div>
              {

                modalImgArr.map((v, index)=>{
                  return (<div key={index}>
                    {
                      v?<ShowFile url={v}></ShowFile>:<div>暂无数据</div>
                    }

                    </div>)
                })
              }
              </div>
            )
            :<div>暂无数据</div>
          }

          </Modal>
      </div>
    )
  }
}

export default JunGong;
