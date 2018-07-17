import React, { Component } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const FormItem = Form.Item;

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
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  resetHandler = () => {
    this.props.form.resetFields()
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { index, name, description, price, base_price } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const isEdit = this.props.record.id ? true : false;

    return (
      <span>
        <span onClick={this.showModelHandler}>{children}</span>
        <Modal
          title={isEdit ? `编辑${name}` : '创建'}
          visible={this.state.visible}
          onCancel={this.hideModelHandler}
          footer={[
            <Button onClick={this.okHandler}>确定</Button>,
            <Button onClick={this.resetHandler}>重置</Button>,
            <Button onClick={this.hideModelHandler}>取消</Button>
          ]}
        >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            {isEdit ? <FormItem {...formItemLayout} label="序号">
              {getFieldDecorator('index', {
                initialValue: index,
              })(<Input disabled />)}
            </FormItem> : null}
            <FormItem {...formItemLayout} label="项目名">
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [{ required: true, message: '请填写项目名' }],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="项目描述">
              {getFieldDecorator('description', {
                initialValue: description,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="定价">
              {getFieldDecorator('price', {
                initialValue: price,
                rules: [{ required: true, message: '请填写定价' }],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="保底计价">
              {getFieldDecorator('base_price', {
                initialValue: base_price,
                rules: [{ required: true, message: '请填写保底计价' }],
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(UserEditModal);
