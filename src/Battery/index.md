## Bettary

电池组件，用来显示设备的电量


```jsx
import React from 'react';
import { Battery } from 'qcloud-iot-panel-component';
export default () => (<div>
  <Battery value={50} />
  <Battery value={80} color="#50d664" style={{marginTop: 10}} />
  <Battery value={30} color="red" style={{marginTop: 10, '--border-color': '#000'}} />
</div>)
```

<API/>
