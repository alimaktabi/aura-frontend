import { resetStore } from 'BrightID/actions';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { store } from 'store';
import { useDispatch } from 'store/hooks';
import { RoutePath } from 'types/router';
import { __DEV__ } from 'utils/env';

import { Modal } from '../../components/Shared/Modal';
import RoleSelectModal from './RoleSelectModal';

const Dashboard = () => {
  const preferredViews = ['Player', 'Trainer', 'Manager'];
  const preferredView = preferredViews[0];
  const [isRoleSelectModalOpen, setIsRoleSelectModalOpen] = useState(false);

  interface stringValue {
    [key: string]: string;
  }

  const preferredViewIcon: stringValue = {
    Player: '/assets/images/Dashboard/account-icon.svg',
    Trainer: '/assets/images/Dashboard/trainer-icon.svg',
    Manager: '/assets/images/Dashboard/manager-icon.svg',
  };

  const dispatch = useDispatch();

  const saveStringAsFile = (data: string, filename = 'aura-data.txt') => {
    const blob = new Blob([data], { type: 'text/plain' });
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    URL.revokeObjectURL(elem.href);
    document.body.removeChild(elem);
  };

  const downloadData = () => {
    try {
      const state = store.getState();
      const stateJsons: { [key: string]: string } = {};
      for (const key of Object.keys(state)) {
        const obj = state[key as keyof typeof state];
        if (key === 'profile' && obj && 'brightIdBackupEncrypted' in obj) {
          obj['brightIdBackupEncrypted'] = String(
            obj['brightIdBackupEncrypted']?.length,
          );
        }
        try {
          stateJsons[key] = JSON.stringify(obj);
        } catch (e) {
          stateJsons[key] = String(e);
        }
      }
      let finalString = '';
      try {
        finalString = JSON.stringify(stateJsons);
      } catch (e) {
        finalString = String(e);
      }
      saveStringAsFile(finalString);
    } catch (e) {
      alert(String(e));
    }
  };
  return (
    <div className="page page__dashboard">
      <button onClick={downloadData} className="btn mb-3 w-full">
        Download Data
      </button>
      <div className="row mb-4">
        <div className="card">
          <p className="text-sm">Domain</p>
          <p className="font-bold mb-2.5">BrightID</p>
          <p className="text-sm">Energy Team</p>
          <p className="font-bold mb-5">Core</p>
          <button className="btn">Change</button>
        </div>
        <div className="card">
          <p className="mb-5">Preferred view</p>
          <img
            className="icon mb-7 mx-auto !w-10 !h-10"
            src={preferredViewIcon[preferredView]}
            alt=""
          />
          <span className="flex justify-between w-full items-center mt-auto">
            <p className="font-bold">{preferredView}</p>
            <button
              className="btn btn--icon"
              onClick={() => setIsRoleSelectModalOpen(true)}
            >
              <img src="/assets/images/Dashboard/refresh-icon.svg" alt="" />
            </button>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link to="/domain-overview" className="card">
          <img
            className="icon"
            src="/assets/images/Dashboard/domain-overview-icon.svg"
            alt=""
          />
          <p className="text-right text-[18px] text-gray20">
            Domain <br /> Overview
          </p>
        </Link>
        {preferredView === 'Player' && (
          <Link to="/subjects-evaluation" className="card">
            <img
              className="icon"
              src="/assets/images/Dashboard/subject-evaluation-icon.svg"
              alt=""
            />
            <p className="text-right text-[18px] text-gray20">
              Subjects <br /> Evaluation
            </p>
          </Link>
        )}
        {preferredView === 'Trainer' && (
          <Link to="/subjects-evaluation" className="card">
            <img
              className="icon"
              src="/assets/images/Dashboard/account-icon.svg"
              alt=""
            />
            <p className="text-right text-[18px] text-gray20">
              Players <br /> Evaluation
            </p>
          </Link>
        )}
        {preferredView === 'Manager' && (
          <Link to="/subjects-evaluation" className="card">
            <img
              className="icon"
              src="/assets/images/Dashboard/trainer-icon.svg"
              alt=""
            />
            <p className="text-right text-[18px] text-gray20">
              Trainers <br /> Evaluation
            </p>
          </Link>
        )}

        {preferredView === 'Manager' && (
          <Link to="/subjects-evaluation" className="card">
            <img
              className="icon"
              src="/assets/images/Dashboard/manager-icon.svg"
              alt=""
            />
            <p className="text-right text-[18px] text-gray20">
              Managers <br /> Evaluation
            </p>
          </Link>
        )}

        <Link to={RoutePath.PERFORMANCE_OVERVIEW} className="card">
          <img
            className="icon"
            src="/assets/images/Dashboard/performance-overview.svg"
            alt=""
          />
          <p className="text-right text-[18px] text-gray20">
            Performance Overview
          </p>
        </Link>
        <div className="card">
          <img
            className="icon"
            src="/assets/images/Dashboard/setting-icon.svg"
            alt=""
          />
          <p className="text-right text-[18px] text-gray20 mt-auto">
            {' '}
            <br /> Settings
          </p>
        </div>
        {(__DEV__ || process.env.REACT_APP_IS_CYPRESS === 'true') && (
          <button
            className={'btn'}
            onClick={() => dispatch(resetStore())}
            data-testid="logout-button"
          >
            Logout
          </button>
        )}
      </div>
      <Modal
        title={'Role Selection'}
        isOpen={isRoleSelectModalOpen}
        noButtonPadding={true}
        closeModalHandler={() => setIsRoleSelectModalOpen(false)}
        className="select-button-with-modal__modal"
      >
        <RoleSelectModal />
      </Modal>
    </div>
  );
};

export default Dashboard;
