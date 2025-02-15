import { InMemoryLoginRepository } from "../../../../../src/modules/Login/infrastructure/repositories/inMemoryLoginRepository";
import { ILoginRepository } from "../../../../../src/modules/Login/core/repositories/iLoginRepository";
import { describe, beforeEach, expect, vitest, test } from "vitest";
import { loginMock, userMock } from "../../mock";

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

describe("InMemoryLoginRepository", () => {
  let loginRepository: ILoginRepository;

  beforeEach(() => {
    vitest.clearAllMocks();
    loginRepository = InMemoryLoginRepository();
    Object.defineProperty(global, "localStorage", { value: localStorageMock });
    localStorage.clear();
  });

  test("Login save data in localStorage", async () => {
    await loginRepository.login(loginMock);
    expect(localStorage.getItem("session")).toEqual(JSON.stringify(loginMock));
  });

  test("setUserData save data in localStorage and then clearUserData delete it", async () => {
    await loginRepository.setUserData(userMock);
    expect(localStorage.getItem("user")).toEqual(JSON.stringify(userMock));
    expect(localStorage.getItem("token")).toEqual(userMock.token);

    await loginRepository.clearUserData();
    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
  });
});
