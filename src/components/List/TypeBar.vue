<!-- 分类导航条 -->
<template>
    <div v-if="type === 'categories'" class="type-bar s-card hover">
        <div class="all-type">
        <a
            v-if="currentTypeName && selectedCategory"
            @click.prevent="handleCategoryClick(selectedCategory)"
            class="type-item choose"
        >
            {{ currentTypeName }}
        </a>
        <a @click.prevent="handleCategoryClick('')" :class="['type-item', { choose: !selectedCategory }]">首页</a>
        <a
            v-for="(item, index) in categoriesData"
            :key="index"
            @click.prevent="handleCategoryClick(item.id)"
            :class="['type-item', { hidden: selectedCategory === item.id }]"
        >
            {{ item.name }}
        </a>
        </div>
        <a @click.prevent="handleCategoryClick('all')" class="more-type">
        <i class="iconfont icon-arrow-right" />
        更多
        </a>
    </div>
    <div v-else-if="type === 'tags'" class="type-bar s-card hover">
        <div class="all-type">
        <a 
            v-if="currentTagName && selectedTag"
            @click.prevent="handleTagClick(selectedTag)"
            class="type-item choose"
        >
            {{ currentTagName }}
            <span class="num">{{ getTagCount(selectedTag) }}</span>
        </a>
        <a @click.prevent="handleTagClick('')" :class="['type-item', { choose: !selectedTag }]">首页</a>
        <a
            v-for="(tag, index) in tagsData"
            :key="index"
            @click.prevent="handleTagClick(tag.id)"
            :class="['type-item', { hidden: selectedTag === tag.id }]"
        >
            {{ tag.name }}
            <span class="num">{{ tag.count || 0 }}</span>
        </a>
        </div>
        <a @click.prevent="handleTagClick('all')" class="more-type">
        <i class="iconfont icon-arrow-right" />
        更多
        </a>
    </div>
</template>
  
<script setup>
import { useWebSiteStore, usePostStore } from "@/store";
import { ref, computed, onMounted } from "vue";

const webSiteStore = useWebSiteStore();
const postStore = usePostStore();

const theme = webSiteStore.theme;

const props = defineProps({
    // 显示类别
    type: {
        type: String,
        default: "categories",
    },
});

const emit = defineEmits(['categoryChange', 'tagChange']);

// 存储当前选中的分类和标签
const selectedCategory = ref('');
const selectedTag = ref('');

const handleCategoryClick = (categoryId) => {
    selectedCategory.value = categoryId;
    emit('categoryChange', categoryId);
}

const handleTagClick = (tagId) => {
    selectedTag.value = tagId;
    emit('tagChange', tagId);
}

const categoriesData = computed(() => {
    return postStore.categories;
});

const tagsData = computed(() => {
    return postStore.Tags;
});

// 获取标签计数
const getTagCount = (tagId) => {
    const tag = postStore.Tags.find(t => t.id === tagId);
    return tag ? tag.count || 0 : 0;
}

// 获取当前路由路径
const currentTypeName = computed(() => {
    // 如果有选中的分类，则显示对应的分类名称
    if (selectedCategory.value) {
        if (selectedCategory.value === 'all') {
            return '全部分类';
        }
        
        const category = postStore.categories.find(c => c.id === selectedCategory.value);
        return category ? category.name : '';
    }
    
    return "";
});

// 获取当前标签名称
const currentTagName = computed(() => {
    // 如果有选中的标签，则显示对应的标签名称
    if (selectedTag.value) {
        if (selectedTag.value === 'all') {
            return '全部标签';
        }
        
        const tag = postStore.Tags.find(t => t.id === selectedTag.value);
        return tag ? tag.name : '';
    }
    
    return "";
});

// 初始化时处理
onMounted(() => {
    // 默认选中首页
    selectedCategory.value = '';
    selectedTag.value = '';
});
</script>

<style lang="scss" scoped>
.type-bar {
position: relative;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
margin-bottom: 1rem;
padding: 0.6rem;
font-weight: bold;
animation: fade-up 0.6s 0.3s backwards;
.all-type {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: 12px;
    overflow: hidden;
    mask: linear-gradient(
    90deg,
    #fff 0,
    #fff 90%,
    hsla(0, 0%, 100%, 0.6) 95%,
    hsla(0, 0%, 100%, 0) 100%
    );
    .type-item {
    display: flex;
    align-items: center;
    padding: 0.1rem 0.5rem;
    margin-right: 6px;
    font-weight: bold;
    border-radius: 8px;
    white-space: nowrap;
    height: 30px;
    cursor: pointer;
    .num {
        margin-left: 4px;
        font-weight: normal;
        padding: 2px 6px;
        font-size: 0.75rem;
        color: var(--main-font-color);
        background-color: var(--main-card-border);
        border-radius: 8px;
    }
    &.choose {
        color: var(--main-card-background);
        background-color: var(--main-color);
        .num {
        color: var(--main-color);
        }
    }
    &.hidden {
        display: none;
    }
    &:hover {
        color: var(--main-card-background);
        background-color: var(--main-color);
    }
    }
}
.more-type {
    display: flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;
    margin-right: 4px;
    margin-left: 8px;
    .iconfont {
    font-size: 0.9375rem;
    margin-right: 8px;
    }
    &:hover {
    .iconfont {
        color: var(--main-color);
    }
    }
}
}
</style>
