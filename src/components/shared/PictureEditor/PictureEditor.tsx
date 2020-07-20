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
  onDeleteClick(id: string): void;
  onSaveClick(picture: Picture): void;
}

export const PictureEditor: FC<Props> = (props) => {
  const { id, url, fileName, onSaveClick, onDeleteClick } = props;
  const { handleSubmit, register, formState } = useForm({
    defaultValues: { ...props },
  });

  const handleDeleteClick = (e) => {
    e.preventDefault();
    onDeleteClick(id);
  };

  return (
    <div className="editor">
      <aside>
        <span className="label">{fileName}</span>
        <img src={url} alt={fileName} className="editor__image"></img>
      </aside>
      <form className="editor__form" onSubmit={handleSubmit(onSaveClick)}>
        <input name="id" type="hidden" ref={register} />
        <div className="form-group">
          <label className="form-label" for="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            className="form-input"
            placeholder="Title"
            ref={register}
          />
        </div>
        <div className="form-group">
          <label className="form-label" for="category">
            Category
          </label>
          <input
            id="category"
            name="category"
            className="form-input"
            placeholder="Category"
            ref={register}
          />
        </div>
        <div className="form-group">
          <input name="isVisible" type="checkbox" ref={register} /> Visible to public
        </div>
        <div className="editor__action">
          <button className="btn btn-success btn-lg" type="submit">
            Save
          </button>
          <button className="btn btn-error btn-lg" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};
