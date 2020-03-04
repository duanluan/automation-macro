import * as ffi from "ffi";
import * as ref from "ref";

import NCode from "./enum/NCode";
import IdHook from "./enum/IdHook";

const user32 = ffi.Library("user32", {
  "SetWindowsHookExA": ["pointer", ["int", "pointer", "uint", "ulong"]],
  /**
   * https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-callnexthookex
   *
   * 调用钩子链中的下一个挂钩过程，调用成功返回值是下一个钩子的回调函数，否则为 0。当前钩子程序也必须返回此值。
   *
   * LRESULT CallNextHookEx(
   *   HHOOK  hhk,    // 当前钩子的句柄
   *   int    nCode,  // 钩子代码; 就是给下一个钩子要交待的
   *   WPARAM wParam, // 要传递的参数; 由钩子类型决定是什么参数
   *   LPARAM lParam  // 要传递的参数; 由钩子类型决定是什么参数
   * );
   *
   * @return 下一个钩子执行后的返回值; 0 表示失败
   */
  "CallNextHookEx": ["pointer", ["pointer", "int", "int", "int"]]
});

export default class WinMsg {

  static setHook() {
    var keyboard = ffi.Callback(ref.types.void, [], () => {
      console.log(123);
      user32.CallNextHookEx(hookExAResult, NCode.HC_ACTION, null, null);
    });

    const hookExAResult = user32.SetWindowsHookExA(IdHook.WH_KEYBOARD, keyboard, null, 0);

    // user32.CallNextHookEx(hookExAResult, NCode.HC_ACTION, null, null);
    // return user32.CallNextHookEx(hookExAResult, NCode.HC_ACTION, null, null);
    return true;
  }

}
