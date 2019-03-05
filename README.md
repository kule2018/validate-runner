# validate-runner

> 验证函数执行器, 提供批量执行验证描述对象集合的功能. 基于 `Promise`

支持:

-   `ValidateRunnerAll` 并行验证执行器, 所有验证并行执行, 其中有一个验证错误则错误
-   `ValidateRunnerAny` 顺序任意验证执行器, 验证函数一个接一个执行, 遇到任意一个验证成功则成功, 全部失败则失败

## Install And Usega

Using Browser:

```html
<script src="validate-provider.js"></script>
<script src="./dist/index.lib.js"></script>
<script>
    var provider = new ValidateProvider();

    provider.add(
        "IsPhone",
        (val: string) => {
            return /^(13[0-9]|15[0123456789]|17[03678]|18[0-9]|14[57])[0-9]{8}$/.test(val);
        },
        "手机号不正确"
    );

    var runner = new ValidateRunnerAll(provider);
    runner.add(new ValidateRunnerElement("IsPhone", "xueyoucd@gmail.com"));

    runner
        .execute()
        .then((infos) => {
            console.log("验证成功, 验证函数名为", infos[0].name);
        })
        .catch((error) => {
            console.log(error.message === "手机号不正确");
        });
</script>
```

Or Using npm:

```sh
npm install --save validate-provider validate-runner
```

```js
import { ValidateProvider } from "validate-provider";
import { ValidateRunnerElement, ValidateRunnerAll } from "validate-provider";

var provider = new ValidateProvider();

provider.add(
    "IsPhone",
    (val: string) => {
        return /^(13[0-9]|15[0123456789]|17[03678]|18[0-9]|14[57])[0-9]{8}$/.test(val);
    },
    "手机号不正确"
);

var runner = new ValidateRunnerAll(provider);
runner.add(new ValidateRunnerElement("IsPhone", "xueyoucd@gmail.com"));

runner
    .execute()
    .then((infos) => {
        console.log("验证成功, 验证函数名为", infos[0].name);
    })
    .catch((error) => {
        console.log(error.message === "手机号不正确");
    });
```

---

## ValidateRunner

`ValidateRunner`是一个抽象类, 用于验证函数集合的执行

-   `add(element: ValidateRunnerElement)` 添加验证描述对象
-   `addBatch(elements: ValidateRunnerElement[])` 批量添加验证描述对象
-   `remove(element: ValidateRunnerElement)` 删除验证描述对象
-   `removeByName(name: string)` 根据验证方法名称删除验证描述对象
-   `execute(): Promise<IMethodRegister[]>;` 运行验证执行器
