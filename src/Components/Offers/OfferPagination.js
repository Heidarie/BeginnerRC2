import React from "react";
import { Pagination } from "react-bootstrap";

export default function offerPagination({
  page,
  setPage,
  totalOffers,
  offersPerPage,
}) {
  function adjustPage(amount) {
    setPage((prevPage) => prevPage + amount);
  }
  const pageNumbers = [];
  for (let i = 0; i < Math.ceil(totalOffers / offersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Pagination>
      {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}
      {page !== 1 && (
        <Pagination.Item onClick={() => setPage(1)}> 1</Pagination.Item>
      )}
      {page > 2 && <Pagination.Ellipsis />}
      {page > 2 && (
        <Pagination.Item onClick={() => adjustPage(-1)}>
          {page - 1}
        </Pagination.Item>
      )}
      <Pagination.Item active>{page}</Pagination.Item>
      {page + 1 <= pageNumbers.length && (
        <Pagination.Item onClick={() => adjustPage(1)}>
          {page + 1}
        </Pagination.Item>
      )}
      {page + 1 <= pageNumbers.length && (
        <Pagination.Next onClick={() => adjustPage(1)} />
      )}
    </Pagination>
  );
}
