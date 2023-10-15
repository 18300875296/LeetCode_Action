/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-15 12:11:17
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-15 16:03:49
 * @FilePath: \Testc:\Users\1\Desktop\LeetCode-Action\src\main.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import axios from 'axios';

interface QuestionType {
  submissionId: number;
  submitTime: string;
  question: {
    title: string;
    translatedTitle: string;
    titleSlug: string;
    questionFrontendId: number;
  };
}

interface SubmissionType {
  question: {
    title: string;
  };
}

const getRecentQuestions = async (userSlug: string): Promise<string[]> => {
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
    const response = await axios({
      method: 'post', 
      url: 'https://leetcode.cn/graphql/noj-go/', 
      headers: {
        'Content-Type': 'application/json',
      },
      data: requestData,
    });

    return response.data.data.recentACSubmissions.map(
      (submission: QuestionType) => submission.question.title
    );
  } catch (error) {
    throw error;
  }
};

const getData = async ({
  user_id,
  platform,
}: {
  user_id: string | number;
  platform: string;
}): Promise<string[] | undefined> => {
  try {
    return await getRecentQuestions(`${user_id}`);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export {getData}
