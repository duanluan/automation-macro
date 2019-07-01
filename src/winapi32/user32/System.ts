import * as ffi from "ffi";
import * as ref from "ref";

const user32 = ffi.Library("user32", {
  // https://docs.microsoft.com/zh-cn/windows/desktop/api/winuser/nf-winuser-systemparametersinfoa
  "SystemParametersInfoA": ["bool", ["uint", "uint", "pointer", "uint"]]
});


/**
 * 系统
 */
export default class System {
  /**
   * 获取或设置鼠标滑轮垂直滚动时每次要滚动的行数
   *
   * @param lines 1 ~ 100
   * @returns {number || boolean} 获取时返回行数，设置时返回是否设置成功
   */
  static wheelScrollLines(lines?: number) {
    if (!lines) {
      const param = ref.alloc(ref.types.uint);
      user32.SystemParametersInfoA(0x0068, 0, param, 0);
      // @ts-ignore
      return param.deref();
    } else if (lines > 0 && lines <= 100) {
      return user32.SystemParametersInfoA(0x0069, lines, ref.alloc(ref.types.void), 0);
    }
    return -1;
  }

  /**
   * 获取或设置鼠标滑轮水平滚动时每次要滚动的字符数
   *
   * @param chars 1 ~ 100
   * @returns {number || boolean} 获取时返回字符数，设置时返回是否设置成功
   */
  static wheelScrollChars(chars?: number) {
    if (!chars) {
      const param = ref.alloc(ref.types.uint);
      user32.SystemParametersInfoA(0x006C, 0, param, 0);
      // @ts-ignore
      return param.deref();
    } else if (chars > 0 && chars <= 100) {
      return user32.SystemParametersInfoA(0x006D, chars, ref.alloc(ref.types.void), 0);
    }
    return -1;
  }
}
