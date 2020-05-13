/**
 * Created by jszh on 2020/5/12.
 */

'use strict';

import React, {Component} from 'react';
import {View, Text, Platform, StyleSheet, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

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

const propTypes = {
    onRefresh: PropTypes.func,
    refreshState: PropTypes.func,
    headerView: PropTypes.element,
    headerHeight: PropTypes.number,
    headerBackgroundColor: PropTypes.string,
    headerTitleStyle: Object,
    headerDateStyle: Object,
};

const defaultProps = {
    headerHeight: 60,
    headerBackgroundColor: '#ffffff',
    headerTitleStyle: {fontSize: 14, color: '#333333'},
    headerDateStyle: {fontSize: 12, color: '#333333'},
};

/**
 * loadingView : 左边加载中View
 * headerHeight : 头部高度
 * headerBackgroundColor : 头部背景
 * headerTitleStyle : 加载状态字体样式
 * headerDateStyle : 更新时间字体样式
 * **/

class ZHRefreshControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: props.titleArray[0],
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
            headerTitleStyle = {fontSize: 14, color: '#333333'},
            headerDateStyle = {fontSize: 12, color: '#333333'},
            titleArray = ['下拉加载','松开加载','正在加载','加载完成']
        } = this.props;
        return (
            <View style={[styles.headView, {
                height: headerHeight,
                backgroundColor: headerBackgroundColor,
            }]}>
                <View style={[styles.headView, {flexDirection: 'row'}]}>
                    {text === titleArray[2] ? (
                        <>{loadingView ? (loadingView) : (<ActivityIndicator color={'#797979'}/>)}</>
                    ) : text === titleArray[0] ? (
                        <Text>{'⬇️'}</Text>
                    ) : text === titleArray[1] ? (
                        <Text>{'⬆️️'}</Text>
                    ) : null}
                    <Text style={[{marginLeft: 5}, headerTitleStyle]}>{text}</Text>
                </View>
                <Text style={[{marginTop: 3}, headerDateStyle]}>上次更新 {dateFormat()}</Text>
            </View>
        );
    }

    render() {
        let {text} = this.state;
        let {
            onRefresh,
            refreshState,
            headerHeight = 60,
            headerBackgroundColor = '#ffffff',
            titleArray = ['下拉加载','松开加载','正在加载','加载完成']
        } = this.props;
        if (Platform.OS === 'ios') {
            return (
                <MJRefresh
                    {...this.props}
                    ref={ref => this._mjRefresh = ref}
                    onPulling={e => {
                        if (e.nativeEvent.percent < 0.1) {
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
                    onHeaderReleased={() => {
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

