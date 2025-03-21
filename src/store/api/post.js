import request from "./index";

// 获取文章列表
export function getPostList(page = 1, page_size = 10, category = 0, tag = 0) {
  return request({
    url: '/v1/posts',
    method: 'get',
    params: { page, page_size, category, tag }
  })
}

// 获取文章详情
export function getPostDetail(post_id) {
  return request({
    url: `/v1/post/${post_id}`,
    method: 'get'
  })
}

// 创建文章
export function createPost(data) {
  return request({
    url: '/posts',
    method: 'post',
    data
  })
}

export async function getTagsList() {
  return request({
    url: '/v1/tags',
    method: 'get'
  })
}

export async function getCategoriesList() {
  return request({
    url: '/v1/categories',
    method: 'get'
  })
}

export async function getStatTagsList() {
  return request({
    url: '/v1/tags/stat',
    method: 'get'
  })
}
