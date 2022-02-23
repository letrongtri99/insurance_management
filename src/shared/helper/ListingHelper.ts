const getNextPageBasedOnDataLength = (
  dataLength: number,
  pageSize: number
): number => {
  if (dataLength && pageSize) {
    if (dataLength < pageSize) {
      return -1;
    }
    const currentPage = Math.floor(dataLength / pageSize);
    let nextPage = currentPage;
    if (dataLength % pageSize === 0) {
      nextPage = currentPage + 1;
    } else {
      nextPage = -1;
    }

    return nextPage;
  }

  return -1;
};

export default {
  getNextPageBasedOnDataLength,
};
