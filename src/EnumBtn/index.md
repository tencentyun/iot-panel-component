## EnumBtn

### Demo

```jsx
import React, { useState } from 'react';
import { EnumBtn, BoolWidget } from 'qcloud-iot-panel-component';
export default () => {
  const [enumVal, setEnumVal] = useState(0);
  const [title, setTitle] = useState('');
  const enumList = [
    {text: 'x', value: 0, icon: 'create'},
    {text: 'y', value: 1, icon: 'https://iotmarket-1256872341.cos.ap-guangzhou.myqcloud.com/market/100005124842/ac7a87fae6eab9a3c9ced7c464f43b70.png'},
    {text: 'z', value: 2},
    {text: 'foo', value: 3},
    {text: 'bar', value: 4},
    {text: 'baz', value: 5},
  ];
  return (
    <div>
      <BoolWidget
        title="显示枚举标题"
        value={Boolean(title)}
        onChange={(v) => setTitle(title ? '' : '枚举组件')}
      />
      <EnumBtn
        title={title}
        icon={'create'}
        value={enumVal}
        enumList={enumList}
        onChange={(v) => {console.log(v); setEnumVal(v)} }
      />
    </div>
  )
}
```

<API />
