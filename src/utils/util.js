// 模块化(es6提供): esmodule
// 导入和导出
// 其余文件可以使用到该文件的变量和方法

// export default: 默认导出 导出变量 数组 对象 方法 只能导出一次
// export: 导出 导出变量 数组 对象 方法 但是要加let或者const 能导出多次

import router from '../router'
import { Modal } from 'view-design'

//导入路由
export default {
	//检测用户是否登录
	// key:本地存储用户信息的key
	// next:传入一个函数 下一步的操作
	// item:next函数需要的参数
	checkLogin({
		key,
		next,
		item
	}) {
		//检测本地有没有用户信息
		let user = localStorage.getItem(key)
		if (user) {
			//已经登录 继续下一步操作
			next(item)
		} else {
			//未登录 提示用户是否跳转
			Modal.confirm({
				title: '登录后才可使用此功能',
				content: '点击跳转登录/注册',
				onOk: () => {
					router.push('login')
				}
			})
		}
	},
	//存储记录
	//书架 bookshelf
	//搜索历史 search
	//书籍分类小类 minro
	//key:存储的名字
	//item:根据什么属性名来去重
	saveHistory({
		key,
		data,
		item
	}) {
		//拼接一个名字
		let name = key + 'History'
		let history = uni.getStorageSync(name)
		let arr = []
		if (history) {
			//已经存储过了 将以前的数据一起保存下来
			arr = history
		}
		arr.unshift(data)
		if (typeof (data) === "string") {
			//简单数据类型去重
			arr = Array.from(new Set(arr));
		} else {
			//复杂数据类型去重
			const res = new Map();
			arr = arr.filter(arr => !res.has(arr[item]) && res.set(arr[item], 1))
		}
		uni.setStorageSync(name, arr)
	},
	//获取存储记录
	getHistory(key) {
		let name = key + 'History'
		let arr = uni.getStorageSync(name)
		if (arr) return arr
		else return null
	},
	//删除存储记录
	//key:bookshelf(书架) search(搜索记录)
	//data:属性值
	//attr:根据什么属性名删除
	removeHistory(key, data, attr) {
		let name = key + 'History'
		let arr = this.getHistory(key)
		if (arr.length > 0) {
			//传入的数据不为空 则做过滤操作
			if (data) {
				// 将以前存的数据转换成数组
				arr = arr.filter((item, index) => {
					return item[attr] !== data[attr];
				});
				uni.setStorageSync(name, arr);
			} else {
				//传入的数据为空 则清空该历史（用于清空搜索历史）
				uni.setStorageSync(name, []);
			}
		}
	},
	//跳转产品详情页面
	jumpDetail(gid) {
		uni.navigateTo({
			url: `/pages/detail/detail?gid=${gid}`
		})
	},
	// 生成id
	genID(length) {
		return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
	},
	// 获取dom
	getDom(selector, all) {
		return new Promise(resolve => {
			uni.createSelectorQuery().in(this)[all ? 'selectAll' : 'select'](selector).boundingClientRect()
				.exec(rect => {
					if (all && Array.isArray(rect) && rect.length) {
						resolve(rect)
					}
					if (!all && rect) {
						resolve(rect)
					}
				})
		})
	},
	// 获取属性结构最大层级
	getMaxlevel(treeData, attr = 'children') {
		let level = 0
		let v = this
		let maxLevel = 0

		function loop(data, level) {
			data.forEach(item => {
				item.level = level
				if (level > maxLevel) {
					maxLevel = level
				}
				if (attr in item) {
					if (item.children.length > 0) {
						loop(item.children, level + 1)
					}
				}
			})
		}
		loop(treeData, 1)
		return maxLevel
	}
}
