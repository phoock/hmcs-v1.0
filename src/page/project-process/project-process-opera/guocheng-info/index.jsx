import React from 'react'
import './index.scss'
import { Card, Button, Input, Table  } from 'antd';
const Search = Input.Search;


const dataSource = [
    {
        key: '1',
        fileName: '施工监理报告1',
        bumen: '施工单位',
        admin: 'admin',
        createTime: '2018-05-01'
    },
    {
        key: '2',
        fileName: '施工监理报告2',
        bumen: '施工单位',
        admin: 'admin',
        createTime: '2018-05-02'
    },
    {
        key: '3',
        fileName: '施工监理报告3',
        bumen: '施工单位',
        admin: 'admin',
        createTime: '2018-05-03'
    },
    {
        key: '4',
        fileName: '施工监理报告4',
        bumen: '施工单位',
        admin: 'admin',
        createTime: '2018-05-04'
    },
    {
        key: '5',
        fileName: '施工监理报告5',
        bumen: '施工单位',
        admin: 'admin',
        createTime: '2018-05-05'
    },
    {
        key: '6',
        fileName: '施工监理报告6',
        bumen: '施工单位',
        admin: 'admin',
        createTime: '2018-05-06'
    },
    {
        key: '7',
        fileName: '施工监理报告7',
        bumen: '施工单位',
        admin: 'admin',
        createTime: '2018-05-07'
    }
];

const columns = [
    {
        title: '文件名称',
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
        title: '详情',
        render: (text, record) => {
            return (<span>
                <a href="javascript:;">查看</a>
            </span>)
        }
    }
];


class JianliInfo extends React.Component{
  render(){
    return (
      <div className="jianli-info-wrap">

          <div className="row">
            <div className="col-md-3 col-xs-6">
              <Button>添加施工监理报告  <i className="fa fa-plus"></i></Button>
            </div>
            <div className="col-md-3 col-xs-6">
              <Search
                placeholder="请输入文件名称"
                onSearch={value => console.log(value)}
                enterButton
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Table dataSource={dataSource} columns={columns} pagination={{
                position:'bottom',
                defaultCurrent:1,
                total:30              }}/>
            </div>
          </div>

      </div>
    )
  }
}

export default JianliInfo;
