# react-native-refresh-control-enrichment

原生下拉刷新组件

#### 如果感觉不错，[请点个🌟](https://github.com/gitSirzh/react-native-refresh-control-enrichment)

## 演示
## Android
![](https://github.com/gitSirzh/react-native-refresh-control-enrichment/blob/master/src/file/androidVideo.gif)

## IOS
![](https://github.com/gitSirzh/react-native-refresh-control-enrichment/blob/master/src/file/iosVideo.gif)

## 安装

Using npm:

```shell
npm install react-native-refresh-control-enrichment --save
```

or using yarn:

```shell
yarn add react-native-refresh-control-enrichment
```
```
# RN >= 0.61.5
cd ios && pod install
```

## 使用
```javascript
import ZHRefreshControl, {ZHScrollView} from 'react-native-refresh-control-enrichment';

<ZHScrollView
    style={{flex: 1}}
    refreshControl={
        <ZHRefreshControl
            ref={(r) => this._finishRefresh = r}
            headerHeight={80} //头部高度
            headerBackgroundColor={'#e6e6e6'} //头部背景色和头部背景图片单独使用，不要结合使用
            onRefresh={()=>{
                console.log('======== 执行刷新 ========');
                setTimeout(()=>{
                    //加载完成
                    this._finishRefresh.finishRefresh();
                },2000)
            }}
        />
    }
>
    <View style={{flex: 1, height: 1000, backgroundColor: '#dddddd', alignItems: 'center', paddingTop: 300}}>
        <Text style={{color: '#000', fontSize: 16}}>⬇️ 拉刷一刷😊</Text>
    </View>
</ZHScrollView>
```
## 结合`FlatList`使用
```javascript
import ZHRefreshControl, {ZHScrollView} from 'react-native-refresh-control-enrichment';

<FlatList
    data={['#8c4fff', '#f0b1ff', '#908c95', '#effba5', '#2b2cff', '#009c18']}
    renderScrollComponent={(props) => (
        <ZHScrollView
            style={{flex: 1}}
            refreshControl={
                <ZHRefreshControl
                    ref={(r) => this._finishRefresh = r}
                    headerHeight={80} //头部高度
                    headerBackgroundColor={'#e6e6e6'} //头部背景色和头部背景图片单独使用，不要结合使用
                    onRefresh={()=>{
                        console.log('======== 执行刷新 ========');
                        setTimeout(()=>{
                            //加载完成
                            this._finishRefresh.finishRefresh();
                        },2000)
                    }}
                />
            }
            {...props}
        />
    )}
    keyExtractor={(item, key) => key.toString()}
    renderItem={({item, index}) => (
        <View style={{backgroundColor: item, marginHorizontal: 15, height: 100, borderRadius: 20, marginTop: 15}}/>
    )}
/>
```

## 拓展
##### 1、loading动画可以参考组件:[lottie-react-native](https://github.com/react-native-community/lottie-react-native)
##### 2、也可以参考组件:[react-native-spinkit](https://github.com/maxs15/react-native-spinkit)

## 文档

## Props

### `onRefresh`

刷新时触发

| Type | Required |
| ---- | -------- |
| function | Yes       |

---

### `refreshState`

刷新时状态

| Type | Required |
| ---- | -------- |
| function | Yes       |

---

### `loadingView`

加载中样式

| Type | Default |
| ---- | -------- |
| element | Yes       |

---

### `headerHeight`

头部高度

| Type | Default |
| ---- | -------- |
| number | 60       |

---

### `centerTop`

内容距离顶部高度（一般为状态栏高度）

| Type | Default |
| ---- | -------- |
| number | 0       |

---

### `headerBackgroundColor`

头部背景色

| Type | Default |
| ---- | -------- |
| string | #ffffff     |

---

### `headerBackgroundImage`

头部背景图片

| Type | Required |
| ---- | -------- |
| url | Yes       |

---

### `showText`

展示刷新状态

| Type | Default |
| ---- | -------- |
| boolean | Yes       |

---

### `headerTitleStyle`

刷新状态字体样式

| Type | Default |
| ---- | -------- |
| object | Yes       |

---

### `showDate`

展示刷新时间

| Type | Default |
| ---- | -------- |
| boolean | Yes       |

---

### `headerDateStyle`

更新时间字体样式

| Type | Default |
| ---- | -------- |
| object | Yes       |

---

### `titleArray`

自定义提示状态，注：数量需要为四个

| Type | Default |
| ---- | -------- |
| array | yes       |

---

### `pullView`

下拉样式

| Type | Default |
| ---- | -------- |
| element | Yes       |

---

### `releaseView`

释放样式

| Type | Default |
| ---- | -------- |
| element | Yes       |

---

### `successView`

成功样式

| Type | Default |
| ---- | -------- |
| element | Yes       |

---


## 来源：
    https://github.com/react-native-studio/react-native-SmartRefreshLayout
    https://github.com/react-native-studio/react-native-MJRefresh
