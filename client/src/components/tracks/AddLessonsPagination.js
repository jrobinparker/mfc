import React from 'react';

const AddLessonsPagination = ({ lessonsPerPage, totalLessons, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalLessons / lessonsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <nav class="pagination" role="navigation" aria-label="pagination">
      <ul class="pagination-list">
        {pageNumbers.map(number => (
          <li key={number}>
            <a class="pagination-link" onClick={() => paginate(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
};

export default AddLessonsPagination;
