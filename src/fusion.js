/**
 * Created by jszh on 2020/5/12.
 */

'use strict';

import React, {Component} from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    ActivityIndicator,
    ImageBackground,
} from 'react-native';

//ios
import MJRefresh from './iosJS/MJRefresh';

//android
import {default as SmartRefreshControl} from './androidJS/SmartRefreshControl';
import {default as ClassicsHeader} from './androidJS/ClassicsHeader';
import {default as StoreHouseHeader} from './androidJS/StoreHouseHeader';
import {default as DefaultHeader} from './androidJS/DefaultHeader';
import {default as AnyHeader} from './androidJS/AnyHeader';

//date
import dateFormat from './util/date';

/**
 * loadingView : 左边加载中View
 * headerHeight : 头部高度
 * headerBackgroundColor : 头部背景色
 * headerBackgroundImage : 头部背景图
 * headerTitleStyle : 刷新状态字体样式
 * headerDateStyle : 更新时间字体样式
 * titleArray : 自定义提示状态，注：数量需要为四个
 * pullView : 下拉样式
 * releaseView : 释放样式
 * successView : 成功样式
 * showDate : 展示刷新时间，默认true：展示
 * showText : 展示刷新状态，默认true：展示
 * **/

const TITLEARRAY = ['下拉刷新', '释放刷新', '正在刷新', '刷新完成'];

class ZHRefreshControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: props.titleArray ? props.titleArray[0] : TITLEARRAY[0],
        };
    }

    finishRefresh() {
        this._mjRefresh && this._mjRefresh.finishRefresh();
        this.rc && this.rc.finishRefresh();
    }

    renderHeader() {
        let {text} = this.state;
        let {
            loadingView,
            headerHeight = 60,
            headerBackgroundColor = '#ffffff',
            headerBackgroundImage,
            pullView,
            releaseView,
            successView,
            headerTitleStyle = {fontSize: 14, color: '#333333'},
            headerDateStyle = {fontSize: 12, color: '#333333'},
            titleArray = TITLEARRAY,
            showDate = true,
            showText = true,
        } = this.props;
        if (headerBackgroundImage) {
            return (
                <ImageBackground style={[styles.headView, {height: headerHeight}]} source={headerBackgroundImage}>
                    <View style={[styles.headView, {flexDirection: 'row'}]}>
                        {text === titleArray[2] ? (
                            <>{loadingView ? (loadingView) : (<ActivityIndicator color={'#797979'}/>)}</>
                        ) : text === titleArray[0] ? (
                            <>{pullView ? (pullView) : <Text>{'⬇️'}</Text>}</>
                        ) : text === titleArray[1] ? (
                            <>{releaseView ? (releaseView) : <Text>{'⬆️️️'}</Text>}</>
                        ) : (
                            <>{successView ? (successView) : null}</>
                        )}
                        {showText ? (
                            <Text style={[{marginLeft: 5}, headerTitleStyle]}>{text}</Text>
                        ) : null}
                    </View>
                    {showDate ? (<Text style={[{marginTop: 3}, headerDateStyle]}>上次更新 {dateFormat()}</Text>) : null}
                </ImageBackground>
            );
        } else {
            return (
                <View style={[styles.headView, {height: headerHeight, backgroundColor: headerBackgroundColor}]}>
                    <View style={[styles.headView, {flexDirection: 'row'}]}>
                        {text === titleArray[2] ? (
                            <>{loadingView ? (loadingView) : (<ActivityIndicator color={'#797979'}/>)}</>
                        ) : text === titleArray[0] ? (
                            <>{pullView ? (pullView) : <Text>{'⬇️'}</Text>}</>
                        ) : text === titleArray[1] ? (
                            <>{releaseView ? (releaseView) : <Text>{'⬆️️️'}</Text>}</>
                        ) : (
                            <>{successView ? (successView) : null}</>
                        )}
                        {showText ? (
                            <Text style={[{marginLeft: 5}, headerTitleStyle]}>{text}</Text>
                        ) : null}
                    </View>
                    {showDate ? (<Text style={[{marginTop: 3}, headerDateStyle]}>上次更新 {dateFormat()}</Text>) : null}
                </View>
            );
        }
    }

    render() {
        let {text} = this.state;
        let {
            onRefresh,
            refreshState,
            headerHeight = 60,
            headerBackgroundColor = '#ffffff',
            titleArray = TITLEARRAY,
        } = this.props;
        if (Platform.OS === 'ios') {
            return (
                <MJRefresh
                    {...this.props}
                    ref={ref => this._mjRefresh = ref}
                    onPulling={e => {
                        if (e.nativeEvent.percent < 1) {
                            this.setState({text: titleArray[0]});
                            refreshState && refreshState(titleArray[0]);
                        }
                    }}
                    onReleaseToRefresh={() => {
                        this.setState({text: titleArray[1]});
                        refreshState && refreshState(titleArray[1]);
                    }}
                    onRefresh={() => {
                        this.setState({text: titleArray[2]});
                        onRefresh && onRefresh();
                        refreshState && refreshState(titleArray[2]);
                    }}
                    onRefreshIdle={() => {
                        this.setState({text: titleArray[3]});
                        refreshState && refreshState(titleArray[3]);
                    }}
                >
                    {this.renderHeader()}
                </MJRefresh>
            );
        } else {
            return (
                <SmartRefreshControl
                    {...this.props}
                    ref={ref => this.rc = ref}
                    primaryColor={headerBackgroundColor}
                    headerHeight={headerHeight}
                    renderHeader={(
                        <AnyHeader>{this.renderHeader()}</AnyHeader>
                    )}
                    onPullDownToRefresh={() => {
                        this.setState({text: titleArray[0]});
                        refreshState && refreshState(titleArray[0]);
                    }}
                    onReleaseToRefresh={() => {
                        this.setState({text: titleArray[1]});
                        refreshState && refreshState(titleArray[1]);
                    }}
                    onRefresh={() => {
                        onRefresh && onRefresh();
                        this.setState({text: titleArray[2]});
                        refreshState && refreshState(titleArray[2]);
                    }}
                    onSuccessToRefresh={() => {
                        this.setState({text: titleArray[3]});
                        refreshState && refreshState(titleArray[3]);
                    }}
                />
            );
        }

    }
}

const styles = StyleSheet.create({
    headView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ZHRefreshControl;

