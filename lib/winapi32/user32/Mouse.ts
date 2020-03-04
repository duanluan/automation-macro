import * as ffi from "ffi";
import * as ref from "ref";
import Display from "./Display";
import Cursor from "./Cursor";
import System from "./System";

const user32 = ffi.Library("user32", {
  // https://docs.microsoft.com/en-us/windows/desktop/api/winuser/nf-winuser-mouse_event
  "mouse_event": [ref.types.void, [ref.types.ulong, ref.types.ulong, ref.types.ulong, ref.types.ulong, ref.types.ulong]]

});

/**
 * If MOUSEEVENTF_ABSOLUTE value is specified, dx and dy contain normalized absolute coordinates between 0 and 65,535. The event procedure maps these coordinates onto the display surface. Coordinate (0,0) maps onto the upper-left corner of the display surface, (65535,65535) maps onto the lower-right corner.
 */
const maxSize = 65535;
const displayWidth = Display.getWidth(), displayHeight = Display.getHeight();

/**
 * 鼠标
 */
export default class Mouse {
  /**
   * 绝对移动，x 或 y 为 -1 时，其为当前位置的 x 或 y
   *
   * @param x
   * @param y
   */
  static move(x = -1, y = -1) {
    let pos;
    if (x === -1 || y === -1) {
      pos = Cursor.getPos();
    }

    if (x === -1) {
      x = pos.x;
    }
    if (y === -1) {
      y = pos.y;
    }

    user32.mouse_event(0x0001 | 0x8000, x * maxSize / displayWidth + 1, y * maxSize / displayHeight + 1, 0, 0);
  }

  /**
   * 相对移动
   *
   * @param x
   * @param y
   */
  static moveR(x: number, y: number) {
    user32.mouse_event(0x0001, x, y, 0, 0);
  }

  /**
   * 左键按下
   */
  private static privateLeftDown() {
    user32.mouse_event(0x0002, 0, 0, 0, 0);
  }

  /**
   * 左键按下
   *
   * @param x
   * @param y
   */
  static leftDown(x?: number, y?: number) {
    this.move(x, y);
    this.privateLeftDown();
  }

  /**
   * 左键相对按下
   *
   * @param x
   * @param y
   */
  static leftDownR(x: number, y: number) {
    this.moveR(x, y);
    this.privateLeftDown();
  }

  /**
   * 左键弹起
   */
  private static privateLeftUp() {
    user32.mouse_event(0x0004, 0, 0, 0, 0);
  }

  /**
   * 左键弹起
   *
   * @param x
   * @param y
   */
  static leftUp(x?: number, y?: number) {
    this.move(x, y);
    this.privateLeftUp();
  }

  /**
   * 左键相对弹起
   *
   * @param x
   * @param y
   */
  static leftUpR(x: number, y: number) {
    this.moveR(x, y);
    this.privateLeftUp();
  }

  /**
   * 左键单击
   *
   * @param x
   * @param y
   */
  static leftClick(x?: number, y?: number) {
    this.move(x, y);
    this.privateLeftDown();
    this.privateLeftUp();
  }

  /**
   * 左键相对单击
   *
   * @param x
   * @param y
   */
  static leftClickR(x: number, y: number) {
    this.moveR(x, y);
    this.privateLeftDown();
    this.privateLeftUp();
  }

  /**
   * 左键双击
   *
   * @param x
   * @param y
   */
  static leftDoubleClick(x?: number, y?: number) {
    this.leftClick(x, y);
    this.leftClick(x, y);
  }

  /**
   * 左键相对双击
   *
   * @param x
   * @param y
   */
  static leftDoubleClickR(x: number, y: number) {
    this.leftClickR(x, y);
    this.leftClickR(x, y);
  }

  /**
   * 右键按下
   */
  private static privateRightDown() {
    user32.mouse_event(0x0008, 0, 0, 0, 0);
  }

  /**
   * 右键按下
   *
   * @param x
   * @param y
   */
  static rightDown(x?: number, y?: number) {
    this.move(x, y);
    this.privateRightDown();
  }

  /**
   * 右键相对按下
   *
   * @param x
   * @param y
   */
  static rightDownR(x: number, y: number) {
    this.moveR(x, y);
    this.privateRightDown();
  }

  /**
   * 右键弹起
   */
  private static privateRightUp() {
    user32.mouse_event(0x0010, 0, 0, 0, 0);
  }

  /**
   * 右键弹起
   *
   * @param x
   * @param y
   */
  static rightUp(x?: number, y?: number) {
    this.move(x, y);
    this.privateRightUp();
  }

  /**
   * 右键相对弹起
   *
   * @param x
   * @param y
   */
  static rightUpR(x: number, y: number) {
    this.moveR(x, y);
    this.privateRightUp();
  }

  /**
   * 右键单击
   *
   * @param x
   * @param y
   */
  static rightClick(x?: number, y?: number) {
    this.move(x, y);
    this.privateLeftDown();
    this.privateRightUp();
  }

  /**
   * 右键相对单击
   *
   * @param x
   * @param y
   */
  static rightClickR(x: number, y: number) {
    this.moveR(x, y);
    this.privateLeftDown();
    this.privateRightUp();
  }

  /**
   * 中键按下
   */
  private static privateMiddleDown() {
    user32.mouse_event(0x0020, 0, 0, 0, 0);
  }

  /**
   * 中键按下
   *
   * @param x
   * @param y
   */
  static middleDown(x?: number, y?: number) {
    this.move(x, y);
    this.privateMiddleDown();
  }

  /**
   * 中键相对按下
   *
   * @param x
   * @param y
   */
  static middleDownR(x: number, y: number) {
    this.moveR(x, y);
    this.privateMiddleDown();
  }

  /**
   * 中键弹起
   */
  private static privateMiddleUp() {
    user32.mouse_event(0x0040, 0, 0, 0, 0);
  }

  /**
   * 中键弹起
   *
   * @param x
   * @param y
   */
  static middleUp(x?: number, y?: number) {
    this.move(x, y);
    this.privateMiddleUp();
  }

  /**
   * 中键相对弹起
   *
   * @param x
   * @param y
   */
  static middleUpR(x: number, y: number) {
    this.moveR(x, y);
    this.privateMiddleUp();
  }

  /**
   * 中键单击
   *
   * @param x
   * @param y
   */
  static middleClick(x?: number, y?: number) {
    this.middleDown(x, y);
    this.middleUp(x, y);
  }

  /**
   * 中键相对单击
   *
   * @param x
   * @param y
   */
  static middleClickR(x: number, y: number) {
    this.middleDownR(x, y);
    this.middleUpR(x, y);
  }

  /**
   * 滚轮旋转
   *
   * @param data 正值表示向前，负值表示向后，为 120 时相当于滚动一行
   */
  static wheelRotate(data: number) {
    user32.mouse_event(0x0800, 0, 0, data / System.wheelScrollLines(), 0);
  }

  /**
   * 滚轮旋转
   *
   * @param data 正值表示向前，负值表示向后，为 120 时相当于滚动一个齿格，具体行数与鼠标滑轮设置有关
   */
  static wheelRotateR(data: number) {
    user32.mouse_event(0x0800, 0, 0, data, 0);
  }

  /**
   * 滚轮倾斜
   *
   * @param data 正值表示向右，负值表示向左，为 120 时相当于倾斜一个字符
   */
  static wheelTilt(data: number) {
    user32.mouse_event(0x01000, 0, 0, data / System.wheelScrollChars(), 0);
  }

  /**
   * 滚轮倾斜
   *
   * @param data 正值表示向右，负值表示向左，为 120 时相当于倾斜一次，具体字符与鼠标滑轮设置有关
   */
  static wheelTiltR(data: number) {
    user32.mouse_event(0x01000, 0, 0, data, 0);
  }

  static setHook(){

  }
}
