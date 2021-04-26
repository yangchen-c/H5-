<template>
	<view class="container">
		<view class="card-top">
			<view class="item">
				<text>客服电话</text>
				<text>{{ info.customerServiceTel }}</text>
			</view>
			<view class="item">
				<text>电子邮箱</text>
				<text>{{ info.eMail }}</text>
			</view>
			<view class="item">
				<text>官方QQ</text>
				<text>{{ info.QQ }}</text>
			</view>
			<view class="item">
				<text>服务时间</text>
				<text>{{info.servicetime}}</text>
			</view>
			<view class="item">
				<text>官方微信</text>
				<text>{{ info.wechatid }}</text>
			</view>
			<view class="item">
				<text>商务合作</text>
				<text>{{ info.investmentTel }}</text>
			</view>
		</view>
		<!-- 微信拨打客服电话 二维码-->
		<view class="card-bottom">
			<view class="item">
				<view class="main">
					<image v-show="showQrCode" src="/static/icon/qrcode-icon.png" class="qrcode-icon"></image>
					<tki-qrcode ref="qrcode" 
						:val="info.wechatPublicNumber" 
						:size="200" background="#fff" 
						foreground="#000" 
						pdground="#000" 
						:onval="true"
						:loadMake="true" 
						@result="qrcodeChange"
						/>
					<view style="margin-top: 84upx;">微信公众号</view>
				</view>
			</view>
			<view class="item" @click="dialPhone">
				<view class="main">
					<image class="phone-image" src="/static/icon/phone.png" mode="aspectFill"></image>
					<view class="phone">
						<text>拨打客服电话</text>
						<text>{{ info.customerServiceTel }}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	export default {
		data() {
			return {
				info: uni.getStorageSync('config'),
				showQrCode: false
			}
		},
		components: {
			tkiQrcode
		},
		methods: {
			// 二维码创建完成之后触发
			qrcodeChange(res) {
				this.showQrCode = true
				// uni.saveImageToPhotosAlbum({
				// 	filePath: res,
				// 	success: function() {
				// 		console.log('我执行了吗')
				// 		console.log('save success');
				// 	},
				// 	fail: function(err) {
				// 		console.log(err)
				// 	}
				// });
			},
			// 拨打客服电话
			dialPhone() {
				uni.showModal({
					title: this.info.appname+'提示',
					content: '您确定要拔打客服电话?',
					confirmColor: '#FE9452',
					success: (res) => {
						if (res.confirm) {
							uni.makePhoneCall({ phoneNumber: this.info.customerServiceTel })
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				});
			}
		},
		onLoad() {
			uni.getStorage({
				key: 'config',
				success: (res) =>{
					this.info = res.data;
				}
			})
		}
	}
</script>

<style lang="less">
	page {
		background: #f0f1f1;
	}

	.container {

		.card-top {
			margin: 30upx auto;
			background: #fff;
			border-radius: 8upx;
			width: 690upx;

			.item {
				padding: 30upx;
				border-bottom: 1upx solid #F0F1F1;
				display: flex;
				justify-content: space-between;

				text:first-child {
					color: #A2A2A2;
				}
			}

			.item:last-child {
				border-bottom: none;
			}
		}

		.card-bottom {
			width: 690upx;
			margin: 0 auto;
			display: flex;
			justify-content: space-between;

			.item {
				width: 330upx;
				height: 500upx;
				background: #fff;
				border-radius: 8upx;
				display: flex;
				align-items: center;
				justify-content: center;
				
				.main {
					display: flex;
					flex-direction: column;
					align-items: center;
					position: relative;
					
					.qrcode-icon {
						position: absolute;
						top: 100upx;
						left: 100upx;
						transform: translate(-50%, -50%);
						width: 40upx;
						height: 40upx;
						z-index: 99999;
					}
					
					.phone {
						display: flex;
						flex-direction: column;
						margin-top: 50upx;
						align-items: center;

						text:first-child {
							font-size: 24upx;
							color: #A2A2A2;
							margin-bottom: 10upx;
						}
					}
				}

				.phone-image {
					width: 200upx;
					height: 200upx;
				}
			}
		}
	}
</style>
