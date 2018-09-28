import React from 'react';
import './index.scss';
import { Card, Input, Select, DatePicker, Upload, message, Button, Icon, Modal } from 'antd';
const Option = Select.Option
const { TextArea } = Input;
import moment from 'moment';
const { RangePicker } = DatePicker;
import axios from 'axios'

//导入工具函数
import HM from 'util/hmcs.js'
let HMutil = new HM()


class Step01 extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
      pageData:null
    }
  }
  handleCancel(){
    this.setState({ previewVisible: false })
  }
  handlePreview(file){
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  handleChange({ fileList }){
    this.setState({ fileList })
  }

  componentDidMount(){
    //拼数据
    let params = {
        FlowID: this.props.flowType,
        ProID: this.props.proId,
        PageHtml: "model",
        objProjectFlow: {
            MODULEID: this.props.moduleId
        }
    }
    axios.post('/api/Project/JsonGetProjectInfoView',params)
    .then(res=>{
      if(res.status===200&&res.data.Data){

        this.setState({
          pageData:res.data.Data
        })
      }
    }).catch((err)=>{
      console.log('err');
    })
  }
  render(){

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { pageData } = this.state
    return (
      <div className="stepinfo-wrap">
      {
        pageData?

        <Card title={`基本信息录入`}>
          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>项目名称</label></div>
            <div className="col-md-4"><Input value={`${pageData.ProName}`} readOnly/></div>
            <div className="col-md-4">
              <Select disabled={true} defaultValue="default" style={{ width: 160 }} id="projectStatus">
                <Option value="default">划拔类项目</Option>
              </Select>
            </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>项目类型</label></div>
            <div className="col-md-4">
              <Select disabled={true} defaultValue="1" style={{ width: 160 }} id="projectStatus">
                <Option value="1">源头</Option>
                <Option value="2">过程</Option>
                <Option value="3">末端</Option>
                <Option value="4">水体</Option>
              </Select>
            </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>地块类型</label></div>
            <div className="col-md-4">
              <Select disabled={true} defaultValue={`${pageData.LANDTYPE}`} style={{ width: 160 }} id="projectStatus">
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
                <Option value="D">D</Option>
              </Select>
            </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>项目状态</label></div>
            <div className="col-md-4">
              <Select disabled={true} defaultValue={`${pageData.PROSTATUS}`} style={{ width: 160 }} id="projectStatus">
                <Option value="1">新建</Option>
                <Option value="2">已完成规划</Option>
                <Option value="3">正在设计</Option>
                <Option value="4">已完成设计</Option>
                <Option value="5">正在施工</Option>
                <Option value="6">已完成施工</Option>
                <Option value="7">移交管养</Option>
              </Select>
            </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>项目地址</label></div>
            <div className="col-md-4"><Input value={`${pageData.PROADDRESS}`} readOnly/></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>项目规模</label></div>
            <div className="col-md-4"><Input value={`${pageData.PROSCAL}`} readOnly/></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>起始~结束时间</label></div>
            <div className="col-md-6">
              <RangePicker
                allowClear={false}
                disabled={true}
                placeholder={['项目开始时间', '项目结束时间']}
                defaultValue={[moment(HMutil.handleTimeFormate(`${pageData.PROSTARTDATE}`)), moment(HMutil.handleTimeFormate(`${pageData.PROENDDATE}`))]}
              />
            </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>资金来源</label></div>
            <div className="col-md-4"><Input value={`${pageData.MONEYFROM}`} readOnly/></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>项目投资</label></div>
            <div className="col-md-2"><Input value={`${pageData.PROPRICE}`} readOnly addonAfter={<div>万元</div>}/></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>土壤类型</label></div>
            <div className="col-md-4">
              <Select disabled={true} defaultValue={`${pageData.SOILTYPE.split('-')[0]}`} style={{ width: 160 }} id="projectStatus">
                <Option value="1">砂土</Option>
                <Option value="2">黏土</Option>
                <Option value="3">砂砾</Option>
                <Option value="4">卵石</Option>
                <Option value="5">软石</Option>
                <Option value="6">次坚石</Option>
                <Option value="7">坚石</Option>
              </Select>
            </div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>渗透系数</label></div>
            <div className="col-md-2"><Input value={`${pageData.INFILTRATION}`} readOnly /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>不渗透系数</label></div>
            <div className="col-md-2"><Input value={`${pageData.NOPERMEABLE}`} readOnly /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>面源污染控制</label></div>
            <div className="col-md-2"><Input value={`${pageData.objTarget.POLLUTIONCONTROLONE}`} readOnly /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>污水再生</label></div>
            <div className="col-md-2"><Input value={`${pageData.objTarget.REGENERATIONONE}`} readOnly /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>雨水资源利用率</label></div>
            <div className="col-md-2"><Input value={`${pageData.objTarget.RAINWATERONE}`} readOnly /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>绿地率</label></div>
            <div className="col-md-2"><Input value={`${pageData.objTarget.GREENONE}`} readOnly /></div>
          </div>

          <div className="row" style={{marginTop:16}}>
            <div className="col-md-2 labels"><label>建设单位</label></div>
            <div className="col-md-4">
              <Select disabled={true} defaultValue={`${pageData.CONSTRUCTION}`} style={{ width: 160 }} id="projectStatus">
                <Option value="6">珠海市市政建设有限公司</Option>
                <Option value="9">横琴市政建设有限公司</Option>
              </Select>
            </div>
          </div>



          {
            pageData.PROTARGET
            ?<div className="row" style={{marginTop:16}}>
              <div className="col-md-2 labels"><label>查看规划文件</label></div>
              <div className="col-md-3">
                <a href="http://file.vt9999.cn/productimg/FlowWorkFiles/StartPro/201809260235097787.pdf" target="_blank">
                  <Button>
                    <Icon type="download" /> 点击查看文件
                  </Button>
                </a>
              </div>
            </div>
            : null
          }



        </Card>
        :null
      }
      </div>
    )
  }
}


class ceshi extends React.Component{
  render(){
    return (
      <div>ceshi</div>
    )
  }
}


export default Step01
