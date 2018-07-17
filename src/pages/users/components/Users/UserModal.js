import React, { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class UserEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.props.form.resetFields()
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      console.log(this.props.form.getFieldsValue())
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, number, sex, shop, title, phone_number, wx_number, info } = this.props.record;
    const { shoplist, titlelist } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title={name ? `编辑${name}` : '创建'}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            {name ? <FormItem {...formItemLayout} label="工号">
              {getFieldDecorator('number', {
                initialValue: number,
              })(<Input disabled />)}
            </FormItem> : null}
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [{ required: true, message: '请输入姓名' }],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="性别">
              {getFieldDecorator('sex', {
                initialValue: parseInt(sex, 10) === 1 ? '1' : '0',
                rules: [{ required: true, message: '请选择性别' }],
              })(
                <Select
                  placeholder="请选择性别"
                >
                  <Option value="1">男</Option>
                  <Option value="0">女</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="所属门店">
              {getFieldDecorator('shop', {
                initialValue: shop,
                rules: [{ required: true, message: '请选择门店' }],
              })(
                <Select
                  placeholder="请选择门店"
                >
                  {shoplist.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="岗位">
              {getFieldDecorator('title', {
                initialValue: title,
                rules: [{ required: true, message: '请选择岗位' }],
              })(
                <Select
                  placeholder="请选择岗位"
                >
                  {titlelist.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="手机号码">
              {getFieldDecorator('phone_number', {
                initialValue: phone_number,
                rules: [{ required: true, message: '请输入手机号码' }, { pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/, message: '手机号码格式不正确'}],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="微信号">
              {getFieldDecorator('wx_number', {
                initialValue: wx_number,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="工作情况">
              {getFieldDecorator('info', {
                initialValue: info,
              })(<Input.TextArea />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserEditModal);
