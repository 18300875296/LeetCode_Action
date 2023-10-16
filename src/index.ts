/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-15 12:10:35
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-16 22:18:58
 * @FilePath: \Testc:\Users\1\Desktop\LeetCode-Action\src\index.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

import { getData,DisplayType} from "./main";
import { getTimeDiffString } from "./time";
import * as core from '@actions/core';
import * as fs from 'fs';
const supportType = [
  'SolvedProblem'
]
async function main(): Promise<void> {
  // 读取参数: 用户 ID
  const user_id = core.getInput('user_id')
  // 读取参数: 请求的数据
  const displayType = (core.getInput('displayType')) as DisplayType
  if (!supportType.includes(displayType)) return core.setFailed(`显示类型: ${displayType}暂不支持`)
  try {
    core.info('1.获取页面数据...')
    const data =  await getData({
      user_id,
      displayType,
    }) ?? []
    core.info('2. 生成 html中...')
    const itemHtml = data.map((item)=>` <tr style="border: 1px solid #ddd;padding: 8px;text-align: left;">
    <th style="border: 1px solid #ddd;padding: 8px;text-align: left;background-color: #f2f2f2;">${item.question.questionFrontendId}${item.question.translatedTitle}</th>
    <th style="border: 1px solid #ddd;padding: 8px;text-align: left;background-color: #f2f2f2;">${getTimeDiffString(item.submitTime)}</th>
  </tr>`)
    const appendHtml = ` <table style=" border-collapse: collapse;width: 100%;margin-top: 20px;">
    <tr style="border: 1px solid #ddd;padding: 8px;text-align: left;">
      <th style="border: 1px solid #ddd;padding: 8px;text-align: left;background-color: #f2f2f2;">题目</th>
      <th style="border: 1px solid #ddd;padding: 8px;text-align: left;background-color: #f2f2f2;">题目难度</th>
      <th style="border: 1px solid #ddd;padding: 8px;text-align: left;background-color: #f2f2f2;">最近提交时间</th>
    </tr>
    ${itemHtml}
    </table>`
    core.info(`3. 读取 README, 在 <!-- leetCode start --> 和 <!-- leetCode end --> 中间插入生成的 html: \n ${appendHtml}`)

    const README_PATH = './README.md'
    const res = fs.readFileSync(README_PATH, 'utf-8')
      .replace(/(?<=<!-- leetCode start -->)[.\s\S]*?(?=<!-- leetCode end -->)/, `${appendHtml}`)

    core.info('4. 修改 README ...')
    fs.writeFileSync(README_PATH, res)

    core.info(`5. 修改结果: ${res}`)
  }
  catch (error) {
    core.setFailed(error as Error)
  }
}

main()
