import * as ffi from "ffi";
import * as ref from "ref";

const user32 = ffi.Library("user32", {
  // https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-keybd_event
  "keybd_event": [ref.types.void, [ref.types.uint8, ref.types.uint8, ref.types.ulong, ref.types.ulong]]
});

/**
 * 键盘
 */
export default class Keyboard {
  /**
   * 按键按下
   *
   * @param vkCode 虚拟按键码
   */
  static keyDown(vkCode: number) {
    user32.keybd_event(vkCode, 0, 0, 0);
  }

  /**
   * 按键弹起
   *
   * @param vkCode 虚拟按键码
   */
  static keyUp(vkCode: number) {
    user32.keybd_event(vkCode, 0, 0x0002, 0);
  }

  /**
   * 按键（按下，弹起）
   *
   * @param vkCode 虚拟按键码
   */
  static keyPress(vkCode: number) {
    this.keyDown(vkCode);
    this.keyUp(vkCode);
  }
}
