import React from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import {Card, Button, Input, Table} from 'antd';
const Search = Input.Search;

//导入组件
const dataSource = [
    {
        key: '1',
        proNum: '20172020',
        proName: '中心家园项目',
        proType: '出让类项目',
        createTime: '2018-05-01',
        process: '建设单位A',
        check: '勘察单位A',
        design: '设计单位A',
        process: '施工单位A',
        jianli: '监理单位A',
        duration: '14个月',
        totalCount: '1500',
        status: '未动工'
    },
    {
        key: '2',
        proNum: '201720230',
        proName: '河道排水改造',
        proType: '出让类项目',
        createTime: '2018-05-04',
        process: '建设单位A',
        check: '勘察单位A',
        design: '设计单位A',
        process: '施工单位A',
        jianli: '监理单位A',
        duration: '12个月',
        totalCount: '500',
        status: '未动工'
    },
    {
        key: '3',
        proNum: '20272020',
        proName: '武汉广场项目',
        proType: '出让类项目',
        createTime: '2015-11-01',
        process: '建设单位A',
        check: '勘察单位A',
        design: '设计单位A',
        process: '施工单位A',
        jianli: '监理单位A',
        duration: '18个月',
        totalCount: '2500',
        status: '施工中'
    },
    {
        key: '4',
        proNum: '201720205',
        proName: '街道口项目',
        proType: '出让类项目',
        createTime: '2018-05-05',
        process: '建设单位A',
        check: '勘察单位A',
        design: '设计单位A',
        process: '施工单位A',
        jianli: '监理单位A',
        duration: '18个月',
        totalCount: '2500',
        status: '未动工'
    },
    {
        key: '5',
        proNum: '201720206',
        proName: '汉口项目',
        proType: '出让类项目',
        createTime: '2018-05-01',
        process: '建设单位A',
        check: '勘察单位A',
        design: '设计单位A',
        process: '施工单位A',
        jianli: '监理单位A',
        duration: '18个月',
        totalCount: '3500',
        status: '已竣工'
    },
];

const columns = [
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
    }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime'
    }, {
        title: '建设单位',
        dataIndex: 'process',
        key: 'process'
    }, {
        title: '勘察单位',
        dataIndex: 'check',
        key: 'check'
    }, {
        title: '设计单位',
        dataIndex: 'design',
        key: 'design'
    }, {
        title: '监理单位',
        dataIndex: 'jianli',
        key: 'jianli'
    }, {
        title: '工期',
        dataIndex: 'duration',
        key: 'duration'
    }, {
        title: '总投资(万)',
        dataIndex: 'totalCount',
        key: 'totalCount'
    }, {
        title: '施工状态',
        dataIndex: 'status',
        key: 'status'
    }, {
        title: '详情',
        render: (item) => {
            return (<span>
                <Link to={`/project-process/operation/${item.proNum}`}>查看</Link>
            </span>)
        }
    }
];
class ProjectProcess extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (<div id="page-wrapper">
            <PageTitle title="施工管理"></PageTitle>
            <div className="row">
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
                        <Table dataSource={dataSource} columns={columns} pagination={{
                          position:'bottom',
                          defaultCurrent:1,
                          total:30
                        }}/>
                    </Card>
                </div>
            </div>
        </div>)
    }
}

export default ProjectProcess;
