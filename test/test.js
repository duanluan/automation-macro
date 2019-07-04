"use strict";
const expect = require("chai").expect;
const keyboard = require("../dist/index").Keyboard;
const virtualKeyCode = require("../dist/index").VirtualKeyCode;


describe("test index.js", () => {
  it("应该会弹出“开始”", () => {
    expect(keyboard.keyPress(virtualKeyCode.LEFT_WINDOWS));
  });
});