/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-15 14:32:20
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-15 14:39:57
 * @FilePath: \Testc:\Users\1\Desktop\LeetCode-Action\lib\time.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeDiffString = void 0;
function getTimeDiffString(timestamp) {
    const now = new Date(); // 获取当前时间
    const diff = now.getTime() - (+timestamp * 1000); // 计算时间差，注意要将时间戳乘以1000转换为毫秒
    const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
    const oneMonth = 30 * oneDay; // 一个月的毫秒数
    const oneYear = 365 * oneDay; // 一年的毫秒数
    if (diff < oneDay) {
        // 小于1天，输出多少个小时前
        const hours = Math.floor(diff / (60 * 60 * 1000));
        return `${hours}小时前`;
    }
    else if (diff < oneMonth) {
        // 大于等于1天，小于1个月，输出多少天前
        const days = Math.floor(diff / oneDay);
        return `${days}天前`;
    }
    else if (diff < oneYear) {
        // 大于等于1个月，小于1年，输出多少个月前
        const months = Math.floor(diff / oneMonth);
        return `${months}个月前`;
    }
    // 大于等于1年，输出多少年前
    const years = Math.floor(diff / oneYear);
    return `${years}年前`;
}
exports.getTimeDiffString = getTimeDiffString;
