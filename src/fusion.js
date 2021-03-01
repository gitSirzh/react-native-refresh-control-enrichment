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
import PropTypes from 'prop-types';

import MJRefresh from './iosJS/MJRefresh';
import {default as SmartRefreshControl} from './androidJS/SmartRefreshControl';
import {default as AnyHeader} from './androidJS/AnyHeader';
import dateFormat from './util/date';

const TITLE = ['下拉刷新', '释放刷新', '正在刷新', '刷新完成'];

export default class ZHRefreshControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: props.titleArray ? props.titleArray[0] : TITLE[0],
        };
    }

    finishRefresh() {
        if (Platform.OS === 'ios') {
            this._mjRefresh && this._mjRefresh.finishRefresh();
        } else {
            this.rc && this.rc.finishRefresh();
        }
    }

    renderHeader() {
        let {text} = this.state;
        let {
            loadingView,
            headerHeight,
            centerTop,
            headerBackgroundColor,
            headerBackgroundImage,
            pullView,
            releaseView,
            successView,
            headerTitleStyle,
            headerDateStyle,
            titleArray,
            showDate,
            showText,
        } = this.props;
        if (headerBackgroundImage) {
            return (
                <ImageBackground style={[styles.headView, {height: headerHeight + centerTop}]}
                                 source={headerBackgroundImage}>
                    <View style={[styles.headView, {flexDirection: 'row', marginTop: centerTop}]}>
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
                <View style={[styles.headView, {
                    height: headerHeight + centerTop,
                    backgroundColor: headerBackgroundColor,
                }]}>
                    <View style={[styles.headView, {flexDirection: 'row', marginTop: centerTop}]}>
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
        let {onRefresh, refreshState, headerHeight, centerTop, headerBackgroundColor, titleArray} = this.props;
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
                    headerHeight={headerHeight + centerTop}
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

ZHRefreshControl.defaultProps = {
    headerHeight: 60,
    centerTop: 0,
    headerBackgroundColor: '#ffffff',
    headerTitleStyle: {fontSize: 14, color: '#333333'},
    headerDateStyle: {fontSize: 12, color: '#333333'},
    titleArray: TITLE,
    showDate: true,
    showText: true,
};

/**
 * loadingView : 左边加载中View
 * headerHeight : 头部高度
 * centerTop : 内容距离顶部高度（一般为状态栏高度）
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
 * onRefresh : 执行刷新回调方法
 * refreshState : 刷新状态回调方法
 */
ZHRefreshControl.propTypes = {
    loadingView: PropTypes.element,
    headerHeight: PropTypes.number,
    centerTop: PropTypes.number,
    headerBackgroundColor: PropTypes.string,
    headerBackgroundImage: PropTypes.oneOfType([
        PropTypes.shape({
            uri: PropTypes.string,
        }),
        // Opaque type returned by require('./image.jpg')
        PropTypes.number,
    ]),
    pullView: PropTypes.element,
    releaseView: PropTypes.element,
    successView: PropTypes.element,
    headerTitleStyle: PropTypes.object,
    headerDateStyle: PropTypes.object,
    titleArray: PropTypes.array,
    showDate: PropTypes.bool,
    showText: PropTypes.bool,
    onRefresh: PropTypes.func,
    refreshState: PropTypes.func,
};

const styles = StyleSheet.create({
    headView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

