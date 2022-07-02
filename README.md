# 前台实现


## 实现效果
![protable.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23e46f838af64cd9a21e55ce1e89cdcf~tplv-k3u1fbpfcp-watermark.image?)
## 技术栈

vue3 + typescript + element-plus

## 使用方法

```ts
<template>
  <el-tabs type="border-card" v-model="activeName">
    <el-tab-pane
    :label="item.label"
    v-for="(item, index) in templateConfig"
    :key="index" :name="item.name"
    lazy
    >
    <!--所有的 slot内容都在表格内部处理好， columnsType进行区分-->
    <pro-table
      :columns="item.columns"
      :type="item.name"
      :request-url="requestUrl"
    >
    </pro-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ProTable from './components/ProTable/index.vue'
import { ColumnProps, RequestUrl } from './components/ProTable/types'
import { projectConfig, projectConfigBatchDelete } from './service/api'
const activeName = ref('user')

interface TemplateConfig {
  name: string
  label: string
  columns: ColumnProps[],
}

const requestUrl: RequestUrl = {
  create: projectConfig,
  list: projectConfig,
  update: projectConfig,
  destroy: projectConfig,
  batchDelete: projectConfigBatchDelete
}

const templateConfig = ref<TemplateConfig[]>([
  {
    label: 'ProTable',
    name: 'user',
    columns: [
      {
        key: 'userName',
        title: '用户名',
        searchType: 'el-input'
      },
      {
        key: 'password',
        title: '密码',
        searchType: 'el-input'
      },
      {
        key: 'email',
        title: '邮箱',
        searchType: 'el-input'
      },
      {
        key: 'phone',
        title: '手机号',
        searchType: 'el-input'
      },
      {
        key: 'role',
        title: '角色',
        searchType: 'z-select',
        attrs: {
          options: [
            {
              label: '管理员',
              value: 'admin'
            },
            {
              label: '普通用户',
              value: 'user'
            }
          ]
        }
      },
      {
        key: 'status',
        title: '状态',
        searchType: 'z-select',
        attrs: {
          options: [
            {
              label: '启用',
              value: 1
            },
            {
              label: '禁用',
              value: 0
            }
          ]
        },
        columnType: 'status'
      },
      {
        key: 'hasUseArray',
        title: '是否使用数组参数?',
        search: false,
        searchType: 'useExpandField',
        show: false,
        add: false
      },
      {
        key: 'arrayParams',
        title: '数组参数',
        searchType: 'z-array',
        search: false,
        width: 120,
        add: false,
        show: false
      },
      {
        key: 'hasUseArray',
        title: '是否使用JSON参数?',
        search: false,
        searchType: 'useExpandField',
        show: false,
        add: false
      },
      {
        key: 'jsonParams',
        title: 'JSON参数',
        searchType: 'z-json',
        search: false,
        width: 120,
        add: false,
        show: false
      },
      {
        key: 'createdAt',
        title: '创建时间',
        width: 180,
        searchType: 'el-date-picker',
        add: false
      },
      {
        key: 'updatedAt',
        title: '更新时间',
        width: 180,
        searchType: 'el-date-picker',
        add: false
      },
      {
        key: 'action',
        title: '操作',
        search: false,
        add: false,
        width: 150
      }
    ]
  }
])
</script>
<style lang="less">

</style>

```

## ProTable 设计思路

页面整体分为5个区域，

1. 表单搜索区域
2. 表格功能按钮区域
3. 表格右上角操作区域
4. 表格主题区域
5. 表格分页区域

要考虑的问题？ 

1. 那些区域是要支持传入slot的？
2. 表格原有的slot是否要交给用户来传递,还是在内部进行封装？如`colum`是状态的时候需要映射成`tag`，是`数组`类型的时候映射成表格，是`json`的时候需要点击查看详情？假设每个表格都要处理的的话就太麻烦，我们希望通过一个字段来控制它。
3. 有`column`的某一列是否需要复制的功能？
4. 列字段需要编辑的功能？


实现的过程中有哪些细节？

1. 表格的高度，把可表格可视区域的大小交给用户自己来控制，把批量操作按钮放在最下面(`fixed`定位)。这样用户可以在最大区域内看到表格的内容。


## 编码风格

1. 组件上面属性如果超过三个，就换行
2. eslint使用的是`standard`风格。


## css 小知识

```html
<div class='box'>
  <div class='z'></div>
</div>
```

```css
*{
  box-sizing: border-box;
}
.box{
  display: inline-block;
    vertical-align: top;
}
.z{
  height: 32px;
  border: 1px solid;
  width: 100px;
  display: inline-block;
}
```

如果把盒子变成了`行内`元素之后，若其内部还是行内元素，那么就会产生间隙，就会导致其高度与父元素高度不同。如下。


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8830fdc86dec428da138356f2820af15~tplv-k3u1fbpfcp-watermark.image?)


解决方法也很简单，则需要设置其子元素的`vertical-align`属性，或者设置`font-size: 0`，其根本原因是因为中间的文本元素也占位置。再或者不使用`inline-block`,换做`inline-flex`属性完全没有问题，因为在`element-plus`组件库中也大量的使用了这个属性，兼容性也很nice。

这个几个解决方法很早就知道了，就是关于`vertical-algin`这个，以及与`line-height`的关系还是有点模糊，一直也没去深究。


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12e9560bbf5b457cb5b51c08471cfb51~tplv-k3u1fbpfcp-watermark.image?)

放两篇文章

[深入浅出vertical-align和line-height](https://blog.csdn.net/woyuanliulian/article/details/80929799)
[简单说 CSS的vertical-align](https://blog.csdn.net/fe_dev/article/details/75948659)

还有联想到`baseline`这个东西在`flex`,align-items属性：交叉轴上的一个属性很像。

[链接](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

## 表格操作

1. 添加数据之后，重新获取数据的时候`pageIndex`要重置为1，删除数据的时候也是一样。
2. 编辑数据的时候，`pageIndex`不变，还是当前页码。
3. 总结下来，就是当数据条数会发生改变的时候，都会重置`pageIndex`为`1`。当用户操作不会影响数据总条数的时候，`pageSize`还维持当前不变。

## 总结

1. 使用了一个库，可以监听dom元素大小的变化，[resize-observer-polyfill](https://github.com/que-etc/resize-observer-polyfill)。


2. 在 3.x 中，如果一个元素同时定义了 `v-bind="object"` 和一个相同的独立 attribute。开发者可以自己选择要保留哪一个。
```html
<!-- 模板 -->
<div id="red" v-bind="{ id: 'blue' }"></div>
<!-- 结果 -->
<div id="blue"></div>

<!-- 模板 -->
<div v-bind="{ id: 'blue' }" id="red"></div>
<!-- 结果 -->
<div id="red"></div>
```
文档地址[# v-bind 合并行为](https://v3.cn.vuejs.org/guide/migration/v-bind.html#_2-x-%E8%AF%AD%E6%B3%95)
## 参考文章

[一个较新的JavaScript API——ResizeObserver 的使用](https://juejin.cn/post/6862321554686214158)

## 后期功能扩展

1. 字段之间有关联关系情况的处理，暂时还没想好。
2. 扩展一下`slot`
3. 等等。。

迭代中....
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36804675f0c748e89537a751a7e0b4fd~tplv-k3u1fbpfcp-watermark.image?)

# 后台实现


## 数据库 mysql

我这里使用的是 `xampp`安装的，我们来查看一下版本。这是什么版本？假的吧，真的到10了吗？ 先不管了，能用就行。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/282fceeb9f374816bda31b8896692470~tplv-k3u1fbpfcp-watermark.image?)

建表

```sql
CREATE TABLE `project_config`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置类型',
  `value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '配置的json字符串',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 65 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = COMPACT;
```

## 新建项目

```bash
npm init egg --type=simple
```
项目目录大致如下所示，

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75cfeff082c8434e8ade799b0443a55b~tplv-k3u1fbpfcp-watermark.image?)

## RESTful 风格的 URL 定义

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e3b64ef12b241619d0611fa1149b737~tplv-k3u1fbpfcp-watermark.image?)


## Sequelize

```bash
npm install --save egg-sequelize mysql2
```

- 在 `config/plugin.js` 中引入 egg-sequelize 插件， 这里我们引入了一个库`egg-cors`来帮我们实现`cors`。

```js
'use strict';

/** @type Egg.EggPlugin */
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};
```
- 在 `config/config.default.js` 中编写 sequelize 配置

```js
/* eslint valid-jsdoc: "off" */

'use strict';


/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1655529530112_7627';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // sequelize

  const sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'test_database',
    timezone: '+08:00',
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    define: {
      freezeTableName: true, // 模型名强制和表明一致
      underscored: true, // 字段以下划线（_）来分割（默认是驼峰命名风格）
    },
  };

  return {
    ...config,
    ...userConfig,
    sequelize,
  };
};

```
1、时间格式化

类型需要采用：`Sequelize.DATE`

初始化Sequelize的时候传入dialectOptions参数，及timezone

```js
timezone: '+08:00',  // 改为标准时区
dialectOptions: {
  dateStrings: true,
  typeCast: true,
},
```

下面就开始编写

## controller

对这块需要安装`lodash`，懂的都懂。

controller/ProjectConfig.js

```js
'use strict';

const { success } = require('../utils/res');

const { omit, pick } = require('lodash');


const Controller = require('egg').Controller;

class ProjectConfigController extends Controller {
  async index() {
    const { ctx } = this;
    const { pageSize, pageIndex } = ctx.query;
    const { Op, fn, col, where, literal } = this.app.Sequelize;
    // 固定的查询参数
    const stableQuery = pick(ctx.query, [ 'type', 'createdAt', 'updatedAt' ]);
    const stableQueryArgs = Object.keys(stableQuery)
      .filter(key => Boolean(stableQuery[key]))
      .map(key => {
        return {
          [key]: stableQuery[key],
        };
      });

    const whereCondition = omit(ctx.query, [ 'pageIndex', 'pageSize', 'type', 'createdAt', 'updatedAt' ]);
    // 需要模糊查询的参数
    const whereArgs = Object.keys(whereCondition)
      .filter(key => Boolean(whereCondition[key]))
      .map(key => {
        return where(fn('json_extract', col('value'), literal(`\'$.${key}\'`)), {
          [Op.like]: `%${whereCondition[key]}%`,
        });
      });

    const query = {
      where: {
        [Op.and]: [
          ...stableQueryArgs,
          ...whereArgs,
        ],
      },
      order: [
        [ 'createdAt', 'DESC' ],
      ],
      limit: Number(pageSize), // 每页显示数量
      offset: (pageIndex - 1) * pageSize, // 当前页数
    };
    const data = await ctx.model.ProjectConfig.findAndCountAll(query);
    ctx.body = success(data);
  }

  async create() {
    const { ctx } = this;
    const { type, value } = ctx.request.body;
    const data = await ctx.model.ProjectConfig.create({ type, value });
    ctx.body = success(data);
  }

  async update() {
    const { ctx } = this;
    const { type, value } = ctx.request.body;
    const { id } = ctx.params;
    const data = await ctx.model.ProjectConfig.update({ type, value }, { where: { id } });
    ctx.body = success(data);
  }

  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    console.log(id);
    const data = await ctx.model.ProjectConfig.destroy({ where: { id } });
    ctx.body = success(data);
  }

  async batchDestroy() {
    const { ctx } = this;
    const { ids } = ctx.request.body;
    console.log(ids);
    const { Op } = this.app.Sequelize;
    const data = await ctx.model.ProjectConfig.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });
    ctx.body = success(data);
  }
}


module.exports = ProjectConfigController;

```
模糊查询
```sql
SELECT json_extract(字段名,'$.json结构') FROM 表名;
```
sequelize高级查询

```js
Post.findAll({
  where: sequelize.where(sequelize.fn('char_length', sequelize.col('content')), 7)
});
// SELECT ... FROM "posts" AS "post" WHERE char_length("content") = 7
```
[中文文档](https://www.sequelize.com.cn/core-concepts/model-querying-basics#%E9%AB%98%E7%BA%A7%E6%9F%A5%E8%AF%A2%E4%B8%8D%E4%BB%85%E9%99%90%E4%BA%8E%E5%88%97)，英文看的吃力，看中文的也无妨，不寒碜。^_^

## model

model/project_config.js
```js
'use strict';


module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const ProjectConfig = app.model.define('project_config', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: STRING },
    value: {
      type: TEXT,
      get() {
        return this.getDataValue('value') ? JSON.parse(this.getDataValue('value')) : null;
      },
      set(value) {
        this.setDataValue('value', JSON.stringify(value));
      },
    },
    createdAt: { type: DATE },
    updatedAt: { type: DATE },
  });

  return ProjectConfig;
};

```

## API 文档 Apifox

先快速测试一把，然后去对前端代码。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a49a36f6edb344c49510fd7ecb99ce03~tplv-k3u1fbpfcp-watermark.image?)

## ts用到的一些只是

1. 在类型别名（type alias）的声明中可以使用 `keyof`、`typeof`、`in` 等关键字来进行一些强大的类型操作

```ts
interface A {
  x: number;
  y: string;
}
// 拿到 A 类型的 key 字面量枚举类型，相当于 type B = 'x' | 'y'
type B = keyof A;

const json = { foo: 1, bar: 'hi' };
// 根据 ts 的类型推论生成一个类型。此时 C 的类型为 { foo: number; bar: string; }
type C = typeof json;

// 根据已有类型生成相关新类型，此处将 A 类型的所有成员变成了可选项，相当于 type D = { x?: number; y?: string; };
type D = {
  [T in keyof A]?: A[T];
};

```

在比如用一个联合类型来约束对象的`key`，用`interface`我就没实现，貌似.

```ts
export type FormItemType = 'el-input' | 'z-select' | 'el-date-picker'

// 目前发现 interface 的key 只能是三种 string number symbol   keyof any
type IPlaceholderMapping = {
  [key in FormItemType]: string
}

export const placeholderMapping: IPlaceholderMapping = {
  'el-input': '请输入',
  'z-select': '请选择',
  'el-date-picker': '请选择日期'
}
```


我正在参与掘金技术社区创作者签约计划招募活动，[点击链接报名投稿](https://juejin.cn/post/7112770927082864653 "https://juejin.cn/post/7112770927082864653")。


