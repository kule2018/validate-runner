import { ValidateRunner, createInvalidError } from './validate-runner';
import { ValidateProvider, IMethodRegister } from '@validate/validate-provider';

/**
 * 任意验证执行器
 * @description 顺序执行验证, 有一个验证失败则成功, 则成功
 * @description 适用场景: 比如一个输入框既可以输入邮箱也可以输入手机号, 此时邮箱或手机号验证其中一个通过则验证通过
 */
export class ValidateRunnerAny extends ValidateRunner {

  /**
   * 构造函数
   * @param provider 验证函数提供方
   */
  constructor(provider: ValidateProvider) {
    super(provider);
  }

  /**
   * 执行验证
   */
  public execute(): Promise<IMethodRegister[]> {
    const { elements, provider } = this;

    return new Promise((resolve, reject) => {

      try {
        this.makeSureProvider();
      } catch (error) {
        reject(error);
        return;
      }

      let successd = false;
      let failCount = 0;
      for (var i = 0; i < elements.length; ++i) {
        if (successd) { break; }
        var runnerElement = elements[i];
        var provideInfo = provider.get(runnerElement.name);
        if (!provideInfo) { reject(createInvalidError(runnerElement.name)); }
        provideInfo.method(runnerElement.value, ...runnerElement.params).then((result) => {
          successd = true;
          resolve([result])
        }).catch(error => {
          ++failCount;
          if (failCount >= elements.length) { reject(error); }
        })
      }
    });
  }

}