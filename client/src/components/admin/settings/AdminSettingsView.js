import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../utils/Loading';
import EditSettings from './EditSettings';
import '../admin.css';

const AdminSettingsView = ({ settings, editSettings, getSetting }) => {
  const [ editModal, toggleEditModal ] = useState(false);
  const [ selectedSetting, setSelectedSetting ] = useState([]);

  return !settings ? <Loading /> : (
      <Fragment>
              <div className="form-wizard">
              <table className="table" style={{ width: '100%' }}>
                  <thead>
                    <th>Page</th>
                    <th></th>
                  </thead>
                  <tbody>
                    {settings.map(s => <tr>
                        <td>{s.area}</td>
                        <td>
                          <i className="fas fa-edit"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setSelectedSetting(s)
                              toggleEditModal(true)
                            }}
                          />
                        </td>
                        </tr>
                    )}
                  </tbody>
              </table>
          </div>
          {editModal ? <EditSettings toggleEditModal={toggleEditModal} setting={selectedSetting} getSetting={getSetting} editSettings={editSettings} /> : <Fragment></Fragment>}
        </Fragment>
    )
}

export default AdminSettingsView;
