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
