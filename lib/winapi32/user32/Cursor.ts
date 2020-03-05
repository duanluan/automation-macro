import * as ffi from "ffi";
import * as ref from "ref";
import * as Struct from "ref-struct";

const user32 = ffi.Library("user32", {
  // // https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-getcursorinfo
  // "GetCursorInfo": ["book", ["pointer"]],

  /**
   * https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-getcursorpos
   *
   * 获取全局光标的句柄
   *
   * static getCursorInfo(){
   *   return user32.GetCursorInfo();
   * }
   */
  "GetCursorPos": ["bool", ["pointer"]]
});

/**
 * 点
 */
const Point = Struct({
  x: ref.types.long,
  y: ref.types.long
});

/**
 * 光标
 */
export default class Cursor {

  /**
   * 获取位置
   */
  static getPos() {
    const point = new Point();
    point.x = 0;
    point.y = 0;
    user32.GetCursorPos(point["ref.buffer"]);
    return point;
  }
}
