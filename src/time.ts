/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-15 13:32:18
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-16 20:25:12
 * @FilePath: \Testc:\Users\1\Desktop\LeetCode-Action\src\time.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
function getTimeDiffString(timestamp: number | string):string {
  const now = new Date() // 获取当前时间
  const diff = now.getTime() - (+timestamp * 1000) // 计算时间差，注意要将时间戳乘以1000转换为毫秒
  const oneDay = 24 * 60 * 60 * 1000 // 一天的毫秒数
  const oneMonth = 30 * oneDay // 一个月的毫秒数
  const oneYear = 365 * oneDay // 一年的毫秒数

  // 小于1天，输出多少个小时前
  if (diff < oneDay) return `${Math.floor(diff / (60 * 60 * 1000))}小时前`
  // 大于等于1天，小于1个月，输出多少天前
  if (diff < oneMonth) return `${Math.floor(diff / oneDay)}天前`
  // 大于等于1个月，小于1年，输出多少个月前
  if (diff < oneYear) return `${Math.floor(diff / oneMonth)}个月前`
  // 大于等于1年，输出多少年前
  return `${Math.floor(diff / oneYear)}年前`
}
export {getTimeDiffString}
