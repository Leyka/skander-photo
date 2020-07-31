import React, { FC } from 'react';
import { Picture } from '../../../shared/types';
import { useForm } from 'react-hook-form';
import './PictureEditor.scss';

interface Props {
  id: string;
  url: string;
  fileName: string;
  isVisible: boolean;
  title?: string;
  category?: string;
  isNewImport?: boolean;
  onDeleteClick(id: string, fileName: string): void;
  onSaveClick(picture: Picture): void;
}

export const PictureEditor: FC<Props> = (props) => {
  const { id, url, fileName, onSaveClick, onDeleteClick, isNewImport } = props;
  const { handleSubmit, register, formState } = useForm({
    defaultValues: { ...props },
  });

  const handleDeleteClick = (e) => {
    e.preventDefault();
    onDeleteClick(id, fileName);
  };

  return (
    <div>
      <div className="editor">
        <aside>
          <span className="label">{fileName}</span>
          <img src={url} alt={fileName} className="editor__image"></img>
        </aside>
        <form className="editor__form" onSubmit={handleSubmit(onSaveClick)}>
          <input name="id" type="hidden" ref={register} />
          <div className="form-group">
            <label className="form-label">
              Title
              <input
                id="title"
                name="title"
                className="form-input"
                placeholder="Title"
                ref={register}
              />
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              Category
              <input
                id="category"
                name="category"
                className="form-input"
                placeholder="Category"
                ref={register}
              />
            </label>
          </div>
          <div className="form-group">
            <input name="isVisible" type="checkbox" ref={register} /> Visible to public
          </div>
          <div className="editor__action">
            <button
              className="btn btn-success btn-lg"
              type="submit"
              disabled={!formState.isDirty && !isNewImport}
            >
              Save
            </button>
            <button className="btn btn-error btn-lg" onClick={handleDeleteClick}>
              Delete
            </button>
          </div>
        </form>
      </div>
      <div className="divider"></div>
    </div>
  );
};
