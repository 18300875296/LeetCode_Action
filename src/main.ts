/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-15 12:11:17
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-15 14:03:43
 * @FilePath: \Testc:\Users\1\Desktop\LeetCode-Action\src\main.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import axios from "axios";

const url = 'https://leetcode.cn/graphql/noj-go/';
const method = 'post';
const contentType = 'application/json';


const getRecentQuestions = (user_id:number|string):any[] =>{
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
  axios({
    method,
    url,
    headers: {
      'Content-Type': contentType,
    },
    data: requestData,
  })
    .then(response => response.data.map((submission)=>submission.question.title))
    .catch(error => {
      console.error('Error:', error);
    });
}
function getData({ user_id, plat_form }:{user_id:string|number,plat_form:string}):any[]|undefined {
  return getRecentQuestions(user_id)
  
}
export {getData}