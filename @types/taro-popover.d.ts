import {ComponentClass} from "react";

export interface TaroPopoverComponentProps {
  cropperCanvasId?: string,          // 画布id
  cropperCutCanvasId?: string,        // 用于裁剪的canvas id
}

declare const TaroPopover: ComponentClass<TaroPopoverComponentProps>;

export default TaroPopover;
