import { createRequest } from "..";

interface ResultType {
  respCode: string | number
  respMsg: string
  data: object
}

/** 适配接口返回结果 */
function adapter(response: ResultType) {
  if (response.respCode === '200')
    return response.data

  throw new Error()
}

/** post接口适配接口返回结果 */
function postAdapter(response: ResultType) {
  if (response.respCode === '200')
    return response

  throw new Error()
}

/** 根据父ID查询其所有子菜单，根目录传入pId=-1 */
export function queryCategoryList(params: { pId: string }) {
  return createRequest.request({
    url: `/meta/category/query`,
    method: "GET",
    params
  }).then(res => adapter(res))
}

/** 根据ID查询表的属性信息 */
export function queryTablePropertyInfo(params: { tableId: string }) {
  return createRequest.request({
    url: `/meta/column/query/id`,
    method: "GET",
    params
  }).then(res => adapter(res))
}


/** 根据ID查询表的详情信息 */
export function getTableDetail(params: { tableId: string }) {
  return createRequest.request({
    url: `/meta/table/query/id`,
    method: "GET",
    params
  }).then(res => adapter(res))
}

/** 分页查询所有表摘要信息,condition传入catalogId 
 * 
 *  "condition": "-1", // 4e2646e53681157c8871f30e75d3ca77
    "pageNum": 1,
    "pageSize": 10
  */
export function getPageTableAbstract(data: any) {
  return createRequest.request({
    url: `/meta/table/query/page`,
    method: "POST",
    data
  }).then(res => postAdapter(res))
}

/** 分页查询表数据，需要要传入需要展示的字段集合 
 * 
 * {
    "columns": ["alarm_id","alarm_degree","description"],
    "pageNum": 1,
    "pageSize": 10,
    "tableId": "123"
    } 
 */
export function queryTablePageDataList(data?: any) {
  return createRequest.request({
    url: `/meta/meta/data/page/query`,
    method: "POST",
    data
  }).then(res => postAdapter(res))
}
