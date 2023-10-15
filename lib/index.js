"use strict";
/*
 * @Author: 18300875296 1453622610@qq.com
 * @Date: 2023-10-15 12:10:35
 * @LastEditors: 18300875296 1453622610@qq.com
 * @LastEditTime: 2023-10-15 13:53:48
 * @FilePath: \Testc:\Users\1\Desktop\LeetCode-Action\src\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const core_1 = __importDefault(require("@actions/core"));
const fs = __importStar(require("fs"));
const SUPPORT_PLAT_FORM = [
    'LeetCode'
];
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // 读取参数: 用户 ID
        const USER_ID = core_1.default.getInput('user_id');
        // 读取参数: 平台 PLAT_FORM
        const PLAT_FORM = (core_1.default.getInput('platform'));
        if (!SUPPORT_PLAT_FORM.includes(PLAT_FORM))
            return core_1.default.setFailed(`平台: ${PLAT_FORM}暂不支持,请提issue`);
        try {
            core_1.default.info('1.获取页面数据...');
            const commonPosts = (_a = (0, main_1.getData)({
                user_id: USER_ID,
                plat_form: PLAT_FORM,
            })) !== null && _a !== void 0 ? _a : [];
            core_1.default.info('2. 生成 html中...');
            const itemHtml = commonPosts.map((item) => `<div>${item}</div>`);
            const appendHtml = `<div style="display:flex;justify-content:center;align-items:center;flex-flow:column wrap">${itemHtml}</div>`;
            core_1.default.info(`3. 读取 README, 在 <!-- leetCode start --> 和 <!-- leetCode end --> 中间插入生成的 html: \n ${appendHtml}`);
            const README_PATH = './README.md';
            const res = fs.readFileSync(README_PATH, 'utf-8')
                .replace(/(?<=<!-- leetCode start -->)[.\s\S]*?(?=<!-- leetCode end -->)/, `${appendHtml}`);
            core_1.default.info('4. 修改 README ...');
            fs.writeFileSync(README_PATH, res);
            core_1.default.info(`5. 修改结果: ${res}`);
        }
        catch (error) {
            core_1.default.setFailed(error);
        }
    });
}
main();
