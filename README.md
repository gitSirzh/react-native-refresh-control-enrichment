# react-native-refresh-control-enrichment

原生下拉刷新组件

## 演示

## Android
#### ![](https://github.com/gitSirzh/react-native-refresh-control-enrichment/blob/master/src/file/androidVideo.gif)

## IOS
#### ![](https://github.com/gitSirzh/react-native-refresh-control-enrichment/blob/master/src/file/iosVideo.gif)

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
            headerHeight={60} //头部高度
            // headerBackgroundColor={'#fff'} //头部背景色，建议：尽量不要和头部背景图片结合使用
            headerBackgroundImage={{uri:'https://youimg1.c-ctrip.com/target/100k0q000000gqxudED0D.jpg'}} //头部背景图片，建议：尽量不要和头部背景色结合使用
            headerTitleStyle={{fontSize: 14, color: '#fff'}} //加载状态字体样式
            headerDateStyle = {{fontSize: 12, color: '#fff'}} //更新时间字体样式
            titleArray={['下拉刷新', '释放刷新', '正在刷新', '刷新完成']} //自定义提示状态，注：数量需要为四个
            loadingView={(<ActivityIndicator color={'#fff'}/>)} //刷新中样式
            onRefresh={()=>{
                console.log('======== 执行刷新 ========');
            }}
        />
    }
>
    <View style={{flex: 1, height: 1000, backgroundColor: '#dddddd', alignItems: 'center', paddingTop: 300}}>
        <Text  style={{color: '#000', fontSize: 16}}>⬇️ 拉刷一刷😊</Text>
        <TouchableOpacity
            style={{padding: 20, borderRadius:10, marginTop: 60, backgroundColor:'#4240ff'}}
            onPress={() => {
                //加载完成
                this._finishRefresh.finishRefresh();
            }}
        >
            <Text style={{color: '#fff', fontSize: 16}}>点击刷新完成</Text>
        </TouchableOpacity>
    </View>
</ZHScrollView>
```

# 文档

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
| function | No       |

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

### `headerBackgroundColor`

头部背景色

| Type | Default |
| ---- | -------- |
| string | '#ffffff'     |

---

### `headerBackgroundImage`

头部背景图片

| Type | Required |
| ---- | -------- |
| url | No       |

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
