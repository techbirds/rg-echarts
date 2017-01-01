### rg-echarts

>  :tiger: Regularjs + Echarts 

#### 依赖环境

- [regular@0.5.1](http://regularjs.github.io/)
- [echarts@3.3.2](http://echarts.baidu.com/)
- [lodash@4.17.3](https://lodash.com/)

#### 安装运行

    npm install rg-echarts --save-dev

#### 组件特点

- 独立、可复用
  充分发挥regular组件独立、可复用的特性。
- 简单、灵活
  前期尽量避免深度抽象数据选项,防止额外增加学习成本,同时也保证图形组件的灵活特性
  
#### 组件亮点

- [x] 支持图形联动配置
- [x] 支持自定义主题配置
- [x] 数据区域缩放组件配置入口
- [x] 事件配置入口
- [x] 开放图形组件的实例
- [x] 工具栏配置入口

#### 使用案列

##### HTML

```
<chart ref="c1" option="{option}" config="{config}" class="col-md-5 echarts"></chart>
```

##### JavaScript

```
this.data.config = {
  // 主题设置
  theme: 'dark',
  // 事件设置
  event : {
    click : action
  },
  // 数据区间开关
  dataZoom : true,
  // 右上角工具栏开关
  toolbox : true,
  // 组件标识唯一id
  name: 'chart1',
  // 指定联动的组件,通过唯一标识来指定
  link : 'chart2'
}

this.data.option = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
}
```

BTW: 更多使用请详细参考`example`的示例。

#### TO DO

- 丰富示例
- 模拟更多应用场景
- 完善README.md

