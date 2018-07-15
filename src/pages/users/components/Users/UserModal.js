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

  componentDidMount() {
    this.props.getShopList()
  }

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, number, sex, shop, title, wx_number, info } = this.props.record;
    const { shoplist } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title={`编辑${name}`}
          visible={this.state.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem {...formItemLayout} label="工号">
              {getFieldDecorator('number', {
                initialValue: number,
              })(<Input disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="姓名">
              {getFieldDecorator('name', {
                initialValue: name,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="性别">
              {getFieldDecorator('gender', {
                initialValue: parseInt(sex, 10) === 1 ? '1' : '0',
                rules: [{ required: true, message: '请选择性别！' }],
              })(
                <Select
                  placeholder="请选择性别"
                >
                  <Option value="0">女</Option>
                  <Option value="1">男</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="所属门店">
              {getFieldDecorator('shop', {
                initialValue: shop,
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
