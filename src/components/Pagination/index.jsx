import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const BasicPagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, newPage) => handlePageChange(event, newPage)}
      />
    </Stack>
  );
};

export default BasicPagination;

