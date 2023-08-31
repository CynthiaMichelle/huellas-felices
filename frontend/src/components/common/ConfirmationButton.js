import { useState } from 'react';
import T from 'prop-types';

function ConfirmationButton({ confirmation, onConfirm, ...props }) {
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const showConfirmation = () => setConfirmationVisible(true);
  const hideConfirmation = () => setConfirmationVisible(false);

  const handleClick = showConfirmation;
  const handleConfirmClick = () => {
    hideConfirmation();
    onConfirm();
  };
  const handleCancelClick = hideConfirmation;

  return (
    <>
      <button onClick={handleClick} {...props} />
      {confirmationVisible && (
        <div>
          {confirmation}
          <button onClick={handleConfirmClick}>Confirmar</button>
          <button onClick={handleCancelClick}>Cancelar</button>
        </div>
      )}
    </>
  );
}

ConfirmationButton.propTypes = {
  confirmation: T.node,
  onConfirm: T.func.isRequired,
};

ConfirmationButton.defaultProps = {
  confirmation: null,
};

export default ConfirmationButton;
