import React from 'react'
import './index.scss'
import PageTitle from 'component/page-title/index.jsx'
import {Button, Card, List, Avatar} from 'antd';

const data = [
  {
    author: '王老虎 2018/1/15',
    content:'发起了一个新项目'
  },
  {
    author: '王小猫 2018/1/15',
    content:'发起了一个新项目发起了一个新项目'
  },
  {
    author: '张大王 2018/1/15',
    content:'发起了一个新项目发起了一个新项目发起了一个新项目发起了一个新项目'
  },
  {
    author: '唐老鸭 2018/1/25',
    content:'维护了一个老项目维护了一个老项目维护了一个老项目维护了一个老项目维护了一个老项目维护了一个老项目维护了一个老项目'
  },
  {
    author: '唐老鸭 2018/1/25',
    content:'维护了一个老项目维护了一个老项目'
  }
];

class Project extends React.Component {

    render() {
        return (<div id="page-wrapper">
            <PageTitle title="项目总览">

            </PageTitle>
            <div className="row project-wrap">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <div className="panel panel-primary text-center no-boder bg-color-green green">
                                <div className="panel-left pull-left green">
                                    <i className="fa fa-bar-chart-o fa-5x"></i>

                                </div>
                                <div className="panel-right pull-right">
                                    <h3>120</h3>
                                    <strong>
                                        规划类项目</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <div className="panel panel-primary text-center no-boder bg-color-blue blue">
                                <div className="panel-left pull-left blue">
                                    <i className="fa fa-shopping-cart fa-5x"></i>
                                </div>

                                <div className="panel-right pull-right">
                                    <h3>160
                                    </h3>
                                    <strong>
                                        待处理项目数</strong>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <div className="panel panel-primary text-center no-boder bg-color-brown brown">
                                <div className="panel-left pull-left brown">
                                    <i className="fa fa fa-comments fa-5x"></i>

                                </div>
                                <div className="panel-right pull-right">
                                    <h3>15,823
                                    </h3>
                                    <strong>
                                        让出类项目数
                                    </strong>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-xs-12">
                        <Card title="规划管理控制新消息" extra={<i className="fa fa-angle-down"></i>} bordered={true} style={{background:'#fff'}} >
                          <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<i className="fa fa-user"></i>}
                                  title={<span>{item.author}</span>}
                                  description={item.content}
                                />
                              </List.Item>
                            )}
                          />
                        </Card>
                      </div>
                      <div className="col-md-6 col-xs-12">
                        <Card title="规划管理控制新消息" extra={<i className="fa fa-angle-down"></i>} bordered={true} style={{background:'#fff'}} >
                          <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  avatar={<i className="fa fa-user"></i>}
                                  title={<span>{item.author}</span>}
                                  description={item.content}
                                />
                              </List.Item>
                            )}
                          />
                        </Card>
                      </div>

                    </div>
                </div>
            </div>
        </div>)
    }
}

export default Project;
