import React from 'react'
import './index.scss'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
import { Link} from 'react-router-dom'



class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={
      go:false
    }
  }
  handleInSys(e){
    this.setState({
      go:true
    })
    setTimeout(()=>{
      this.props.history.push('/')
    }, 400)
  }
  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div id="welcome">
        <div className={`login-wrap`}>
          <div className={`bg-wrap ${this.state.go?'fade-out':''}`}>
            <div className="black-filter">
              <div className="content-wrap">
                <div>
                  <div className="login-form">
                    <FormItem>
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '用户名不能为空' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: '密码不能为空' }],
                      })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
                      )}
                    </FormItem>



                    <Button type="primary" onClick={(e)=>{this.handleSubmit(e)}} className="login-form-button">
                      登录
                    </Button>
                    <a className="login-form-forgot" href="" style={{marginTop:16}}>忘记密码</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const WrappedLogin = Form.create()(Login);
export default WrappedLogin;
