## EnumPopup

EnumPopup 可以用来操作物模型中的枚举类型的值，以弹窗的形式展示选项

### Demo

```jsx
import React, {useState, useEffect} from 'react';
import { EnumPopup } from 'qcloud-iot-panel-component';


export default () => {
  const [enumVal, setEnumVal] = useState(0);
  const enumList = [
    {text: '第一项', value: 0},
    {text: '第二项', value: 1},
    {text: '第三项', value: 2},
    {text: 'foo', value: 3},
    {text: 'bar', value: 4},
    {text: 'baz', value: 5},
  ];

  return (
    <div>
    <EnumPopup
      value={enumVal}
      icon="create"
      templateConfig={{name: '枚举弹窗很长很长的内容6666777'}}
      enumList={enumList}
      onChange={(v) => {console.log(v); setEnumVal(v)} }
    />
    <EnumPopup
      value={enumVal}
      icon="create"
      disabled
      templateConfig={{name: 'enumPopup 禁用态'}}
      enumList={enumList}
      onChange={(v) => {console.log(v); setEnumVal(v)} }
    />
    </div>
  )
}
```

<API />
