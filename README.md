# create-vite-vercel

A cli to create vite app, push to github and deploy to vercel

[![npm](https://img.shields.io/npm/v/create-vite-vercel?color=green)](https://www.npmjs.com/package/create-vite-vercel)
[![](https://img.shields.io/badge/CN-docs-red)](https://juejin.cn/user/1469381099657902)

## Main Git

- git config --global xxx: 在全局git配置上操作
- git config --global cvv.secret xxx: 在全局git配置中添加配置
- git config --global --add cvv.secret xxx: 在全局git配置中添加配置，与上一个不同的是，可以添加key相同的配置，两个key-value都存在于git配置中
- git config --global --replace-all cvv.secret xxx: 在全局git配置中添加配置，如果key有多个，则全都替换成这一个配置
- git config --global --get cvv.secret: 在全局git配置中获取配置
- git config --global --unset cvv.secret: 在全局git配置中删除配置
