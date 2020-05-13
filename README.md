# react-native-refresh-control-enrichment

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
            // headerBackgroundColor={'#fff'} //头部背景色和头部背景图片单独使用，建议：尽量不要结合使用
            headerBackgroundImage={{uri:'https://youimg1.c-ctrip.com/target/100k0q000000gqxudED0D.jpg'}} //头部背景图片
            headerTitleStyle={{fontSize: 14, color: '#fff'}} //加载状态字体样式
            headerDateStyle = {{fontSize: 12, color: '#fff'}} //更新时间字体样式
            titleArray={['下拉刷新', '释放刷新', '正在刷新', '刷新完成']} //自定义提示状态，注：数量需要为四个
            loadingView={(<ActivityIndicator color={'#797979'}/>)} //刷新中样式
            pullView={(<Text>{'⬇️'}</Text>)} //下拉样式，可自定义View
            releaseView={(<Text>{'⬆️️️'}</Text>)} //释放样式，可自定义View
            onRefresh={()=>{
                console.log('======== 执行刷新 ========');
            }}
            refreshState={(state)=>{
                console.log(`======== 当前刷新的状态:${state} ========`);
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
