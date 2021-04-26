<template>
	<view class="container">
		<rich-text :nodes="config.aboutintro"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				config: uni.getStorageSync('config')
			};
		},
		methods:{
			preview(src, e) {
			  // do something
			},
			navigate(href, e) {
			  // do something
			}
		},
		onLoad(){
			uni.getStorage({
				key: 'config',
				success: (res) =>{
					this.config = res.data;
				}
			})
		}
	}
</script>
<style lang="less">
	.container {
		padding: 30upx;
		
		.content {
			text-indent: 56upx;
		}
	}

</style>
