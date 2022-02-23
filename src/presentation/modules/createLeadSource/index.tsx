import React, { useState } from 'react';
import Controls from 'presentation/components/controls/Control';
import { Grid, FormControl } from '@material-ui/core';

const CreateLeadSource: React.FC<any> = () => {
  const sourceCollection = [
    { id: '1', title: 'Google' },
    { id: '2', title: 'Facebook' },
    { id: '3', title: 'Viriyah' },
    { id: '4', title: 'Dhipaya' },
  ];
  const productCollection = [
    { id: '1', title: 'Car Insurance' },
    { id: '2', title: 'Health Insurance' },
    { id: '3', title: 'Life Insurance' },
  ];
  const showCollection = [
    { id: '1', title: 'Show' },
    { id: '2', title: 'Hide' },
  ];
  const autoAssign = [
    { id: '1', title: 'Yes' },
    { id: '2', title: 'No' },
  ];
  const scoreCollection = [
    { id: '1', title: '1 (Beta)' },
    { id: '2', title: 2 },
    { id: '3', title: 3 },
    { id: '4', title: '4 (Beta)' },
  ];
  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputChange = (): void => {
    console.log('handle change');
  };
  const handleClick = () => {
    console.log('click');
  };
  return (
    <>
      <Grid item xs={12} md={12}>
        <FormControl
          margin="normal"
          required
          style={{ position: 'relative', zIndex: 1000 }}
        >
          <Controls.Select
            name="source"
            label="new Source"
            value="selectDataType"
            onChange={handleInputChange}
            options={sourceCollection}
          />
        </FormControl>

        <FormControl
          margin="normal"
          required
          style={{ position: 'relative', zIndex: 1000 }}
        >
          <Controls.Select
            name="product"
            label="Product"
            value="selectDataType"
            onChange={handleInputChange}
            options={productCollection}
          />
        </FormControl>
        <FormControl
          margin="normal"
          required
          style={{ position: 'relative', zIndex: 1000 }}
        >
          <Controls.Select
            name="showCollection"
            label="Hide"
            value="selectDataType"
            onChange={handleInputChange}
            options={showCollection}
          />
        </FormControl>
        <FormControl
          margin="normal"
          required
          style={{ position: 'relative', zIndex: 1000 }}
        >
          <Controls.Select
            name="selectDataType"
            label="Auto Assign"
            value="selectDataType"
            onChange={handleInputChange}
            options={autoAssign}
          />
        </FormControl>
        <FormControl
          margin="normal"
          required
          style={{ position: 'relative', zIndex: 1000 }}
        >
          <Controls.Select
            name="selectDataType"
            label="Score"
            value="selectDataType"
            onChange={() => setIsDisabled(false)}
            options={scoreCollection}
          />
        </FormControl>
        <div className="button-group">
          <Controls.Button type="submit" color="primary" text="Cancel" />
          <Controls.Button
            type="submit"
            color="primary"
            isDisabled={isDisabled}
            onClick={handleClick}
            className={isDisabled ? 'button-create' : 'button-create-active'}
            text="Create Source"
          />
        </div>
      </Grid>
    </>
  );
};

export default CreateLeadSource;
