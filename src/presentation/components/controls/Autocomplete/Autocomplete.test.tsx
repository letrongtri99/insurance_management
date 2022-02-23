import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/dom';
import { screen } from '__tests__/rtl-test-utils';
import MyAutocomplete from './Autocomplete';
import Poppers from './Popper';

test('render MyAutoComplete view successfully', () => {
  const { getByTestId } = render(
    <MyAutocomplete
      options={[]}
      limitTags={1}
      marginRight={0}
      variant="standard"
      fixedLabel={false}
      lookup={false}
      name="test"
      labelField="title"
      valueField="title"
    />
  );
  expect(getByTestId('common-my-complete')).toBeTruthy();
});

test('render MyAutoComplete view when loading props is true', () => {
  const { getByTestId } = render(
    <MyAutocomplete
      options={[]}
      loading
      limitTags={1}
      marginRight={0}
      variant="standard"
      fixedLabel={false}
      lookup={false}
      name="test"
      labelField="title"
      valueField="title"
    />
  );
  expect(getByTestId('common-my-complete__circular')).toBeTruthy();
});

test('render MyAutoComplete view when loading props is false', () => {
  const { queryByTestId } = render(
    <MyAutocomplete
      options={[]}
      limitTags={1}
      marginRight={0}
      variant="standard"
      fixedLabel={false}
      lookup={false}
      name="test"
      labelField="title"
      valueField="title"
    />
  );
  expect(queryByTestId('common-my-complete__circular')).toBeFalsy();
});

test('render MyAutoComplete view', () => {
  render(
    <MyAutocomplete
      options={[]}
      limitTags={1}
      marginRight={0}
      variant="standard"
      fixedLabel={false}
      lookup={false}
      name="test"
      labelField="title"
      valueField="title"
    />
  );
});

it('render MyAutoComplete view when truthy hasSelectAll', () => {
  const { queryByTestId } = render(
    <MyAutocomplete
      options={[{ title: 'Option 1', value: 'option_1' }]}
      hasSelectAll
      multiple
      limitTags={1}
      marginRight={0}
      variant="standard"
      fixedLabel={false}
      lookup={false}
      name="test"
      labelField="title"
      valueField="title"
    />
  );
  expect(queryByTestId('option-select-item-all')).toBeFalsy();
});

test('render Poppers view successfully', () => {
  const anchorEl = {
    getBoundingClientRect: () => ({ width: '500px' }),
  };
  const { getByTestId } = render(<Poppers anchorEl={anchorEl} />);
  expect(getByTestId('common-my-complete__poppers')).toBeTruthy();
});

test('render MyAutoComplete view when passing default multiple props', () => {
  const { queryByTestId } = render(
    <MyAutocomplete
      options={[]}
      limitTags={1}
      marginRight={0}
      variant="standard"
      fixedLabel={false}
      lookup={false}
      name="test"
      labelField="title"
      valueField="title"
    />
  );
  expect(queryByTestId('common-my-complete__checkbox')).toBeFalsy();
});

test('render MyAutoComplete view successfully on opening dropdown', async () => {
  render(
    <MyAutocomplete
      options={[
        {
          label: 'Option 1',
          value: 'Option_1',
        },
        {
          label: 'Option 2',
          value: 'Option_2',
        },
      ]}
      multiple
      limitTags={1}
      marginRight={0}
      variant="standard"
      fixedLabel={false}
      lookup={false}
      name="test"
      labelField="title"
      valueField="title"
    />
  );
  await waitFor(() => {
    expect(
      screen.queryAllByTestId('common-my-complete')[0]
    ).toBeInTheDocument();
  });

  userEvent.click(screen.queryAllByTestId('common-my-complete')[0]);

  expect(screen.queryByTestId('common-my-complete__poppers')).toBeFalsy();
});
