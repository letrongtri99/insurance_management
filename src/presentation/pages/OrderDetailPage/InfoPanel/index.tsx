import React, { useMemo } from 'react';
import { HeaderTitle, Paper } from './index.style';
import { IField } from './type';
import RenderItem from './RenderItem';

interface IInfoPanel {
  dataSchema: IField[];
  title: string;
  handleUpdateOrder?: (payload: any) => void;
}

const InfoPanel = ({
  dataSchema,
  title,
  handleUpdateOrder = () => null,
}: IInfoPanel) => {
  const headerSection = useMemo(
    () => (
      <HeaderTitle>
        <div className="header-content">
          <b className="unittest-header">{title}</b>
        </div>
      </HeaderTitle>
    ),
    [title]
  );

  const renderGeneralSection = (
    <>
      {headerSection}
      <RenderItem props={dataSchema} handleUpdateOrder={handleUpdateOrder} />
    </>
  );

  return <Paper>{renderGeneralSection}</Paper>;
};

export default InfoPanel;
