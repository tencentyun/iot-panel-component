## EnumPopup

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
    <EnumPopup
      value={enumVal}
      icon="create"
      templateConfig={{name: '枚举弹窗很长很长的内容6666777'}}
      enumList={enumList}
      onChange={(v) => {console.log(v); setEnumVal(v)} }
    />
  )
}
```

<API />
