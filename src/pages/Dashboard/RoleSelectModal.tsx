import * as React from 'react';
import { useDispatch } from 'store/hooks';
import { setPreferredView } from 'store/profile';
import { PreferredView } from 'types/dashboard';

const RoleSelectModal = ({
  closeModalHandler,
}: {
  closeModalHandler?: () => void;
}) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-6">
      {Object.values(PreferredView).map((role) => (
        <div
          className="card flex !flex-row gap-4 !bg-opacity-100 items-center justify-between cursor-pointer"
          key={role}
          onClick={() => {
            dispatch(setPreferredView(role));
            closeModalHandler?.();
          }}
        >
          <img
            className=""
            src={`/assets/images/DomainOverview/${role.toLowerCase()}s-icon.svg`}
            alt=""
          />
          <div>{role}</div>
        </div>
      ))}
    </div>
  );
};

export default RoleSelectModal;
