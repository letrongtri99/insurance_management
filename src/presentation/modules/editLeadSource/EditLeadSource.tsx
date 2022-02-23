import React, { useState, useEffect } from 'react';
import Controls from 'presentation/components/controls/Control';
import { Grid, FormControl } from '@material-ui/core';

function EditLeadSource({ rowData, close }: any) {
  useEffect(() => {
    console.log(rowData);
  }, []);

  const sourceCollection = [
    { key: '1', id: 1, title: 'Google' },
    { key: '2', id: 2, title: 'Facebook' },
    { key: '3', id: 3, title: 'Viriyah' },
    { key: '4', id: 4, title: 'Dhipaya' },
  ];
  const showCollection = [
    { key: '1', id: 1, title: 'Show' },
    { key: '2', id: 2, title: 'Hide' },
  ];
  const autoAssign = [
    { key: '1', id: 1, title: 'Yes' },
    { key: '2', id: 2, title: 'No' },
  ];
  const scoreCollection = [
    { key: '1', id: 1, title: '1 (Beta)' },
    { key: '2', id: 2, title: 2 },
    { key: '3', id: 3, title: 3 },
    { key: '4', id: 4, title: '4 (Beta)' },
  ];
  const [isDisabled, setIsDisabled] = useState(true);

  const [state, setState] = useState({
    sourceCollection: '',
    showCollection: '',
    autoAssign: '',
    scoreCollection: '',
  });

  // const handleInputChange = (e: any) => {
  //   console.log('handle change');
  //   console.log(e);
  //   setSelected()
  // };

  const handleChange = (event: any) => {
    setIsDisabled(false);
    const { name, value } = event.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const updateSource = () => {
    console.log(state);
    close(false);
  };

  const closeModal = () => {
    close(false);
  };

  return (
    <>
      {/* <div>
        {rowData ? <div>{rowData.map((data: any) => (
          <div>
            {data}
          </div>
        ))} </div> : <div></div>}
      </div> */}
      <Grid item xs={12} md={12}>
        <FormControl
          margin="normal"
          required
          style={{ position: 'relative', zIndex: 1000 }}
        >
          <Controls.Select
            name="sourceCollection"
            label="Source"
            value={state.sourceCollection}
            onChange={handleChange}
            options={sourceCollection}
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
            value={state.showCollection}
            onChange={handleChange}
            options={showCollection}
          />
        </FormControl>
        <FormControl
          margin="normal"
          required
          style={{ position: 'relative', zIndex: 1000 }}
        >
          <Controls.Select
            name="autoAssign"
            label="Auto Assign"
            value={state.autoAssign}
            // value="selectDataType"
            onChange={handleChange}
            options={autoAssign}
          />
        </FormControl>
        <FormControl
          margin="normal"
          required
          style={{ position: 'relative', zIndex: 1000 }}
        >
          <Controls.Select
            name="scoreCollection"
            label="Score"
            // value="selectDataType"
            value={state.scoreCollection}
            onChange={handleChange}
            options={scoreCollection}
          />
        </FormControl>
        <div className="button-group">
          <Controls.Button
            type="submit"
            color="primary"
            text="Cancel"
            onClick={() => closeModal()}
          />
          <Controls.Button
            type="submit"
            color="primary"
            isDisabled={isDisabled}
            className={isDisabled ? 'button-create' : 'button-create-active'}
            text="Update Source"
            onClick={updateSource}
          />
        </div>
      </Grid>
    </>
  );
}

export default EditLeadSource;
