// Global

@unsafe var g = 0; // not valid here

// Function

@unsafe function f1(): void {}
f1();

// Inline function

@unsafe @inline function f2(): void {}
f2();

// === Class members ===

class Foo {
  @unsafe constructor() {}
  @unsafe static foo: i32 = 0;
  @unsafe static bar(): void {}
  @unsafe foo: i32 = 0;
  @unsafe bar(): void {}
  @unsafe static get baz(): i32 { return 0; }
  @unsafe static set baz(i: i32) { }
  @unsafe get baz(): i32 { return 0; }
  @unsafe set baz(i: i32) { }
}
