import { isArray } from './is';
/**
 * 动态添加路由的处理把所有路由循环出来
 * @param menuList
 * @returns
 */

export function getFlatMenuList(
	menuList: Menu.MenuOptions[]
): Menu.MenuOptions[] {
	let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));

	return newMenuList.flatMap((item) => [
		item,
		...(item.children ? getFlatMenuList(item.children) : []),
	]);
}

/**
 * 过滤出isHide是true的菜单列表
 * @param menuList
 * @returns
 */

export function getShowMenuList(
	menuList: Menu.MenuOptions[]
): Menu.MenuOptions[] {
	let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
	return newMenuList.filter((item) => {
		item.children?.length && (item.children = getShowMenuList(item.children));
		return !item.meta.isHide;
	});
}

export const getAllBreadcrumbList = (
	menuList: Menu.MenuOptions[],
	parent = [],
	result: { [key: string]: any } = {}
) => {
	// eslint-disable-next-line no-restricted-syntax
	for (const item of menuList) {
		result[item.path] = [...parent, item];
		if (item.children)
			getAllBreadcrumbList(item.children, result[item.path], result);
	}
	return result;
};

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 字典列表
 * @param {Array} fieldNames label && value && children 的 key 值
 * @param {String} type 过滤类型（目前只有 tag）
 * @returns {String}
 * */
export function filterEnum(
	callValue: any,
	enumData?: any,
	fieldNames?: FieldNamesProps,
	type?: 'tag'
) {
	const value = fieldNames?.value ?? 'value';
	const label = fieldNames?.label ?? 'label';
	const children = fieldNames?.children ?? 'children';
	let filterData: { [key: string]: any } = {};
	// 判断 enumData 是否为数组
	if (Array.isArray(enumData))
		filterData = findItemNested(enumData, callValue, value, children);
	// 判断是否输出的结果为 tag 类型
	if (type === 'tag') {
		return filterData?.tagType ? filterData.tagType : '';
	}
	return filterData ? filterData[label] : '--';
}

/**
 * @description 处理值无数据情况
 * @param {*} callValue 需要处理的值
 * @returns {String}
 * */
export function formatValue(callValue: any) {
	// 如果当前值为数组，使用 / 拼接（根据需求自定义）
	if (isArray(callValue))
		return callValue.length ? callValue.join(' / ') : '--';
	return callValue ?? '--';
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @returns {String}
 * */
export function handleProp(prop: string) {
	if (prop) {
		const propArr = prop.split('.');
		if (propArr.length === 1) return prop;
		return propArr[propArr.length - 1];
	}
}

/**
 * @description 处理 prop 为多级嵌套的情况，返回的数据 (列如: prop: user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @returns {*}
 * */
export function handleRowAccordingToProp(
	row: { [key: string]: any },
	prop: string
) {
	// if (prop) {
	if (!prop?.includes('.')) return row[prop] ?? '--';
	prop.split('.').forEach((item) => {
		row = row[item] ?? '--';
	});

	return row;
	// }
}
