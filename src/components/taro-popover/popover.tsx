import Taro from '@tarojs/taro';
import {View} from '@tarojs/components';

import './index.scss';
// @ts-ignore

export default function TaroPopoverComponent(props) {
  const {  state = {} } = props

  const {visible = false, pw, ph, px, py, vertical, align } = state
  return (
    <View>
      {visible && <View
      className={`popover-view ${vertical} ${align}`}
      style={`width:${pw}px;height:${ph}px;left:${px}px;top:${py}px;`}>
      {props.children}
    </View>}
    </View>  
  )
}
