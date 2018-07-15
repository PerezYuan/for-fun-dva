import React from 'react';
import { connect } from 'dva';
import { Button, Tabs } from 'antd';
import ShopForm from './ShopForm'

const TabPane = Tabs.TabPane

class Shops extends React.Component {
  constructor(props) {
    super(props);
    this.newTabIndex = 0;
    const panes = [
      { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
    };
  }

  callback = (key) => {
    console.log(key)
  }

  render() {
    let { list } = this.props
    if (!list) { list = [] } 
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button onClick={this.add}>ADD</Button>
        </div>
        <Tabs onChange={this.callback} type="card">
          {list.map(item => <TabPane tab={item.name} key={item.id}>
            <ShopForm
              id={item.id}
              info={item.info || {}}
              dispatch={this.props.dispatch}
            />
          </TabPane>)}
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list } = state.shops;
  return {
    loading: state.loading.models.shops,
    list
  };
}

export default connect(mapStateToProps)(Shops)
