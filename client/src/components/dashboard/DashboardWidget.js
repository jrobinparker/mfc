import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DashboardWidget = ({ items, type, header, nullMessage }) => {
  let content, pageLink
  if (items.length === 0 || items === null) {
    content = <p>{nullMessage}</p>
  } else {
    content = items.map(l => <p><Link to={`/lesson/${l._id}`}>{l.title}</Link></p>)
  }

  return(
    <div className="box">
      <h1 className="title profile-widget-title">{header}</h1>
      {content}
    </div>
  )
};

export default DashboardWidget;
