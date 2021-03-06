import React from 'react';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

const StarIcon = (props: SvgIconProps) => {
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
          d="M17.1929 10.6674C17.0499 10.2707 16.7161 10.0227 16.3346 10.0227H13.712L12.9013 7.39463C12.7583 6.99793 12.4245 6.75 11.9953 6.75C11.6138 6.75 11.2324 6.99793 11.137 7.39463L10.3263 10.0227H7.65601C7.17916 10.0227 6.75 10.469 6.75 10.9649C6.75 11.2624 6.89305 11.5599 7.13148 11.7583L9.27728 13.345L8.46665 15.9731C8.32359 16.3698 8.46665 16.8161 8.80044 17.064C9.13423 17.312 9.56339 17.312 9.89718 17.064L12.043 15.4277L14.1888 17.0145C14.618 17.312 15.1902 17.2128 15.4763 16.8161C15.667 16.5682 15.7147 16.2707 15.6193 15.9731L14.8087 13.345L16.9545 11.7087C17.1929 11.5103 17.336 11.064 17.1929 10.6674Z"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    </SvgIcon>
  );
};

export default StarIcon;
