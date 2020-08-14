import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../utils/Pagination';

const DashboardWidget = ({ items, type, header, nullMessage }) => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ itemsPerPage ] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  let content
  if (currentItems.length === 0 || items === null) {
    content = <p>{nullMessage}</p>
  } else {
    content = (
      <Fragment>
        <ul className="widget-list">
          {currentItems.map(i => <li><Link to={`/${type}/${i._id}`}>{i.title}</Link></li>)}
        </ul>
          {items.length <= 5 ? <></> : <Pagination itemsPerPage={itemsPerPage} totalItems={items.length} paginate={paginate} />}
      </Fragment>
    )
  }

  return(
    <div className="box">
      <span className="title profile-widget-title" style={{ color: 'white', marginBottom: '5px' }}>{header}</span>
      {content}
    </div>
  )
};

export default DashboardWidget;
