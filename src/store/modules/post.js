import { defineStore } from "pinia";
import { getPostList, getTagsList, getPostDetail, getCategoriesList, getStatTagsList } from "@/store/api/post";

export const usePostStore = defineStore("post", {
    state: () => {
        return {
            total: 0,
            postList: [],
            // 文章
            currentPost: {},
            // 标签
            tags:[],
            tagsMap:{},
            // 分类
            categories:[],

            // 统计
            statTags: [],

        }
    },

    getters: {

    },
    actions: {
        async init() {
            await this.getTagsList()
            await this.getCategoriesList()
            await this.getStatTagsList()
        },
        
        async getTagsList() {
            const res = await getTagsList() 
            if (res.code !== 200) {
                $message.error(res.message)
                return
            }

            this.tags = res.data.tags
            this.tagsMap = this.tags.reduce((acc, tag) => {
                acc[tag.id] = tag
                return acc
            }, {})

        },
        async getPostList(page = 1, pageSize = 10, category = 0, tag = 0) {
            const res = await getPostList(page, pageSize, category, tag)
            if (res.code !== 200) {
                $message.error(res.message)
                return
            }

            this.postList = res.data.posts
            this.postList = this.postList.map(post => {
                return {
                    ...post,
                    tags: post.tags.map(tagId => this.tagsMap[tagId] || '其他')
                }
            })

            
            this.total = res.data.total
        },
        
        async getPostDetail(post_id) {
            const res = await getPostDetail(post_id)    
            if (res.code !== 200) {
                $message.error(res.message)
                return
            }

            this.currentPost = res.data
        },
        async getCategoriesList() {
            const res = await getCategoriesList()
            if (res.code !== 200) {
                $message.error(res.message)
                return
            }

            this.categories = res.data.categories
        },
        async getStatTagsList() {
            const res = await getStatTagsList()
            console.log("getStatTagsList", res)
            if (res.code !== 200) {
                $message.error(res.message)
                return
            }

            this.statTags = res.data.tagStat
        }
    }
})