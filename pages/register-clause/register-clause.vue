<template>
	<view class="container">
		<view class="container-content">
			<!-- <rich-text :nodes="config.reg_policy"></rich-text> -->
			<u-parse :content="config.reg_policy" @navigate="navigate" />
		</view>
		
		<view class="cu-bar bg-white tabbar border shop bottom-fix foot">
			<view class="btn-group">
				<!-- <button class="cu-btn bg-orange round shadow-blur">加入购物车</button> -->
				<button class="cu-btn bg-green round shadow-blur" :disabled="isScrollBottom" @tap="confirmThis">{{ isScrollBottomTxt }}</button>
			</view>
		</view>
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
				config: uni.getStorageSync('config'),
				scrollY: 0, 
				scrollBottom: 0,
				isScrollBottom: true,
				isScrollBottomTxt: '我已阅读并同意此协议',
				registerObj: {},
			};
		},
		watch: {
			scrollY() {
				//通知他妈的滚动了。
				this.setPageScroll(this.scrollY);
			},
			scrollBottom() {
				if(this.scrollBottom != 0) {
					//通知他妈的触底了
					this.setReachBottom();
				}
			},
		},
		onLoad(){
			uni.getStorage({
				key: 'config',
				success: (res) =>{
					this.config = res.data;
				}
			})
			this.registerObj = uni.getStorageSync('registerdata')
			// if(uni.getStorageSync('reg_agree') == 2){
			// 	//this.isScrollBottom = false
			// 	this.isScrollBottomTxt = '我已同意'
			// }
		},
		methods:{
			navigate(href, e){
				//console.log(href)
				if(href){
					return uni.navigateTo({
						url: href
					})
				}
			},
			//页面被滚动
			setPageScroll(scrollTop) {
				//console.log(scrollTop);
			},
			//触底了
			setReachBottom() {
				//console.log('触底了');
				this.isScrollBottom = false
			},
			confirmThis(){
				//如果可以点击同意协议则返回
				if(!this.isScrollBottom){
					// 调用注册
					uni.showLoading({ mask: true, title: '正在注册中...' })
					this.$fetch(this.$api.register, this.registerObj).then(res => {
						uni.hideLoading()
						uni.removeStorageSync('registerdata')
						if (!+res.status) {
							uni.showToast({ title: res.msg, icon: 'none' })
							setTimeout(() => {
								return uni.navigateBack({
									delta: 1
								})
							}, 800)
							return false
						}
						uni.showToast({ title: '注册成功' })
						setTimeout(() => {
							// #ifdef H5
							uni.redirectTo({url: '../down-app/down-app'})
							// #endif
						}, 800)
					})
				}
			}
		},
		onPageScroll(e) {
			this.scrollY = e.scrollTop;
			//console.log(e.scrollTop);
		},
		onReachBottom(e) {
			let timestamp = new Date().getTime();
			this.scrollBottom = timestamp;
		},
	}
</script>

<style lang="scss">
	.container {
		.container-content{
			padding: 30upx;
			line-height: 1.5;
			text-indent: 56upx;
		}

		.title {
			font-weight: bold;
		}

		.mg-bottom {
			margin-bottom: 30upx;
		}
	}
</style>
