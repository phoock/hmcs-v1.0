import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import { Input, Select,Card , DatePicker, Upload, message, Button, Icon } from 'antd';
const { TextArea } = Input;
const Option = Select.Option;
const { RangePicker } = DatePicker;



class ShiGongInfo extends React.Component{

  render(){
    const uploadProps = {
      name: 'file',
      action: '//jsonplaceholder.typicode.com/posts/',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} 文件上传成功`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 文件上传失败.`);
        }
      },
    };
    return (
      <div className="shigong-info-wrap">
        <Card title = "河道排水改造项目施工详情" type = "inner" >
          <div className = 'formInfo'>
            <div className="row">
              <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectName">项目名称</label></div>
              <div className="col-md-5 col-xs-8"><Input id="projectName" placeholder="请填写项目名称"/></div>
            </div>
            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectStatus">施工状态</label></div>
              <div className="col-md-5 col-xs-8">
                <Select defaultValue="stop" style={{ width: 160 }} id="projectStatus">
                  <Option value="stop">未动工</Option>
                  <Option value="do">进行中</Option>
                  <Option value="finished">已完成</Option>
                </Select>
              </div>
            </div>
            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label>项目起始/结束时间</label></div>
              <div className="col-md-5 col-xs-8">
              <RangePicker
                placeholder={['项目开始时间', '项目结束时间']}
              />
              </div>
            </div>

            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectCompony">建设单位</label></div>
              <div className="col-md-5 col-xs-8"><Input id="projectCompony" placeholder="请填写建设单位"/></div>
            </div>

            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label htmlFor="checkCompony">勘察单位</label></div>
              <div className="col-md-5 col-xs-8"><Input id="checkCompony" placeholder="请填写勘察单位"/></div>
            </div>

            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label htmlFor="designCompony">设计单位</label></div>
              <div className="col-md-5 col-xs-8"><Input id="designCompony" placeholder="请填写设计单位"/></div>
            </div>

            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label htmlFor="processCompony">施工单位</label></div>
              <div className="col-md-5 col-xs-8"><Input id="processCompony" placeholder="请填写施工单位"/></div>
            </div>

            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label htmlFor="totalCount">总投资</label></div>
              <div className="col-md-2 col-xs-4"><Input addonAfter={<div>万元</div>}/></div>
            </div>

            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectDuration">工期</label></div>
              <div className="col-md-2 col-xs-4"><Input addonAfter={<div>月</div>}/></div>
            </div>

            <div className="row" style={{marginTop:16}}>
              <div className="col-md-2 col-xs-4 labels"><label htmlFor="projectDuration">文件上传</label></div>
              <div className="col-md-2 col-xs-4">
                <Upload {...uploadProps}>
                  <Button>
                    <Icon type="upload" /> 点击上传文件
                  </Button>
                </Upload>
              </div>
            </div>
          </div>
        </Card>
        <Card title = "项目概况" type="inner" style={{marginTop:16}}>
          <TextArea rows={12} />
        </Card>
        <div className="row" style={{marginTop:16}}>
          <Button type="primary" style={{marginRight:16,marginLeft:15}}>提交</Button>
          <Button>取消</Button>
        </div>
      </div>
    )
  }
}

export default ShiGongInfo;
