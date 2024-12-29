import React, { useState } from "react";
import styles from "../../styles/comments.module.css";
import ExpandableSection from "./expandableSection";

const Comments = ({ initialComments = "" }) => {
  const [comment, setComment] = useState(initialComments);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    setComment(e.target.value);
    if (!isEditing) setIsEditing(true);
  };

  const handleSave = () => {
    console.log("Comentário salvo:", comment);
    setIsEditing(false);
    // Aqui você pode adicionar a lógica para salvar o comentário na API
  };

  const handleCancel = () => {
    setComment(initialComments); 
    setIsEditing(false);
  };

  return (
    <ExpandableSection title="Comentários">
      <div className={styles.commentsContainer}>
        <textarea
          className={styles.commentInput}
          value={comment}
          onChange={handleInputChange}
          placeholder="Digite seu comentário aqui..."
        />
        {isEditing && (
          <div className={styles.actions}>
            <button className={styles.saveButton} onClick={handleSave}>
              Salvar
            </button>
            <button className={styles.cancelButton} onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        )}
      </div>
    </ExpandableSection>
  );
};

export default Comments;
