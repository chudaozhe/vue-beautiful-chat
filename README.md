# 差异
- 改变消息的数据结构
```
[
    {
        id: 1,
        user_id: 1,
        article_id: 1,
        type: 'text',
        pack: {content: 'ww1'},
        create_time: 1651463235,
    },
    {
        id: 2,
        user_id: 2,
        article_id: 1,
        type: 'text',
        pack: {content: 'ww2'},
        create_time: 1651463235,
    },
]
```
- 改变当前用户的逻辑

原来是`author=me`即自己，消息显示在右边；现在改为指定user_id，如cookie中缓存了user_id=1，那么user_id=1的消息就显示在右边

- 精简消息类型

原来的消息类型不符合预期，先精简只保留文本消息，后面再加入常见的消息类型

- 2.5.0及以后版本是我的修改

- 注意`demo/src/App.vue`
```
  data() {
    return {
      user_id: 1,
      room_id: 1,
      title: '标题111'
...
```
`user_id`是当前用户，`title`是标题，`room_id`是聊天室id（整合后端时会用到）
- 打包
```
npm install
npm run build
```
- 运行demo
```
cd demo
npm install
npm run dev
```