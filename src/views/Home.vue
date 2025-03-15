<!-- 首页 -->
<template>
  <div class="home">
    <Banner v-if="showHeader" :height="webSiteStore.bannerType" />
    <div class="home-content">
      <div class="posts-content">
        <!-- 分类总览 -->
        <TypeBar :type="showTags ? 'tags' : 'categories'" />
        <!-- 文章列表 -->
        <PostList :listData="postData" />
        <!-- 分页 -->
        <Pagination
            :total="allListTotal"
            :page="Number(currPage)"
            :limit="postSize"
            :useParams="!!(showCategories || showTags)"
            @pageChange="handlePageChange"
        />
      </div>
      <!-- 侧边栏 -->
      <Aside />
    </div>
  </div>
</template>

<script setup>
import { useWebSiteStore } from "@/store";
import PostList from "../components/List/PostList.vue";
import Pagination from "../components/Pagination.vue";
import TypeBar from "../components/List/TypeBar.vue";
import Banner from "../components/Banner.vue";
import Aside from "@/components/Aside/index.vue"
import {themeConfig} from "@/assets/themeConfig.mjs";
import {computed, nextTick, ref, watch} from "vue";

const theme = ref(themeConfig)
const postList = ref([])
const webSiteStore = useWebSiteStore();
const props = defineProps({
  // 显示首页头部
  showHeader: {
    type: Boolean,
    default: false,
  },
  // 当前页数
  // page: {
  //   type: Number,
  //   default: 1,
  // },
  // 显示分类
  showCategories: {
    type: [null, String],
    default: null,
  },
  // 显示标签
  showTags: {
    type: [null, String],
    default: null,
  },
});

// 每页文章数
const postSize = theme.value.postSize;
const currPage = ref(1)

// 列表总数量
const allListTotal = computed(() => {
  // const data = props.showCategories
  //     ? theme.value.categoriesData[props.showCategories]?.articles
  //     : props.showTags
  //         ? theme.value.tagsData[props.showTags]?.articles
  //         : theme.value.postData;
  // // 返回数量
  // return data ? data.length : 0;
  return 100
});

// 获得当前页数
const getCurrentPage = () => {
  // if (props.showCategories || props.showTags) {
  //   if (typeof window === "undefined") return 0;
  //   const params = new URLSearchParams(window.location.search);
  //   const page = params.get("page");
  //   if (!page) return 0;
  //   const currentPage = Number(page);
  //   return currentPage ? currentPage - 1 : 0;
  // }
  // return props.page ? props.page - 1 : 0;
  return 1
};

// 获取文章列表数据
const getPostList = async (page = 1) => {
  // try {
  //   const params = {
  //     page,
  //     pageSize: postSize,
  //     categoryId: props.showCategories || undefined,
  //     tagId: props.showTags || undefined
  //   };
  //   const response = await axios.get('/api/posts', { params });
  //   postList.value = response.data.list;
  //   allListTotal.value = response.data.total;
  // } catch (error) {
  //   console.error('获取文章列表失败:', error);
  // }
  console.log("获取文章列表", page);
};

// 监听页码变化
const handlePageChange = (page) => {
  getPostList(page);

  currPage.value = page
};

// 初始化获取数据
getPostList(props.page);

// 文章列表数据
const postData = computed(() => {
  // const page = getCurrentPage();
  // console.log("当前页数：", page);
  // let data = null;
  // // 分类数据
  // if (props.showCategories) {
  //   data = theme.value.categoriesData[props.showCategories]?.articles;
  // }
  // // 标签数据
  // else if (props.showTags) {
  //   data = theme.value.tagsData[props.showTags]?.articles;
  // }
  // // 文章数据
  // else {
  //   data = theme.value.postData.posts;
  // }
  //
  // // 返回列表
  // return data ? data.slice(page * postSize, page * postSize + postSize) : [];
  return [{
    id: 1,
    title: "标题",
    cover: "",
    tags: [1, 2,3],
    description: "123",
    createdAt: "asdasd",
    updatedAt:"adasdasd ",
    categoryId: 1
  },{
    id: 1,
    title: "标题",
    cover: "",
    tags: [1, 2,3],
    description: "123",
    createdAt: "asdasd",
    updatedAt:"adasdasd ",
    categoryId: 1
  },{
    id: 1,
    title: "标题",
    cover: "",
    tags: [1, 2,3],
    description: "123",
    createdAt: "asdasd",
    updatedAt:"adasdasd ",
    categoryId: 1
  },{
    id: 1,
    title: "标题",
    cover: "",
    tags: [1, 2,3],
    description: "123",
    createdAt: "asdasd",
    updatedAt:"adasdasd ",
    categoryId: 1
  },{
    id: 1,
    title: "标题",
    cover: "",
    tags: [1, 2,3],
    description: "123",
    createdAt: "asdasd",
    updatedAt:"adasdasd ",
    categoryId: 1
  },{
    id: 1,
    title: "标题",
    cover: "",
    tags: [1, 2,3],
    description: "123",
    createdAt: "asdasd",
    updatedAt:"adasdasd ",
    categoryId: 1
  },{
    id: 1,
    title: "标题",
    cover: "",
    tags: [1, 2,3],
    description: "123",
    createdAt: "asdasd",
    updatedAt:"adasdasd ",
    categoryId: 1
  },{
    id: 1,
    title: "标题",
    cover: "",
    tags: [1, 2,3],
    description: "123",
    createdAt: "asdasd",
    updatedAt:"adasdasd ",
    categoryId: 1
  },{
    id: 1,
    title: "标题",
    cover: "",
    tags: [1, 2,3],
    description: "123",
    createdAt: "asdasd",
    updatedAt:"adasdasd ",
    categoryId: 1
  },{
    id: 1,
    title: "标题",
    cover: "",
    tags: [1, 2,3],
    description: "123",
    createdAt: "asdasd",
    updatedAt:"adasdasd ",
    categoryId: 1
  }]
});



// 恢复滚动位置
const restoreScrollY = (val) => {
  if (typeof window === "undefined" || val) return false;
  const scrollY = webSiteStore.lastScrollY;
  nextTick().then(() => {
    console.log("滚动位置：", scrollY);
    // 平滑滚动
    window.scrollTo({
      top: scrollY,
      behavior: "smooth",
    });
    // 清除滚动位置
    webSiteStore.lastScrollY = 0;
  });
};

// 监听加载结束
watch(
    () => webSiteStore.loadingStatus,
    (val) => restoreScrollY(val),
);
</script>

<style lang="scss" scoped>
.home {
  .home-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    .posts-content {
      width: calc(100% - 300px);
      transition: width 0.3s;
    }
    .main-aside {
      width: 300px;
      padding-left: 1rem;
    }
    @media (max-width: 1200px) {
      .posts-content {
        width: 100%;
      }
      .main-aside {
        display: none;
      }
    }
  }
}
</style>
