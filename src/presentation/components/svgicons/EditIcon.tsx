import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

const EditIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="12" fill="#005098" />
        <path
          d="M17.25 9.49367C17.25 9.33538 17.1972 9.22988 17.0916 9.12435L14.8756 6.90829C14.6645 6.69724 14.348 6.69724 14.1369 6.90829L12.6595 8.38564L6.90819 14.1369C6.80266 14.2424 6.75 14.3479 6.75 14.5062V16.7224C6.75 17.0389 6.96106 17.25 7.27764 17.25H9.4937C9.65199 17.25 9.81031 17.1972 9.91583 17.0917L15.667 11.3404L17.1445 9.86306C17.1972 9.81029 17.25 9.7575 17.25 9.70474C17.25 9.65198 17.25 9.59924 17.25 9.59924C17.1972 9.59924 17.1972 9.54643 17.25 9.49367ZM9.22988 16.2475H7.75246V14.7701L12.976 9.54649L14.4534 11.0238L9.22988 16.2475ZM15.2449 10.2851L13.7675 8.80778L14.5063 8.06907L15.9837 9.54649L15.2449 10.2851Z"
          fill="white"
        />
      </svg>
    </SvgIcon>
  );
};

export default EditIcon;