import {ComponentClass} from "react";

export interface TaroPopoverItemComponentProps {
  cropperCanvasId?: string,          // 画布id
  cropperCutCanvasId?: string,        // 用于裁剪的canvas id
}

declare const TaroPopoverItem: ComponentClass<TaroPopoverItemComponentProps>;

export default TaroPopoverItem;
