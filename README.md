## react-native-refresh-control-enrichment
[![npm version](https://badge.fury.io/js/react-native-refresh-control-enrichment.svg)](https://badge.fury.io/js/react-native-refresh-control-enrichment)

Native Refresh

## Android
![](https://github.com/gitSirzh/react-native-refresh-control-enrichment/blob/master/src/file/androidVideo.gif)

## IOS
![](https://github.com/gitSirzh/react-native-refresh-control-enrichment/blob/master/src/file/iosVideo.gif)

## Using npm

```shell
npm install react-native-refresh-control-enrichment --save
```

or using yarn:

```shell
yarn add react-native-refresh-control-enrichment
```

## Installation

#### react-native version >= 0.61.5
After that, we need to install the dependencies to use the project on iOS(you can skip this part, if you are using this on Android)
Now run：```cd ios && pod install```

## Using
```javascript
import ZHRefreshControl, {ZHScrollView} from 'react-native-refresh-control-enrichment';

<ZHScrollView
    style={{flex: 1}}
    refreshControl={
        <ZHRefreshControl
            ref={(r) => this._finishRefresh = r}
            headerHeight={80} // headerHeight
            headerBackgroundColor={'#e6e6e6'} // headerBackgroundColor and headerBackgroundImage, do not combine
            onRefresh={()=>{
                console.log('======== Refreshing ========');
                setTimeout(()=>{
                    // Refreshing End
                    this._finishRefresh.finishRefresh();
                    console.log('======== Refreshing End ========');
                },2000)
            }}
        />
    }
>
    <View style={{flex: 1, height: 1000, backgroundColor: '#dddddd', alignItems: 'center', paddingTop: 300}}>
        <Text style={{color: '#000', fontSize: 16}}>⬇️ down 😊</Text>
    </View>
</ZHScrollView>
```
## Using In FlatList
```javascript
import {FlatList} from 'react-native';
import ZHRefreshControl, {ZHScrollView} from 'react-native-refresh-control-enrichment';

<FlatList
    data={['#8c4fff', '#f0b1ff', '#908c95', '#effba5', '#2b2cff', '#009c18']}
    renderScrollComponent={() => (
        <ZHScrollView
            style={{flex: 1}}
            refreshControl={
                <ZHRefreshControl
                    ref={(r) => this._finishRefresh = r}
                    headerHeight={80} // headerHeight
                    headerBackgroundColor={'#e6e6e6'} // headerBackgroundColor and headerBackgroundImage, do not combine
                    onRefresh={()=>{
                        console.log('======== Refreshing ========');
                        setTimeout(()=>{
                            // Refreshing End
                            this._finishRefresh.finishRefresh();
                            console.log('======== Refreshing End ========');
                        },2000)
                    }}
                />
            }
        />
    )}
    keyExtractor={(item, key) => key.toString()}
    renderItem={({item, index}) => (
        <View style={{backgroundColor: item, marginHorizontal: 15, height: 100, borderRadius: 20, marginTop: 15}}/>
    )}
/>
```

## Documentation

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

加载中View

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
| style | Yes       |

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
| style | Yes       |

---

### `titleArray`

自定义提示状态，注：数量需要为四个

| Type | Default |
| ---- | -------- |
| array | yes       |

---

### `pullView`

下拉 LoadingView

| Type | Default |
| ---- | -------- |
| element | Yes       |

---

### `releaseView`

释放 LoadingView

| Type | Default |
| ---- | -------- |
| element | Yes       |

---

### `successView`

成功 LoadingView

| Type | Default |
| ---- | -------- |
| element | Yes       |

---

## Reference library：
#### Android：
    https://github.com/react-native-studio/react-native-SmartRefreshLayout
#### iOS：
    https://github.com/react-native-studio/react-native-MJRefresh
