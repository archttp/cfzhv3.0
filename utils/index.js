import dayjs from 'dayjs'

export function formatTimestamp(timestamp) {
	if (!timestamp || timestamp === '0') return '暂无数据'
	else return dayjs(Number(timestamp)).format('YYYY-MM-DD HH:mm:ss')
}

// 计算两个时间差
export function timeDifference(inTime, outTime) {
	const newInTime = Number(inTime)
	const newOutTime = Number(outTime)
	const diff = newOutTime - newInTime;
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((diff % (1000 * 60)) / 1000);
	return `${hours}小时 ${minutes}分钟 ${seconds}秒`;
}

export const showModal = (content) => {
	uni.showModal({
		title: '提示',
		content
	})
}