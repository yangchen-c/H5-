<template>
	<view class="container">
		 <u-parse :content="detail" @preview="preview" @navigate="navigate" />
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components: {
			uParse
		 },
		data() {
			return {
				id: null,
				detail: '<p style="color: #4a4a4a;font-size: 14px;">加载中...</p>',
			};
		},
		methods: {
			// 获取轮播图详情
			async _getArticleDetail() {
				let res = await this.$fetch(this.$api.getArticleDetail, { id: this.id })
				//console.log(res)
				if (!+res.status) throw res.msg
				this.detail = res.content.content
				uni.setNavigationBarTitle({ title: res.content.title })
			},
			preview(src, e) {
			  // do something
			},
			navigate(href, e) {
			  // do something
			}
		},
		onLoad(options) {
			//console.log(options)
			this.id = options.id
			uni.setNavigationBarTitle({ title: options.title })
			this._getArticleDetail()
		}
	}
</script>

<style lang="scss">
.container {
	padding: 30upx;
	font-size: $uni-font-size-base;
	line-height: 34upx;
}
.container p{
	margin-bottom:24upx;
	font-size:$uni-font-size-base;
	line-height:34upx;
	display:block;
}
.container p span{
	display:inline;
	
}
</style>
