<template>
	<view class="container-tip" :class="openBrowserFlag ? 'show' : ''">
		<image class="bg" src="/static/icon/tip-open-browser.png"></image>
		<view class="tip-text">
			<view>1</view>
			<text>点击右上角的按钮</text>
		</view>
		<view class="tip-text-2">
			<view>2</view>
			<text>选择在浏览器中打开</text>
		</view>
	</view>
</template>

<script>
export default {
	props: ['openBrowserFlag']
};
</script>

<style lang="less" scoped="scoped">
.container-tip {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1110;
	opacity: 0;
	outline: 0;
	text-align: center;
	-ms-transform: scale(1.185);
	transform: scale(1.185);
	backface-visibility: hidden;
	perspective: 2000upx;
	background: rgba(0, 0, 0, 0.6);
	transition: all 0.3s ease-in-out 0s;
	pointer-events: none;

	.bg {
		width: 90upx;
		height: 144upx;
		position: fixed;
		right: 30upx;
		top: 30upx;
	}

	.tip-text,
	.tip-text-2 {
		display: flex;
		align-items: center;
		position: fixed;
		color: #fff;
		right: 62upx;
		top: 180upx;

		view:first-child {
			width: 36upx;
			height: 36upx;
			background: #FE9452;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		text:last-child {
			margin-left: 30upx;
			letter-spacing: 4upx;
			text-align: justify;
		}
	}

	.tip-text-2 {
		top: 250upx;
		right: 30upx;
	}

	&.show {
		opacity: 1;
		transition-duration: 0.3s;
		-ms-transform: scale(1);
		transform: scale(1);
		overflow-x: hidden;
		overflow-y: auto;
		pointer-events: auto;
	}
}
</style>
