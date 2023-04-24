import { PaginationPage } from "./pagination-page.vo";

it("does not throw any error if count is limit is <= 100", () => {
  expect(() => {
    new PaginationPage({
      limit: 90,
      offset: 10,
    });
  }).not.toThrow();
});

it("throws an error if count is limit is > 100", () => {
  expect(() => {
    new PaginationPage({
      limit: 101,
      offset: 10,
    });
  }).toThrow();
});
