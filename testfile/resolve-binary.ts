// overloads
class Foo {
  @operator("<")
  lt(other: Foo): string {
    return "lt";
  }
  self(): Foo {
    return this;
  }
}

// overload with compatible compound assignment
class Bar {
  @operator("+")
  add(other: Bar): Bar {
    return other;
  }
  self(): Bar {
    return this;
  }
}
