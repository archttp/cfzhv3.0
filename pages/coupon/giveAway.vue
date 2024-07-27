<template>
	<view>
		<view style="width: 750rpx;height: 96rpx;background: #FFFFFF;" class="u-flex u-row-center">
			<!-- <view>
				<u-tabs font-size='34' :list="navList" active-color="#488cf5" :current="current" @change="change">
				</u-tabs>
			</view> -->
			<view style="width: 750rpx;height: 96rpx;background-color:#EEEEEF ;"
				class="flex flex-col-center flex-row-center">
				<view style="width: 250rpx;height: 96rpx;text-align: center;line-height: 96rpx;"
					@click="changeCurrent(index)"
					:style="current == index ? 'background:#FFFFFF;font-weight: 900;' : 'opacity: .7;'"
					v-for="(item,index) in navList" :key="item.name">{{item.name}}</view>
			</view>
		</view>
		<view class="list" v-if="0 == current">
			<view class="li" style="border-top: 20rpx solid #f7f7f7;">
				<view class="left">金额(元)</view>
				<!-- <picker mode="selector" :range="amountList2" @change="amountChange"> -->
				<input class="right" v-model="amount" type="number" placeholder="请选择金额(元)"
					:style="plateNo?'color: #323233;text-align:right':'color: rgba(50, 50, 51, 0.5);text-align:right'"></input>
				<!-- </picker> -->
			</view>
			<view class="li" style="border-top: 20rpx solid #f7f7f7;">
				<view class="left">手机号</view>
				<input class="right" v-model="phone" type="number" placeholder="请输入手机号"
					:style="phone?'color: #323233;text-align:right':'color: rgba(50, 50, 51, 0.5);text-align:right'"></input>
			</view>
			<view class="li" style="border-top: 20rpx solid #f7f7f7;">
				<view class="left">赠送车牌号</view>
				<view class="right" @click="plateShow = true"
					:style="plateNo?'color: #323233;':'color: rgba(50, 50, 51, 0.5);'">{{plateNo?plateNo:'请输入赠送车牌号'}}
				</view>
			</view>
		</view>

		<view class="list" v-if="1 == current">
			<view class="li" style="border-top: 20rpx solid #f7f7f7;">
				<view class="left">分钟数</view>
				<input class="right" v-model="time" type="number" placeholder="请输入分钟数"
					:style="plateNo?'color: #323233;text-align:right':'color: rgba(50, 50, 51, 0.5);text-align:right'"></input>
			</view>
			<view class="li" style="border-top: 20rpx solid #f7f7f7;">
				<view class="left">手机号</view>
				<input class="right" v-model="phone" type="number" placeholder="请输入手机号"
					:style="phone?'color: #323233;text-align:right':'color: rgba(50, 50, 51, 0.5);text-align:right'"></input>
			</view>
			<view class="li" style="border-top: 20rpx solid #f7f7f7;">
				<view class="left">赠送车牌号</view>
				<view class="right" @click="plateShow = true"
					:style="plateNo?'color: #323233;':'color: rgba(50, 50, 51, 0.5);'">{{plateNo?plateNo:'请输入赠送车牌号'}}
				</view>
			</view>
		</view>


		<view class="list" v-if="2 == current">
			<view class="li" style="border-top: 20rpx solid #f7f7f7;">
				<view class="left">次数</view>
				<input class="right" v-model="num" type="number" placeholder="请输入次数"
					:style="plateNo?'color: #323233;text-align:right':'color: rgba(50, 50, 51, 0.5);text-align:right'"></input>
			</view>
			<view class="li" style="border-top: 20rpx solid #f7f7f7;">
				<view class="left">手机号</view>
				<input class="right" v-model="phone" type="number" placeholder="请输入手机号"
					:style="phone?'color: #323233;text-align:right':'color: rgba(50, 50, 51, 0.5);text-align:right'"></input>
			</view>
			<view class="li" style="border-top: 20rpx solid #f7f7f7;">
				<view class="left">赠送车牌号</view>
				<view class="right" @click="plateShow = true"
					:style="plateNo?'color: #323233;':'color: rgba(50, 50, 51, 0.5);'">{{plateNo?plateNo:'请输入赠送车牌号'}}
				</view>
			</view>
		</view>



		<view :class="buttomStatus?'pay_active':'pay'" @click="pay">立即赠送</view>
		<view :class="codeStatus?'codeButton_active':'codeButton'" @click="intoCode">生成二维码</view>
		<plate-input v-if="plateShow" :plate="plateNo" @export="setPlate" @close="plateShow=false"></plate-input>
	</view>
</template>

<script>
	import {
		issueCoupons
	} from '../../network/api.js'
	import plateInput from '@/components/uni-plate-input/uni-plate-input.vue'

	export default {
		components: {
			plateInput
		},
		data() {
			return {
				id: '',
				type: '',
				show: false,
				plateShow: false,
				plateNo: '',
				typeIndex: 1,
				phone: '',
				amount: '',
				navList: [{
					name: '金额券'
				}, {
					name: '时间送券'
				}, {
					name: '次数送券'
				}],

				current: 0,
				num: '',
				time: '',
				amountList: [],
				couponActivityTypeId: ''
			}
		},
		computed: {
			buttomStatus: function() {
				if (this.current == 0) {
					if (this.amount && this.plateNo) {
						return true
					} else if (this.amount && this.phone) {
						return true
					} else {
						return false
					}
				}
				if (this.current == 1) {
					if (this.time && this.plateNo) {
						return true
					} else if (this.time && this.phone) {
						return true
					} else {
						return false
					}
				}
				if (this.current == 2) {
					if (this.num && this.plateNo) {
						return true
					} else if (this.num && this.phone) {
						return true
					} else {
						return false
					}
				}
			},
			codeStatus: function() {
				if (this.current == 0) {
					if (this.amount) {
						return true
					} else {
						return false
					}
				}
				if (this.current == 1) {
					if (this.time) {
						return true
					} else {
						return false
					}
				}
				if (this.current == 2) {
					if (this.num) {
						return true
					} else {
						return false
					}
				}
			},
			amountList2() {
				return this.amountList.map((i) => i.denomination + '元')
			}
		},
		onLoad(e) {
			this.id = e.id
			// this.getAmountList()
		},
		methods: {
			changeCurrent(index) {
				this.current = index
			},
			amountChange(e) {
				this.amount = this.amountList[e.detail.value].denomination
				this.couponActivityTypeId = this.amountList[e.detail.value].id
			},
			async getAmountList() {
				const {
					data,
					code
				} = await this.$u.api.getCouponActivityCouponTypeListByQuery({
					couponActivityId: uni.getStorageSync('parkingTicketActivityId'),
					couponType: 2
				})
				if (code === 10002) {
					this.amountList = data
				}
			},
			change(index) {
				this.current = index;
			},
			async pay() {
				if (!this.buttomStatus) return
				this.staffOrShopkeeperGiveCouponToCar()
			},
			async staffOrShopkeeperGiveCouponToCar(value = '') {
				var couponType = ''
				var quantity = ''
				if (this.current == 0) {
					couponType = 2
					quantity = this.amount
				}
				if (this.current == 1) {
					couponType = 3
					quantity = this.time
				}
				if (this.current == 2) {
					couponType = 1
					quantity = this.num
				}
				var res = await issueCoupons({
					couponActivityId: this.id,
					couponType,
					scenes: 1,
					toUserPhone: this.phone ? this.phone : '',
					targetObject: this.plateNo,
					denomination: quantity
				})

				console.log(res);
				if (res.code != 10002) {
					uni.showToast({
						title: res.message,
						icon: 'none'
					})
					return
				} else {
					uni.showModal({
						title: '提示',
						content: '停车券已发出',
						showCancel: false,
						confirmText: '我知道了',
						success: res => {
							uni.navigateBack()
						}
					});
				}
			},
			intoCode() {
				if (!this.codeStatus) return
				var sourceType = ''
				var quantity = ''
				if (this.current == 0) {
					sourceType = 2
					quantity = this.amount
				}
				if (this.current == 1) {
					sourceType = 3
					quantity = this.time
				}
				if (this.current == 2) {
					sourceType = 1
					quantity = this.num
				}
				const params = {
					scenes: 1,
					couponType: sourceType,
					denomination: quantity,
					targetObject: this.plateNo,
					toUserPhone: this.phone,
					couponActivityId: this.id
				}
				uni.navigateTo({
					url: 'qrCode?params=' + JSON.stringify(params)
				})
			},
			setPlate(plate) {
				if (plate.length >= 7) this.plateNo = plate
				this.plateShow = false
			},
			handleConfirm(e) {
				console.log(e);
				this.typeIndex = Number(e.detail.value) + 1
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: #F7F7F7;
	}

	.placeholder {
		font-family: PingFangSC-Regular, PingFang SC;
		color: rgba(50, 50, 51, 0.5);
		line-height: 44rpx;
	}

	.codeTitle {
		width: 164rpx;
		height: 32rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #323233;
		line-height: 32rpx;
		margin: 32rpx 0 0 32rpx;
	}

	.option {
		width: 750rpx;
		height: 100rpx;
		border-bottom: 2rpx solid #f5f5f5;
		padding: 0 40rpx;
		background: #fff;
		line-height: 100rpx;
		margin-top: 24rpx;
	}

	.pay {
		width: 686rpx;
		height: 100rpx;
		background: #488cf5;
		border-radius: 16rpx;
		opacity: 0.4;
		font-size: 36rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 100rpx;
		text-align: center;
		margin: 52rpx 0 0 32rpx;
	}

	.pay_active {
		@extend .pay;
		opacity: 1;
	}


	.codeButton {
		width: 686rpx;
		height: 100rpx;
		background: red;
		border-radius: 16rpx;
		opacity: 0.4;
		font-size: 36rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 100rpx;
		text-align: center;
		margin: 32rpx 0 0 32rpx;
	}

	.codeButton_active {
		@extend .codeButton;
		opacity: 1;
	}

	.list {
		background-color: #FFFFFF;
		margin-top: 16upx;

		>.li {
			font-size: 28upx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			border-bottom: 2rpx solid #fafafa;
			padding: 30upx;

			.left {
				color: #898989;
			}

			.right {
				color: #000;
			}
		}
	}
</style>