import * as ffi from "ffi";
import * as ref from "ref";

const user32 = ffi.Library("user32", {
  // https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-getsystemmetrics
  "GetSystemMetrics": [ref.types.int, [ref.types.int]]
});

/**
 * 显示器
 */
export default class Display {
  /**
   * 获取主显示器屏幕宽度
   *
   * @returns {*}
   */
  static getWidth() {
    return user32.GetSystemMetrics(0);
  }

  /**
   * 获取主显示器屏幕高度
   *
   * @returns {*}
   */
  static getHeight() {
    return user32.GetSystemMetrics(1);
  }
}
