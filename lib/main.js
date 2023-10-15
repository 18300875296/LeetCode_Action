"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-15 12:11:17
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-15 14:39:44
 * @FilePath: \Testc:\Users\1\Desktop\LeetCode-Action\lib\main.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
const axios_1 = __importDefault(require("axios"));
const url = 'https://leetcode.cn/graphql/noj-go/';
const method = 'post';
const contentType = 'application/json';
const getRecentQuestions = (user_id) => {
    const requestData = {
        query: `
      query recentAcSubmissions($userSlug: String!) {
        recentACSubmissions(userSlug: $userSlug) {
          submissionId
          submitTime
          question {
            title
            translatedTitle
            titleSlug
            questionFrontendId
          }
        }
      }
    `,
        variables: {
            userSlug: `${user_id}`,
        },
        operationName: 'recentAcSubmissions',
    };
    (0, axios_1.default)({
        method,
        url,
        headers: {
            'Content-Type': contentType,
        },
        data: requestData,
    })
        .then(response => response.data.map((submission) => submission.question.title))
        .catch(error => {
        console.error('Error:', error);
    });
};
function getData({ user_id, plat_form }) {
    return getRecentQuestions(user_id);
}
exports.getData = getData;
