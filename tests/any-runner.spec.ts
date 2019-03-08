import { ValidateRunnerAny } from "../src/any-runner";
import { provider, createValidateRunnerElements } from "./setup";

describe("any-runner", () => {
    /**
     * 任意一个验证通过则验证通过
     * @description 成功返回的数组永远只有一个元素, 就是导致成功的元素
     */
    test("any-pass", async () => {
        const allRunner = new ValidateRunnerAny(provider);
        const validRule: any = {
            PhoneNo: null,
            IsEmail: null
        };
        const elements = createValidateRunnerElements(validRule, "xueyoucd@gmail.com");

        allRunner.addBatch(elements);

        try {
            const result = await allRunner.execute();
            expect(result.length).toBeGreaterThan(0);
        } catch (error) {
            expect(error.message).toMatch("error");
        }
    });

    /**
     * 所有验证失败, 则验证失败
     * @description  失败异常是最后一个验证方法抛出的
     */
    test("all-fail", async () => {
        const allRunner = new ValidateRunnerAny(provider);
        const validRule: any = {
            PhoneNo: null,
            IsEmail: null
        };
        const elements = createValidateRunnerElements(validRule, "abc");

        allRunner.addBatch(elements);

        try {
            await allRunner.execute();
        } catch (error) {
            expect(error.message).toMatch(`无效邮箱格式`);
        }
    });

    /**
     * 如果使用的验证函数没有在验证函数提供方里找到, 则也会验证失败, 但是 error 类型就不是验证错误类型
     */
    test("invalid-validaMethod", async () => {
        const allRunner = new ValidateRunnerAny(provider);
        const validRule: any = {
            PhoneNo: null,
            IsEmailxxx: null,
            IsEmail: null
        };
        const elements = createValidateRunnerElements(validRule, "xueyoucd@gmail.com");

        allRunner.addBatch(elements);

        try {
            const result = await allRunner.execute();
        } catch (error) {
            expect(error.message).toMatch("invalid validaMethod: IsEmailxxx");
        }
    });
});
