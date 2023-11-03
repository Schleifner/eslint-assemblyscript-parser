@unmanaged class Struct {
  v0: u32;
  v1: u32;
  v2: u32;
}

// @inline
function loadZ() : u32 {
  return load<u32>(16);
}
