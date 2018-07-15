import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './Service.css';
import ServiceModal from './ServiceModal';

function Service(data) {
  const { dispatch, list: dataSource, loading, total, page: current, shoplist } = data
  function deleteHandler(id) {
    dispatch({
      type: 'service/remove',
      payload: id,
    });
  }

  function pageChangeHandler(page) {
    dispatch(
      routerRedux.push({
        pathname: '/service',
        query: { page },
      })
    );
  }

  function editHandler(id, values) {
    dispatch({
      type: 'service/edit',
      payload: { id, values },
    });
  }

  function createHandler(values) {
    dispatch({
      type: 'service/create',
      payload: values,
    });
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '项目名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: '项目描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '定价',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '保底计价',
      dataIndex: 'base_price',
      key: 'base_price',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <ServiceModal
            record={record}
            onOk={editHandler.bind(null, record.id)}
            shoplist={shoplist}
          >
            <a>编辑</a>
          </ServiceModal>
          <Popconfirm
            title="确定删除此项目？"
            onConfirm={deleteHandler.bind(null, record.id)}
          >
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  dataSource.map((item, index) => item.index = index + 1)
  return (
    <div className={styles.normal}>
      <div>
        <div className={styles.create}>
          <ServiceModal
            record={{}}
            onOk={createHandler}
            shoplist={shoplist}
          >
            <Button type="primary">新增项目</Button>
          </ServiceModal>
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
          pageSize={10}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { list, total, page } = state.service;
  return {
    loading: state.loading.models.service,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Service);
