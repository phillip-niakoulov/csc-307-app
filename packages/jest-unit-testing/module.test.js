import mut from "./module.js";

test("Testing sum -- success", () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test("Testing div -- success", () => {
  const expected = 8;
  const got = mut.div(16, 2);
  expect(got).toBe(expected);
});

test("Testing div -- success", () => {
  const expected = Infinity; // ERROR
  const got = mut.div(16, 0);
  expect(got).toBe(expected);
});

test("Testing containsNumbers -- success", () => {
  const expected = true;
  const got = mut.containsNumbers("h3110");
  expect(got).toBe(expected);
});

test("Testing containsNumbers -- success", () => {
  const expected = false;
  const got = mut.containsNumbers("hello");
  expect(got).toBe(expected);
});

test("Testing containsNumbers -- success", () => {
  const expected = false;
  const got = mut.containsNumbers("");
  expect(got).toBe(expected);
});

test("Testing containsNumbers -- success", () => {
  const expected = false;
  const got = mut.containsNumbers("    ");
  expect(got).toBe(expected);
});
