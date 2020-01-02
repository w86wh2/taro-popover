import Taro, { useState } from '@tarojs/taro';
import {View} from '@tarojs/components';
import Popover from './popover'
import PopoverItem from './popoverItem'

import './index.scss';
// @ts-ignore
import {CSSProperties} from "react";



interface TaroPopoverComponentProps {
  list: any[],
  onTabItem: any,
  children: any,
  style?: string,
  label: string
}

// props:TaroPopoverComponentProps
export default function TaroPopover(props: TaroPopoverComponentProps) {
  const [showMask, setShowMask] = useState(false)
  const [state, setState] = useState({
    // 当前显隐状态
    visible: false,
    // popover 宽
    pw: 150,
    // popover 高
    ph: 120,
    // popover 距左距离
    px: 0,
    // popover 距上距离
    py: 0,
    // 垂直方向 top/bottom
    vertical: '',
    // 水平方向 left/center/right
    align: '',
    // 子元素高度
    itemHeight: 50 
  })
  const { list = [], onTabItem, label='label' } = props


  const handleClick = () => {
    Taro.createSelectorQuery().in(this.$scope).select('.button_popver').boundingClientRect(
      res => {
        // 调用自定义组件 popover 中的 onDisplay 方法
        setShowMask(true)
        onDisplay(res);
      }
    ).exec()
    console.log()
  }
  const clickMask = (e) => {
    e.stopPropagation()
    onHide()
    setShowMask(false)
  }

  const onClickItem = item => {
    if (onTabItem) onTabItem(item)
  }

  const onDisplay = e => {
    const popover = this.$scope.$component.refs.refPopover
    const { windowHeight, windowWidth } = Taro.getSystemInfoSync()
    const trangleHeight = 12;
    let self = popover;

    if (self.last && self.last === e.id) {
      setState({...state, visible: false})
    } else {
      Taro.createSelectorQuery().selectViewport().scrollOffset((_view: any) => {
        let { pw, ph, px, py, vertical, align } = state;
        const { scrollTop = 0 } = _view || {}
        let pOverW = (pw - e.width) / 2;

        let offsetL = e.left,
          offsetR = windowWidth - e.right,
          offsetB = windowHeight - e.bottom;

        if (offsetL >= pOverW && offsetR >= pOverW) {
          align = 'center';
          px = e.left - pOverW;
        } else if (offsetL > pOverW && offsetR < pOverW) {
          align = 'left';
          px = windowWidth - (offsetR + pw);
          // 如果向右贴边了，设置一点距离
          if ((windowWidth - pw) == px) px -= 5;
        } else if (offsetL < pOverW && offsetR > pOverW) {
          align = 'right';
          px = e.left;
          // 如果向左贴边了，设置一点距离
          if (px == 0) px += 5;
        }

        if (offsetB >= (ph + trangleHeight)) {
          vertical = 'bottom';
          py = scrollTop + e.bottom + trangleHeight;
        } else {
          vertical = 'top';
          py = scrollTop + e.top - ph - trangleHeight;
        }

        setState({
          ...state,
          visible: true,
          px: px,
          py: py,
          ph: getItemsHeight(),
          vertical: vertical,
          align: align
        });
      }).exec();
    }
    // 记录上一次点击的元素
    self.last = e.id;
  }
  const onHide =() => {
    setState({...state, visible: false})
  }
  // 获取所有子元素的总高度
  const getItemsHeight =()=> {
    return state.itemHeight * list.length
  }

  const { windowHeight, windowWidth } = Taro.getSystemInfoSync()
  const maskStyle:CSSProperties = {
    position: 'fixed',
    height: windowHeight + 'px',
    width: windowWidth + 'px',
    background: 'transparent',
    zIndex: 1000
  }
  return (
    <View onClick={handleClick}>
      {showMask && <View className='mask__container' style={maskStyle} onClick={clickMask}></View>}
      <View className="button_popver" style={props.style}>
        {
          this.props.children
        }
      </View>
      <Popover ref='refPopover' state={state}>
      {
          list && list.map(item => {
            return <View key={item.id} onClick={() => onClickItem(item)}  ><PopoverItem hasline className="popover-item" class='popover-item' height={state.itemHeight}>{item[label]}</PopoverItem></View>
          })
        }
      </Popover>
    </View>

  );
}

