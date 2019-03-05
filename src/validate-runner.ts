import { ValidateProvider, IMethodRegister } from "@validate/validate-provider";

/**
 * 验证执行描述对象
 */
export class ValidateRunnerElement {
    /**
     * 验证函数名称
     */
    public name: string;
    /**
     * 待验证的值
     */
    public value: any;
    /**
     * 验证函数参数
     */
    public params: any[];

    /**
     * 实例化验证执行对象
     * @param name 验证函数名称
     * @param value 待验证的值
     * @param params 验证函数参数
     */
    constructor(name: string, value: any, params: any[] = []) {
        this.name = name;
        this.value = value;
        this.params = params === null || params === undefined ? [] : params;
    }
}

/**
 * 验证执行器抽象类
 */
export abstract class ValidateRunner {
    /**
     * 验证描述对象集合
     */
    protected elements: ValidateRunnerElement[] = [];

    /**
     * 验证函数提供方
     */
    protected provider: ValidateProvider;

    /**
     * 构造函数
     * @param provider 验证函数提供方
     */
    constructor(provider: ValidateProvider) {
        this.provider = provider;
    }

    /**
     * 添加验证描述对象
     * @param element 证描述对象
     */
    public add(element: ValidateRunnerElement) {
        this.elements.push(element);
        return this;
    }

    /**
     * 批量添加验证描述对象
     * @param elements 证描述对象集合
     */
    public addBatch(elements: ValidateRunnerElement[]) {
        elements.forEach((x) => this.add(x));
        return this;
    }

    /**
     * 删除验证描述对象
     * @param element 证描述对象
     */
    public remove(element: ValidateRunnerElement) {
        if (element && element.name) {
            this.removeByName(element.name);
        }
        return this;
    }

    /**
     * 根据验证方法名称删除验证描述对象
     * @param name 验证方法名称
     */
    public removeByName(name: string) {
        var i = this.elements.findIndex((x) => x.name === name);
        if (i !== -1) {
            this.elements.splice(i, 1);
        } else {
            console.warn("remove faild, element not found");
        }

        return this;
    }

    /**
     * 确保提供了验证提供方
     */
    public makeSureProvider() {
        if (!this.provider) {
            throw new Error("provider Unavailable!");
        }
    }

    /**
     * 运行验证执行器
     * @description 返回一个Promise, resolve则成功，　reject则失败.
     */
    abstract execute(): Promise<IMethodRegister[]>;
}

/**
 * 创建无效验证名称异常
 * @param name 验证函数名称
 */
export function createInvalidError(name: string) {
    return new Error(`invalid validaMethod: ${name}`);
}
