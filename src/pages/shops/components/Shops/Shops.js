import React from 'react';
import { connect } from 'dva';
import { Button, Tabs, Modal } from 'antd';
import ShopForm from './ShopForm'

const TabPane = Tabs.TabPane

class Shops extends React.Component {
  callback = (key) => {
    const { dispatch } = this.props
    // dispatch({
    //   type: 'shops/get',
    //   payload: parseInt(key, 10),
    // });
  }

  add() {
    const { dispatch } = this.props
    Modal.confirm({
      title: '请确认',
      content: '确认新增门店？',
      onOk() {
        dispatch({
          type: 'shops/create'
        })
      },
      onCancel() {
        
      },
    });
  }

  render() {
    let { list, serviceList, dispatch } = this.props
    if (!list) { list = [] } 
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button onClick={this.add.bind(this)}>新增门店</Button>
        </div>
        <Tabs onChange={this.callback} type="card">
          {list.map(item => <TabPane tab={item.name} key={item.id}>
            <ShopForm
              id={item.id}
              info={item.info || {}}
              serviceList={serviceList}
              dispatch={dispatch}
            />
          </TabPane>)}
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list } = state.shops;
  const serviceList = state.service.list;
  return {
    loading: state.loading.models.shops,
    list,
    serviceList
  };
}

export default connect(mapStateToProps)(Shops)
