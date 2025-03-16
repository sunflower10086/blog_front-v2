<template>
  <!-- 背景图片 -->
  <!-- <Background /> -->
  <!-- 加载提示 -->
  <!-- <Loading /> -->
  <!-- 中控台 -->
  <!-- <Control /> -->
  <!-- 导航栏 -->
  <!-- <Nav /> -->

  <main :class="['mian-layout', { loading: loadingStatus, 'is-post': isPostPage }]">
    <Home v-if="route.path === '/'" showHeader />
    <!-- 页面 -->
    <template v-else>
      <!-- 文章页面 -->
      <Post v-if="isPostPage" />
      <!-- 普通页面 --> 
      <Page v-else-if="route.path !== '/404'" />
    </template>
  </main>
  
</template>

<script setup>
import Background from '@/components/Background.vue';
import Loading from '@/components/Loading.vue';
import Control from "@/components/Control.vue";
import Nav from '@/components/Nav.vue'
import {useRoute} from "vue-router";
import {useWebSiteStore} from "@/store/index.js";
import {storeToRefs} from "pinia";
import {themeConfig} from "@/assets/themeConfig.mjs";
import {computed, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {calculateScroll, specialDayGray} from "@/utils/helper.mjs";
import Home from "@/views/Home.vue";
import Post from "@/views/Post.vue";
import FooterLink from  '@/components/FooterLink.vue'
import Footer from '@/components/Footer.vue';
import Page from "@/views/Page.vue";
import Settings from "@/components/Settings.vue";

const route = useRoute();
const webSiteStore = useWebSiteStore();
// const { frontmatter, page, theme } = useData();
const theme = themeConfig
const { loadingStatus, footerIsShow, themeValue, themeType, backgroundType, fontFamily, fontSize } =
    storeToRefs(webSiteStore);

// 右键菜单
const rightMenuRef = ref(null);

// 判断是否为文章页面
const isPostPage = computed(() => {
  const routePath = decodeURIComponent(route.path);
  console.log("isPostPage 当前路径：", routePath);
  return routePath.startsWith("/article/");
});

// 判断是否为主页
const isHomePage = computed(() => {
  const routePath = decodeURIComponent(route.path);
  return routePath === "/";
});


// 开启右键菜单
const openRightMenu = (e) => {
  rightMenuRef.value?.openRightMenu(e);
};

// 复制时触发
const copyTip = () => {
  const copiedText = window.getSelection().toString();
  // 检查文本内容是否不为空
  if (copiedText.trim().length > 0 && typeof $message !== "undefined") {
    $message.success("复制成功，在转载时请标注本文地址");
  }
};

// 更改正确主题类别
const changeSiteThemeType = () => {
  // 主题 class
  const themeClasses = {
    dark: "dark",
    light: "light",
    auto: "auto",
  };
  // 必要数据
  const htmlElement = document.documentElement;
  console.log("当前模式：", themeType.value);
  // 清除所有 class
  Object.values(themeClasses).forEach((themeClass) => {
    htmlElement.classList.remove(themeClass);
  });
  // 添加新的 class
  if (themeType.value === "auto") {
    // 根据当前操作系统颜色方案更改明暗主题
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const autoThemeClass = systemPrefersDark ? themeClasses.dark : themeClasses.light;
    htmlElement.classList.add(autoThemeClass);
    themeValue.value = autoThemeClass;
  } else if (themeClasses[themeType.value]) {
    htmlElement.classList.add(themeClasses[themeType.value]);
    themeValue.value = themeClasses[themeType.value];
  }
  if (backgroundType.value === "image") {
    htmlElement.classList.add("image");
  } else {
    htmlElement.classList.remove("image");
  }
};

// 切换系统字体样式
const changeSiteFont = () => {
  try {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("lxgw", "hmos");
    htmlElement.classList.add(fontFamily.value);
    htmlElement.style.fontSize = fontSize.value + "px";
  } catch (error) {
    console.error("切换系统字体样式失败", error);
  }
};

// 监听设置变化
watch(
    () => [themeType.value, backgroundType.value],
    () => changeSiteThemeType(),
);
watch(
    () => fontFamily.value,
    () => changeSiteFont(),
);

onMounted(() => {
  // console.log(frontmatter.value, page.value, theme.value);
  // 全站置灰
  specialDayGray();
  // 更改主题类别
  changeSiteThemeType();
  // 切换系统字体样式
  changeSiteFont();
  // 滚动监听
  window.addEventListener("scroll", calculateScroll);
  // 右键监听
  // window.addEventListener("contextmenu", openRightMenu);
  // 复制监听
  window.addEventListener("copy", copyTip);
  // 监听系统颜色
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", changeSiteThemeType);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", calculateScroll);
  // window.removeEventListener("contextmenu", openRightMenu);
});
</script>


<style lang="scss" scoped>
.mian-layout {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  // 手动实现加载动画
  animation: show 0.5s forwards;
  animation-duration: 0.5s;
  display: block;
  &.loading {
    display: none;
  }
  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    &.is-post {
      padding: 0;
    }
  }
}
.left-menu {
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 1002;
  transition:
      opacity 0.3s,
      transform 0.3s;
  &.hidden {
    opacity: 0;
    transform: translateY(100px);
  }
}
</style>