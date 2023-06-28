import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="page page__dashboard">
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
            className="icon mb-7 mx-auto"
            src="/assets/images/Dashboard/account-icon.svg"
            alt=""
          />
          <span className="flex justify-between w-full items-center mt-auto">
            <p className="font-bold">Player</p>
            <button className="btn btn--icon">
              <img src="/assets/images/Dashboard/refresh-icon.svg" alt="" />
            </button>
          </span>
        </div>
      </div>

      <div className="row mb-4">
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
        <Link to="/subjects-evaluation" className="card">
          <img
            className="icon"
            src="/assets/images/Dashboard/subject-evaluation-icon.svg"
            alt=""
          />
          <p className="text-right text-[18px] text-gray20">
            Subject <br /> Evaluation
          </p>
        </Link>
      </div>

      <div className="row mb-4">
        <div className="card">
          <img
            className="icon"
            src="/assets/images/Dashboard/performance-overview.svg"
            alt=""
          />
          <p className="text-right text-[18px] text-gray20">
            Performance Overview
          </p>
        </div>
        <div className="card">
          <img
            className="icon"
            src="/assets/images/Dashboard/setting-icon.svg"
            alt=""
          />
          <p className="text-right text-[18px] text-gray20 mt-auto">Settings</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
