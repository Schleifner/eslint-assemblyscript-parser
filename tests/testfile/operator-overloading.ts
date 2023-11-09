class Tester {
  constructor(public x: i32, public y: i32) {
  }
  // unary opterators
  @operator.prefix("~")
  static not(value: Tester): Tester {
    return new Tester(~value.x, ~value.y);
  }
}

// check inlined static
// class TesterInlineStatic {
//   constructor(public x: i32, public y: i32) {
//   }
//   @inline @operator("+")
//   static add(a: TesterInlineStatic, b: TesterInlineStatic): TesterInlineStatic {
//     return new TesterInlineStatic(a.x + b.x, a.y + b.y);
//   }

//   @inline @operator.postfix("++")
//   static postInc(a: TesterInlineStatic): TesterInlineStatic {
//     return new TesterInlineStatic(a.x + 1, a.y + 1);
//   }
// }