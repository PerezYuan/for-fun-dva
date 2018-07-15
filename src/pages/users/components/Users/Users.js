import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Users.css';
import { PAGE_SIZE } from '../../../../constants';
import UserModal from './UserModal';

function Users(data) {
  const { dispatch, list: dataSource, loading, total, page: current, shoplist } = data
  function deleteHandler(id) {
    dispatch({
      type: 'users/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: '/users',
        query: { page },
      })
    );
  }

  function editHandler(id, values) {
    dispatch({
      type: 'users/patch',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'users/create',
      payload: values,
    });
  }

  function getShopList() {
    dispatch({
      type: 'shoplist/fetch'
    });
  }

  const columns = [
    {
      title: '工号',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: text => parseInt(text, 10) === 0 ? '女' : '男',
    },
    {
      title: '入职时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '所属门店',
      dataIndex: 'shop',
      key: 'shop',
    },
    {
      title: '岗位',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '微信号',
      dataIndex: 'wx_number',
      key: 'wx_number',
    },
    {
      title: '工作情况',
      dataIndex: 'info',
      key: 'info',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal
            record={record}
            onOk={editHandler.bind(null, record.id)}
            getShopList={getShopList}
            shoplist={shoplist}
          >
            <a>编辑</a>
          </UserModal>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={deleteHandler.bind(null, record.id)}
          >
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <UserModal
            record={{}}
            onOk={createHandler}
            getShopList={getShopList}
            shoplist={shoplist}
          >
            <Button type="primary">Create User</Button>
          </UserModal>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={record => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={PAGE_SIZE}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.users;
  const { shoplist } = state.shoplist
  return {
    loading: state.loading.models.users,
    list,
    shoplist,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Users);
