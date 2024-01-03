import ProfileEvaluationMini from './ProfileEvaluationMini';

const ActivitiesCard = () => {
  const isManagerView = false; // based on role view changes
  return (
    <div className="card">
      <div className=" mb-4 font-bold text-lg text-black">Activities</div>
      <Activities
        isManagerView={isManagerView}
        title="Trainers"
        icon="assets/images/Shared/trainer-icon-xs.svg"
      />
      {isManagerView && (
        <div>
          <hr className="border-dashed mt-6 mb-4" />
          <Activities
            isManagerView={isManagerView}
            title="Managers"
            icon="assets/images/Shared/manager-icon-xs.svg"
          />
        </div>
      )}

      <button className="btn--outlined mt-4">View All Evaluations</button>
      <button className="btn mt-3">Evaluate New Subject</button>
    </div>
  );
};

export default ActivitiesCard;

const Activities = ({
  isManagerView,
  title,
  icon,
}: {
  isManagerView: boolean;
  title: string;
  icon: string;
}) => {
  return (
    <div>
      <div className="flex flex-col gap-1 leading-5 mb-3">
        {isManagerView && (
          <div className="flex gap-1">
            <div>
              <img src={icon} alt="" />
            </div>
            <span className="font-bold">{title}</span>
          </div>
        )}
        <div className="flex justify-between">
          <div className="text-black font-medium">Total evaluations:</div>
          <div>
            <span className="font-medium">23 </span>
            <span>(18 Pos / 5 Neg)</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-black font-medium">Last evaluation:</div>
          <div>
            <span className="font-medium">2 days ago</span>
          </div>
        </div>
      </div>
      <ProfileEvaluationMini></ProfileEvaluationMini>
    </div>
  );
};
