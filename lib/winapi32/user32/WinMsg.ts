import * as ffi from "ffi";
import * as ref from "ref";

import NCode from "./enum/NCode";
import IdHook from "./enum/IdHook";

const kernel32 = ffi.Library("kernel32", {
  "GetModuleHandleA": ["pointer", ["int"]]
});

const user32 = ffi.Library("user32", {
  "SetWindowsHookExA": ["pointer", ["int", "pointer", "uint", "ulong"]],
  /**
   * 调用钩子链中的下一个挂钩过程：https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-callnexthookex
   *
   * LRESULT CallNextHookEx(
   *   HHOOK  hhk,    // 当前钩子的句柄
   *   int    nCode,  // 钩子代码; 就是给下一个钩子要交待的
   *   WPARAM wParam, // 要传递的参数; 由钩子类型决定是什么参数
   *   LPARAM lParam  // 要传递的参数; 由钩子类型决定是什么参数
   * );
   *
   * @return 下一个钩子的回调函数，否则为 0。当前钩子程序也必须返回此值。
   */
  "CallNextHookEx": ["pointer", ["pointer", "int", "int", "int"]]
});

export default class WinMsg {

  static setHook() {
    console.log(123);

    var keyboard = ffi.Callback(ref.types.void, ["int", "int", "int"], (nCode = NCode.HC_ACTION, wParam, lParam) => {
      console.log(234);
      return user32.CallNextHookEx(hook, nCode, wParam, lParam);
    });

    const hook = user32.SetWindowsHookExA(IdHook.WH_KEYBOARD, keyboard, kernel32.GetModuleHandleA(0), 0);

    // user32.CallNextHookEx(hookExAResult, NCode.HC_ACTION, null, null);
    // return user32.CallNextHookEx(hookExAResult, NCode.HC_ACTION, null, null);
    return true;
  }

}
