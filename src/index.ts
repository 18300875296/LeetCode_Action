/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-15 12:10:35
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-15 16:04:41
 * @FilePath: \Testc:\Users\1\Desktop\LeetCode-Action\src\index.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

import { getData } from "./main";
import { getTimeDiffString } from "./time";
import core from '@actions/core'
import * as fs from 'fs';
const SUPPORT_PLAT_FORM = [
  'LeetCode'
]
async function main(): Promise<void> {
  // 读取参数: 用户 ID
  const USER_ID = core.getInput('user_id')
  // 读取参数: 平台 PLAT_FORM
  const PLAT_FORM = (core.getInput('platform')) as string
  if (!SUPPORT_PLAT_FORM.includes(PLAT_FORM))
    return core.setFailed(`平台: ${PLAT_FORM}暂不支持,请提issue`)
  try {
    core.info('1.获取页面数据...')
    const commonPosts =  await getData({
      user_id: USER_ID,
      platform: PLAT_FORM,
    })??[]

    core.info('2. 生成 html中...')
    const itemHtml = commonPosts.map((item)=>`<div>${item}</div>`)
    const appendHtml = `<div style="display:flex;justify-content:center;align-items:center;flex-flow:column wrap">${itemHtml}</div>`
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
