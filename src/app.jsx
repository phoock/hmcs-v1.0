import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom'
import {TransitionGroup, CSSTransition} from "react-transition-group";

//通用组件
import Layout from 'component/layout/index.jsx';

// 推荐在入口文件全局设置 locale
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

//引入验证组件
import Authroute from 'component/authroute/index.jsx'


//引入页面组件
import Tem from 'page/tem/index.jsx';
import Login from 'page/login/index.jsx';
import Welcome from 'page/welcome/index.jsx';
import Project from 'page/project/index.jsx';
import ProjectPlaning from 'page/project-planing/index.jsx';
import ProjectDesign from 'page/project-design/index.jsx';
import ProjectAcceptance from 'page/project-acceptance/index.jsx';
import ProjectProcess from 'page/project-process/index.jsx';
import CommandAlarm from 'page/command-alarm/index.jsx';
import CommandWarning from 'page/command-warning/index.jsx';
import CommandContingency from 'page/command-contingency/index.jsx';
import CommandInfo from 'page/command-info/index.jsx';
import SewageOrganization from 'page/sewage-organization/index.jsx';
import SewageProject from 'page/sewage-project/index.jsx';
import SewageProjectOpera from 'page/sewage-project/sewage-project-opera/index.jsx';
import SewageProjectAddone from 'page/sewage-project/addone/index.jsx';
import SewageEvalute from 'page/sewage-evaluate/index.jsx';
import ServerInfo from 'page/server-info/index.jsx';
import ServerAlert from 'page/server-alert/index.jsx';
import ServerAlertForm from 'page/server-alert-form/index.jsx';
import ServerSuggestPublic from 'page/server-suggest-public/index.jsx';
import Chart from 'page/Chart/index.jsx';

class App extends React.Component {
    componentDidMount(){

    }
    render() {
        return (
          <Router>
            <div>
              <Authroute></Authroute>
                <Switch>
                  <Route path="/login" component={Login}></Route>
                  <Route path="/welcome" component={Welcome}></Route>
                  <Route path="/" render={({location}) => (
                    <Layout>
                          <Switch location={location}>
                            <Redirect exact from="/" to="/welcome"/>
                            <Route exact path="/project" component={Project}/>
                            <Redirect exact from="/project-planing" to="/project-planing/list"/>
                            <Route path="/project-planing" component={ProjectPlaning}/>
                            <Redirect exact from="/project-design" to="/project-design/list"/>
                            <Route path="/project-design" component={ProjectDesign}/>
                            <Redirect exact from="/project-acceptance" to="/project-acceptance/list"/>
                            <Route path="/project-acceptance" component={ProjectAcceptance}/>
                            <Redirect exact from="/project-process" to="/project-process/list"/>
                            <Route path="/project-process" component={ProjectProcess}/>
                            <Route exact path="/command-info" component={CommandInfo}/>
                            <Redirect exact from="/command-alarm" to="/command-alarm/map"/>
                            <Route path="/command-alarm" component={CommandAlarm}/>
                            <Route exact path="/command-warning" component={CommandWarning}/>
                            <Redirect exact from="/command-contingency" to="/command-contingency/staff"/>
                            <Route path="/command-contingency" component={CommandContingency}/>
                            <Route exact path="/sewage-organization" component={SewageOrganization}/>
                            <Route exact path="/sewage-project" component={SewageProject}/>
                            <Route exact path="/sewage-project/addone" component={SewageProjectAddone}/>
                            <Route exact path="/sewage-project/operation/:proId" component={SewageProjectOpera}/>
                            <Route exact path="/sewage-evaluate" component={SewageEvalute}/>
                            <Route exact path="/server-info" component={ServerInfo}/>
                            <Route exact path="/server-alert" component={ServerAlert}/>
                            <Route exact path="/server-alert-form" component={ServerAlertForm}/>
                            <Route exact path="/server-suggest-public" component={ServerSuggestPublic}/>
                            <Route exact path="/chart" component={Chart}/>
                          </Switch>

                    </Layout>)}>
                  </Route>
                </Switch>
              </div>
          </Router>
      )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
