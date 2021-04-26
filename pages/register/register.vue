<template>
	<view class="container">

		<view class="input-container">
			<input class="ipt-container" type="number" placeholder="请输入手机号码" maxlength="11"
				v-model="registerObj.phone" />
		</view>
		<view class="code-container">
			<input type="number" placeholder="验证码" v-model="registerObj.phoneCode">
			<text v-if="!codeFlag" style="color: #4A90E2;" @tap="getCode">获取验证码</text>
			<text v-if="codeFlag" style="color: #9B9B9B;">已发送（{{ count }}S）</text>
		</view>
		<view class="input-container">
			<input class="ipt-container" type="text" placeholder="请输入登录密码" v-model="registerObj.password"
				:password="true" maxlength="16" />
			<view class="input-desc">6 - 16位数字、字母组合</view>
		</view>
		<view class="input-container">
			<input class="ipt-container" type="text" placeholder="请重复输入登录密码" v-model="confirmPassword" :password="true"
				maxlength="16" />
			<view class="input-desc">6 - 16位数字、字母组合</view>
		</view>
		<view class="input-container">
			<input type="text" class="ipt-container" placeholder="推荐人邀请码(必填)" v-model="registerObj.invitationCode"
				maxlength="11">
		</view>
		<view class="border-bottom"></view>
		<!-- 服务条款 -->
		<!-- <view class="terms-of-service" @tap="termsChange" > -->
		<!-- #ifndef H5 -->
		<!-- <icon :type="!termsFlag ? 'circle' : 'success'" size="22" color="#4a90b2" /> -->
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<!-- <view>
				<view v-if="!termsFlag" class="terms-icon-no"></view>
			</view>
			<view>
				<image v-if="termsFlag" style="width: 44upx;height: 44upx;" src="../../static/register/terms-icon-success.png" mode="aspectFill"></image>
			</view> -->
		<!-- #endif -->
		<!-- <view>
				<text>我已阅读并同意平台</text>
				<text class="clause" @tap.stop="openRegisterClause">《注册协议》</text>
				<text>及</text>
				<text class="clause" @tap.stop="openServerClause">《隐私政策》</text>
				<text>中的说明</text>
			</view>
		</view> -->
		<!-- 确认注册按钮 -->
		<view class="confirm-register" @tap="confirmRegister">{{ regText }}</view>
		<!-- #ifdef H5 -->
		<view class="immediately-download">
			<text>已注册用户点击</text>
			<text @click="downApp">立即下载</text>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	let timer = null

	export default {
		data() {
			return {
				codeFlag: false, // 判断是否发生验证码
				termsFlag: false, // 判断是否勾选服务条款
				confirmPassword: "", // 确认登录密码
				count: 60, // 验证码数字判断
				// 获取用户注册所需数据
				registerObj: {
					phone: "", // 手机号
					password: "", // 密码
					phoneCode: "", // 手机验证码
					invitationCode: "" // 上级手机号
				},
				regText: '注册',
				shareFlag: false, // 是否分享注册
				wPath: window.document.location.href
			};
		},
		created() {
			// let wPath = window.document.location.href;
			console.log(this.wPath)
		},
		methods: {
			// 获取验证码
			getCode() {
				if (!this.checkMobileFormat()) return
				// this.checkIsRegister()
				this.sendSms()
				console.log('获取验证码')
			},
			// 更改服务条款是否勾选
			termsChange() {
				this.termsFlag = !this.termsFlag
			},
			// 验证手机号格式是否正确
			checkMobileFormat() {
				let reg = /^[1][3456789][0-9]{9}$/
				if (!reg.test(this.registerObj.phone)) {
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					})
					this.registerObj.phone = null
					return false
				}
				return true
			},
			// 验证手机号是否注册
			checkIsRegister() {
				let count = 0
				this.$fetch(this.$api.checkIsRegister, {
						phone: this.registerObj.phone,
					}, 'get')
					.then(res => {
						if (!+res.content) {
							// 调用发送验证码接口
							this.sendSms()
							console.log(123)
						} else {
							uni.showToast({
								title: '此手机号已注册',
								icon: 'none'
							})
						}
					})
			},
			// 发送验证码
			sendSms() {
				this.codeFlag = !this.codeFlag
				let sendSms = this.$api.sendSms
				this.$fetch(sendSms, {
					mobile: this.registerObj.phone
				}).then(res => {
					// console.log(res)
					if (res.code !== 0) {
						this.codeFlag = !this.codeFlag
						uni.showToast({
							title: '验证码发送失败',
							icon: 'none'
						})

						return false
					}
					// 验证码发送成功之后处理
					timer = setInterval(() => {
						if (this.count === 0) {
							clearInterval(timer)
							this.codeFlag = !this.codeFlag
							this.count = 60
						}
						this.count = --this.count
					}, 1000)
				})
			},
			// 点击确认注册的时候触发
			confirmRegister() {
				if (!this.registerObj.phone) return uni.showToast({
					title: '请输入手机号码',
					icon: 'none'
				})

				if (!this.registerObj.phoneCode) return uni.showToast({
					title: '请输入验证码',
					icon: 'none'
				})

				if (!this.registerObj.password) return uni.showToast({
					title: '请输入密码',
					icon: 'none'
				})

				if (this.registerObj.password !== this.confirmPassword) {
					return uni.showToast({
						title: '两次密码输入的不一致',
						icon: 'none'
					})
				}

				if (!this.registerObj.invitationCode) return uni.showToast({
					title: '请输入邀请码',
					icon: 'none'
				})

				// uni.setStorage({
				// 	key: 'registerdata',
				// 	data: this.registerObj,
				// 	success: function () {
				// return uni.navigateTo({
				// 	url: '/pages/register-clause/register-clause'
				// })
				// 调用注册
				uni.showLoading({
					mask: true,
					title: '正在注册中...'
				})
				this.$fetch(this.$api.register, this.registerObj).then(res => {
					uni.hideLoading()
					// uni.removeStorageSync('registerdata')
					// if (!+res.status) {
					// 	uni.showToast({ title: res.msg, icon: 'none' })
					// 	setTimeout(() => {
					// 		return uni.navigateBack({
					// 			delta: 1
					// 		})
					// 	}, 800)
					// 	return false
					// }
					console.log(res)
					// if (!+res.status) return uni.showToast({
					// 	title: res.msg,
					// 	icon: 'none'
					// })
					if (res.code !== 0) return uni.showToast({
						title: res.message,
						icon: 'none'
					})
					uni.showToast({
						title: '注册成功'
					})
					setTimeout(() => {
						// #ifdef H5
						uni.redirectTo({
							url: '../down-app/down-app'
						})
						// #endif
					}, 800)
				})
				// },
				// })
			},
			// 前往服务条款
			openServerClause() {
				uni.navigateTo({
					url: '/pages/serve-clause/serve-clause'
				})
			},
			// 前往注册协议
			openRegisterClause() {
				uni.navigateTo({
					url: '/pages/register-clause/register-clause'
				})
			},
			// 下载APP资源
			downApp() {
				uni.navigateTo({
					url: '../down-app/down-app'
				})
			}
		},
		onLoad(options) {
			uni.setStorageSync('reg_agree', 1)
			// this.registerObj.invitationCode = options.invitationCode
			// this.registerObj.invitationCode = this.wPath
			this.registerObj.invitationCode = this.wPath.split('c=')[1].split('#')[0]
			// this.registerObj.invitationCode = 'http://39.100.85.86:8888/?c=99999999#/'.split('c=')[1].split('#')[0]
			// this.registerObj.invitationCode = this.wPath.split('host')[1]
		},
		onShow() {
			//console.log(333434)
			if (uni.getStorageSync('reg_agree') == 2) {
				this.regText = '我已阅读并同意相关协议，确认注册'
			} else if (uni.getStorageSync('reg_agree') == 1) {
				this.regText = '注册'
			}
		}
	}
</script>

<style lang="less">
	.container {
		height: 100vh;
		background: url('../../assets/img/bg.png');
		background-size: 100% 100%;

		.input-placeholder {
			color: #000;
		}

		.border-bottom {
			margin-left: 30upx;
			height: 1upx;
			width: 720upx;
			background: #f6f6f6;
		}

		.references-container {
			padding: 30upx;
			background: #fff;
			display: flex;
			align-items: center;

			text {
				margin-right: 40upx;
			}

			input {
				flex: 1
			}
		}

		.input-container {
			margin: 0 auto;
			display: flex;
			align-items: center;
			margin-bottom: 30upx;
			flex-flow: column;

			input {
				width: 100%;
				border-bottom: 2upx solid #e6e6e6;
				flex: 1;
				height: 110upx;
				padding: 34upx 0 34upx 30upx;
			}

			.input-desc {
				width: 100%;
				flex: 1;
				height: 60upx;
				line-height: 60upx;
				// color: #000;
				color: #999;
				padding-left: 34upx;
			}
		}

		.code-container {
			padding: 30upx;
			margin-bottom: 30upx;
			// margin-left: 30upx;
			border-bottom: 2upx solid #e6e6e6;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.terms-of-service {
			display: flex;
			padding: 30upx;
			align-items: center;

			.terms-icon-no {
				width: 40upx;
				height: 40upx;
				border-radius: 50%;
				border: 2upx solid #D8D8D8;
				margin-right: 20upx;
			}

			image {
				width: 44upx;
				height: 44upx;
				margin-right: 20upx;
			}

			icon {
				margin-right: 20upx;
			}

			.clause {
				color: #4a90b2;
			}
		}

		.confirm-register {
			margin-top: 120upx;
			width: 582upx;
			height: 80upx;
			margin-left: auto;
			margin-right: auto;
			background: #000;
			border-radius: 10upx;
			box-shadow: 1px 2px 5px rgba(222, 130, 72, 0.4);
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 34upx;
			color: #FFFFFF;
		}

		.confirm-register:active {
			opacity: .8;
		}

		.immediately-download {
			margin: 30upx auto;
			display: flex;
			justify-content: center;

			&>text:last-child {
				margin-left: 10upx;
				color: #4A90E2;
				font-weight: bold;
			}
		}
	}
</style>