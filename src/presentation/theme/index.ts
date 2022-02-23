import { createMuiTheme } from '@material-ui/core/styles';

import variants from './variants';
import typography from './typography';
import overrides from './overrides';
import breakpoints from './breakpoints';
import props from './props';
import shadows from './shadows';

const theme = (variant: any) =>
  createMuiTheme(
    {
      spacing: 4,
      breakpoints,
      overrides,
      props,
      typography,
      shadows,
      body: variant.body,
      border: variant.border,
      header: variant.header,
      palette: variant.palette,
      sidebar: variant.sidebar,
    } as any,
    variant.name
  );

const themes = variants.map((variant) => theme(variant));

export default themes;
