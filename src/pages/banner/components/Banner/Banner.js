import React from 'react';
import { connect } from 'dva';
import { Upload, Icon, message, Input, Form, Button } from 'antd';
import { API_LOCATION } from '../../../../constants'
import styles from './Banner.css';

const FormItem = Form.Item;

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  const isRightImg = isJPG || isPNG
  if (!isRightImg) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isRightImg && isLt2M;
}

class FormUpload extends React.Component {
  state = {
    loading: false,
    imageUrl: this.props.url
  };

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done' && info.file.response.code === 200) {
      const imageUrl = info.file.response.url
      this.setState({
        imageUrl,
        loading: false
      })
    } else {
      message.error('上传失败！')
      this.setState({
        loading: false
      })
    }
  }

  handleSubmit = () => {
    const { id, dispatch } = this.props
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.url = this.state.imageUrl;
        dispatch({
          type: 'banner/edit',
          payload: { id, values },
        })
      }
    });
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const imageUrl = this.state.imageUrl;
    return (
      <div className={styles.normal}>
        <Form>
          <FormItem
            {...formItemLayout}
            label={`图片${this.props.id}`}
          >
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={`${API_LOCATION}/api/upload`}
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
            >
              <img className={styles.imgPlace} src={imageUrl} alt="avatar" />
              {uploadButton}
            </Upload>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="链接地址"
          >
            {getFieldDecorator('link', {
              initialValue: this.props.link, 
              rules: [{ required: true, message: '请填写链接地址' }],
            })(<Input />)}
          </FormItem>
          <FormItem
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" onClick={this.handleSubmit} htmlType="submit">Submit</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const FormCom = Form.create()(FormUpload);

class Banner extends React.Component {
  render() {
    const { list, dispatch } = this.props;
    return (
      <div className={styles.normal}>
        {list.map(item => {
          return <FormCom key={item.id} id={item.id} link={item.set_url} url={item.url} dispatch={dispatch} />
        })}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { list, total, page } = state.banner;
  return {
    loading: state.loading.models.service,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Banner);
