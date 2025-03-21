<!-- 首页 -->
<template>
  <div class="home">
    <Banner v-if="showHeader" :height="webSiteStore.bannerType" />
    <div class="home-content">
      <div class="posts-content">
        <!-- 分类总览 -->
        <TypeBar :type="showTags ? 'tags' : 'categories'" 
                @categoryChange="handleCategoryChange" 
                @tagChange="handleTagChange" />
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
import { useWebSiteStore, usePostStore } from "@/store";
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
const postStore = usePostStore();

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
const currentCategory = ref(0);
const currentTag = ref(0);

// 列表总数量
const allListTotal = computed(() => {
  return postStore.total
});

// 获取文章列表数据
const getPostList = async (page = 1, pageSize = 10) => {
  await postStore.getPostList(page, pageSize, currentCategory.value, currentTag.value)
  console.log("获取文章列表", page, "分类:", currentCategory.value, "标签:", currentTag.value);
};

// 监听页码变化
const handlePageChange = (page) => {
  getPostList(page);
  currPage.value = page
};

// 处理分类点击事件
const handleCategoryChange = (categoryId) => {
  console.log("切换分类:", categoryId);
  // 处理特殊情况：全部分类
  if (categoryId === 'all') {
    currentCategory.value = 0;
  } else {
    currentCategory.value = categoryId === 0 ? 0 : categoryId; // 空字符串表示首页，使用默认分类0
  }
  currentTag.value = 0; // 清空标签筛选
  currPage.value = 1; // 重置页码
  getPostList(1); // 获取第一页数据
};

// 处理标签点击事件
const handleTagChange = (tagId) => {
  console.log("切换标签:", tagId);
  // 处理特殊情况：全部标签
  if (tagId === 'all') {
    currentTag.value = 0;
  } else {
    currentTag.value = tagId === 0 ? 0 : tagId; // 空字符串表示首页
  }
  currentCategory.value = 0; // 清空分类筛选
  currPage.value = 1; // 重置页码
  getPostList(1); // 获取第一页数据
};

// 初始化获取数据
getPostList(props.page);

// 文章列表数据
const postData = computed(() => {
  return postStore.postList
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
