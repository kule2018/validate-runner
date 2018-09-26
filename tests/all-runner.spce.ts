import { ValidateRunnerAll } from '../src/all-runner';
import { provider, createValidateRunnerElements } from './setup';

describe('all-runner', () => {

  /**
   * 所有验证都通过则验证通过
   */
  test('all-pass', async () => {
    
    const allRunner = new ValidateRunnerAll(provider);
    const validRule = {
      'Required': null,
      'IsEmail': null,
      'RangeLength': [5, 19],
    };
    const elements = createValidateRunnerElements(validRule, 'xueyoucd@gmail.com');

    allRunner.addBatch(elements);

    try {
      const result = await allRunner.execute();
      expect(result[0].name).toMatch('Required');
      expect(result[1].name).toMatch('IsEmail');
      expect(result[2].name).toMatch('RangeLength');
    } catch (error) {
      expect(error.message).toMatch('error');
    }

  });

  /**
   * 有一个验证失败, 则验证失败
   */
  test('any-fail', async () => {

    const allRunner = new ValidateRunnerAll(provider);
    const validRule = {
      'Required': null,
      'IsEmail': null,
      'RangeLength': [5, 10],
    };
    const elements = createValidateRunnerElements(validRule, 'xueyoucd@gmail.com');

    allRunner.addBatch(elements);

    try {
      const result = await allRunner.execute();
      expect(result[0].name).toMatch('Required');
      expect(result[1].name).toMatch('IsEmail');
      expect(result[2].name).toMatch('RangeLength');
    } catch (error) {
      expect(error.message).toMatch(`长度范围应在5 ~ 10之间`);
    }

  });

  /**
   * 如果使用的验证函数没有在验证函数提供方里找到, 则也会验证失败, 但是 error 类型就不是验证错误类型
   */
  test('invalid-validaMethod', async () => {

    const allRunner = new ValidateRunnerAll(provider);
    const validRule = {
      'Required': null,
      'IsEmailxxx': null,
      'RangeLength': [5, 19],
    };
    const elements = createValidateRunnerElements(validRule, 'xueyoucd@gmail.com');

    allRunner.addBatch(elements);

    try {
      const result = await allRunner.execute();
      expect(result[0].name).toMatch('Required');
      expect(result[1].name).toMatch('IsEmailxxx');
      expect(result[2].name).toMatch('RangeLength');
    } catch (error) {
      expect(error.message).toMatch('invalid validaMethod: IsEmailxxx');
    }

  });



});