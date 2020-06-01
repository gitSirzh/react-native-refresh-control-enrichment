/**
 * Created by jszh on 2020/5/13.
 */

export default function dateFormat() {
    let date = new Date(new Date() - 0);
    let y = date.getFullYear();                         //年
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;                         //月
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;                         //天
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;                         //时
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;     //分
    let second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;     //秒
    return m + '-' + d + ' ' + h + ':' + minute;
}
