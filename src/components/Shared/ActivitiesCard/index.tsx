import ProfileEvaluationMini from './ProfileEvaluationMini';

const ActivitiesCard = () => {
  return (
    <div className="card">
      <div className=" mb-4 font-bold text-lg text-black">Activities</div>
      <div className="flex flex-col gap-3 leading-5 mb-2">
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

export default ActivitiesCard;
