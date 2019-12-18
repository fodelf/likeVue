<h2 align="center">
 LikeVue
</h2>
<p>
   原因：策略模式的应用, 场景在ts 里使用vue的api，现应用于ng 中实现watch
   PS:此项目初级阶段也是使用了vue2的核心代码，没有使用vue3的原因是没有必要监听当前设想如此
</p>
<p>
Use vue api in ts, now used to implement watch in ng
</p>
<p>
全部开源
</p>

### Links/相关链接

掘金 https://juejin.im/post/5df9fdec6fb9a0163d1a6748

### Features

1. 支持场景

   - [x] ng ts
   - [ ] react
   - [ ] other

#### 技术栈（当前）

1. 前端：[ts,js]

## Project setup

```
npm install  like-vue 
```

##  Example

```
import {LikeVue} from 'like-vue'; 

export class TestComponent implements OnInit {
 @LikeVue()
 $watch() {
      return {
        // 监听的属性
        "prop":(value)=>{
          // do something
        }
      };
    }
}
```
## Thanks
```
https://github.com/vuejs
```