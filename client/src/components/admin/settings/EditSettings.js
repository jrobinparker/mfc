import React, {useEffect, useState} from 'react';
import { createPortal } from 'react-dom';
import '../admin.css';

const EditSettings = ({ setting, getSetting, editSettings, toggleEditModal }) => {
  const [ formData, setFormData ] = useState({
    area: '',
    title: '',
    text: '',
  });

  const { area, title, text } = formData;

  useEffect(() =>
  {
    setFormData({
      area: !setting.area ? '' : setting.area,
      title: !setting.title ? '' : setting.title,
      text: !setting.text ? '' : setting.text
    });

    console.log(setting)
  }, [setting])

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e, id) => {
    e.preventDefault();
    editSettings(setting._id, formData, true);
    toggleEditModal(false)
  };


   return createPortal(
    <div className="modal is-active">
    <div className="modal-background" onClick={() => toggleEditModal(false)}></div>
      <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Edit {setting.area}</p>
        <button className="delete" aria-label="close" onClick={() => toggleEditModal(false)}></button>
      </header>
        <section className="modal-card-body">
        <div className="form-wizard">
        <form>
          <div className="field">
            <label className="label">Title</label>
              <div class="control">
                <input
                  className="input"
                  type='input'
                  value={title}
                  name='title'
                  placeholder='Page title'
                  onChange={e => onChange(e)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
                <div class="control">
                  <textarea
                    className="textarea"
                    value={text}
                    name='text'
                    placeholder='Text block...'
                    onChange={e => onChange(e)}
                  />
              </div>
            </div>
        </form>
        </div>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary" onClick={e => {
            onSubmit(e, setting._id)
          }}>Save</button>
          <button className="button" onClick={() => toggleEditModal(false)}>Cancel</button>
        </footer>
      </div>
    </div>
    ,
    document.querySelector('#edit-settings-modal')
    )
}

export default EditSettings;
