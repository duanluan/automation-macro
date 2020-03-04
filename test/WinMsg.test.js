const expect = require("chai").expect;

const WinMsg = require("../dist/index").WinMsg;

// it("应该会弹出“开始”", () => {
//   expect(keyboard.keyPress(virtualKeyCode.LEFT_WINDOWS));
// });

describe("系统消息测试", () => {
  it("键盘监听", function (done) {
    this.timeout(5000);

    let callback = () => {
      expect(WinMsg.setHook());
      // 通知 Mocha 测试结束
      done()
    };
    setTimeout(callback, 3000);

  });
});
