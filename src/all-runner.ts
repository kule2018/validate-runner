import { ValidateRunner, createInvalidError } from "./validate-runner";
import { ValidateProvider, IMethodRegister } from "@validate/validate-provider";

/**
 * 所有验证执行器
 * @description 有一个验证失败则失败
 */
export class ValidateRunnerAll extends ValidateRunner {
    /**
     * 构造函数
     * @param provider 验证函数提供方
     */
    constructor(provider: ValidateProvider) {
        super(provider);
    }

    /**
     * 执行验证
     * @description 成功的返回数组永远只有一个元素
     */
    public execute(): Promise<IMethodRegister[]> {
        const { elements, provider } = this;
        const promiseCollection: Promise<IMethodRegister>[] = [];

        this.makeSureProvider();

        for (let i = 0; i < elements.length; i++) {
            const runnerElement = elements[i];
            const provideInfo = provider.get(runnerElement.name);
            if (!provideInfo) {
                throw createInvalidError(runnerElement.name);
            }
            promiseCollection.push(provideInfo.method(runnerElement.value, ...runnerElement.params));
        }

        return Promise.all(promiseCollection);
    }
}
