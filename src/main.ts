/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-15 12:11:17
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-16 20:21:21
 * @FilePath: \Testc:\Users\1\Desktop\LeetCode-Action\src\main.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import axios, { AxiosResponse } from 'axios';

type RequestType = {
  data:{
    recentACSubmissions:SubmissionType[]
  }
}
type DisplayType = 'SolvedProblem'


type SubmissionType ={
  question:QuestionType,
  submissionId: number;
  submitTime: number;
}
interface QuestionType {
  question: {
    title: string;
    translatedTitle: string;
    titleSlug: string;
    questionFrontendId: number;
  };
}



const getSolvedQuestions = async (userSlug: string|number): Promise<SubmissionType[]> => {
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
      userSlug,
    },
    operationName: 'recentAcSubmissions',
  };
  try {
    const response:AxiosResponse<RequestType> = await axios({
      method: 'post', 
      url: 'https://leetcode.cn/graphql/noj-go/', 
      headers: {
        'Content-Type': 'application/json',
      },
      data: requestData,
    });

    return response.data.data.recentACSubmissions
  } catch (error) {
    throw error;
  }
};

const getData = async ({
  user_id,
  displayType,
}: {
  user_id: string | number;
  displayType: DisplayType;
}): Promise<any[] | undefined> => {
  switch (displayType) {
    case 'SolvedProblem':
      return await getSolvedQuestions(user_id) ?? []
  
    default:
      break;
  }
 
};

export {getData}
export type {DisplayType }
