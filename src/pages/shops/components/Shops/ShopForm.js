import React from 'react';
import {
  Form, Select, InputNumber, Switch, Input,
  Button
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const { TextArea } = Input

class FormList extends React.Component {
  componentDidMount() {
    const { dispatch, id } = this.props
    dispatch({
      type: 'shops/get',
      payload: id,
    });
  }

  handleSubmit = (e) => {
    const { dispatch, id } = this.props
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'shops/update',
          payload: {
            id,
            values
          }
        });
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      is_open,
      name,
      location,
      longitude,
      latitude,
      description,
      service,
      set_number
    } = this.props.info
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="是否经营"
        >
          {getFieldDecorator('is_open', {
            initialValue: parseInt(is_open, 10) === 1,
            valuePropName: 'checked'
          })(
            <Switch />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="门店名称"
        >
          {getFieldDecorator('name', {
            initialValue: name, 
            rules: [{ required: true, message: '请填写门店名称' }],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="门店位置"
        >
          {getFieldDecorator('location', {
            initialValue: location
          })(<TextArea autosize={{ minRows: 5, maxRows: 10 }} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="经度"
        >
          {getFieldDecorator('longitude', {
            initialValue: longitude,
            rules: [{ required: true, message: '请填写经度信息' }],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="纬度"
        >
          {getFieldDecorator('latitude', {
            initialValue: latitude,
            rules: [{ required: true, message: '请填写纬度信息' }],
          })(<Input />)}
          <span className="ant-form-text">请根据腾讯地图具体值填写</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="门店信息"
        >
          {getFieldDecorator('description', {
            initialValue: description
          })(<TextArea autosize={{ minRows: 5, maxRows: 10 }} />)}
        </FormItem>
      
        <FormItem
          {...formItemLayout}
          label="可用工位"
        >
          {getFieldDecorator('set_number', { initialValue: set_number })(
            <InputNumber min={1} max={10} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="服务项目"
        >
          {getFieldDecorator('service', {
            initialValue: service ? service.split(',') : [],
            rules: [
              { required: true, message: '请选择服务项目', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="请选择服务项目">
              {this.props.serviceList.map(item => <Option key={item.id} value={`${item.id}`}>{item.name}</Option>)}
            </Select>
          )}
        </FormItem>

        
        {/* <FormItem
          {...formItemLayout}
          label="Upload"
          extra="longgggggggggggggggggggggggggggggggggg"
        >
          {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Dragger"
        >
          <div className="dropbox">
            {getFieldDecorator('dragger', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single or bulk upload.</p>
              </Upload.Dragger>
            )}
          </div>
        </FormItem> */}

        <FormItem
          wrapperCol={{ span: 12, offset: 6 }}
        >
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
    );
  }
}

const ShopForm = Form.create(
  // {
  //   mapPropsToFields: (props) => {
  //     const { info } = props
  //     return {
  //       is_open: Form.createFormField({
  //         value: parseInt(info.is_open, 10) === 1
  //       }),
  //       name: Form.createFormField({
  //         value: info.name
  //       }),
  //       location: Form.createFormField({
  //         value: info.location
  //       }),
  //     };
  //   },
  //   onValuesChange: (props, change) => {
  //     console.log(props, change)
  //   }
  // }
)(FormList);

export default ShopForm
