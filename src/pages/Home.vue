<template>
	<div>
		<!-- <span class="left"></span> -->
		<h1>vue运行成功we</h1>
	</div>
</template>

<script>
	export default {
		name: "Home",
		data() {
			return {
				img:require('../assets/images/grade-icon2.png')
			}
		},
		created() {
			console.log(process.env.NODE_ENV);
			console.log(process.env.baseUrl);
			console.log(process.env.Api_ENV);
		}
	}
</script>

<style lang="less" scoped>
	@import "../assets/css/index";
	// .left{
	// 	display: inline-block;
	// 	width: 90px;
	// 	height: 90px;
	// 	background: url('../assets/images/grade-icon1.png') no-repeat;
	// 	background-size: 90px 90px;
	// 	border: 1px solid @bgColor;
	// }
	.right{
		color: blueviolet;
		font-size: @16;
	}
</style>
