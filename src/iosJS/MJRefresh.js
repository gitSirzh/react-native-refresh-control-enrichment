import React, {Component} from 'react';
import {
    View,
    requireNativeComponent,
    ViewPropTypes as RNViewPropTypes,
    findNodeHandle,
    UIManager,
    Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import MJScrollView from './MJScrollView';

const ViewPropTypes = RNViewPropTypes || View.propTypes;
const RCTMJRefreshView = Platform.OS === 'ios' ? requireNativeComponent('RCTMJRefreshView', MJRefresh) : null;

class MJRefresh extends Component {

    _onMJRefresh = () => {
        let {onRefresh} = this.props;
        onRefresh && onRefresh();
    };

    _onMJPulling = (e) => {
        let {onPulling} = this.props;
        onPulling && onPulling(e);
    };

    _onMJReleaseToRefresh = () => {
        let {onReleaseToRefresh} = this.props;
        onReleaseToRefresh && onReleaseToRefresh();
    };

    _onMJRefreshIdle = () => {
        let {onRefreshIdle} = this.props;
        onRefreshIdle && onRefreshIdle();
    };

    finishRefresh = () => {
        this.dispatchCommand('finishRefresh');
    };

    beginRefresh = () => {
        this.dispatchCommand('beginRefresh');
    };

    dispatchCommand(commandName, params) {
        UIManager.dispatchViewManagerCommand(this.findNode(), UIManager.RCTMJRefreshView.Commands[commandName], params);
    }

    findNode = () => {
        return findNodeHandle(this.refs.refreshView);
    };

    render() {
        let {style} = this.props;
        return (
            <RCTMJRefreshView
                ref='refreshView'
                {...this.props}
                onMJRefresh={this._onMJRefresh}
                onMJRefreshIdle={this._onMJRefreshIdle}
                onMJReleaseToRefresh={this._onMJReleaseToRefresh}
                onMJPulling={this._onMJPulling}
                style={[
                    {
                        backgroundColor: 'transparent',
                    },
                    style,
                    {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                    },
                ]}
            />
        );
    }
}

MJRefresh.propTypes = {
    onRefresh: PropTypes.func,
    onRefreshIdle: PropTypes.func,
    onReleaseToRefresh: PropTypes.func,
    onPulling: PropTypes.func,
    ...ViewPropTypes,
};

export const ZHScrollView = MJScrollView;
export default MJRefresh;
