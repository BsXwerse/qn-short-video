# qn-short-video

#### 简介

本项目为使用七牛云oss服务，nextjs，prisma，nextAuth，postgresql等构建的全栈web应用程序，支持视频滚动播放，Oauth登录，上传视频，收藏视频，视频分类，关注，视频搜索，夜间模式切换，移动端适配

#### 在线体验

https://qn-short-video.vercel.app/

#### 设计文档

[doc](./docs/架构设计文档.md)

#### 本地运行

创建.env文件配置相关环境变量，示例为.env.example

```shell
pnpm install
pnpm prisma db push
pnpm build
pnpm start
```
