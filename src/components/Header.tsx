import React, { useEffect, useState } from 'react';
import cn from 'classnames';

type Props = {
  onAdd: (title: string) => Promise<void>;
  isAllTodosCompleted: boolean;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  fieldTitle: React.RefObject<HTMLInputElement>;
  onChangeStatus: () => void;
  isTodos: boolean;
};

export const Header: React.FC<Props> = ({
  onAdd,
  isAllTodosCompleted,
  setError,
  fieldTitle,
  onChangeStatus,
  isTodos,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fieldTitle.current?.focus();
  }, [isSubmitting, fieldTitle]);

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = newTitle.trim();

    if (!title) {
      setError('Title should not be empty');
    } else {
      setIsSubmitting(true);
      onAdd(title)
        .then(() => setNewTitle(''))
        .catch(() => {
          return;
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <header className="todoapp__header">
      {isTodos && (
        <button
          onClick={() => onChangeStatus()}
          type="button"
          className={cn('todoapp__toggle-all', { active: isAllTodosCompleted })}
          data-cy="ToggleAllButton"
        />
      )}
      <form onSubmit={handleOnSubmit}>
        <input
          ref={fieldTitle}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          disabled={isSubmitting}
        />
      </form>
    </header>
  );
};
