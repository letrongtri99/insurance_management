import React, { useMemo, useState } from 'react';
import { listEmailFakeData } from '../../../../../mock-data/MessageModal.mock';
import MessageModalItem from '.';

export default {
  title: 'Components/Controls/MessageModalItem',
  component: MessageModalItem,
};

const Template = (args) => {
  const { listMail } = args;
  const [itemActiveId, setItemActiveId] = useState(-1);

  const itemHandleClick = (item: any) => {
    setItemActiveId(item.id);
  };

  const renderMessageItem = useMemo(() => {
    return listMail.map((item: any, index: number) => (
      <MessageModalItem
        messageItem={item}
        isStoryBook
        isActive={itemActiveId}
        onClick={() => itemHandleClick(item, index)}
      />
    ));
  }, [listMail, itemActiveId]);

  return <div style={{ width: 645 }}>{renderMessageItem}</div>;
};

export const Primary = Template.bind({});

Primary.args = {
  listMail: listEmailFakeData,
};
