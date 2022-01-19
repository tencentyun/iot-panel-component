import React from 'react';
import { TipsProps, TipsHandler, TipsMain } from './TipsMain';
import { tipsApi, TipsApi } from './TipsApi';
import { forwardRefWithStatics } from '../../utils/forward-ref-with-statics';

export const Tips = forwardRefWithStatics<TipsProps, TipsHandler, TipsApi>(
  (props: TipsProps, ref) => (
    <TipsMain ref={ref} {...props} />
  ), tipsApi);
