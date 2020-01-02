import Taro from '@tarojs/taro';
import { View}  from '@tarojs/components';

import './index.scss';


export default function TaroPopoverItemComponent(props) {
  const {  height = 50, hasline = false }  = props

  return (
    <View className={`popover-item ${hasline ? "underline" : ""}`} hoverClass='popover-item-hover'  style={`height:${height}px;line-height:${height}px;`}>
      {props.children}
    </View>
  )
};
