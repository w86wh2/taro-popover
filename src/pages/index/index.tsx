import Taro, {Component, Config} from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'
import TaroPopover from '../../components/taro-popover';

interface IndexProps {

}

interface IndexState {
  list: any[]
}

export default class Index extends Component<IndexProps, IndexState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页',
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          id: 1,
          label: 'item1'
        },
        {
          id: 2,
          label: 'item2'
        },
        {
          id: 3,
          label: 'item3'
        }
      ],
    }
    this.onTabItem = this.onTabItem.bind(this)
  }
  onTabItem(item) {
    console.log(item)
  }


  render() {
    const { list } = this.state
    return (
      <View className='index'>
          <TaroPopover list={list} label='label' onTabItem={this.onTabItem}>
            点我弹出
          </TaroPopover>
          <TaroPopover list={list} label='label' onTabItem={this.onTabItem} style="position: absolute; top: 200px;left: 100px">
            <View>点我弹出</View>
          </TaroPopover>
      </View>
    )
  }
}
